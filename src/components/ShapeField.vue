<template>
<div v-if="alive" ref="draggableWrapper" class="shape field" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
  <main>
    <shape-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
    <div class="geometry"></div>
  </main>
  
</div>

</template>
<script>
  import Field from "./Field.vue";
  import ShapeFieldConfig from "./ShapeFieldConfig.vue";

  export default {
  name: "ShapeField",
  extends: Field,
    data() {
      return {
        styleMap: {
            "default": {
            shape: {
              geometry: 'circle',
            },
            border: {
              borderColor: "#121212",
              borderRadius: 0,
              borderStyle: "solid",
              borderSize: 1
            },
            shadow: {
              shadowDisplacement: 2,
              shadowSize: 2,
              shadowColor: "#343434"
            },
            background: {
              backgroundColor: "black",
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
      }
    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        return {
          '--field-border-color': this.fieldStyleProperties.border.borderColor,
          '--field-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--field-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--field-border-style': this.fieldStyleProperties.border.borderStyle,
          '--field-shadow-displacement': this.fieldStyleProperties.shadow.shadowDisplacement + "px",
          '--field-shadow-size': this.fieldStyleProperties.shadow.shadowSize + "px",
          '--field-shadow-color': this.fieldStyleProperties.shadow.shadowColor,
          '--field-background-color': this.fieldStyleProperties.background.backgroundColor,
          '--field-background-image': 'url(@/../assets/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)',
          '--field-background-size': this.fieldStyleProperties.background.backgroundSize + '%',
          '--field-stack-order': stacking
        }
      }
    },
    components: {
      ShapeFieldConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .shape {
    position: absolute;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
    max-height: 100%; 
    max-width: 100%;
    min-height: 100px;
  }


  .shape main{
    display: block;
    max-height: 100%; 
    max-width: 100%;
  }

  .shape main > * {
    z-index: 2;
  }

  .shape main .geometry {
    width: 100%;
    height: 100%;
    background-color: var(--field-background-color);
    background-image: var(--field-background-image);
    background-size: var(--field-background-size);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-color: var(--field-border-color);
    border-radius: var(--field-border-radius);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);
    position: relative;
    z-index: 1!important;
  }

  
</style>
