<template>
    <div class="media-field-config" v-click-outside="resetActiveProperty"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
            <label :for="'edit-' + name + '-toggle'">{{name}}
                <input type="radio" name="property" :value="name" v-model="inEditProperty" />
            </label>
        </div>
        
        <div class="edit-panel" v-show="inEditProperty === 'image'">
            <input type="radio" name="image_rendering" id="image_rendering_pixelated" value="pixelated" @input="updateStyle()" v-model="currentProperties.image.imageRendering"/>
            <label for="pixelated">Pixelated</label>
            <input type="radio" name="image_rendering" id="image_rendering_auto" value="auto" @input="updateStyle()" v-model="currentProperties.image.imageRendering"/>
            <label for="auto">Smooth</label>
        </div>

        
        <div class="edit-panel" v-show="inEditProperty === 'border'">
            <color-picker @input="updateStyle" v-model="currentProperties.border.borderColor" />
            <input type="range" id="border_radius" min="0" max="50" step="1" @change="updateStyle()" v-model="currentProperties.border.borderRadius"/>
            <input type="range" id="border_size" min="1" max="20" step="1" @change="updateStyle()" v-model="currentProperties.border.borderSize"/>
            <input type="radio" name="border_style" id="border_style_none" value="none" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="none">none</label>
            <input type="radio" name="border_style" id="border_style_solid" value="solid" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="solid">Solid</label>
            <input type="radio" name="border_style" id="border_style_dashed" value="dashed" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="dashed">Dashed</label>
            <input type="radio" name="border_style" id="border_style_ridge" value="ridge" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="ridge">Ridged</label>
        </div>

        <input type="button" id="delete-button" value="Delete"/>
    </div>
</template>
<script>
import FieldConfig from './FieldConfig'

export default {
    name: 'MediaFieldConfig',
    methods: {
        updateStyle() {
            this.$emit('input', this.currentProperties )
        }
    },

    extends: FieldConfig
}
</script>