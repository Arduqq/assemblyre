<template>
    <div class="field-config media-field-config" v-click-outside="resetActiveProperty"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
            <label :for="'edit-' + name + '-toggle'">{{name}}
                <input type="radio" name="property" :value="name" v-model="inEditProperty" />
            </label>
        </div>
        
        <div class="edit-panel" v-show="inEditProperty === 'image'">
        <h3>mode</h3>
        <h3>filter</h3>
        <h3>rendering</h3>
            <input type="radio" name="image_rendering" id="image_rendering_pixelated" value="pixelated" @input="updateStyle()" v-model="currentProperties.image.imageRendering"/>
            <label for="pixelated">pixelated</label>
            <input type="radio" name="image_rendering" id="image_rendering_auto" value="auto" @input="updateStyle()" v-model="currentProperties.image.imageRendering"/>
            <label for="auto">smooth</label>
        </div>

        
        <div class="edit-panel" v-show="inEditProperty === 'border'">
            <h3>color</h3>
            <color-picker @input="updateStyle" v-model="currentProperties.border.borderColor" />
            <h3>radius</h3>
            <input type="range" id="border_radius" min="0" max="50" step="1" @change="updateStyle()" v-model="currentProperties.border.borderRadius"/>
            <h3>size</h3>
            <input type="range" id="border_size" min="1" max="20" step="1" @change="updateStyle()" v-model="currentProperties.border.borderSize"/>
            <h3>style</h3>
            <input type="radio" name="border_style" id="border_style_none" value="none" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="none">none</label>
            <input type="radio" name="border_style" id="border_style_solid" value="solid" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="solid">solid</label>
            <input type="radio" name="border_style" id="border_style_dashed" value="dashed" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="dashed">dashed</label>
            <input type="radio" name="border_style" id="border_style_dotted" value="dotted" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="dotted">dotted</label>
        </div>
        
        <input type="button" id="delete-button" value="Delete" @click="initDelete"/>
    </div>
</template>
<script>
import FieldConfig from './FieldConfig'
import FieldConfigSlider from './FieldConfigSlider'

export default {
    name: 'MediaFieldConfig',
    methods: {
        updateStyle() {
            this.$emit('input', this.currentProperties )
        },
        initDelete() {
            this.$emit('delete-initiated', this)
        }
    },

    extends: FieldConfig, FieldConfigSlider
}
</script>