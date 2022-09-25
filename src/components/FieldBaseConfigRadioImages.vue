<template>
    <div class="field-config-radio-images field-config-input">
        <img :src="'/assets/icons/' + property + '.png'" />
        <h3><b>{{property}}:</b> {{currentValue}}</h3>
        <div class="options">
            <label for="none" title="None">
                <img >
                <input :id="group+'-'+property+'-none'" :name="group" value="none"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </label>
            <label v-for="(option, index) in options" :key="index" :for="group+'-'+property+'-'+option" :title="option">
                <img :src="'/assets/' + option + '.jpg'">
                <input :id="group+'-'+property+'-'+option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </label>
        </div>
    </div>
</template>
<script>
    import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
export default {
    name: "FieldConfigRadioImages",
    extends: FieldBaseConfigInput
}
</script>
<style>
    

    .field-config-radio-images > img{
        height: 100%;
        width: 100%;
    }

    .field-config-radio-images:hover> img, .field-config-radio-fonts.active > img{
        filter: invert(1);
    }

    .field-config-radio-images .options img , .field-config-radio-images .options div {
        width: 50px; 
        height: 50px;
        filter: saturate(.7);
        transition: .1s;
        border: 1px solid var(--secondary-alt-color);
    }

    .field-config-radio-images .options img:hover, .field-config-radio-images .options input:checked ~ img {
        filter: saturate(1);
        border-color: var(--secondary-color);
    }

    .field-config-radio-images .options input {
        display: none;
    }


</style>