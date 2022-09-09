<template>
    <div class="field-config-radio-images" :class="this.alive ? 'active' : ''">
        <b>[{{binding}}]</b> {{title}}
        <div v-show="alive" class="options">
            <label v-for="(option, index) in options" :key="index" :for="option">
                <img :src="'/assets/' + option + '.jpg'">
                <input :id="option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </label>
        </div>
        <span>{{currentValue}}</span>
    </div>
</template>
<script>
export default {
    name: "FieldConfigRadioImages",
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
<style>
    .field-config-radio-images {
        display: block;
        background-color: var(--secondary-color);
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        color: #232323;
        border-radius: 5px;
        padding: 5px;
        position: relative;
        transition: .1s;
    }

    .field-config-radio-images .options {
        z-index: 100;
        position: absolute;
        display: flex;
        flex-flow: row wrap;
        gap: 10px;
        width: 250px;
        height: 100px;
        overflow-y: auto;
        left: 100%;
        top: 0;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border-radius: 5px;
        padding: 5px;
        border: 1px solid var(--secondary-color);
    }

    .field-config-radio-images .options img {
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

    .field-config-radio-images:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(3px, 3px);
        box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
        z-index: 100;
    }

    .field-config-radio-images.active, .field-config-radio-images.active:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(0,0);
        box-shadow: none;
        z-index: 100;
        
    }

    .field-config-radio-images:active {
        transform: translate(0px, 0px);
        box-shadow: none;
    }

    
    .field-config-radio-images span {
        display: block;
        position: absolute;
        left: 80%;
        bottom: 10%;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        padding: 2.5px;
        border-radius: 5px;
        font-size: 70%;
        opacity: 0;
        user-select: none;
        transition: .05s;
    }

    .field-config-radio-images:hover span, .field-config-radio-images.active span {
        opacity: 1
    }
</style>