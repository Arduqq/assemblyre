<template>
  <div v-if="alive" ref="draggableWrapper" class="code field" :id="id" :class="{'active' : active, 'edit' : edit}" v-click-outside="closeConfig" :style="fieldStyle">
    <main >
      <field-code-config :fid="id"  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
      <div v-show="edit" class="code-block" id="code-block-input">
        <span class="code-block-id"><b>IN</b></span>
        <input type="text" v-model="input" @input="updateProperties" />
      </div>
      <div v-for="block in fieldStyleProperties.text.blocks" :key="block.id" class="code-block" :id="'code-block-' + block.id" :class="block.type">
        <span class="code-block-id">{{block.id}}</span>
        <span class="code-block-indent"
        v-for="(_, index) in block.indent" :key="index"></span>
        <input type="text" ref="codeBlock" :disabled="!edit"
        @keyup.enter="addBlock(block.id, 0)"
        @keyup.delete="removeBlock(block.id)"
        @keydown.tab.prevent="block.indent++"
        v-model="block.content"/>
        <div class="code-type-config" v-show="edit">
          <input :id="block.id + '-print'" :name="block.id" value="print"  type="radio" v-model="block.type" @input="updateProperties"/>
          <label :for="block.id + '-print'" >print</label>
          
          <input :id="block.id + '-assign'" :name="block.id" value="assign"  type="radio" v-model="block.type" @input="updateProperties"/>
          <label :for="block.id + '-assign'">assign</label>
          
          <input :id="block.id + '-unassign'" :name="block.id" value="unassign"  type="radio" v-model="block.type" @input="updateProperties"/>
          <label :for="block.id + '-unassign'">unassign</label>
          
          <input :id="block.id + '-generate'" :name="block.id" value="generate"  type="radio" v-model="block.type" @input="updateProperties"/>
          <label :for="block.id + '-generate'">generate</label>
          
        </div>
      </div>
      <div v-show="edit" class="code-block" id="code-block-input">
        <span class="code-block-id"><b>OU</b></span>
        <input type="text" v-model="output" @input="updateProperties" />
      </div>
    </main>
  </div>

</template>
<script>
  import FieldBase from "./FieldBase.vue";
  import FieldCodeConfig from "./FieldCodeConfig.vue";

  export default {
  name: "FieldCode",
  extends: FieldBase,
    props: {
      x: {
        type: Number,
        required: true,
        default: 10
      },
      y: {
        type: Number,
        required: true,
        default: 10
      }
    },
    data() {
      return {
        input: 'cookie crumbles',
        output: 'cake',
        styleMap: {
          "default": {
              text: {
                textColor: "#121212",
                textSize: 100,
                blocks: [
                    {
                      id: 1,
                      content: '**Shout** To Infinity!',
                      type: 'print',
                      indent: 0
                    }
                  ],
              },
              highlight: {
                textGlow: 100,
                textGlowColor: "left",
                highlightColor: "Roboto"
              },
              border: {
                borderColor: "transparent",
                borderRadius: 0,
                borderStyle: "solid",
                borderSize: 0
              },
              shadow: {
                shadowDisplacement: 0,
                shadowSize: 0,
                shadowColor: "transparent"
              },
              background: {
                backgroundColor: "white",
                backgroundImage: "none",
                backgroundSize: 100,
              },
              animation: {
                animationDuration: 5,
                animationType: "none"
              }
          }
        }
      }
    },
    methods: {
      updateProperties: function(value) {
        if (this.edit) {
          this.fieldStyleProperties = value;
          this.emitChange();
        }
      },
      addBlock: function(line, indent) {
        if (this.edit) {
          /* If the cursor is at the start, transfer block's content */
          var content = this.$refs.codeBlock[line-1].selectionStart == 0 ? this.fieldStyleProperties.text.blocks[line-1].content : '';
          if (this.$refs.codeBlock[line-1].selectionStart == 0) {
            this.fieldStyleProperties.text.blocks[line-1].content = '';
          }
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
        if (this.edit) {
          /* Is there more than one line? */
          if (line > 0) {
              /* Is the current line tabbed? */
            if (this.fieldStyleProperties.text.blocks[line-1].indent > 0 && this.$refs.codeBlock[line-1].selectionStart == 0) {
              this.fieldStyleProperties.text.blocks[line-1].indent --;
              return;
            }
            if (line > 1) {
              /* Is the current line empty? */
              if (this.$refs.codeBlock[line-1].value === "") {
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
                this.fieldStyleProperties.text.blocks[line-2].content += deletedLine.content;
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
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 10000;
        var backgroundImage = this.fieldStyleProperties.background.backgroundImage !== "none" ? 'url(@/../assets/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)' : "none"
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
          '--field-animation-entry' : stacking + 's',
          '--field-x': this.x+'px',
          '--field-y': this.y+'px'
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
    height: auto;
    min-width: 300px;
    user-select: none;
    width: 600px;
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

  .code main {
    width: auto;
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    animation: var(--field-animation-type) var(--field-animation-duration) infinite;
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
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
    transition: .1s;
    border-top: solid 1px rgba(0,0,0,0);
    border-bottom: solid 1px rgba(0,0,0,0);
  }
  .code .code-block input[type="text"] {
    display: block;
    flex: 1 1 auto;
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
    flex: 0 1 5%;
  }

  .code .code-block .code-block-indent {
    display: inline-block;
    flex: 0 1 1em;
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
    border-right: 10px solid var(--interact-color);
    animation: interact-wiggle-h 1s infinite;
  }
</style>
