<template>
    <div class="field-config-radio">
        [{{binding}}] {{title}}
        <div v-show="alive" class="options">
            <label v-for="(option, index) in options" :key="index" :for="option">{{option}}
                <input :id="option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </label>
        </div>
        {{currentValue}}
    </div>
</template>
<script>
export default {
    name: "FieldConfigRadio",
    props: {
        title: String,
        binding: String,
        group: String,
        property: String,
        options: Array,
        val: String,
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