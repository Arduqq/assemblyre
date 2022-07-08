<template>
<div v-if="alive" ref="draggableWrapper" class="prose" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <text-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf"/>
    <div type="text" 
          ref="textInput"
          class="rendered-view"
          :class="[fieldStyleProperties.text.textAlignment]" 
          :value="fieldStyleProperties.text.mdcontent" 
          v-html="fieldStyleProperties.text.mdcontent">
        
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
  import sample from 'lodash.sample';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import Field from "./Field.vue";
  import TextFieldConfig from "./TextFieldConfig.vue";

  export default {
  name: "TextField",
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
        id: uniqueId('text-field-'),
        
        /* Initial Style Values */
        fieldStyleProperties: {
          text: {
            textAlignment: "Left",
            backgroundColor: "#ffffff",
            textColor: "#121212",
            content: "hello",
            mdcontent: "hello",
          },
          border: {
            borderColor: "#121212",
            borderRadius: 0,
            borderStyle: "solid",
            borderSize: "2px"
          }
        }
      }
    },
    mounted: function() {
      this.fieldStyleProperties.text.content = sample(this.initMessages);
    },
    methods: {
      closeConfig: function() {
        this.inEdit = false;
        this.fieldStyleProperties.text.mdcontent = DOMPurify.sanitize(marked.parse(this.fieldStyleProperties.text.content));
        
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        return {
          '--prose-bg-color': this.fieldStyleProperties.text.backgroundColor,
          '--prose-text-color': this.fieldStyleProperties.text.textColor,
          '--prose-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--prose-border-color': this.fieldStyleProperties.border.borderColor,
          '--prose-border-style': this.fieldStyleProperties.border.borderStyle,
          '--prose-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--prose-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--prose-text-alignment': this.fieldStyleProperties.text.textAlignment,
          '--prose-stack-order': stacking
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
  
  .prose {
    z-index: var(--prose-stack-order);
    position: absolute;
    height: auto;
    min-width: 300px;
    user-select: none;
    
  }
  
  .prose:hover {
    opacity: .7;
  }

  .prose main {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .prose main .rendered-view {
    display: block;
    flex: 1 1 100%;
    width: 100%;
    min-height: 30px;
    background-color: var(--prose-bg-color);
    color: var(--prose-text-color);
    border-color: var(--prose-border-color);
    border-width: var(--prose-border-size);
    border-style: var(--prose-border-style);
    border-radius: var(--prose-border-radius);
    font-size: var(--prose-text-size);
    color: var(--prose-text-color);
    text-align: var(--prose-text-alignment);
    line-height: auto;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }
  
  .edit-panel {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    top: calc(10% + 5px);
    left: calc(100% + 5px);
    width: 300px;
    height: 200px;
    background: white;
    border:  1px solid #232323;
    border-radius: 5px;
  }

  .edit-panel > * {
    flex: 1 1 100%;
  }
  
  
</style>
