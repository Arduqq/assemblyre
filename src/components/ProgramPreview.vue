<template>
<div id="program-preview">
    <div class="editor program.plugs">

      <div class="sandbox" ref="sandbox" >
        <div class="program" ref="program" > 
          <field-text v-for="chord in programQuery('text')" 
            :id= chord.id 
            :name= chord.name
            :x= chord.x  
            :y= chord.y  
            :w= chord.w  
            :h= chord.h  
            :alive = chord.alive
            :modifier= canvasScale
            :styling= chord.styling
            :lockedResolution= chord.lockedResolution
            :key= chord.id 
            @change= updateFields 
            :stackOrder = chord.stackOrder
            :active = chord.active
            :edit = !programRunning 
            :importData = chord.style />
          <field-code v-for="code in programQuery('code')" 
            :id= code.id 
            :name=code.name
            :x= code.x  
            :y= code.y  
            :w= code.w  
            :h= code.h  
            :alive = code.alive
            :modifier= canvasScale 
            :styling= code.styling
            :lockedResolution= code.lockedResolution 
            :key= code.id 
            @change= updateFields 
            :stackOrder = code.stackOrder 
            :active = code.active
            :edit = !programRunning 
            :importData = code.style />
          <field-media v-for="plug in programQuery('image')" 
            :id= plug.id 
            :name=plug.name
            :x= plug.x  
            :y= plug.y  
            :w= plug.w  
            :h= plug.h  
            :alive = plug.alive
            :modifier= canvasScale 
            :media= plug.media  
            :lockedResolution= plug.lockedResolution 
            :key= plug.id 
            @change= updateFields 
            :stackOrder = plug.stackOrder 
            :active = plug.active
            :edit = !programRunning 
            :importData = plug.style />
          <field-shape v-for="shape in programQuery('shape')" 
            :id= shape.id 
            :name=shape.name
            :x= shape.x  
            :y= shape.y  
            :w= shape.w  
            :h= shape.h  
            :alive = shape.alive
            :modifier= canvasScale 
            :lockedResolution= shape.lockedResolution 
            :styling= shape.styling 
            :key= shape.id 
            @change= updateFields 
            :stackOrder = shape.stackOrder 
            :active = shape.active
            :edit = !programRunning 
            :importData = shape.style />
          </div>

      </div>
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
        programRunning: false,
        canvasScale: 0,
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
      program: {
        type: Object,
        required: false,
        default: "growth"
      }
    },
    mounted: function() {
      /*let program = this.$refs.program;*/
      /*this.score.canvasSize.width = this.width;
      this.score.canvasSize.height = this.height;*/
      this.canvasScale = this.score.canvasSize.width / this.width;

    },
    methods: {
      handleFile(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.importProgram(files[0])
      },

      importProgram(file) {
        var reader = new FileReader();
        var vm = this;
        this.score = {};
        reader.onload = (e) => {
          var json = JSON.parse(e.target.result);
          vm.score = json;
        };
        reader.readAsText(file);
      },
        updateFields: function(id, value, alive, x, y, w, h) {
          this.score.program = this.score.program.map(el =>
            el.id === id ? { ...el, style: value, alive:alive, x:x, y:y, w:w, h:h} : el
          )
        },
        
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
        var backgroundImage = this.score.backgroundPattern !== "none" ? 'url(@/../assets/backgrounds/' + this.score.backgroundPattern + '.jpg)' : "white"
        return {
          "--canvas-scale": 'scale(' + this.canvasScale + ')',
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
    FieldShape,
    Tooltip
}
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  #editor-view {
    height: 100vh;
    width: 100%;
    background: var(--secondary-color);
    position: absolute;
  }
  .editor-control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    gap: 30px;
    padding: 10px;
    z-index: 2;
    background: var(--gui-color);
    font-family: var(--display-font);
    color: rgb(235, 235, 235);
    border: 1px solid rgb(191, 146, 195);
  }

  .editor-control label {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
  .editor-control input {
    flex: 0 1 150px;
    padding: 5px;
  }

  .editor-control .hub-link {
    border-radius: 100%;
  }

  .editor-control .logo {
    width: 40px;
    height: 40px;
    background-image: url('@/../public/assets/assemblyre-logo.png');
    filter: invert(0) contrast(.7);
    background-color: white;
    border-radius: 100%;
    border: 2px solid var(--secondary-alt-color);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .editor-control .task {
    color: var(--primary-color);
    background: white;
    padding: 5px;
    border-radius: 15px;
    border: 3px solid var(--primary-alt-color);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .canvas-control {
    position: fixed;
    bottom: 0;
    left: 350px;
    right: 0;
    margin: 0 auto;
    text-align: center;
    z-index: 100;
    display: flex;
    padding: 20px;
    gap: 20px;
    justify-content: flex-start;
  }

  .editor {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    transition: .1s;
    z-index: 1;
    overflow: hidden;
  }

  .editor > * {
    margin-top: 60px;
    height: calc(100% - 60px);
    transition: .1s;
  }


  .sandbox {
    color: #2c3e50;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1 1 1000px;
    flex-flow: row nowrap;
    color: rgb(235, 235, 235);
    overflow: auto;
  }

  .sandbox .program {
    display: block;
    border: 3px solid var(--gui-color);
    transform: var(--canvas-scale);
    width: var(--canvas-width);
    height: var(--canvas-height);
    background-image: var(--canvas-background);
    background-color: var(--canvas-background-color);
    transform-origin: top left;;
    transition: .1s;
    margin: 20px;
  }
  
  .sandbox .program.preview.alive {
    animation: background-scroll linear infinite 30s;
  }

  .tool {
    flex: 0 0 275px;
    display: flex;
    gap: 20px;
    flex-flow: column nowrap;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: flex-start;
    background: var(--gui-color);
    color: white;
    scrollbar-width: thin;
    padding-bottom: 20px;
    border: 1px solid rgb(191, 146, 195);
  }

  
  .tool  .starter {
    flex: 0 0 80px;
    justify-self: center;
    width: 100%;
  }

  
  .editor .tool .field main, .editor .tool .field .rendered-view {
    overflow-wrap: break-word;
    font-size: 75%;
    padding: 5px;
    width: 200px;
    height: 60px;

  }

  .editor .tool .field {
    position: static;
    width: 250px;
    min-width: 0;
    height: 75px;
    align-items: center;
    justify-content: center;
    display: flex;
    border: none!important;
  }

  .editor .tool .field:hover {
    transform: scale(1.1)!important;
  }

  #exported-image {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 100px;
  }

  .tool.shapebox > .shape{
    width: 40%;
  }

  .tool.mediabox {
    flex: 0 0 275px;
    display: flex;
    flex-flow: column nowrap;
    background: var(--gui-color);
    color: white;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid rgb(191, 146, 195);
  }

  .tool.backgroundbox .backgrounds {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .tool.backgroundbox .backgrounds input[type="color"] {
    all: unset;
    width: 75px;
    height: 75px;
  }

  .tool.backgroundbox:hover .backgrounds .canvas-background label {
    filter: saturate(.5);
  }

  .tool.backgroundbox .backgrounds .canvas-background {
    width: 75px; 
    height: 75px;
    transition: .1s;
    background-size: 200% 200%;
    background-position: 0px 0px;
    border: 1px solid var(--secondary-alt-color);
  }


  .tool.backgroundbox .backgrounds .canvas-background label {
    transition: .1s;
    background-size: 200% 200%;
    background-position: 0px 0px;
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid var(--secondary-alt-color);
  }
  .tool.backgroundbox .backgrounds .canvas-background:hover label {
    animation: background-scroll linear infinite 10s;
    filter: saturate(1);
  }

  .tool.backgroundbox .backgrounds .canvas-background:hover label, .tool.backgroundbox .backgrounds input:checked + label {
    filter: saturate(1);
    border-color: var(--secondary-color);
  }

  .tool.backgroundbox input[type="radio"] {
    display: none;
  }

  .tool-control {
    flex: 0 1 75px;
    display: flex;
    flex-flow: column nowrap;
    background: var(--gui-color);
    overflow-y: auto;
    scrollbar-width: none;
    color: white;
    margin-top: 60px;
    height: calc(100% - 60px);
    align-items: center;
    justify-content: flex-start;
    font-family: var(--display-font);
    border: 1px solid rgb(191, 146, 195);
  }

  .tool-control label {
    flex: 0 0 75px;
    width: 75px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-flow: column nowrap;
    user-select: none;
    font-size: 80%;
  }

  .tool-control label img {
    width: 60%;
  }

  .tool-control label:hover, .tool-control input:checked + label {
    background: #633e5f;
  }

  .tool-control input {
    display: none;
  }

  .tool.layerbox {
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    gap: 5px;
    padding: 5px;
  }


  .tool.layerbox > .layer {
    flex: 1 1 90%;
    padding: 5px;
    background: var(--secondary-alt-color);
    color: var(--primary-color);
    display: flex;
    flex-flow: row nowrap;
    align-content: space-between;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    height: 50px;
    transition: .1s;
    width: 100%;
  }

  .tool.layerbox > .layer:hover {
    height: 60px;
  }

  .tool.layerbox > .layer > * {
    font-size: 100%;
  }

  .tool.layerbox > .layer > button {
    width: 30px;
    height: 30px;
    font-size: 120%;
  }

  .tool.mediabox {
    padding: 5px;
    gap: 5px;
  }
  .tool.mediabox > input[type="text"] {
    width: 100%;
    flex: 0 0 auto;
    padding: 20px;
    height: 20px;
  }

  .tool.mediabox .imagebox {
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 500px;
    padding: 20px;
    overflow-y: scroll;
    scrollbar-width: thin;
  }

  .tool.mediabox .imagebox .image {
    height: 100%;
    max-height: 100px;
    flex: 1 1 40%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    transition: .1s;
  }

  .tool.mediabox .imagebox .image > * {
    flex: 0 0 100%;
    display: block;
  }

  .tool.mediabox .imagebox:hover .image {
    filter: grayscale(1);
  }

  .tool.mediabox .imagebox .image input:last-child {  
    height: 100%;
    background-size: cover;
    width: 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    max-height: 100px;
    outline: none;
    border: none;
  }

  .tool.mediabox .imagebox .image:hover{
    filter: grayscale(0);
    transform: scale(1.1);
  }

  .tool.mediabox .imagebox .image:active {
    transform: scale(1);
  }

  .tool.canvasbox .canvas-presets input {
    display:none
  }

  .tool.canvasbox .canvas-presets input:checked + label {
    filter: brightness(1.2);
  }
  .tool.canvasbox .canvas-presets {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
    overflow-y: scroll;
    scrollbar-width: thin;
    margin-bottom: 50px;
  }
  .tool.canvasbox .canvas-presets > label {
    flex: 0 0 100%;
    padding: 20px;
    display: flex;
    transition: .1s;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--gui-color);
  }

  .tool.canvasbox .canvas-presets > label img {
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
  }

  .tool.canvasbox .canvas-presets > label .canvas-preset-size {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end
  }

  .tool.canvasbox .canvas-presets > label .canvas-preset-size  > * {
    flex: 0 0 100%;
    color: var(--secondary-alt-color);
  }

  #run-button {
    display: none;
  }

  #run-button + label {
    display: block;
    height: 50px;
    width: 200px;
    border-radius: 50px;
    padding: 0 20px;
    transition: .1s;
    background: var(--gui-color);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    flex-flow: row nowrap;
    display: flex;
    justify-content: space-around;
  }


  #run-button:checked + label {
    background: var(--success-color);
    transform: scale(1);
    width: 300px;
    border-left: 5px solid var(--gui-color);
    border-right: 5px solid var(--gui-color);

  }
  #run-button + label:hover {
    transform: scale(1.1);
  }

  #run-button:checked + label:hover {
    transform: scale(1);
  }

  #run-button:checked + label:before {
    content: '▶ Running';
  }
  #run-button + label:before {
    content: '▶ Run';
    color: white;
    font-size: 200%;
    text-align: center;
  }

</style>