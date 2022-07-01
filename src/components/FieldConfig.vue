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
            currentProperties: this. properties
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
    top: calc(10% + 5px);
    left: calc(10% + 5px);
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    background: rgba(199, 176, 194, 0.8);
    border:  1px solid #232323;
    border-radius: 5px;
  }

  .field-config > * {
    flex: 0 0 auto;
  }

  
  .edit-panel {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    top: calc(10% + 5px);
    left: calc(100% + 5px);
    width: 300px;
    height: 200px;
    background: white;
    border:  1px solid #232323;
    border-radius: 5px;

  }

  .edit-panel > * {
    flex: 1 1 100%;
  }
</style>