<template>
    <div class="field-config text-field-config" v-click-outside="resetActiveProperty"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
            <label :for="'edit-' + name + '-toggle'">{{name}}
                <input type="radio" name="property" :value="name" v-model="inEditProperty" />
            </label>
        </div>

        <textarea v-model="currentProperties.text.content" 
                  type="text" 
                  ref="rawInput"
                  :class="[currentProperties.text.textAlignment]" 
                  value="content" 
                  rows="10">
        </textarea>


        <div class="edit-panel" v-show="inEditProperty === 'text'">
            <h3>color</h3>
            <color-picker @input="updateStyle" v-model="currentProperties.text.textColor" />
            <h3>alignment</h3>
            <input type="radio" name="text_align" id="text_align_left" value="left" @input="updateStyle()" v-model="currentProperties.text.textAlignment"/>
            <label for="left">left</label>
            <input type="radio" name="text_align" id="text_align_center" value="center" @input="updateStyle()" v-model="currentProperties.text.textAlignment" selected/>
            <label for="center">center</label>
            <input type="radio" name="text_align" id="text_align_right" value="right" @input="updateStyle()" v-model="currentProperties.text.textAlignment"/>
            <label for="right">right</label>
            <h3>size</h3>
            <input type="range" id="text_size" min="50" max="200" step="1" @change="updateStyle()" v-model="currentProperties.text.textSize"/>
            

        </div>
        <div class="edit-panel" v-show="inEditProperty === 'border'">
            <h3>color</h3>
            <color-picker @input="updateStyle" v-model="currentProperties.border.borderColor" />
            <h3>radius</h3>
            <field-config-slider 
                binding="q" 
                title="radius" 
                property="borderRadius" 
                :min=0 :max=50 :step=1 
                :val=currentProperties.border.borderRadius 
                v-model.number="currentProperties.border.borderRadius" 
                @change="updateStyle"/>
            <h3>size</h3>
            <input type="range" id="border_size" min="1" max="20" step="1" @change="updateStyle()" v-model="currentProperties.border.borderSize"/>
            <h3>style</h3>
            <input type="radio" name="border_style" id="border_style_none" value="none" @input="updateStyle()" v-model="currentProperties.border.borderStyle"/>
            <label for="none">none</label>
            <input type="radio" name="border_style" id="border_style_solid" value="solid" @input="updateStyle()" v-model="currentProperties.border.borderStyle" selected/>
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
import FieldConfigSlider from './FieldConfigSlider.vue'

export default {
  components: { FieldConfigSlider },
    name: 'TextFieldConfig',
    methods: {
        updateStyle(value) {
            console.log(document.activeElement);
            this.$set(this.currentProperties.border, value.property, value.val);
            this.$emit('input', this.currentProperties )
        },
        initDelete() {
            this.$emit('delete-initiated', this)
        }
    },

    extends: FieldConfig, FieldConfigSlider
}
</script>
