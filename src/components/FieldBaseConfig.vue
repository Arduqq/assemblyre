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
            backgroundImages: ["asphalt", "bricks-1", "bricks-2", "bricks-3", "bricks-4", "building-1", "building-2", "building-3", "building-4", "building-5", "building-6", "building-7", "building-8", "building-9", "circuit", "clover", "door-1", "door-2", "dots-1", "dots-2", "flame-1", "flame-2", "flowers-1", "flowers-2", "giraffe", "leather", "machine", "pasta", "pattern-1", "pattern-10", "pattern-11", "pattern-12", "pattern-13", "pattern-14", "pattern-15", "pattern-16", "pattern-17", "pattern-18", "pattern-19", "pattern-2", "pattern-20", "pattern-21", "pattern-22", "pattern-23", "pattern-24", "pattern-25", "pattern-26", "pattern-27", "pattern-28", "pattern-29", "pattern-3", "pattern-30", "pattern-31", "pattern-32", "pattern-33", "pattern-34", "pattern-35", "pattern-36", "pattern-37", "pattern-4", "pattern-5", "pattern-6", "pattern-7", "pattern-8", "pattern-9", "plants", "plate", "rock-1", "rock-2", "rock-3", "rock-4", "shell", "siberian", "sponge", "stars", "tiger", "water", "windows-1", "windows-2", "wool-1", "wool-2"]
          }
        },
        computed: {
          dynamicPosition() {
            var position = {
              top: !this.onTop ? '-70px' : '100%',
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
    flex: 0 0 60%;
    z-index: 2000;
    max-height: max(250px, 100%);
    overflow-y: auto;
    scrollbar-width: auto;
    height: auto;
    transition: .1s;
    opacity: .2;
    font-size: 150%;
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