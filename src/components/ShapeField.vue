<template>
<div v-if="alive" ref="draggableWrapper" class="shape field" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
  <shape-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
  
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
        fieldStyleProperties: {
          shape: {
            geometry: 'circle',
          },
          border: {
            borderColor: "#121212",
            borderRadius: 0,
            borderStyle: "solid",
            borderSize: 2
          },
          shadow: {
            shadowDisplacement: 2,
            shadowSize: 5,
            shadowColor: "#121212"
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
  }


  .shape {
    display: block;
    width: 100px;
    height: 100px;
    image-rendering: var(--field-image-rendering);
    background-color: var(--field-bg-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-color: var(--field-border-color);
    border-radius: var(--field-border-radius);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);

  }

  
</style>
