<template>
<div v-if="alive" ref="draggableWrapper" class="media field" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
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
      media: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        styleMap: {
          "default": {
              image: {
                imageRendering: "auto",
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
                backgroundColor: "transparent",
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
          '--field-image-rendering': this.fieldStyleProperties.image.imageRendering,
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
      },
      mediaURL () {
        if (this.media) {
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
    background-color: var(--field-background-color);
    background-image: var(--field-background-image);
    background-size: var(--field-background-size);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-color: var(--field-border-color);
    border-radius: var(--field-border-radius);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);

  }

  
</style>
