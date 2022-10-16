<template>
<div v-if="alive" ref="draggableWrapper" class="shape field" :id="id" :class="{'active' : active, 'edit' : edit}" :style="fieldStyle" v-click-outside="closeConfig">
  <main>
    <field-shape-config :fid="id" :onTop="screenY + screenHeight/2 > windowHeight / 2" v-show="inEdit" :properties="fieldStyleProperties" @delete-initiated="destroySelf" @input="updateProperties"/>
    <div class="geometry"></div>
  </main>
  
</div>

</template>
<script>
  import FieldBase from "./FieldBase.vue";
  import FieldShapeConfig from "./FieldShapeConfig.vue";
  import styles from '../json/styles.json'

  export default {
  name: "FieldShape",
  extends: FieldBase,
    data() {
      return {
        styleMap: styles.shape,
        geometryMap: {
          "triangle" : "polygon(50% 0%, 0% 100%, 100% 100%)",
          "square" : "none",
          "ellipse": "ellipse(50% 50% at 50% 50%)",
          "speechbubble": "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
          "rhombus": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          "star": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
        }
      }
    },
    methods: {
      updateProperties: function(value) {
        this.fieldStyleProperties = value;
        this.emitChange();
      }
    },
    computed: {
      fieldStyle () {
        var stacking = !this.inEdit ? this.stackOrder : 1000;
        var geometry = this.geometryMap[this.fieldStyleProperties.shape.shapeGeometry];
        var backgroundImage = this.fieldStyleProperties.background.backgroundImage !== "none" ? 'url(/assets/backgrounds/' + this.fieldStyleProperties.background.backgroundImage + '.jpg)' : "none"
        return {
          '--field-background-color': this.fieldStyleProperties.background.backgroundColor,
          '--field-background-image': backgroundImage,
          '--field-background-size': this.fieldStyleProperties.background.backgroundSize + '%',
          '--field-animation-type': this.fieldStyleProperties.animation.animationType,
          '--field-animation-duration': this.fieldStyleProperties.animation.animationDuration + 's',
          '--field-geometry' : geometry,
          '--field-stack-order': stacking,
          '--field-animation-entry' : stacking-1 + 's',
          '--field-x': this.x+'px',
          '--field-y': this.y+'px',
          '--field-w': this.screenWidth+'px',
          '--field-h': this.screenHeight+'px'
        }
      }
    },
    components: {
      FieldShapeConfig
    }
  };
  
  
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  .shape {
    position: absolute;
    user-select: none;
    display: flex;
    flex-flow: row wrap;
    max-height: 100%; 
    max-width: 100%;
    min-height: 100px;
    border: 0;
  }

  .shape.edit:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    height: 100%;
    border-bottom: 10px solid var(--interact-color);
    border-right: 10px solid var(--interact-color);
    animation: interact-wiggle-hv 1s infinite;
  }

  .shape main{
    display: block;
    max-height: 100%; 
    max-width: 100%;
  }

  .shape main > * {
    z-index: 2;
  }

  .shape main .geometry {
    width: 100%;
    height: 100%;
    animation: var(--field-animation-type) var(--field-animation-duration) infinite;
    background-color: var(--field-background-color);
    background-image: var(--field-background-image);
    background-size: var(--field-background-size);
    clip-path: var(--field-geometry);
    position: relative;
    z-index: 1!important;
  }


  
</style>
