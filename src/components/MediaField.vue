<template>
<div v-if="alive" ref="draggableWrapper" class="media" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
  <media-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
  <img :src="mediaURL" />
  
</div>

</template>
<script>
  import Field from "./Field.vue";
  import MediaFieldConfig from "./MediaFieldConfig.vue";

  export default {
  name: "MediaField",
  extends: Field,
    props: {
      width: {
        type: Number,
        required: false,
        default: 100
      },
      height: {
        type: Number,
        required: false,
        default: 30
      },
      media: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        fieldStyleProperties: {
          image: {
            imageRendering: "auto",
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
          '--field-image-rendering': this.fieldStyleProperties.image.imageRendering,
          '--field-border-color': this.fieldStyleProperties.border.borderColor,
          '--field-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--field-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--field-border-style': this.fieldStyleProperties.border.borderStyle,
          '--field-shadow-displacement': this.fieldStyleProperties.shadow.shadowDisplacement + "px",
          '--field-shadow-size': this.fieldStyleProperties.shadow.shadowSize + "px",
          '--field-shadow-color': this.fieldStyleProperties.shadow.shadowColor,
          '--field-stack-order': stacking
        }
      },
      mediaURL () {
        if (this.media) {
          console.log(this.media);
          return this.media;
        }
        return require ('@/assets/sample.jpg')
      }
    },
    components: {
      MediaFieldConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .media {
    position: absolute;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
    max-height: 100%; 
    max-width: 100%;
  }


  .media img {
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: var(--field-image-rendering);
    background-color: var(--field-bg-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-color: var(--field-border-color);
    border-radius: var(--field-border-radius);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);

  }

  
</style>
