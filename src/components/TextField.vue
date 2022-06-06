<template>
<div ref="draggableWrapper" class="chord" v-click-outside="closeConfig">
  
  <div v-model="mdcontent" 
       type="text" 
       ref="textInput"
       :id="id" 
       :class="[{ bold: isBold }, { italic: isItalic }, textAlignment]" 
       value="mdcontent" 
       v-html="mdcontent">
    
  </div>
  <div v-if="inEdit" class="configView">
    <button type="button" :id="id" @click="isBold = !isBold" >
      Bold
    </button>
    <button type="button" :id="id" @click="isItalic = !isItalic" >
      Italic
    </button>
    <input type="radio" id="left" value="left" v-model="textAlignment" />
    <label for="left">Left</label>
    <input type="radio" id="center" value="centered" v-model="textAlignment" />
    <label for="center">Center</label>
    <input type="radio" id="right" value="right" v-model="textAlignment" />
    <label for="right">Right</label>
    <textarea v-model="content" 
              type="text" 
              ref="rawInput"
              :id="id" 
              :class="[{ bold: isBold }, { italic: isItalic }, textAlignment]" 
              value="content" 
              rows="10">
      {{ content }}
    </textarea>
  </div>
  
  
</div>

</template>
<script>
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';

  export default {
  name: "TextField",
    props: {
      done: { default: false, type: Boolean }
    },
    data() {
      return {
        content: "",
        mdcontent: "",
        id: uniqueId('text-field-'),
        isBold: false,
        isItalic: false,
        inEdit: false,
        textAlignment: "Left",
        screenX: 0,
        screenY: 0
      }
    },
    mounted: function() {
      let draggableWrapper = this.$refs.draggableWrapper;
      this.initInteract(draggableWrapper);
      
      let textInput = this.$refs.textInput;
      this.adjustParentSize(textInput, draggableWrapper);
    },
    methods: {
      initInteract: function(selector) {
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
            edges: { left: true, right: true, bottom: false, top: false },
            onmove: this.dragScaleListener,
            onend: this.onDragEnd
          })
          .on('tap', this.openConfig)
      },
      adjustParentSize: function(childElement, parentContainer) {
        var observer = new MutationObserver(function(mutations) {
          childElement.style.height = "auto";
          parentContainer.style.height = "auto";
          parentContainer.style.height = childElement.scrollHeight + "px";
        });

        observer.observe(childElement, {
            attributes:    true,
            childList:     true,
            characterData: true
        });
      }, 
      heightListener: function(event) {
          let textInput = this.$refs.textInput;
          let rawInput = this.$refs.rawInput;
          this.adjustParentSize(textInput, rawInput);
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
        // update the state
        this.screenX = target.getBoundingClientRect().left;
        this.screenY = target.getBoundingClientRect().top;
      },
      openConfig: function(event) {
        this.inEdit = true;
      },
      closeConfig: function(event) {
        this.inEdit = false;
        this.mdcontent = DOMPurify.sanitize(marked.parse(this.content));
      
        let draggableWrapper = this.$refs.draggableWrapper;
        let textInput = this.$refs.textInput;
        this.adjustParentSize(textInput, draggableWrapper);
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
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .chord {
    background-color: transparent;
    color: #121212;
    position: absolute;
    height: 30px;
    width: 300px;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
  }
  
  .chord > div  {
    display: block;
    flex: 1 1 100%;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: transparent;
    border: 1px solid rgba(0,0,0,.1);
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
  }
  
  .chord .configView {
    flex: 1 1 100%;
    display: flex;
    position: absolute;
    top: -30px;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
  }
  
  .chord .configView textarea {
    resize: none;
    overflow-y: auto;
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
