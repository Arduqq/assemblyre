<template>
    <div class="field-config-radio-fonts field-config-input">
        <img :src="'/assets/icons/' + property + '.png'" />
        <h3><b>{{property}}:</b> {{currentValue}}</h3>
        <div class="options">
            <div class="option"  v-for="(option, index) in options" :key="index" :title="option">
                <input :id="group+'-'+property+'-'+option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
                <label :for="group+'-'+property+'-'+option" :style="'font-family: ' + option">
                    <span>{{option}}</span><span>QqRrUuEe</span>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
export default {
    name: "FieldConfigRadioFonts",
    extends: FieldBaseConfigInput
}
</script>
<style>

    .field-config-radio-fonts .options .option {
        flex: 0 0 100%;
    }

    .field-config-radio-fonts .options label {  
        padding: 10px;
        transition: .1s;
        background: white;
        color: black;
        flex: 0 0 30%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 20px;
    }

    .field-config-radio-fonts .options .option input:checked + label {
        filter: invert(1);
    }


    .field-config-radio-fonts .options input {
        display: none;
    }

    
</style>