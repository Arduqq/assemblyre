<template>
    <div class="field-config shape-field-config" v-click-outside="resetActiveProperty"> 
        <div class="property-config"  v-for="(_, name) in properties" :key="name">
        
            <input :id="id + '-' + name" type="radio" name="property" :value="name" v-model="inEditProperty" />
            <label :for="id + '-' + name"><img :src="'/assets/icons/' + name + '.png'" /><span>{{name}}</span></label>
        </div>
        
        <div class="edit-panel" v-show="inEditProperty === 'shape'">
            <field-base-config-radio 
                binding="r"
                title="geometry"
                :group="id + 'shape'"
                property="shapeGeometry"
                :options="['circle', 'square', 'triangle']"
                :val="currentProperties.shape.shapeGeometry"
                v-model="currentProperties.shape.shapeGeometry"
                :alive="active == 'shapeGeometry'"
                @click.native="active = 'shapeGeometry'"
                @change="updateStyle"
            />
        </div>

        <div class="edit-panel" v-show="inEditProperty === 'background'">
            <field-base-config-color 
                binding="r"
                title="color"
                property="backgroundColor"
                :group="id + 'background'"
                :options="['transparent, #ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
                :val="currentProperties.background.backgroundColor"
                v-model="currentProperties.background.backgroundColor"
                :alive="active === 'backgroundColor'"
                @click.native="active = 'backgroundColor'"
                @change="updateStyle"
            />
            <field-base-config-radio-images 
                binding="r"
                title="image"
                :group="id + 'background'"
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
            
            <field-base-config-color 
                binding="r"
                title="color"
                property="borderColor"
                :group="id + 'border'"
                :options="['transparent, #ffffff', '#000000', '#ff675c', '#6f27db', '#d627c5', '#3bf7f1', '#a5ff91']"
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
import FieldBaseConfigSlider from './FieldBaseConfigSlider'
import FieldBaseConfigRadio from './FieldBaseConfigRadio'

export default {
    name: 'FieldShapeConfig',
    data() {
        return {
            active: '',
        }
    },
    extends: FieldBaseConfig,
    components: {
        FieldBaseConfigRadio,
        FieldBaseConfigSlider
    }
}
</script>