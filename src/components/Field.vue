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
      w: {
        type: Number,
        required: false,
        default: 100
      },
      h: {
        type: Number,
        required: false,
        default: 100
      },
      modifier: {
        type: Number,
        required: false,
        default: 1
      },
      lockedResolution: {
        type: Boolean,
        required: false,
        default: true
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
        screenWidth: 0,
        screenHeight: 0,

        initMessages: [
          "If you can't give me poetry, can't you give me poetical science?",
          "And that's how the cookie crumbles.",
          "This. This can be a text.",
          "a b c d e f g",
          "Apply adhesive here.",
          "Do you train for passing tests or do you train for creative inquiry?",
          "And so on, and so on ...",
          "Machines take me by surprise with great frequency.",
          "Codes are a puzzle. A game, just like any other game.",
          "No, I'm not interested in developing a powerful brain...",
          "How it is we have so much information, but know so little?",
          "Colorless green ideas sleep furiously."
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
            edges: { 
              left: false, 
              right: true, 
              bottom: !this.lockedResolution, 
              top: false 
            },
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
            x = (parseFloat(target.getAttribute('data-x')) || 0) ,
            y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width  / this.modifier + 'px';
          if ( !this.lockedResolution ) {
            target.style.height = event.rect.height  / this.modifier + 'px';
          }
          this.screenWidth = event.rect.width;
          this.screenHeight = event.rect.height;


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
        this.$emit('change', this.id, this.fieldStyleProperties, this.screenX, this.screenY, this.screenWidth, this.screenHeight);
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
    min-width: 100px;
    user-select: none;
    box-sizing: content-box!important;
    border: solid 2px #00000013;
  }
  
  .field:hover {
    border-right: 10px solid var(--interact-color)!important;
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