<template>
    <div class="field-config-radio-animations field-config-input">
        <img :src="'/assets/icons/' + property + '.png'" />
        <h3><b>{{property}}:</b> {{currentValue.split(" ")[0]}}</h3>
        <div class="options">
            <label :for="group+'-'+property+'-none'" title="None">
                <input :id="group+'-'+property+'-none'" :name="group" value="none"  type="radio" v-model="currentValue" @change="updateValue()"/>
                <div class="animation-preview">
                    <div class="dummy"></div>
                </div>
            </label>
            <label v-for="(option, index) in options" :key="index" :for="group+'-'+property+'-'+option" :title="option">
                <input :id="group+'-'+property+'-'+option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
                <div class="animation-preview" >
                    <div class="dummy" :class="option"></div>
                </div>
            </label>
        </div>
    </div>
</template>
<script>
    import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
export default {
    name: "FieldConfigRadioAnimations",
    extends: FieldBaseConfigInput
}
</script>
<style>
    .field-config-radio-animations .options {
        gap: 10px;
    }
    .field-config-radio-animations .options .animation-preview {
        width: 60px; 
        height: 60px;
        filter: saturate(.7);
        transition: .1s;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--secondary-alt-color);
    }

    .field-config-radio-animations .options .animation-preview:hover, .field-config-radio-animations .options input:checked + .animation-preview {
        filter: invert(1);
    }

    .field-config-radio-animations .options input {
        display: none;
    }

    .field-config-radio-animations .options .animation-preview .dummy {
        width: 20px;
        height: 20px;
        background: black;
    }

    .ani1 {
        animation: 5s ani1 cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
    }

    .ani2 {
        animation: 3s ani2 cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
    }

    .ani3 {
        animation: 3s ani3 cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }

    .ani4 {
        animation: 5s ani4 cubic-bezier(0.23, 1, 0.320, 1) infinite;
    }

    .ani5 {
        animation: 2s ani5 cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }

    .ani6 {
        animation: 2s ani6 cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }

    .ani7  {
        animation: 4s ani7 cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }


</style>