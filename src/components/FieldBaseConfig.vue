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
      left: -60px;
      top: 0;
      justify-content: center;
      align-items: center;
      gap: 5px;
      flex-flow: row wrap;
      background: var(--secondary-color);
      border:  1px solid var(--primary-color);
      border-radius: 5px;
      color: var(--primary-color);
      padding: 20px;
      font-size: 80%;
      width: 50px;
      height: 250px;
      opacity: .95;
      transform: translateX(var(--adjustment-offset));
      transition: .1s;
    
  }

  .field-config > * {
    flex: 1 1 100%;
  }

  
  .field-config.activated {
    transform: translateX(-100px);
  }


  .edit-panel {
    display: flex;
    position: absolute;
    left: 55px;
    flex-flow: row wrap;
    width: 50px;
    align-items: center;
    justify-content: center;
    gap: 5px;
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
    width: 50px;
    height: 50px;
    color: var(--primary-color);
    padding: 2.5px;
    border-radius: 5px;
    font-size: 70%;
    user-select: none;
    transition: .1s;
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

  .property-config input {
    display: none;
  }
</style>