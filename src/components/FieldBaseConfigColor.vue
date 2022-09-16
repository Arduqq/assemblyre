<template>
  <div class="field-config-color field-config-input">
      <img :src="'/assets/icons/' + property + '.png'" /><h3><b>{{property}}:</b> <div class="color-preview" :style="'background-color:' + currentValue"></div></h3>
      <div class="options">
          <div class="option"  v-for="(option, index) in options" :style="'background-color:' + option" :key="index" :title="option">
              <input :id="option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
              <label :for="option"></label>
          </div>
      </div>
  </div>
</template>

<script>
  import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
  export default {
    name: "FieldConfigColor",
    extends: FieldBaseConfigInput
  };
</script>

<style scoped>


    .field-config-color .options .option {
        flex: 0 0 10%;
    }

    .field-config-color .options label {  
        padding: 10px;
        transition: .1s;
        flex: 0 0 30%;
        display: flex;
        border: 1px solid white;
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 20px;
        mix-blend-mode: difference;
    }

    .field-config-color .options .option input:checked + label {
        transform: scale(1.1);
    }


    .field-config-color .options input {
        display: none;
    }

    .color-preview {
      width: 50px;
      display: inline-block;
      height: 10px;
      border-radius: 25px;
    }

    
</style>