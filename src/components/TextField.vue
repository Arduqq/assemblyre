<template>
<div v-if="alive" ref="draggableWrapper" class="prose" :id="id"  v-click-outside="closeConfig" :style="fieldStyle">
  <main>
    <text-field-config  v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf"/>
    <div type="text" 
          ref="textInput"
          class="rendered-view"
          :class="[fieldStyleProperties.text.textAlignment]" 
          :value="fieldStyleProperties.text.mdcontent" 
          v-html="fieldStyleProperties.text.mdcontent">
        
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
  import TextFieldConfig from "./TextFieldConfig.vue";

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
        id: uniqueId('text-field-'),
        inEdit: false,
        inEditProperty: null,
        stackOrder: 0,
        screenX: 0,
        screenY: 0,
        
        /* Initial Style Values */
        fieldStyleProperties: {
          text: {
            textAlignment: "Left",
            backgroundColor: "#ffffff",
            textColor: "#121212",
            content: "hello",
            mdcontent: "hello",
          },
          border: {
            borderColor: "#121212",
            borderRadius: "0%;",
            borderStyle: "solid",
            borderSize: "2px"
          }
        },
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
      this.fieldStyleProperties.text.content = sample(this.initMessages);
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
        this.screenX = target.getBoundingClientRect().left;
        this.screenY = target.getBoundingClientRect().top;
      },
      openConfig: function() {
        this.inEdit = true;
      },
      closeConfig: function() {
        this.inEdit = false;
        this.fieldStyleProperties.text.mdcontent = DOMPurify.sanitize(marked.parse(this.fieldStyleProperties.text.content));
        
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
          '--prose-bg-color': this.fieldStyleProperties.text.backgroundColor,
          '--prose-text-color': this.fieldStyleProperties.text.textColor,
          '--prose-text-size': this.fieldStyleProperties.text.textSize + "%",
          '--prose-border-color': this.fieldStyleProperties.border.borderColor,
          '--prose-border-style': this.fieldStyleProperties.border.borderStyle,
          '--prose-border-size': this.fieldStyleProperties.border.borderSize + "px",
          '--prose-border-radius': this.fieldStyleProperties.border.borderRadius + "%",
          '--prose-text-alignment': this.fieldStyleProperties.text.textAlignment,
          '--prose-stack-order': stacking
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
      TextFieldConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .prose {
    z-index: var(--prose-stack-order);
    position: absolute;
    height: auto;
    min-width: 300px;
    user-select: none;
    
  }
  
  .prose:hover {
    opacity: .7;
  }

  .prose main {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .prose main .rendered-view {
    display: block;
    flex: 1 1 100%;
    width: 100%;
    min-height: 30px;
    background-color: var(--prose-bg-color);
    color: var(--prose-text-color);
    border-color: var(--prose-border-color);
    border-width: var(--prose-border-size);
    border-style: var(--prose-border-style);
    border-radius: var(--prose-border-radius);
    font-size: var(--prose-text-size);
    color: var(--prose-text-color);
    text-align: var(--prose-text-alignment);
    line-height: 30px;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
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
  
  
</style>
