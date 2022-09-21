<template>
<div v-if="alive" ref="draggableWrapper" class="text field" :class="{'active' : active}" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <field-text-config :fid="id" v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
    <div v-if="!inEdit" class="rendered-view" >
      <p  v-for="(value, index) in fieldStyleProperties.text.content"
          :key="index"
          :id="id + '-content-' + index"></p>
    </div>
    <div v-else class="rendered-view" >
      <p  v-for="(value, index) in fieldStyleProperties.text.content"
          :key="index"
          :id="id + '-content-' + index"
          @input="event => onInput(event, index)"
          contenteditable></p>
    </div>
  </main>
  
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
                fontFamily: "Roboto",
                textColor: "#121212",
                textSize: 100,
                content: [ { value: '', md: '' } ],
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
      const msg = sample(this.initMessages);
      this.fieldStyleProperties.text.content = [{ value: msg, md: DOMPurify.sanitize(marked.parse(msg))}]; 
      this.updateAllContent();
      this.emitChange();
    },
    methods: {
      
      openConfig: function() {
        if (!this.inEdit) {
          this.inEdit = true;
          this.updateAllContent(false);
        }
      },
      closeConfig: function() {
        if (this.inEdit) {
          this.inEdit = false;
          this.updateAllContent(true);  
        }
      },

      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.emitChange();
      },
      
      onInput(event, index) {
        const value = event.target.innerText;
        this.fieldStyleProperties.text.content[index].value = value;
        this.fieldStyleProperties.text.content[index].md = DOMPurify.sanitize(marked.parse(value));
        this.emitChange();
      },
      
      updateAllContent(markdown) {
        this.fieldStyleProperties.text.content.forEach((c, index) => {
          c.md = DOMPurify.sanitize(marked.parse(c.value));
          const el = document.getElementById(this.id + '-content-'+index);
          if (markdown) { el.innerHTML = c.md }
          else { el.innerText = c.value}
        });
        this.emitChange();
      }
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
          '--field-text-font': this.fieldStyleProperties.text.fontFamily,
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
  .text main .rendered-view{
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
    font-family: var(--field-text-font);
    height: auto;
  }
  
  .text:hover:after {
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
