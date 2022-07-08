<template>
<div v-if="alive" ref="draggableWrapper" class="media" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
  <media-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf"/>
  <img :src="mediaURL" />
  
</div>

</template>
<script>
  import uniqueId from 'lodash.uniqueid';
  import Field from "./Field.vue";
  import MediaFieldConfig from "./MediaFieldConfig.vue";

  export default {
  name: "MediaField",
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
      },
      media: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        id: uniqueId('media-field-'),
        fieldStyleProperties: {
          image: {
            imageRendering: "auto",
          },
          border: {
            borderColor: "#121212",
            borderRadius: "0%;",
            borderStyle: "solid",
            borderSize: "2px"
          }
        }
      }
    },
    mounted: function() {
    },
    computed: {
      fieldStyle () {
        return {
          '--media-image-rendering': this.fieldStyleProperties.image.imageRendering,
          '--media-border-color': this.fieldStyleProperties.border.borderColor,
          '--media-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--media-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--media-border-style': this.fieldStyleProperties.border.borderStyle
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

  .media:hover {
    opacity: .7;
  }
  
  .media img {
    image-rendering: var(--media-image-rendering);
  }

  .media img {
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--media-bg-color);
    border-width: var(--media-border-size);
    border-style: var(--media-border-style);
    border-color: var(--media-border-color);
    border-radius: var(--media-border-radius);
    transition: .1s;
  }

  
</style>
