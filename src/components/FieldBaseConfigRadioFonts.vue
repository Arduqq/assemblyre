<template>
    <div class="field-config-radio-fonts" :class="this.alive ? 'active' : ''">
        <b>[{{binding}}]</b> {{title}}
        <div v-show="alive" class="options">
            <div class="option"  v-for="(option, index) in options" :key="index">
                <label :for="option" :style="'font-family: ' + option">
                    <span>QqRrEeUu</span><span>{{option}}</span>
                </label>
                <input :id="option" :name="group" :value="option"  type="radio" v-model="currentValue" @change="updateValue()"/>
            </div>
        </div>
        <span>{{currentValue}}</span>
    </div>
</template>
<script>
export default {
    name: "FieldConfigRadioFonts",
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
    .field-config-radio-fonts {
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

    .field-config-radio-fonts .options {
        z-index: 100;
        position: absolute;
        display: flex;
        flex-flow: row wrap;
        gap: 10px;
        width: 250px;
        height: 100px;
        overflow-y: auto;
        left: 30%;
        top: 110%;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border-radius: 5px;
        padding: 5px;
        border: 1px solid var(--secondary-color);
    }

    .field-config-radio-fonts .options .option {
        flex: 0 0 100%;
    }

    .field-config-radio-fonts .options label {
        width: 100%; 
        padding: 10px;
        transition: .1s;
        background: white;
        color: black;
        flex: 0 0 100%;
        border: 1px solid var(--secondary-alt-color);
        
        display: flex;
        flex-flow: row nowrap;
        gap: 20px;
        align-content: space-around;
        justify-content: flex-end;
        text-align: right;
    }

    .field-config-radio-fonts .options input:checked + label {
        display: none;
    }


    .field-config-radio-fonts .options input {
        display: none;
    }

    .field-config-radio-fonts:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(3px, 3px);
        box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
        z-index: 100;
    }

    .field-config-radio-fonts.active, .field-config-radio-fonts.active:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
        transform: translate(0,0);
        box-shadow: none;
        z-index: 100;
        
    }

    .field-config-radio-fonts:active {
        transform: translate(0px, 0px);
        box-shadow: none;
    }

    
    .field-config-radio-fonts > span {
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

    .field-config-radio-fonts:hover span, .field-config-radio-fonts.active span {
        opacity: 1
    }
</style>