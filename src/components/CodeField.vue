<template>
  <div v-if="alive" ref="draggableWrapper" class="code field" :id="id"  v-click-outside="closeConfig" >
    <main :style="fieldStyle">
      <code-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
      
      <div v-for="block in fieldStyleProperties.blocks" :key="block.id" class="code-block" :id="'code-block-' + block.id" >

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
  import CodeFieldConfig from "./CodeFieldConfig.vue";

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
        styleMap: {
          "default": {
            blocks: [
                {
                  id: 1,
                  content: '**Shout** To Infinity!',
                  type: 'print',
                  indent: 0
                }
              ],
              text: {
                backgroundColor: "#ffffff",
                textColor: "#121212",
                textSize: 100
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

              }
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
        var content = this.$refs.codeBlock[line-1].selectionStart == 0 ? this.fieldStyleProperties.blocks[line-1].content : '';
        if (this.$refs.codeBlock[line-1].selectionStart == 0) {
          this.fieldStyleProperties.blocks[line-1].content = '';
        }
        this.fieldStyleProperties.blocks.splice(
          line,
          0,
          {
            id: line+1,
            content: content,
            type: 'print',
            indent: indent
          }
        );
        for (var i = line; i < this.fieldStyleProperties.blocks.length+1; i++) {
          this.fieldStyleProperties.blocks[i-1].id = i;
        }
        this.$nextTick(() => {
          this.$refs.codeBlock[line].focus();
        });
      },
      removeBlock: function(line) {
        /* Is there more than one line? */
        if (line > 0) {
            /* Is the current line tabbed? */
          if (this.fieldStyleProperties.blocks[line-1].indent > 0 && this.$refs.codeBlock[line-1].selectionStart == 0) {
            this.fieldStyleProperties.blocks[line-1].indent --;
            return;
          }
          if (line > 1) {
            /* Is the current line empty? */
            if (this.$refs.codeBlock[line-1].value === "") {
              this.fieldStyleProperties.blocks.splice(line-1,1);
              for (var j = line-1; j <= this.fieldStyleProperties.blocks.length-1; j++) {
                this.fieldStyleProperties.blocks[j].id--;
              }
              this.$nextTick(() => {
                this.$refs.codeBlock[line-2].focus();
              });
              return;
            }  
            /* Is the current selection at the line start, but non-empty? */
            if (this.$refs.codeBlock[line-1].selectionStart === 0 && this.$refs.codeBlock[line-1].value != "") {
              var deletedLine = this.fieldStyleProperties.blocks.splice(line-1,1)[0];
              this.fieldStyleProperties.blocks[line-2].content += deletedLine.content;
              for (var i = line-1; i <= this.fieldStyleProperties.blocks.length-1; i++) {
                this.fieldStyleProperties.blocks[i].id--;
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
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        return {
          '--code-bg-color': this.fieldStyleProperties.background.backgroundColor,
          '--code-text-color': this.fieldStyleProperties.text.textColor,
          '--code-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--code-border-color': this.fieldStyleProperties.border.borderColor,
          '--code-border-style': this.fieldStyleProperties.border.borderStyle,
          '--code-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--code-border-radius': this.fieldStyleProperties.border.borderRadius + "px",
          '--code-shadow-displacement': this.fieldStyleProperties.shadow.shadowDisplacement + "px",
          '--code-shadow-size': this.fieldStyleProperties.shadow.shadowSize + "px",
          '--code-shadow-color': this.fieldStyleProperties.shadow.shadowColor,
          '--code-stack-order': stacking
        }
      }
    },
    components: {
      CodeFieldConfig
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
    min-height: 10px;
    line-height: auto;
    overflow-wrap: break-word;
    padding: 2px;
    margin: 0;
    color: var(--code-text-color);
    font-size: var(--code-text-size);
    font-family: "Steps Mono", "Courier New", monospace;
    border: none;
    background-color: var(--code-bg-color);
  }

  .code main {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 10px;

    
    background-color: var(--code-bg-color);
    border-color: var(--code-border-color);
    border-width: var(--code-border-size);
    border-style: var(--code-border-style);
    border-radius: var(--code-border-radius);
    color: var(--code-text-color);
    box-shadow: var(--code-shadow-displacement) var(--code-shadow-displacement) 0 var(--code-shadow-size) var(--code-shadow-color);
  }

  .code .code-block {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
  }
  .code .code-block input[type="text"] {
    display: block;
    flex: 1 1 auto;
    box-sizing: border-box;
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
    border-left: 1px solid var(--code-text-color);
    height: 100%;
  }
  
</style>
