<template>
<div v-if="alive" ref="draggableWrapper" class="field" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <field-text-config :fid="id"  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
    <div type="text" 
          ref="textInput"
          class="rendered-view"
          :class="[fieldStyleProperties.text.textAlignment]" 
          :value="fieldStyleProperties.text.mdcontent" 
          v-html="fieldStyleProperties.text.mdcontent">
      </div>
  </main>
  
  <aside v-show="!inEdit" class="quick-config-view">
      <input type="button" value="Up" id="stack-up-button" @click="stackUp" />
      <input type="button" value="Down" id="stack-down-button" @click="stackDown" />

  </aside>
  
</div>

</template>
<script>
  import sample from 'lodash.sample';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import FieldBase from "./FieldBase.vue";
  import FieldTextConfig from "./FieldTextConfig.vue";

  export default {
  name: "FieldText",
  extends: FieldBase,
    data() {
      return {
        styleMap: {
          "default": {
              text: {
                textAlignment: "left",
                textColor: "#121212",
                textSize: 100,
                content: "",
                mdcontent: "",
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
    mounted: function() {
      this.fieldStyleProperties.text.content = sample(this.initMessages);
      this.emitChange();
    },
    methods: {
      closeConfig: function() {
        this.inEdit = false;
        this.fieldStyleProperties.text.mdcontent = DOMPurify.sanitize(marked.parse(this.fieldStyleProperties.text.content));
        
      },
      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.fieldStyleProperties.text.mdcontent = DOMPurify.sanitize(marked.parse(this.fieldStyleProperties.text.content));
      
        this.emitChange();
      },
    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        var backgroundImage = this.fieldStyleProperties.background.backgroundImage !== "none" ? 'url(@/../assets/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)' : "none"
        var style = {
          '--field-text-color': this.fieldStyleProperties.text.textColor,
          '--field-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--field-border-color': this.fieldStyleProperties.border.borderColor,
          '--field-border-style': this.fieldStyleProperties.border.borderStyle,
          '--field-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--field-border-radius': this.fieldStyleProperties.border.borderRadius + "px",
          '--field-text-alignment': this.fieldStyleProperties.text.textAlignment,
          '--field-shadow-displacement': this.fieldStyleProperties.shadow.shadowDisplacement + "px",
          '--field-shadow-size': this.fieldStyleProperties.shadow.shadowSize + "px",
          '--field-shadow-color': this.fieldStyleProperties.shadow.shadowColor,
          '--field-background-color': this.fieldStyleProperties.background.backgroundColor,
          '--field-background-image': backgroundImage,
          '--field-background-size': this.fieldStyleProperties.background.backgroundSize + '%',
          '--field-stack-order': stacking
        }
        return style;
      }
    },
    components: {
      FieldTextConfig
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
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);
    background-color: var(--field-background-color);
    background-image: var(--field-background-image);
    background-size: var(--field-background-size);
    line-height: auto;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }
  
  
</style>
