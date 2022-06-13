<template>
    <div class="colorPicker">
        <input 
            v-model="color"
            :id="id"
            type="color"
            class="input"
            :style="colorPickerStyles"
            @input="passColor"/>
        <label for="colorPickerInput"></label>
    </div>
</template>

<script>
  import uniqueId from 'lodash.uniqueid';
export default {
    name: "ColorPicker",
    data() {
      return {
        id: uniqueId('color-picker-'),
        color: "#ffffff",
      }
    },
    methods: {
        passColor (event) {
          var target = event.target;
          this.color = target.value;
          this.$emit('change-color', target.value);
        }
    },
    computed: {
        colorPickerStyles () {
          var color = this.color;
          return {
            '--color-picker-background-color': color
          }
        }
    }
  };
</script>

<style>
.colorPicker {
  display:relative;
    background: white;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
}

.colorPicker input[type="color"] {
  all: unset;
  display: block;
  width: 30px;
  height: 30px;
  background-color: var(--color-picker-background-color);
  cursor: cell;
  
}
</style>