<script>
  import FieldBaseConfigColor from "./FieldBaseConfigColor.vue";
  import FieldBaseConfigSlider from './FieldBaseConfigSlider.vue'
  import FieldBaseConfigRadio from './FieldBaseConfigRadio.vue'
  import FieldBaseConfigRadioImages from './FieldBaseConfigRadioImages.vue'
  import FieldBaseConfigRadioFonts from './FieldBaseConfigRadioFonts.vue'
  import FieldBaseConfigRadioAnimations from './FieldBaseConfigRadioAnimations.vue'
    export default {
        name: "FieldConfig",
        props: {
            properties: {
                type: Object,
                required: true
            },
            fid: {
              type: String,
              required: true,
            },
            onTop: {
              type: Boolean,
              required: false,
              default: true
            }
        },
        methods: {
            resetActiveProperty: function() {
                this.inEditProperty = null;
            },
            updateStyle(value) {
                if (this.inEditProperty === 'border') {
                    this.$set(this.currentProperties.border, value.property, value.val);
                } else if (this.inEditProperty === 'shadow') {
                    this.$set(this.currentProperties.shadow, value.property, value.val);
                } else if  (this.inEditProperty === 'background') {
                    this.$set(this.currentProperties.background, value.property, value.val);
                } else if (this.inEditProperty === 'image') {
                    this.$set(this.currentProperties.image, value.property, value.val);
                } else if (this.inEditProperty === 'text') {
                    this.$set(this.currentProperties.text, value.property, value.val);
                } else if (this.inEditProperty === 'shape') {
                    this.$set(this.currentProperties.shape, value.property, value.val);
                } else if (this.inEditProperty === 'highlight') {
                    this.$set(this.currentProperties.highlight, value.property, value.val);
                } else if (this.inEditProperty === 'animation') {
                    this.$set(this.currentProperties.animation, value.property, value.val);
                }
                this.$emit('input', this.currentProperties )
            },
            initDelete() {
                this.$emit('delete-initiated', this)
            }
        },
        data() {
          return {
            id: this.fid +'-config-',
            inEditProperty: null,
            currentProperties: this.properties,
            backgroundImages: [ "ASPHALT", "BRICKS-1", "BRICKS-2", "BRICKS-3", "BRICKS-4", "BUILDING-1", "BUILDING-2", "BUILDING-3", "BUILDING-4", "BUILDING-5", "BUILDING-6", "BUILDING-7", "BUILDING-8", "BUILDING-9", "CIRCUIT", "CLOVER", "DOOR-1", "DOOR-2", "DOTS-1", "DOTS-2", "FLAME-1", "FLAME-2", "FLOWERS-1", "FLOWERS-2", "GIRAFFE", "LEATHER", "MACHINE", "PASTA", "PATTERN-1", "PATTERN-10", "PATTERN-11", "PATTERN-12", "PATTERN-13", "PATTERN-14", "PATTERN-15", "PATTERN-16", "PATTERN-17", "PATTERN-18", "PATTERN-19", "PATTERN-2", "PATTERN-20", "PATTERN-21", "PATTERN-22", "PATTERN-23", "PATTERN-24", "PATTERN-25", "PATTERN-26", "PATTERN-27", "PATTERN-28", "PATTERN-29", "PATTERN-3", "PATTERN-30", "PATTERN-31", "PATTERN-32", "PATTERN-33", "PATTERN-34", "PATTERN-35", "PATTERN-36", "PATTERN-37", "PATTERN-4", "PATTERN-5", "PATTERN-6", "PATTERN-7", "PATTERN-8", "PATTERN-9", "PLANTS", "PLATE", "ROCK-1", "ROCK-2", "ROCK-3", "ROCK-4", "SHELL", "SIBERIAN", "SPONGE", "STARS", "TIGER", "WATER", "WINDOWS-1", "WINDOWS-2", "WOOL-1", "WOOL-2"]
          }
        },
        computed: {
          dynamicPosition() {
            var position = {
              top: !this.onTop ? '0px' : '100%',
            };
            var flex = {
              wrap: !this.onTop ? 'wrap' : 'wrap-reverse',
            };
            var style = {
              '--top-distance': position.top,
              '--bottom-distance': position.bottom,
              '--flex-wrap': flex.wrap
            };
            return style;
          }
        },
        components: {
        FieldBaseConfigColor, 
        FieldBaseConfigSlider, 
        FieldBaseConfigRadio,
        FieldBaseConfigRadioImages,
        FieldBaseConfigRadioFonts,
        FieldBaseConfigRadioAnimations
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
    }
</script>
<style scoped>
  
    .field-config {
      display: flex;
      position: absolute;
      top: var(--top-distance);
      left: 0;
      flex-direction: row;
      flex-wrap: var(--flex-wrap);
      border-radius: 25px;
      width: 600px;
      height: 60px;
      opacity: .95;
      transition: .1s;
      z-index: 10000;
      font-size: 60%;
      font-family: var(--text-font);
      opacity: .7;
    
  }

  .field-config input {
    background: var(--secondary-alt-color);

  }

  .edit-panel {
    flex: 0 0 50%;
    z-index: 2000;
    max-height: max(250px, 100%);
    overflow-y: auto;
    scrollbar-width: auto;
    height: auto;
    transition: .1s;
    opacity: .2;
  }

  .field-config:hover .edit-panel, .field-config:hover {
    opacity: 1;
  }

  .quick-access {
    position: absolute;
    bottom: 100%;
    right: 0;
  }
  .property-config {
    display: flex;
    flex: 1 1 auto;  
    flex-direction: row;
    flex-wrap: var(--flex-wrap);
    justify-content: center;
    align-items: center;
  }

  .property-config label {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    color: var(--primary-color);
    background: var(--secondary-color);
    padding: 10px;
    user-select: none;
    transition: .1s;
    gap: 10px;
    z-index: 200;
  }

  .property-config label img {
    width: 30px;
    height: 30px;
  }

  .property-config label:hover{
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  .property-config input:checked ~ label {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  .property-config label:hover img, .property-config input:checked ~ label img {
    filter: invert(1);
  }
  .property-config input {
    display: none;
  }

  .property-config label span {
        display: block;

        border-radius: 5px;
        user-select: none;
        transition: .05s;
    }

</style>