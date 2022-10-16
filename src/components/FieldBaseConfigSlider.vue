<template>
    <div class="field-config-slider field-config-input">
        <img :src="'/assets/icons/' + property + '.png'" />
        <h3><b>{{property}}:</b> {{currentValue}}</h3>
        <div class="slider">
            {{min}}<input type="range" :id="group+'-'+property" :min="min" :max="max" :step="step" v-model.number="currentValue" @input="updateValue()"/>{{max}}
        </div><input type="number" :step="step" :min="min" :max="max" v-model.number="currentValue"  @input="updateValue()"/>
            
    </div>
</template>
<script>
    import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
export default {
    name: "FieldConfigSlider",
    extends: FieldBaseConfigInput,
    props: {
        min: Number,
        max: Number,
        step: Number,
        val: Number
    },
}
</script>

<style scoped>

    .field-config-slider .slider {
        flex: 0 0 70%;
        height: 30px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border-radius: 5px;
        padding: 5px;
        border: 1px solid var(--secondary-color);
        display: flex;
    }


    .field-config-slider .slider input[type="ranged"] {
        all: unset;
        background-color: var(--primary-alt-color);
        width: 100%;
    }

    .field-config-slider input[type="number"] {
        all: unset;
        flex: 0 0 15%;
        background-color: var(--secondary-alt-color);
        cursor:text;
        width: 100%;
        border-radius: 0 5px 5px 0;
        padding: 5px;
    }


    </style>