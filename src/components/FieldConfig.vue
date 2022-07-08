<script>
  import ColorPicker from "./ColorPicker.vue";
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
    flex: 0 0 100%;
    display: flex;
    position: absolute;
    left: 5px;
    top: 5px;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    background: rgba(199, 176, 194, 0.8);
    border:  1px solid #232323;
    border-radius: 5px;
    padding: 20px;
    font-size: 70%;
    width: 250px;
  }

  .field-config > * {
    flex: 0 0 auto;
  }
  
  .field-config textarea {
    resize: none;
    overflow-y: auto;
    flex: 1 1 100%;
    margin: 10px;
    border:  none;
  }

</style>