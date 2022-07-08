<template>
    <div class="field-config-slider">
        <input type="radio" :value="'[' + binding +'] ' + title"/>
        <input type="range" id="text_size" :min="min" :max="max" :step="step" v-model.number="currentValue" @input="updateValue()"/>
        {{currentValue}}
            
    </div>
</template>
<script>
export default {
    name: "FieldConfigSlider",
    props: {
        title: String,
        binding: String,
        property: String,
        min: Number,
        max: Number,
        step: Number,
        val: Number
    },
    data() {
        return {
            currentValue: this.val
        }
    },
    methods: {
        updateValue() {
            this.$emit("change", {property: this.property, val: this.currentValue})
        }
    }
}
</script>