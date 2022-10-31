<template>
<div class="program-preview" :style="canvasStyle"  :class="{'full' : fullView}">
        <div class="program" ref="program" @click="fullView = !fullView"> 
          <h3>
            {{score.opus}} - <i>{{score.version}}</i>
          </h3>
          <field-text v-for="chord in programQuery('text')" 
            :id="id + chord.id"
            :name= "chord.name"
            :x= "chord.x  "
            :y= "chord.y " 
            :w= "chord.w"  
            :h= "chord.h"  
            :alive = "chord.alive"
            :modifier= "canvasScale"
            :styling= "chord.styling"
            :key= "chord.id"  
            :stackOrder = "chord.stackOrder"
            :active = "chord.active"
            :edit = "false"  
            :importData = chord.style />
          <field-code v-for="code in programQuery('code')" 
            :id= "id + code.id "
            :name="code.name"
            :x= "code.x"  
            :y= "code.y"  
            :w= "code.w"  
            :h= "code.h"  
            :alive = "code.alive"
            :modifier= "canvasScale" 
            :styling= "code.styling"
            :key= "code.id"  
            :stackOrder = "code.stackOrder" 
            :active = "code.active"
            :edit = "false"  
            :importData = "code.style" />
          <field-media v-for="plug in programQuery('image')" 
            :id= "id + plug.id "
            :name="plug.name"
            :x= "plug.x"  
            :y= "plug.y"  
            :w= "plug.w"  
            :h= "plug.h"  
            :alive = "plug.alive"
            :modifier= "canvasScale" 
            :media= "plug.media"  
            :key= "plug.id"  
            :stackOrder = "plug.stackOrder" 
            :active = "plug.active"
            :edit = "false"  
            :importData = "plug.style" />
          <field-shape v-for="shape in programQuery('shape')" 
            :id= "id + shape.id"
            :name="shape.name"
            :x= "shape.x"  
            :y= "shape.y"  
            :w= "shape.w"  
            :h= "shape.h"  
            :alive = "shape.alive"
            :modifier= "canvasScale" 
            :styling= "shape.styling" 
            :key= "shape.id"  
            :stackOrder = "shape.stackOrder" 
            :active = "shape.active"
            :edit = "false" 
            :importData = "shape.style" />
          </div>

      </div>  
</template>

<script>

  import FieldText from "./FieldText.vue";
  import FieldCode from "./FieldCode.vue";
  import FieldMedia from "./FieldMedia.vue";
  import FieldShape from "./FieldShape.vue";

  export default {
    name: "ProgramPreview",
    data() {
      return {
        canvasScale: 0.5,
        fullView: false,
        participants:  {
          "lemon": "🍋",
          "peach": "🍑",
          "pineapple": "🍍",
          "grape": "🍇",
          "apple": "🍏",
          "maracuja": "🍹",
          "jackfruit": "🫒",
          "growth": "🌱",
          "garden": "🌿"
        },
        backgroundImages: [ "ASPHALT", "BRICKS-1", "BRICKS-2", "BRICKS-3", "BRICKS-4", "BUILDING-1", "BUILDING-2", "BUILDING-3", "BUILDING-4", "BUILDING-5", "BUILDING-6", "BUILDING-7", "BUILDING-8", "BUILDING-9", "CIRCUIT", "CLOVER", "DOOR-1", "DOOR-2", "DOTS-1", "DOTS-2", "FLAME-1", "FLAME-2", "FLOWERS-1", "FLOWERS-2", "GIRAFFE", "LEATHER", "MACHINE", "PASTA", "PATTERN-1", "PATTERN-10", "PATTERN-11", "PATTERN-12", "PATTERN-13", "PATTERN-14", "PATTERN-15", "PATTERN-16", "PATTERN-17", "PATTERN-18", "PATTERN-19", "PATTERN-2", "PATTERN-20", "PATTERN-21", "PATTERN-22", "PATTERN-23", "PATTERN-24", "PATTERN-25", "PATTERN-26", "PATTERN-27", "PATTERN-28", "PATTERN-29", "PATTERN-3", "PATTERN-30", "PATTERN-31", "PATTERN-32", "PATTERN-33", "PATTERN-34", "PATTERN-35", "PATTERN-36", "PATTERN-37", "PATTERN-4", "PATTERN-5", "PATTERN-6", "PATTERN-7", "PATTERN-8", "PATTERN-9", "PLANTS", "PLATE", "ROCK-1", "ROCK-2", "ROCK-3", "ROCK-4", "SHELL", "SIBERIAN", "SPONGE", "STARS", "TIGER", "WATER", "WINDOWS-1", "WINDOWS-2", "WOOL-1", "WOOL-2"]
      };
    },
    props: {
      width: {
        type: Number,
        required: false,
        default: 800,
      },
      height: {
        type: Number,
        required: false,
        default: 600,
      },
      score: {
        type: Object,
        required: false,
        default: function() {
          return {
            opus: "Pseudo Program",
            version: "0.1",
            backgroundPattern: "none",
            backgroundColor: "white",
            program: [],
            canvasSize: { width: 800, height: 600 },
          }
        }
      },
      id: {
        type: String,
        required: true
      }
    },
    mounted: function() {
      /*let program = this.$refs.program;*/
      /*this.score.canvasSize.width = this.width;
      this.score.canvasSize.height = this.height;*/
      console.log(this.score);

    },
    methods: {
        programQuery(type) {
          if (type==="alive") {
            return this.score.program.filter(function (field) {
              return field.alive;
            })
          }
          return this.score.program.filter(function (field) {
            return field.type === type && field.alive;
          })
        }
        
    },
    computed: {
      sortedFields(){
        var programByStackOrder = this.programQuery("alive");
        return programByStackOrder.sort((a, b) => a.stackOrder < b.stackOrder );
      },
      canvasStyle() {
        var backgroundImage = this.score.backgroundPattern !== "none" ? 'url(/assets/backgrounds/' + this.score.backgroundPattern + '.jpg)' : "white"
        return {
          "--canvas-scale-transform": 'scale(' + this.canvasScale + ')',
          "--canvas-scale": this.canvasScale,
          "--canvas-width": this.score.canvasSize.width + "px",
          "--canvas-height": this.score.canvasSize.height + "px",
          "--canvas-background": backgroundImage,
          "--canvas-background-color": this.score.backgroundColor
        }
      }
    },
    components: {
    FieldText,
    FieldCode,
    FieldMedia,
    FieldShape
}
  }
</script>

<style scoped>

.program-preview {
  width: calc(var(--canvas-width) * var(--canvas-scale));
  height: calc(var(--canvas-height) * var(--canvas-scale));
  align-self: center;
}

.program-preview.full {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.3);
  z-index: 10000;
  display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
}

.program-preview.full .program {
  transform: none;
  margin: 50px auto;
  cursor: zoom-out;
}

 .program {  
   display: inline-block;
    transform: var(--canvas-scale-transform);
    width: var(--canvas-width);
    height: var(--canvas-height);
    background-image: var(--canvas-background);
    background-color: var(--canvas-background-color);
    transform-origin: top left;;
    transition: .1s;
    cursor: zoom-in;
  }
  
 .program.preview.alive {
    animation: background-scroll linear infinite 30s;
  }

.field .rendered-view {
    overflow-wrap: break-word;
    font-size: 75%;
    padding: 5px;
    width: 200px;
    height: 60px;

  }

  .field {
    border: none!important;
    cursor: inherit!important;
  }


  

  h3 {
    background: black;
    position: absolute;
    padding: 5px;
    color: white;
    z-index: 3000;
  }
  

</style>