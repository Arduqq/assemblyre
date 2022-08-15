<script>
  import interact from "interactjs";

  export default {
  name: "PlainField",
    props: {
      id: {
        type: String,
        required: true
      },
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
      modifier: {
        type: Number,
        required: false,
        default: 1
      }
    },
    data() {
      return {
        alive: true,
        inEdit: false,
        inEditProperty: null,
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
    },
    methods: {
      initInteract: function(selector) {
        selector.style.webkitTransform = selector.style.transform =
            "translate(" + this.x + "px, " + this.y + "px)";
        selector.setAttribute('data-x', this.x)
        selector.setAttribute('data-y', this.y)
        interact(selector)
          .pointerEvents({
            ignoreFrom: 'aside, .code-block',
          })
          .draggable({
            inertia: false,
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: 'parent'
              })
            ],
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.onDragEnd
          })
          .resizable({
            edges: { left: true, right: true, bottom: false, top: false },
            
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: 'parent'
              })
            ],
            onmove: this.dragScaleListener,
            onend: this.onDragEnd
          })
          .on('tap', this.openConfig)
      },
      dragMoveListener: function(event) {
        if (!this.inEdit) {
          var target = event.target,
            x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx / this.modifier,
            y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy / this.modifier;

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
          target.style.width = event.rect.width + 'px';
          this.width = event.rect.width;

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
        this.screenX = (parseFloat(target.getAttribute('data-x')) || 0);
        this.screenY = (parseFloat(target.getAttribute('data-y')) || 0);
        this.emitChange();
      },
      openConfig: function() {
        this.inEdit = true;
      },
      closeConfig: function() {
        this.inEdit = false;
        
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
      },
      emitChange: function() {
        this.$emit('change', this.id, this.fieldStyleProperties, this.screenX, this.screenY, this.width);
      },

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

<style>

  aside {
    opacity: 0;
    position: absolute;
    top: 5px;
    right: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: .1s;
  }

  aside > * {
    all: unset;
    flex: 1 1 100%;
    width: 100%;
    font-size: 60%;
    text-align: center;
    padding: 5px;
    border: 1px solid var(--primary-color);
    background: white;
    border-radius: 0px 25px 25px 0px;
    cursor: pointer;
    transition: .1s;
  }

  
  .field {
    z-index: var(--field-stack-order);
    position: absolute;
    height: auto;
    min-width: 50px;
    user-select: none;
    box-sizing: content-box!important;
  }
  
  .field:hover {
    border-right: 5px solid var(--interact-color);
  }
  .field:hover aside {
    opacity: 1;
    transform: translateX(5px);
  }

  aside > *:hover {
    background: var(--secondary-color);
  }

  aside > *:active {
    background: var(--interact-color);
  }

</style>