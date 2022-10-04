<script>
  import interact from "interactjs";

  export default {
  name: "FieldBase",
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
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
      },
      styling: {
        type: String,
        required: false,
        default: "default"
      },
      stackOrder: {
        type: Number,
        required: false,
        default: 0
      },
      active: {
        type: Boolean,
        required: false,
        default: false
      },
      edit: {
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
        ],
        fieldStyleProperties: {}
      }
    },
    created: function() {
      this.fieldStyleProperties = this.styleMap[this.styling];
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
            ignoreFrom: '.field-config, input',
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
            ignoreFrom: '.field-config',
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
        if (!this.inEdit && this.edit) {
          var target = event.target,
            x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx / this.modifier,
            y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy / this.modifier;

          target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";
          
          this.screenWidth = event.rect.width;
          this.screenHeight = event.rect.height;

          // update the posiion attributes
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        }
      },
      dragScaleListener: function(event) {
        if (!this.inEdit && this.edit) {
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
        if (!this.inEdit && this.edit) {
          var target = event.target;
          this.screenX = (parseFloat(target.getAttribute('data-x')) || 0);
          this.screenY = (parseFloat(target.getAttribute('data-y')) || 0);
          this.emitChange();
        }
      },
      openConfig: function() {
        if (!this.inEdit && this.edit) {
          this.inEdit = true;
        }
        
      },
      closeConfig: function() {
        if (this.inEdit && this.edit) {
          this.inEdit = false;
        }
        
      },
      destroySelf: function() {
        this.alive=!this.alive;
        this.emitChange();
      },
      emitChange: function() {
        this.$emit('change', this.id, this.fieldStyleProperties, this.alive, this.screenX, this.screenY, this.screenWidth, this.screenHeight);
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

  .field.edit *:not(.animation-preview .dummy), .field.edit {
    animation: none!important;
  }

  .field:not(.edit) {
    opacity: 0;
  }

  .field {
    z-index: var(--field-stack-order);
    position: absolute;
    height: auto;
    min-width: 100px;
    user-select: none;
    border: solid 2px #00000013;
    animation: appear 10s var(--field-animation-entry) cubic-bezier(0.86, 0, 0.07, 1) 1 normal forwards;
  }

  .field main {
    all: unset;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
  
  .field.edit:hover, .field.edit.active {
    box-shadow: 0 0 2px 2px var(--interact-color); 
  }

  .field main > .field-config {
    animation: none;
  }

 
  @keyframes appear {
    0% { opacity: 0; transform: rotate(90deg) translate(var(--field-x), var(--field-y))}
    5% {opacity: 1; transform: rotate(-5deg) translate(var(--field-x), var(--field-y))}
    10% {opacity: 1; transform: rotate(0deg) translate(var(--field-x), var(--field-y))}
    100% {opacity: 1; transform: rotate(0deg)  translate(var(--field-x), var(--field-y))}
  }


</style>