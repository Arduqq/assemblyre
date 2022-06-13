<template>
<div v-if="alive" ref="draggableWrapper" class="plug" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
    
  
  <div class="config-view" v-show="inEdit">
    
    <input type="radio" id="edit-background-toggle" value="border" v-model="inEditProperty" />
    <label for="edit-background-toggle">Border</label>
    <div class="edit-panel" v-show="inEditProperty === 'border'" v-click-outside="closePanel">
      <color-picker v-model="borderColor" @change-color = "changeBorderColor"></color-picker>
    </div>
    
    <input type="button" id="delete-button" @click="destroySelf" value="Delete"/>
  </div>
  <img :src="mediaURL" />
  
</div>

</template>
<script>
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import ColorPicker from "./ColorPicker.vue";

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
        inEditProperty: null,
        textAlignment: "Left",
        borderColor: "#121212",
        screenX: 0,
        screenY: 0
      }
    },
    mounted: function() {
      let draggableWrapper = this.$refs.draggableWrapper;
      this.initInteract(draggableWrapper);
      console.log(this.media)
    },
    methods: {
      initInteract: function(selector) {
        selector.style.webkitTransform = selector.style.transform =
            "translate(" + this.x + "px, " + this.y + "px)";
        selector.setAttribute('data-x', this.x)
        selector.setAttribute('data-y', this.y)
        interact(selector)
          .draggable({
            inertia: false,
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
            edges: { left: true, right: true, bottom: true, top: true },
            onmove: this.dragScaleListener,
            onend: this.onDragEnd,
            modifiers: [
              interact.modifiers.aspectRatio({
                ratio: 'preserve',
                modifiers: [
                  interact.modifiers.restrictSize({ max: 'parent' }),
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

          // update the posiion attributes
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
        console.log(target);
        this.screenX = target.getBoundingClientRect().left;
        this.screenY = target.getBoundingClientRect().top;
      },
      openConfig: function() {
        this.inEdit = true;
      },
      closeConfig: function() {
        this.inEdit = false;
        
      },
      closePanel: function() {
        this.inEditProperty = null;
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
          '--plug-bg-color': this.backgroundColor,
          '--plug-text-color': this.textColor,
          '--plug-border-color': this.borderColor
        }
      },
      mediaURL () {
        if (!this.media) {
          return
        }
        const fileName = this.media;
        return require ('@/assets/' + fileName + '')
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
      ColorPicker
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .plug {
    background-color: var(--plug-bg-color);
    color: var(--plug-text-color);
    border: 2px solid var(--plug-border-color);
    position: absolute;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
    max-height: 100%; 
    max-width: 100%
  }
  
  .plug .config-view {
    flex: 1 1 100%;
    display: flex;
    position: absolute;
    top: calc(10% + 5px);
    left: calc(10% + 5px);
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    background: rgba(199, 176, 194, 0.8);
    border:  1px solid #232323;
    border-radius: 5px;
  }

  .plug .config-view > * {
    flex: 0 0 auto;
  }
  
  .plug .config-view textarea {
    resize: none;
    overflow-y: auto;
    flex: 1 1 100%;
    margin: 10px;
    border:  none;
  }

  .plug img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .edit-panel {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    top: calc(10% + 5px);
    left: calc(100% + 5px);
    width: 300px;
    height: 200px;
    background: white;
    border:  1px solid #232323;
    border-radius: 5px;

  }

  .edit-panel > * {
    flex: 1 1 100%;
  }
  
  .bold {
    font-weight: 800;
  }
  
  .italic {
    font-style: italic;
  }
  
  .centered {
    text-align: center;
  }
  
  .left {
    text-align: left;
  }
  
  .right {
    text-align: right;
  }
  
</style>
