<template>
    <div class="field-config-slider" :class="this.alive ? 'active' : ''">
        [{{binding}}] {{title}}
        <div  v-show="alive" class="slider">
            <input type="range" id="text_size" :min="min" :max="max" :step="step" v-model.number="currentValue" @input="updateValue()"/>
        </div>
        <span>{{currentValue}}</span>
            
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

<style>
    .field-config-slider {
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

    .field-config-slider .slider {
        z-index: 100;
        position: absolute;
        width: 250px;
        left: 100%;
        top: 0;
        transform: rotate(90deg);
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border-radius: 5px;
        padding: 5px;
        border: 1px solid var(--secondary-color);
    }

    .field-config-slider:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(3px, 3px);
        box-shadow: -1.5px -1.5px 0px 1.5px rgb(110, 164, 192);
        z-index: 100;
    }

    .field-config-slider.active, .field-config-slider.active:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(0,0);
        box-shadow: none;
        z-index: 100;
        
    }

    .field-config-slider:active {
        transform: translate(0px, 0px);
        box-shadow: none;
    }

    
    .field-config-slider span {
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

    .field-config-slider:hover span, .field-config-slider.active span {
        opacity: 1
    }

    </style>