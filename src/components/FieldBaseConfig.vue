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
                } else if (this.inEditProperty === 'geometry') {
                    this.$set(this.currentProperties.geometry, value.property, value.val);
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
            currentProperties: this.properties
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
      top: -70px;
      left: 0;
      flex-flow: row wrap;
      border-radius: 25px;
      width: 600px;
      height: 60px;
      opacity: .95;
      transition: .1s;
      z-index: 10000;
      font-size: 60%;
      font-family: var(--text-font);
    
  }

  .field-config input {
    background: var(--secondary-alt-color);

  }

  .edit-panel {
    flex: 0 0 50%;
    z-index: 2000;
    max-height: 250px;
    overflow-y: auto;
    scrollbar-width: auto;
    height: auto;
  }


  .quick-access {
    position: absolute;
    bottom: 100%;
    right: 0;
  }
  .property-config {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row wrap;
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