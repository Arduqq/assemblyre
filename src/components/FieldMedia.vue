<template>
<div v-if="alive" ref="draggableWrapper" class="media field" :id="id" :class="{'active' : active, 'edit' : edit}"  :style="fieldStyle" v-click-outside="closeConfig">
  <field-media-config :fid="id"  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
  <img :src="mediaURL" />
  
</div>

</template>
<script>
  import FieldBase from "./FieldBase.vue";
  import FieldMediaConfig from "./FieldMediaConfig.vue";

  export default {
  name: "FieldMedia",
  extends: FieldBase,
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
              },
              animation: {
                animationDuration: 5,
                animationType: "none"
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
        var backgroundImage = this.fieldStyleProperties.background.backgroundImage !== "none" ? 'url(@/../assets/backgrounds/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)' : "none"
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
          '--field-background-image': backgroundImage,
          '--field-background-size': this.fieldStyleProperties.background.backgroundSize + '%',
          '--field-animation-type': this.fieldStyleProperties.animation.animationType,
          '--field-animation-duration': this.fieldStyleProperties.animation.animationDuration + 's',
          '--field-stack-order': stacking,
          '--field-animation-entry' : stacking-1 + 's',
          '--field-x': this.x+'px',
          '--field-y': this.y+'px',
          '--field-w': this.screenWidth+'px'
        }
      },
      mediaURL () {
        if (this.media) {
          return this.media;
        }
        return null;
      }
    },
    components: {
      FieldMediaConfig
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
    animation: var(--field-animation-type) var(--field-animation-duration) infinite;
  }

  .media.edit:hover:after {
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
