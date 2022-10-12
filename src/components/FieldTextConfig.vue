<template>
    <div class="field-config text-field-config" v-click-outside="resetActiveProperty" :class=" inEditProperty !== null ? 'activated' : ''" :style="dynamicPosition"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
            <input :id="id + '-' + name" type="radio" name="property" :value="name" v-model="inEditProperty" />
            <label :for="id + '-' + name"><img :src="'/assets/icons/' + name + '.png'" /><span>{{name}}</span></label>
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'text' ">
            <field-base-config-slider 
                binding="w" 
                title="size" 
                :group="id + 'text'"
                property="textSize" 
                :min=50 :max=200 :step=1 
                :val="currentProperties.text.textSize "
                v-model.number="currentProperties.text.textSize" 
                :alive="active == 'textSize'"
                @click.native="active = 'textSize'"
                @change="updateStyle"/>
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
            <field-base-config-radio 
                binding="r"
                title="alignment"
                property="textAlignment"
                :group="id + 'text'"
                :options="['left', 'center', 'right', 'justify']"
                :val="currentProperties.text.textAlignment"
                v-model="currentProperties.text.textAlignment"
                :alive="active === 'textAlignment'"
                @click.native="active = 'textAlignment'"
                @change="updateStyle"
            />
            <field-base-config-radio-fonts 
                binding="r"
                title="font"
                property="fontFamily"
                :group="id + 'text'"
                :options="['Roboto', 'Arial', 'Georgia', 'Courier New', 'Abordage', 'CirrusCumulus', 'Equateur', 'FT88', 'FT88 Gothique', 'FT88 School', 'Karrik', 'Latitude', 'Louise']"
                :val="currentProperties.text.fontFamily"
                v-model="currentProperties.text.fontFamily"
                :alive="active === 'fontFamily'"
                @click.native="active = 'fontFamily'"
                @change="updateStyle"
            />
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'highlight' ">
            <field-base-config-slider 
                binding="w" 
                title='glow' 
                :group="id + 'highlight'"
                property="textGlow" 
                :min=0 :max=10 :step=1 
                :val="currentProperties.highlight.textGlow"
                v-model.number="currentProperties.highlight.textGlow" 
                :alive="active == 'textGlow'"
                @click.native="active = 'textGlow'"
                @change="updateStyle"/>
            <field-base-config-color 
                binding="r"
                title="color"
                property="textGlowColor"
                :group="id + 'highlight'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.highlight.textGlowColor"
                v-model="currentProperties.highlight.textGlowColor"
                :alive="active === 'textGlowColor'"
                @click.native="active = 'textGlowColor'"
                @change="updateStyle"
            />
            <field-base-config-color 
                binding="r"
                title="color"
                property="highlightColor"
                :group="id + 'highlight'"
                :options="['transparent', '#ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.highlight.highlightColor"
                v-model="currentProperties.highlight.highlightColor"
                :alive="active === 'highlightColor'"
                @click.native="active = 'highlightColor'"
                @change="updateStyle"
            />

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
                :group="id + 'background'"
                :options="this.backgroundImages"
                :val="currentProperties.background.backgroundImage"
                v-model="currentProperties.background.backgroundImage"
                :alive="active === 'backgroundImage'"
                @click.native="active = 'backgroundImage'"
                @change="updateStyle"
            />
            <field-base-config-slider 
                binding="q" 
                title="size"
                :group="id + 'background'"
                property="backgroundSize" 
                :min=0 :max=200 :step=1 
                :val="currentProperties.background.backgroundSize "
                v-model.number="currentProperties.background.backgroundSize" 
                :alive="active == 'backgroundSize'"
                @click.native="active = 'backgroundSize'"
                @change="updateStyle"/>

        </div>

        <div class="edit-panel" v-show="inEditProperty === 'border'">
            <field-base-config-slider 
                binding="w" 
                title="size" 
                :group="id + 'border'"
                property="borderSize" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.border.borderSize" 
                v-model.number="currentProperties.border.borderSize" 
                :alive="active == 'borderSize'"
                @click.native="active = 'borderSize'"
                @change="updateStyle"/>
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
                :group="id + 'border'"
                property="borderRadius" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.border.borderRadius "
                v-model.number="currentProperties.border.borderRadius" 
                :alive="active == 'borderRadius'"
                @click.native="active = 'borderRadius'"
                @change="updateStyle"/>
            <field-base-config-radio 
                binding="r"
                title="style"
                property="borderStyle"
                :group="id + 'border'"
                :options="['none', 'solid', 'dashed', 'dotted']"
                :val="currentProperties.border.borderStyle"
                v-model="currentProperties.border.borderStyle"
                :alive="active == 'borderStyle'"
                @click.native="active = 'borderStyle'"
                @change="updateStyle"
            />
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'shadow'">
            <field-base-config-slider 
                binding="w" 
                title="size" 
                :group= "id + 'shadowSize'"
                property="shadowSize" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.shadow.shadowSize" 
                v-model.number="currentProperties.shadow.shadowSize" 
                :alive="active == 'shadowSize'"
                @click.native="active = 'shadowSize'"
                @change="updateStyle"/>
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
                :group="id + 'shadow'"
                property="shadowDisplacement" 
                :min=0 :max=50 :step=1 
                :val="currentProperties.shadow.shadowDisplacement "
                v-model.number="currentProperties.shadow.shadowDisplacement" 
                :alive="active == 'shadowDisplacement'"
                @click.native="active = 'shadowDisplacement'"
                @change="updateStyle"/>
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'animation'">
            <field-base-config-radio-animations
                binding="r"
                title="type"
                property="animationType"
                :group="id + 'animation'"
                :options="[
                    'ani1 cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                    'ani2 cubic-bezier(0.455, 0.03, 0.515, 0.955)', 
                    'ani3 cubic-bezier(0.165, 0.84, 0.44, 1)', 
                    'ani4 cubic-bezier(0.23, 1, 0.320, 1)',
                    'ani5 cubic-bezier(0.165, 0.84, 0.44, 1)',
                    'ani6 cubic-bezier(0.165, 0.84, 0.44, 1)',
                    'ani7 cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                ]"
                :val="currentProperties.animation.animationType"
                v-model="currentProperties.animation.animationType"
                :alive="active == 'animationType'"
                @click.native="active = 'animationType'"
                @change="updateStyle"
            />

            <field-base-config-slider 
                binding="w" 
                title="duration" 
                :group= "id + 'animationDuration'"
                property="animationDuration" 
                :min=1 :max=20 :step=1 
                :val="currentProperties.animation.animationDuration" 
                v-model.number="currentProperties.animation.animationDuration" 
                :alive="active == 'animationDuration'"
                @click.native="active = 'animationDuration'"
                @change="updateStyle"/>
        </div>
        
        <div class="quick-access">
            <button id="delete-button" @click="initDelete">Delete</button>
        </div>
    </div>
</template>
<script>
import FieldBaseConfig from './FieldBaseConfig'

export default {
    name: 'FieldTextConfig',
    extends: FieldBaseConfig,
    data() {
        return {
            active: '',
        }
    }
}
</script>
