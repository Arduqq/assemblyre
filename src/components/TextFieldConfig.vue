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
            <field-config-radio 
                binding="r"
                title="alignment"
                property="textAlignment"
                :options="['left', 'center', 'right', 'justify']"
                :val="currentProperties.text.textAlignment"
                v-model="currentProperties.text.textAlignment"
                :alive="active == 'textAlignment'"
                @click.native="active = 'textAlignment'"
                @change="updateStyle"
            />
            <field-config-slider 
                binding="w" 
                title="size" 
                group="text"
                property="textSize" 
                :min=50 :max=200 :step=1 
                :val="currentProperties.text.textSize "
                v-model.number="currentProperties.text.textSize" 
                :alive="active == 'textSize'"
                @click.native="active = 'textSize'"
                @change="updateStyle"/>

        </div>
        <div class="edit-panel" v-show="inEditProperty === 'border'">
            <h3>color</h3>
            <color-picker @input="updateStyle" v-model="currentProperties.border.borderColor" />
            <field-config-slider 
                binding="q" 
                title="radius"
                group="border"
                property="borderRadius" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.border.borderRadius "
                v-model.number="currentProperties.border.borderRadius" 
                :alive="active == 'borderRadius'"
                @click.native="active = 'borderRadius'"
                @change="updateStyle"/>
            <field-config-slider 
                binding="w" 
                title="size" 
                group="border"
                property="borderSize" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.border.borderSize" 
                v-model.number="currentProperties.border.borderSize" 
                :alive="active == 'borderSize'"
                @click.native="active = 'borderSize'"
                @change="updateStyle"/>
            <h3>style</h3>
            <field-config-radio 
                binding="r"
                title="style"
                property="borderStyle"
                :options="['none', 'solid', 'dashed', 'dotted']"
                :val="currentProperties.border.borderStyle"
                v-model="currentProperties.border.borderStyle"
                :alive="active == 'borderStyle'"
                @click.native="active = 'borderStyle'"
                @change="updateStyle"
            />
        </div>

        
        <input type="button" id="delete-button" value="Delete" @click="initDelete"/>
    </div>
</template>
<script>
import FieldConfig from './FieldConfig'
import FieldConfigSlider from './FieldConfigSlider.vue'
import FieldConfigRadio from './FieldConfigRadio.vue'

export default {
  components: { FieldConfigSlider, FieldConfigRadio },
    name: 'TextFieldConfig',
    data() {
        return {
            active: '',
        }
    },
    methods: {
        updateStyle(value) {
            if (this.inEditProperty === 'border') {
                this.$set(this.currentProperties.border, value.property, value.val);
            } else {
                this.$set(this.currentProperties.text, value.property, value.val);
            }
            this.$emit('input', this.currentProperties )
        },
        initDelete() {
            this.$emit('delete-initiated', this)
        }
    },

    extends: FieldConfig, FieldConfigSlider, FieldConfigRadio
}
</script>
