<template>
<div v-if="alive" ref="draggableWrapper" class="code" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <text-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
    
    <div v-for="block in blocks" :key="block.id" class="code-block" :id="'code-block' + block.id">

      <span class="code-block-id">{{block.id}}</span>
      <span class="code-block-indent"
      v-for="(_, index) in block.indent" :key="index"></span>
      <input type="text" ref="codeBlock"
       @keyup.enter="addBlock(block.id, 0)"
       @keyup.delete="removeBlock(block.id)"
       @keydown.tab.prevent="block.indent++"
       v-model="block.content"/>
    </div>
  </main>
  
  <aside class="quick-config-view">
      <input type="button" value="Up" id="stack-up-button" @click="stackUp" />
      <input type="button" value="Down" id="stack-down-button" @click="stackDown" />

  </aside>
  
</div>

</template>
<script>
  import Field from "./Field.vue";
  import TextFieldConfig from "./TextFieldConfig.vue";

  export default {
  name: "CodeField",
  extends: Field,
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
        blocks: [
          {
            id: 1,
            content: '**Shout** To Infinity!',
            type: 'print',
            indent: 0
          }
        ],
        /* Initial Style Values */
        
        
        /* Initial Style Values */
        fieldStyleProperties: {
          text: {
            textAlignment: "left",
            backgroundColor: "#ffffff",
            textColor: "#121212",
            textSize: 100,
            content: "hello",
            mdcontent: "hello",
          },
          border: {
            borderColor: "#121212",
            borderRadius: 0,
            borderStyle: "solid",
            borderSize: 2
          }
        }
      }
    },
    methods: {
      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.emitChange();
      },
      addBlock: function(line, indent) {
        /* If the cursor is at the start, transfer block's content */
        var content = this.$refs.codeBlock[line-1].selectionStart == 0 ? this.blocks[line-1].content : '';
        if (this.$refs.codeBlock[line-1].selectionStart == 0) {
          this.blocks[line-1].content = '';
        }
        this.blocks.splice(
          line,
          0,
          {
            id: line+1,
            content: content,
            type: 'print',
            indent: indent
          }
        );
        for (var i = line; i < this.blocks.length+1; i++) {
          this.blocks[i-1].id = i;
        }
        this.$nextTick(() => {
          this.$refs.codeBlock[line].focus();
        });
      },
      removeBlock: function(line) {
        /* Are there more than one line? */
        if (line > 1) {
            /* Is the current line tabbed? */
          if (this.blocks[line-1].indent > 0 && this.$refs.codeBlock[line-1].selectionStart == 0) {
            this.blocks[line-1].indent --;
            return;
          }
          /* Is the current line empty? */
          if (this.$refs.codeBlock[line-1].value === "") {
            this.blocks.splice(line-1,1);
            this.$nextTick(() => {
              this.$refs.codeBlock[line-2].focus();
            });
          }  
          /* Is the current selection at the line start? */
          if (this.$refs.codeBlock[line-1].selectionStart == 0) {
            var deletedLine = this.blocks.splice(line-1,1)[0];
            this.blocks[line-2].content += deletedLine.content;
            console.log(this.blocks);
            this.$nextTick(() => {
              this.$refs.codeBlock[line-2].focus();
            });

          }
        }
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        return {
          '--code-bg-color': this.fieldStyleProperties.text.backgroundColor,
          '--code-text-color': this.fieldStyleProperties.text.textColor,
          '--code-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--code-border-color': this.fieldStyleProperties.border.borderColor,
          '--code-border-style': this.fieldStyleProperties.border.borderStyle,
          '--code-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--code-border-radius': this.fieldStyleProperties.border.borderRadius + "ps",
          '--code-stack-order': stacking
        }
      }
    },
    components: {
      TextFieldConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .code {
    z-index: var(--code-stack-order);
    position: absolute;
    height: auto;
    min-width: 300px;
    user-select: none;
    width: 600px;
    
  }

    .code main input {
    display: block;
    flex: 1 1 auto;
    min-height: 30px;
    background-color: var(--field-bg-color);
    color: var(--field-text-color);
    border-color: var(--field-border-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-radius: var(--field-border-radius);
    font-size: var(--field-text-size);
    color: var(--field-text-color);
    line-height: auto;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }

  .code main {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .code .code-block {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .code .code-block input[type="text"] {
    display: block;
    flex: 1 1 auto;
  }

  .code .code-block .code-block-id {
    display: inline-block;
    flex: 0 1 5%;
  }

  .code .code-block .code-block-indent {
    display: inline-block;
    flex: 0 1 1em;
  }
  
</style>
