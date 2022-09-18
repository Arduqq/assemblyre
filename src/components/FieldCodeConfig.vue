<template>
    <div class="field-config code-field-config" v-click-outside="resetActiveProperty"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
        
            <input :id="id + '-' + name" type="radio" name="property" :value="name" v-model="inEditProperty" />
            <label :for="id + '-' + name"><img :src="'/assets/icons/' + name + '.png'" /><span>{{name}}</span></label>
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'text'">
            
            <field-base-config-color 
                binding="r"
                title="color"
                property="textColor"
                :group="id + 'text'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.text.textColor"
                v-model="currentProperties.text.textColor"
                :alive="active === 'textColor'"
                @click.native="active = 'textColor'"
                @change="updateStyle"
            />
            <field-base-config-slider 
                binding="w" 
                title="size" 
                group="text"
                property="textSize" 
                :min=10 :max=200 :step=1 
                :val="currentProperties.text.textSize "
                v-model.number="currentProperties.text.textSize" 
                :alive="active == 'textSize'"
                @click.native="active = 'textSize'"
                @change="updateStyle"/>

        </div>
        <div class="edit-panel" v-show="inEditProperty === 'border'">
            
            <field-base-config-color 
                binding="r"
                title="color"
                property="borderColor"
                :group="id + 'border'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.border.borderColor"
                v-model="currentProperties.border.borderColor"
                :alive="active === 'borderColor'"
                @click.native="active = 'borderColor'"
                @change="updateStyle"
            />
            <field-base-config-slider 
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
            <field-base-config-slider 
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
            <field-base-config-radio 
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
        <div class="edit-panel" v-show="inEditProperty === 'shadow'">
            
            <field-base-config-color 
                binding="r"
                title="color"
                property="shadowColor"
                :group="id + 'shadow'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.shadow.shadowColor"
                v-model="currentProperties.shadow.shadowColor"
                :alive="active === 'shadowColor'"
                @click.native="active = 'shadowColor'"
                @change="updateStyle"
            />
            <field-base-config-slider 
                binding="q" 
                title="displacement"
                group="shadow"
                property="shadowDisplacement" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.shadow.shadowDisplacement "
                v-model.number="currentProperties.shadow.shadowDisplacement" 
                :alive="active == 'shadowDisplacement'"
                @click.native="active = 'shadowDisplacement'"
                @change="updateStyle"/>
            <field-base-config-slider 
                binding="w" 
                title="size" 
                group="shadow"
                property="shadowSize" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.shadow.shadowSize" 
                v-model.number="currentProperties.shadow.shadowSize" 
                :alive="active == 'shadowSize'"
                @click.native="active = 'shadowSize'"
                @change="updateStyle"/>
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'background'">
            
            <field-base-config-color 
                binding="r"
                title="color"
                property="backgroundColor"
                :group="id + 'background'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.background.backgroundColor"
                v-model="currentProperties.background.backgroundColor"
                :alive="active === 'backgroundColor'"
                @click.native="active = 'backgroundColor'"
                @change="updateStyle"
            />
            <field-base-config-radio-images 
                binding="r"
                title="image"
                property="backgroundImage"
                :options="['asphalt', 'bricks-1', 'bricks-2', 'building-1', 'building-2', 'circuit', 'dots-1', 'dots-2', 'flame-1', 'flame-2', 'leather', 'machine', 'rock-1', 'rock-2', 'shell', 'sponge', 'stars']"
                :val="currentProperties.background.backgroundImage"
                v-model="currentProperties.background.backgroundImage"
                :alive="active === 'backgroundImage'"
                @click.native="active = 'backgroundImage'"
                @change="updateStyle"
            />
            <field-base-config-slider 
                binding="q" 
                title="size"
                group="background"
                property="backgroundSize" 
                :min=0 :max=200 :step=1 
                :val="currentProperties.background.backgroundSize "
                v-model.number="currentProperties.background.backgroundSize" 
                :alive="active == 'backgroundSize'"
                @click.native="active = 'backgroundSize'"
                @change="updateStyle"/>

        </div>
        
        <input type="button" id="delete-button" value="Delete" @click="initDelete"/>
    </div>
</template>
<script>
import FieldBaseConfig from './FieldBaseConfig'
import FieldBaseConfigSlider from './FieldBaseConfigSlider.vue'
import FieldBaseConfigRadio from './FieldBaseConfigRadio.vue'

export default {
  components: { FieldBaseConfigSlider, FieldBaseConfigRadio },
    name: 'FieldCodeConfig',
    data() {
        return {
            active: '',
        }
    },
    extends: FieldBaseConfig
}
</script>
