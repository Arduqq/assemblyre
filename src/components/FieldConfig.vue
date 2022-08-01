<script>
  import ColorPicker from "./ColorPicker.vue";
  import uniqueId from 'lodash.uniqueid';
    export default {
        name: "FieldConfig",
        props: {
            properties: {
                type: Object,
                required: true
            }
        },
        methods: {
            resetActiveProperty: function() {
                this.inEditProperty = null;
            },
        },
        data() {
          return {
            id: uniqueId('field-config-'),
            inEditProperty: null,
            currentProperties: this.properties
          }
        },
        components: {
        ColorPicker
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
    left: 5px;
    top: 5px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-flow: row wrap;
    background: var(--secondary-color);
    border:  1px solid var(--primary-color);
    border-radius: 5px;
    padding: 20px;
    font-size: 80%;
    width: 250px;
    opacity: .95;
    backdrop-filter: blur(20px);
  }

  .field-config > * {
    flex: 1 1 auto;
  }
  
  .field-config textarea {
    resize: none;
    overflow-y: auto;
    flex: 1 1 100%;
    margin: 10px;
    border:  none;
    white-space: pre-wrap;
  }

  .edit-panel {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
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

  .property-config label {
    display: block;
    width: 100%;
    padding: 5px;
    border-top: 5px solid var(--secondary-color);
    text-align: center;
    font-size: 80%;
    transition: .1s;
  }

  .property-config label:hover {
    border-top: 5px solid var(--interact-color);
  }

  .property-config input:checked ~ label {
    border-top: 5px solid var(--primary-alt-color);
    background: var(--primary-alt-color);
  }

  .property-config input {
    display: none;
  }
</style>