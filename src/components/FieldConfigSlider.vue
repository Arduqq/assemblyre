<template>
    <div class="field-config-slider">
        [{{binding}}] {{title}}
        <input v-show="alive" type="range" id="text_size" :min="min" :max="max" :step="step" v-model.number="currentValue" @input="updateValue()"/>
        {{currentValue}}
            
    </div>
</template>
<script>
export default {
    name: "FieldConfigSlider",
    props: {
        title: String,
        binding: String,
        group: String,
        property: String,
        min: Number,
        max: Number,
        step: Number,
        val: Number,
        alive: Boolean
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