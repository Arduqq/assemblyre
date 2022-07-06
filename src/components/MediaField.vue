<template>
<div v-if="alive" ref="draggableWrapper" class="media" :id="id"  :style="fieldStyle" v-click-outside="closeConfig">
  <media-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf"/>
  <img :src="mediaURL" />
  
</div>

</template>
<script>
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import MediaFieldConfig from "./MediaFieldConfig.vue";

  export default {
  name: "MediaField",
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
        alive: true,
        id: uniqueId('media-field-'),
        inEdit: false,
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
        },
        screenX: 0,
        screenY: 0
      }
    },
    mounted: function() {
      let draggableWrapper = this.$refs.draggableWrapper;
      this.initInteract(draggableWrapper);
      console.log(this.fieldStyleProperties);
    },
    methods: {
      initInteract: function(selector) {
        selector.style.webkitTransform = selector.style.transform =
            "translate(" + this.x + "px, " + this.y + "px)";
        selector.style.width =
            "250px";
        selector.setAttribute('data-x', this.x)
        selector.setAttribute('data-y', this.y)
        interact(selector)
          .draggable({
            restrict: {
              restriction: "parent",
              endOnly: true,
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.onDragEnd
          })
          .resizable({
            edges: { left: false, right: true, bottom: true, top: false },
            onmove: this.dragScaleListener,
            onend: this.onDragEnd,
            modifiers: [
              interact.modifiers.restrict({ restriction: 'parent', endOnly: true }),
              interact.modifiers.restrictSize({ max: 'parent' , min: {width: 100}}),
              interact.modifiers.aspectRatio({
                ratio: 'preserve',
                modifiers: [
                  interact.modifiers.restrictSize({ max: 'parent' , min: {width: 100}}),
                ],
              }),
            ],
          })
          .dropzone({
            accept: "img",
            overlap: 1
          })
          .on('tap', this.openConfig)
      },
      dragMoveListener: function(event) {
        if (!this.inEdit) {
          var target = event.target,
            x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx,
            y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy;

          target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        }
      },
      dragScaleListener: function(event) {
        if (!this.inEdit) {
          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },
      onDragEnd: function(event) {
        var target = event.target;
        this.screenX = target.getBoundingClientRect().left;
        this.screenY = target.getBoundingClientRect().top;
      },
      openConfig: function() {
        this.inEdit = true;
      },
      closeConfig: function() {
        this.inEdit = false;
      },
      changeBackgroundColor: function(color) {
        this.backgroundColor = color;
      },
      changeTextColor: function(color) {
        this.textColor = color;
      },
      changeBorderColor: function(color) {
        this.borderColor = color;
      },
      destroySelf: function() {
        this.alive=!this.alive;
      }

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
    directives: {
      'click-outside': {
        bind: function (element, binding, vnode) {
          element.clickOutsideEvent = function (event) {
            if (!(element === event.target || element.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', element.clickOutsideEvent)
        },
        unbind: function (element) {
          document.body.removeEventListener('click', element.clickOutsideEvent)
        }
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
