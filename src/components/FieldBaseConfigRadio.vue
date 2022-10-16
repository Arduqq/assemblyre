<template>
    <div class="field-config-radio field-config-input">
        <img :src="'/assets/icons/' + property + '.png'" />
        <h3><b>{{property}}:</b> {{currentValue}}</h3>
        <div class="options">
            <div class="option"  v-for="(option, index) in options" :key="index" :title="option">
                <input :id="group+'-'+property+'-'+option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
                <label :for="group+'-'+property+'-'+option">{{option}}</label>
            </div>
        </div>
    </div>
</template>
<script>
import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
export default {
    name: "FieldConfigRadio",
    extends: FieldBaseConfigInput
}
</script>
<style scoped>
.field-config-radio .options {
    flex-flow: row nowrap;
    gap: 5px;
    overflow: hidden;
}

.field-config-radio .options .option {
    flex: 0 0 50px;
}

.field-config-radio .options .option label {
    text-align: center;
    padding: 5px;
    width: 100%;
    background: white;
    color: black;
    transition: .1s;
    display: block;
}

.field-config-radio .options .option:first-child label {
    border-radius: 25px 0 0 25px;
}

.field-config-radio .options .option:last-child label {
    border-radius: 0 25px 25px 0;
}

.field-config-radio .options .option:hover label {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    transform: translate(3px, 3px);
    box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
}
.field-config-radio .options input:checked + label {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    transform: translate(0,0);
    box-shadow: none;
  }

.field-config-radio .options input {
    display: none;
}


</style>