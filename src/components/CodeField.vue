<template>
<div v-if="alive" ref="draggableWrapper" class="code" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <div v-for="block in blocks" :key="block.id" class="code-block">
      {{block.id}}<input type="text" ref="codeBlock" @keyup.enter="addBlock(block.id+1, 0)" v-model="block.content"/>
    </div>
  </main>
  
  <aside class="quick-config-view">
      <input type="button" value="Up" id="stack-up-button" @click="stackUp" />
      <input type="button" value="Down" id="stack-down-button" @click="stackDown" />

  </aside>
  
</div>

</template>
<script>
  import uniqueId from 'lodash.uniqueid';
  import Field from "./Field.vue";

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
      },
      width: {
        type: Number,
        required: true,
        default: 100
      },
      height: {
        type: Number,
        required: true,
        default: 30
      }
    },
    data() {
      return {
        id: uniqueId('code-field-'),
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
        fieldStyleProperties: {
          text: {
            textAlignment: "Left",
            backgroundColor: "#ffffff",
            textColor: "#121212",
            textSize: "#121212",
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
      addBlock: function(line, indent) {
        if (line === this.blocks.length+1) {
          this.blocks.push(
            {
              id: line,
              content: '',
              type: 'print',
              indent: indent
            }
          );
        }
        this.$nextTick(() => {
          this.$refs.codeBlock[line-1].focus();
        });
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
          '--code-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--code-text-alignment': this.fieldStyleProperties.text.textAlignment,
          '--code-stack-order': stacking
        }
      }
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
    
  }
  
  .code:hover {
    opacity: .7;
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
  }
  .code .code-block input[type="text"] {
    width: 100%;
    display: block;
    flex: 1 1 90%;
  }
  
</style>
