<script>
  import FieldBaseConfigColor from "./FieldBaseConfigColor.vue";
  import FieldBaseConfigSlider from './FieldBaseConfigSlider.vue'
  import FieldBaseConfigRadio from './FieldBaseConfigRadio.vue'
  import FieldBaseConfigRadioImages from './FieldBaseConfigRadioImages.vue'
  import FieldBaseConfigRadioFonts from './FieldBaseConfigRadioFonts.vue'
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
                } else {
                    this.$set(this.currentProperties.text, value.property, value.val);
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
        FieldBaseConfigRadioFonts
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
      top: -50px;
      flex-flow: row wrap;
      background: var(--gui-color);
      border-radius: 5px;
      font-size: 80%;
      width: 300px;
      height: 40px;
      opacity: .95;
      transition: .1s;
      z-index: 10000;
    
  }

  .edit-panel {
    flex: 0 0 100%;
    border-top: 5px solid var(--interact-color);
  }

  
  .field-config.activated {
    transform: translateY(-100px);
    border-radius: 5px 5px 0 0;
  }


  .property-config {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  .property-config label{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 30px;
    height: 30px;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    padding: 2.5px;
    border-radius: 5px;
    font-size: 70%;
    user-select: none;
    transition: .1s;
    z-index: 200;
  }

  .property-config label:hover{
    background-color: var(--primary-color);
    color: var(--secondary-color);
    transform: translate(3px, 3px);
    box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
  }

  .property-config input:checked ~ label {
    
    background-color: var(--primary-color);
    color: var(--secondary-color);
    transform: translate(0,0);
    box-shadow: none;
  }

  .property-config label img {
    width: 100%;
    height: 100%;
  }
  .property-config label:hover img, .property-config input:checked ~ label img {
    filter: invert(1);
  }
  .property-config input {
    display: none;
  }

  .property-config label span {
        display: block;
        position: absolute;
        left: 80%;
        bottom: 10%;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        padding: 2.5px;
        border-radius: 5px;
        opacity: 0;
        user-select: none;
        transition: .05s;
    }

    .property-config label:hover span, .property-config label.active span {
        opacity: 1
    }
</style>