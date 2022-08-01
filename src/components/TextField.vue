<template>
<div v-if="alive" ref="draggableWrapper" class="field" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <text-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
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
  import sample from 'lodash.sample';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import Field from "./Field.vue";
  import TextFieldConfig from "./TextFieldConfig.vue";

  export default {
  name: "TextField",
  extends: Field,
    data() {
      return {
        
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
    mounted: function() {
      this.fieldStyleProperties.text.content = sample(this.initMessages);
    },
    methods: {
      closeConfig: function() {
        this.inEdit = false;
        this.fieldStyleProperties.text.mdcontent = DOMPurify.sanitize(marked.parse(this.fieldStyleProperties.text.content));
        
      },
      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.emitChange();
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        var style = {
          '--field-bg-color': this.fieldStyleProperties.text.backgroundColor,
          '--field-text-color': this.fieldStyleProperties.text.textColor,
          '--field-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--field-border-color': this.fieldStyleProperties.border.borderColor,
          '--field-border-style': this.fieldStyleProperties.border.borderStyle,
          '--field-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--field-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--field-text-alignment': this.fieldStyleProperties.text.textAlignment,
          '--field-stack-order': stacking
        }
        return style;
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

  .field main {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .field main .rendered-view {
    display: block;
    flex: 1 1 100%;
    width: 100%;
    min-height: 30px;
    background-color: var(--field-bg-color);
    color: var(--field-text-color);
    border-color: var(--field-border-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-radius: var(--field-border-radius);
    font-size: var(--field-text-size);
    color: var(--field-text-color);
    text-align: var(--field-text-alignment);
    line-height: auto;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }
  
  
</style>
