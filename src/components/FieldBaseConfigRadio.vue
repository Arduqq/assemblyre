<template>
    <div class="field-config-radio" :class="this.alive ? 'active' : ''">
        <img :src="'/assets/icons/' + property + '.png'" />
        <div v-show="alive" class="options">
            <label v-for="(option, index) in options" :key="index" :for="option">{{option}}
                <input :id="option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </label>
        </div>
        <span><b>{{property}}:</b> {{currentValue}}</span>
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
<style>
    

    .field-config-radio img {
        height: 100%;
        width: 100%;
    }

    .field-config-radio:hover img, .field-config-radio.active img{
        filter: invert(1);
    }

    .field-config-radio {
        display: block;
        background-color: var(--secondary-color);
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        color: #232323;
        border-radius: 5px;
        padding: 5px;
        position: relative;
        transition: .1s;
        width: 50px;
        height: 50px;
    }

    .field-config-radio .options {
        position: absolute;
        width: 250px;
        left: 100%;
        top: 0;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border-radius: 5px;
        padding: 5px;
        border: 1px solid var(--secondary-color);
    }

    .field-config-radio:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(3px, 3px);
        box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
        z-index: 100;
    }

    .field-config-radio.active, .field-config-radio.active:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(0,0);
        box-shadow: none;
        z-index: 100;
        
    }

    .field-config-radio:active {
        transform: translate(0px, 0px);
        box-shadow: none;
    }

    
    .field-config-radio span {
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

    .field-config-radio:hover span, .field-config-radio.active span {
        opacity: 1
    }
</style>