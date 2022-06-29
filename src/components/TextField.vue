<template>
<div v-if="alive" ref="draggableWrapper" class="chord" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <div type="text" 
          ref="textInput"
          class="rendered-view"
          :class="[textAlignment]" 
          value="mdcontent" 
          v-html="mdcontent">
        
      </div>
      <div class="config-view" v-show="inEdit">
        <input type="radio" id="edit-background-toggle" value="background" v-model="inEditProperty" />
        <label for="edit-background-toggle">BG</label>
        <input type="radio" id="edit-text-toggle" value="text" v-model="inEditProperty" />
        <label for="edit-background-toggle">Text</label>
        <input type="radio" id="edit-border-toggle" value="border" v-model="inEditProperty" />
        <label for="edit-background-toggle">Border</label>
        <div class="edit-panel" v-show="inEditProperty === 'background'" v-click-outside="closePanel">
          <color-picker v-model="backgroundColor" @change-color = "changeBackgroundColor"></color-picker>
        </div>
        <div class="edit-panel" v-show="inEditProperty === 'text'" v-click-outside="closePanel">
          <color-picker v-model="textColor" @change-color = "changeTextColor"></color-picker>
          <input type="radio" id="left" value="left" v-model="textAlignment" />
          <label for="left">Left</label>
          <input type="radio" id="center" value="centered" v-model="textAlignment" />
          <label for="center">Center</label>
          <input type="radio" id="right" value="right" v-model="textAlignment" />
          <label for="right">Right</label>
        </div>
        <div class="edit-panel" v-show="inEditProperty === 'border'" v-click-outside="closePanel">
          <color-picker v-model="borderColor" @change-color = "changeBorderColor"></color-picker>
        </div>
        
        <input type="button" id="delete-button" @click="destroySelf" value="Delete"/>

        <textarea v-model="content" 
                  type="text" 
                  ref="rawInput"
                  :class="[textAlignment]" 
                  value="content" 
                  rows="10">
        </textarea>
      </div>
  </main>
  
  <aside class="quick-config-view">
      <input type="button" value="Up" id="stack-up-button" @click="stackUp" />
      <input type="button" value="Down" id="stack-down-button" @click="stackDown" />

  </aside>
  
  
</div>

</template>
<script>
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import sample from 'lodash.sample';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  import ColorPicker from "./ColorPicker.vue";

  export default {
  name: "TextField",
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
      }
    },
    data() {
      return {
        alive: true,
        content: "",
        mdcontent: "",
        id: uniqueId('text-field-'),
        inEdit: false,
        inEditProperty: null,
        textAlignment: "Left",
        backgroundColor: "#ffffff",
        textColor: "#121212",
        borderColor: "#121212",
        stackOrder: 0,
        screenX: 0,
        screenY: 0,
        initMessages: [
          "If you can't give me poetry, can't you give me poetical science?",
          "I will put up a show!",
          "This. This can be a text.",
          "You can drag me around, even!",
          "Let's go on an adventure.",
          "Break freeeeeeee!"
        ]
      }
    },
    mounted: function() {
      let draggableWrapper = this.$refs.draggableWrapper;
      this.initInteract(draggableWrapper);
      this.content = sample(this.initMessages);
      let textInput = this.$refs.textInput;
      this.adjustParentSize(textInput, draggableWrapper);
    },
    methods: {
      initInteract: function(selector) {
        selector.style.webkitTransform = selector.style.transform =
            "translate(" + this.x + "px, " + this.y + "px)";
        selector.setAttribute('data-x', this.x)
        selector.setAttribute('data-y', this.y)
        interact(selector)
          .pointerEvents({
            ignoreFrom: 'aside',
          })
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
            edges: { left: true, right: true, bottom: false, top: false },
            onmove: this.dragScaleListener,
            onend: this.onDragEnd
          })
          .on('tap', this.openConfig)
      },
      adjustParentSize: function(childElement, parentContainer) {
        var observer = new MutationObserver(function() {
          childElement.style.height = "auto";
          parentContainer.style.height = "auto";
          parentContainer.style.height = childElement.scrollHeight + "px";
          parentContainer.style.height = "auto";
        });

        observer.observe(childElement, {
            attributes:    true,
            childList:     true,
            characterData: true
        });
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
        this.mdcontent = DOMPurify.sanitize(marked.parse(this.content));
      
        let draggableWrapper = this.$refs.draggableWrapper;
        let textInput = this.$refs.textInput;
        this.adjustParentSize(textInput, draggableWrapper);
        
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
      },
      stackUp: function() {
        this.stackOrder ++;
      },
      stackDown: function() {
        if (this.stackOrder != 0) {
          this.stackOrder --;
        }
      }

    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        return {
          '--chord-bg-color': this.backgroundColor,
          '--chord-text-color': this.textColor,
          '--chord-border-color': this.borderColor,
          '--chord-stack-order': stacking
        }
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
  
  .chord {
    background-color: var(--chord-bg-color);
    color: var(--chord-text-color);
    border: 2px solid var(--chord-border-color);
    z-index: var(--chord-stack-order);
    position: absolute;
    height: auto;
    width: 300px;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
  }
  
  .chord .rendered-view {
    display: block;
    flex: 1 1 100%;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: transparent;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }
  
  .chord .config-view {
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

  .chord .config-view > * {
    flex: 0 0 auto;
  }
  
  .chord .config-view textarea {
    resize: none;
    overflow-y: auto;
    flex: 1 1 100%;
    margin: 10px;
    border:  none;
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
