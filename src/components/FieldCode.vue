<template>
  <div v-if="alive" ref="draggableWrapper" class="code field" :id="id" :class="{'active' : active, 'edit' : edit}" v-click-outside="closeConfig" :style="fieldStyle">
    <main >
      <field-code-config :fid="id"  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
      <div v-show="edit" class="code-block" id="code-block-input">
        <span class="code-block-id"><b>IN</b></span>
        <input type="text" v-model="input"/>
      </div>
      <div v-for="block in fieldStyleProperties.text.blocks" :key="block.id" class="code-block" :id="id + '-' + block.id" :class="block.type">
        <span class="code-block-id">{{block.id}}</span>
        <span class="code-block-indent"
        v-for="(_, index) in block.indent" :key="index"></span>
        <input type="text" ref="codeBlock" :disabled="!edit"
        @keydown.enter="addBlock(block.id, 0)"
        @keydown.delete="removeBlock(block.id)"
        @keydown.tab.prevent="block.indent++"
        v-model="block.content"/>
        <div class="code-type-config" v-show="edit">
          <input :id="'code-block-' + id + '-' + block.id + '-none'" :name="'code-block-' + id + '-' + block.id" value="none"  type="radio" v-model="block.type"/>
          <label :for="'code-block-' + id + '-' + block.id + '-none'" >none</label>

          <input :id="'code-block-' + id + '-' + block.id + '-print'" :name="'code-block-' + id + '-' + block.id" value="print"  type="radio" v-model="block.type"/>
          <label :for="'code-block-' + id + '-' + block.id + '-print'" >print</label>
          
          <input :id="'code-block-' + id + '-' + block.id + '-assign'" :name="'code-block-' + id + '-' + block.id" value="assign"  type="radio" v-model="block.type"/>
          <label :for="'code-block-' + id + '-' + block.id + '-assign'">assign</label>
          
          <input :id="'code-block-' + id + '-' + block.id + '-unassign'" :name="'code-block-' + id + '-' + block.id" value="unassign"  type="radio" v-model="block.type"/>
          <label :for="'code-block-' + id + '-' + block.id + '-unassign'">unassign</label>
          
          <input :id="'code-block-' + id + '-' + block.id + '-generate'" :name="'code-block-' + id + '-' + block.id" value="generate"  type="radio" v-model="block.type"/>
          <label :for="'code-block-' + id + '-' + block.id + '-generate'">generate</label>
          
        </div>
      </div>
      <div v-show="edit" class="code-block" id="code-block-input">
        <span class="code-block-id"><b>OU</b></span>
        <input type="text" v-model="output"/>
      </div>
    </main>
  </div>

</template>
<script>
  import FieldBase from "./FieldBase.vue";
  import FieldCodeConfig from "./FieldCodeConfig.vue";
  import styles from '../json/styles.json'

  export default {
  name: "FieldCode",
  extends: FieldBase,
    data() {
      return {
        input: 'cookie crumbles',
        output: 'cake',
        styleMap: styles.code
      }
    },
    methods: {
      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.emitChange();
      },
      addBlock: function(line, indent) {
        if (this.edit) {
          /* If the cursor is not at the last character, transfer block's content */
          var content = this.$refs.codeBlock[line-1].selectionStart < this.$refs.codeBlock[line-1].textLength ? 
            this.fieldStyleProperties.text.blocks[line-1].content.substring(this.$refs.codeBlock[line-1].selectionStart, this.$refs.codeBlock[line-1].textLength) : '';
          var previousContent = this.fieldStyleProperties.text.blocks[line-1].content.substring(0, this.$refs.codeBlock[line-1].selectionStart);
          this.fieldStyleProperties.text.blocks[line-1].content = previousContent;
          this.fieldStyleProperties.text.blocks.splice(
            line,
            0,
            {
              id: line+1,
              content: content,
              type: 'print',
              indent: indent
            }
          );
          for (var i = line; i < this.fieldStyleProperties.text.blocks.length+1; i++) {
            this.fieldStyleProperties.text.blocks[i-1].id = i;
          }
          this.$nextTick(() => {
            this.$refs.codeBlock[line].focus();
          });
        }
      },
      removeBlock: function(line) {
          /* Is there more than one line? */
          if (line > 0) {
              /* Is the current line tabbed? */
            if (this.fieldStyleProperties.text.blocks[line-1].indent > 0 && this.$refs.codeBlock[line-1].selectionStart == 0) {
              this.fieldStyleProperties.text.blocks[line-1].indent --;
              return;
            }
            if (line > 1) {
              /* Is the current line empty? */
              if (this.$refs.codeBlock[line-1].value === "" && this.$refs.codeBlock[line-1].selectionStart == 0 ) {
                this.fieldStyleProperties.text.blocks.splice(line-1,1);
                for (var j = line-1; j <= this.fieldStyleProperties.text.blocks.length-1; j++) {
                  this.fieldStyleProperties.text.blocks[j].id--;
                }
                this.$nextTick(() => {
                  this.$refs.codeBlock[line-2].focus();
                });
                return;
              }  
              /* Is the current selection at the line start, but non-empty? */
              if (this.$refs.codeBlock[line-1].selectionStart === 0 && this.$refs.codeBlock[line-1].value != "") {
                var deletedLine = this.fieldStyleProperties.text.blocks.splice(line-1,1)[0];
                this.fieldStyleProperties.text.blocks[line-2].content += deletedLine.content + ' ';
                for (var i = line-1; i <= this.fieldStyleProperties.text.blocks.length-1; i++) {
                  this.fieldStyleProperties.text.blocks[i].id--;
                }
                this.$nextTick(() => {
                  this.$refs.codeBlock[line-2].focus();
                });
              }
            }
          }
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 10000;
        var backgroundImage = this.fieldStyleProperties.background.backgroundImage !== "none" ? 'url(@/../assets/backgrounds/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)' : "none"
        return {
          '--field-background-image': backgroundImage,
          '--field-background-size': this.fieldStyleProperties.background.backgroundSize + '%',
          '--field-background-color': this.fieldStyleProperties.background.backgroundColor,
          '--field-text-color': this.fieldStyleProperties.text.textColor,
          '--field-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--field-highlight-text-glow': this.fieldStyleProperties.highlight.textGlow + 'px',
          '--field-highlight-text-glow-color': this.fieldStyleProperties.highlight.textGlowColor,
          '--field-highlight-color': this.fieldStyleProperties.highlight.highlightColor,
          '--field-border-color': this.fieldStyleProperties.border.borderColor,
          '--field-border-style': this.fieldStyleProperties.border.borderStyle,
          '--field-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--field-border-radius': this.fieldStyleProperties.border.borderRadius + "px",
          '--field-shadow-displacement': this.fieldStyleProperties.shadow.shadowDisplacement + "px",
          '--field-shadow-size': this.fieldStyleProperties.shadow.shadowSize + "px",
          '--field-shadow-color': this.fieldStyleProperties.shadow.shadowColor,
          '--field-animation-type': this.fieldStyleProperties.animation.animationType,
          '--field-animation-duration': this.fieldStyleProperties.animation.animationDuration + 's',
          '--field-stack-order': stacking,
          '--field-animation-entry' : stacking-1 + 's',
          '--field-x': this.x+'px',
          '--field-y': this.y+'px',
          '--field-w': this.screenWidth+'px'
        }
      }
    },
    components: {
      FieldCodeConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .code {
    z-index: var(--field-stack-order);
    position: absolute;
    min-width: 330px;
    user-select: none;
    max-width: 100%;
  }

    .code main .code-block > input {
    display: block;
    flex: 1 1 auto;
    min-height: 10px;
    line-height: auto;
    overflow-wrap: break-word;
    padding: 2px;
    margin: 0;
    color: var(--field-text-color);
    font-size: var(--field-text-size);
    font-family: "Steps Mono", "Courier New", monospace;
    border: none;
    background-color: var(--field-bg-color);
  }

  .code main{
    width: auto;
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    overflow-y: auto;
    scrollbar-width: thin;
    animation: var(--field-animation-type) var(--field-animation-duration) infinite;
    background-image: var(--field-background-image);
    background-color: var(--field-background-color);
    border-color: var(--field-border-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-radius: var(--field-border-radius);
    color: var(--field-text-color);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);
  }

  .code .code-block {
    display: flex;
    flex-flow: row wrap;
    width: 90%;
    justify-content: flex-start;
    align-items: center;
    padding: 0 3px;
    transition: .1s;
    border-top: solid 1px rgba(0,0,0,0);
    border-bottom: solid 1px rgba(0,0,0,0);
  }
  .code .code-block input[type="text"] {
    display: block;
    flex: 1 0 auto;
    box-sizing: border-box;
    background-color: var(--field-highlight-color);
    text-shadow: 0 0  var(--field-highlight-text-glow) var(--field-highlight-text-glow-color);
  }

  .code .code-block:focus-within {
    border-top: solid 1px rgba(0,0,0,.5);
    border-bottom: solid 1px rgba(0,0,0,.5);
  }
  .code .code-block input[type="text"]:focus {
    outline: 0;
  }

  .code .code-block .code-block-id {
    display: inline-block;
    flex: 0 0 1em;
  }

  .code .code-block .code-block-indent {
    display: inline-block;
    flex: 0 0 1em;
    border-left: 1px solid var(--field-text-color);
    height: 1em;;
  }

  .code-type-config {
    display: none;
    flex-flow: row wrap;
    position: absolute;
    left: 90%;
    width: 100px;
    padding: 2px;
    border-radius: 5px;
    color: var(--primary-color);
    background: var(--secondary-color);
    gap: 2px;
  }
  .code.edit .code-type-config label:hover, .code.edit .code-type-config input:checked + label {
    color: white;
    background: var(--secondary-alt-color);
  }
  .code-type-config input {
    display: none;
  }

  .code-type-config label {
    width: 100%;
    flex: 0 0 100%;
    padding: 2px;
  }

  .code-type-config:before {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    height: 100%;
    width: 20px;
    background: var(--secondary-color);
    clip-path: polygon(100% 0, 0 50%, 100% 100%);

  }

  .code.edit .code-block:hover .code-type-config {
    display: flex;
  }

  .code.edit:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow-y: hidden;
    border-right: 10px solid var(--interact-color);
    animation: interact-wiggle-h 1s infinite;
  }

  .code:not(.edit) .code-block.print input {
    animation: print 5s var(--field-animation-entry) steps(40, end) infinite;
  }

  .code:not(.edit) .code-block.assign input {
    animation: assign 5s var(--field-animation-entry) linear infinite;
  }

  .code:not(.edit) .code-block.unassign input {
    animation: unassign 5s var(--field-animation-entry) linear infinite;
  }

  .code:not(.edit) .code-block.generate input {
    animation: generate 5s var(--field-animation-entry)  steps(5, end) infinite;
  }

  @keyframes print {
    0% {width: 0px; flex-grow: 0}
    100% {width: 70%; flex-grow: 1}
  }

  @keyframes assign {
    0% {opacity: .2; padding-left: 10px;}
    100% {opacity: 1; padding-left: 0px;}
  }

  @keyframes unassign {
    0% {opacity: 1; padding-left: 0px;}
    100% {opacity: .2; padding-left: 10px;}
  }

  @keyframes generate {
    0% {width: 0px; flex-grow: 0; opacity: .2; padding-left: 50px;}
    100% {width: 70%; flex-grow: 1; opacity: 1; padding-left: 0px;}
  }
</style>
