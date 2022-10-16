<template>
<div id="editor-view">
  <div class="canvas-control">     
    <input type="checkbox" id="run-button" v-model="programRunning" />
    <label for="run-button"></label>
    <tooltip keyphrase="run-help" icon="⚠️"/>
    x{{canvasScale}}<input type="range" min=".1" max="2" step=".1" v-model.number="canvasScale" />
  </div>
  
    <div class="editor-control active" >
      <a class="logo" title="Back to Start" href="/"></a>
      <router-link :title="'Back to ' + this.user.toUpperCase() + ' Hub'" class="hub-link route" :to="{ name: 'hub', params: { userCode: this.user }}" >{{participants[user]}}</router-link>
      <input type="file" id="import-file" value="Import" @change="handleFile"/>
      <label>Title
        <input type="text" v-model="score.opus"/>
      </label>
      <label>Version
        <input type="text" v-model="score.version"/>
      </label>
      <span class="task">{{this.user}} {{this.task}} <tooltip icon="⭐" :keyphrase="task"/></span>
        
      <button @click="save">save_</button>
      <a v-if="this.exportURL!=null" :href="'data:'+this.exportURL" :download="score.opus + '-' + score.version + '.json'">Download</a>
      <tooltip keyphrase="export-help"/>
    </div>
    
    <div class="editor program.plugs">
      <div class="tool-control">
          <input id="control-text" type="radio" v-model="activeTool" value="text" name="tool"/>
          <label for="control-text"><img src="/assets/icons/text.png" />Text</label>
          <input id="control-code" type="radio" v-model="activeTool" value="code" name="tool"/>
          <label for="control-code"><img src="/assets/icons/code.png" />Code</label>
          <input id="control-shape" type="radio" v-model="activeTool" value="shape" name="tool"/>
          <label for="control-shape"><img src="/assets/icons/shape.png" />Shape</label>
          <input id="control-media" type="radio" v-model="activeTool" value="media" name="tool"/>
          <label for="control-media"><img src="/assets/icons/image.png" />Image</label>
          <input id="control-background" type="radio" v-model="activeTool" value="background" name="tool"/>
          <label for="control-background"><img src="/assets/icons/background.png" />Background</label>
          <input id="control-canvas" type="radio" v-model="activeTool" value="canvas" name="tool"/>
          <label for="control-canvas"><img src="/assets/icons/canvas.png" />Canvas</label>
          <input id="control-layers" type="radio" v-model="activeTool" value="layers" name="tool"/>
          <label for="control-layers"><img src="/assets/icons/layers.png" />Layers</label>
      </div>

      <div class="tool" v-show="this.activeTool==='text'">
        <h2>Text Presets</h2> <tooltip keyphrase="text-help"/>
        <div class="starter text" @click="addChord(0, 0, styling[0])" v-for="(styling, i) in Object.entries(styles.text)" :key="i">
          <field-text
            :id= "'starter-text-' + styling[0]"
            :name= "'starter-text-' + styling[0]"
            :x= 0  
            :y= 0 
            :alive = true
            :modifier= 1
            :styling= styling[0]
            :lockedResolution= false
            :stackOrder = 1
            :active = false
            :edit = false />
        </div>
      </div>

      <div class="tool" v-show="this.activeTool==='code'">
        <h2>Code Presets</h2> <tooltip keyphrase="code-help"/>
        <div class="starter code" @click="addCode(0, 0, styling[0])" v-for="(styling, i) in Object.entries(styles.code)" :key="i">
          <field-code
            :id= "'starter-code-' + styling[0]"
            :name= "'starter-code-' + styling[0]"
            :x= 0  
            :y= 0 
            :alive = true
            :modifier= 1
            :styling= styling[0]
            :lockedResolution= false
            :stackOrder = 1
            :active = false
            :edit = false />
        </div>
      </div>

      <div class="tool shapebox" v-show="this.activeTool==='shape'">
        <h2>Shape Presets</h2> <tooltip keyphrase="shape-help"/>
        <div class="starter shape" @click="addShape(0, 0, styling[0])" v-for="(styling, i) in Object.entries(styles.shape)" :key="i">
          <field-shape
            :id= "'starter-shape-' + styling[0]"
            :name= "'starter-shape-' + styling[0]"
            :x= 0  
            :y= 0 
            :alive = true
            :modifier= 1
            :styling= styling[0]
            :lockedResolution= false
            :stackOrder = 1
            :active = false
            :edit = false />
        </div>
      </div>

      <div class="tool layerbox" v-show="this.activeTool==='layers'">
        <h2>Layers</h2> <tooltip keyphrase="layer-help"/>
        <div class="layer" 
          v-for="(field, i) in sortedFields"
            :key="field.id"
            @mouseenter="sortedFields[i].active = true; updateFields()"
            @mouseleave="sortedFields[i].active = false; updateFields()">
            <input type="text" v-model="score.program[parseInt(field.id)-1].name"/> 
            <button @click="swapOrder(sortedFields[i], sortedFields[i-1])">↑</button>
            <button @click="swapOrder(sortedFields[i], sortedFields[i+1])">↓</button> 
        </div>
      </div>
      
      <div class="tool mediabox" v-show="this.activeTool==='media'">
        <h2>Gallery</h2> 
       <tooltip keyphrase="image-help"/>
       <input type="text" v-model="newImageURL"/>
      <button @click="addImage">Add Image</button>
        <div class="imagebox"> 
          <div class="image" v-for="(image, i) in importedImages" :key="image.id" :id="image.id" >
            <button @click="importedImages.splice(i, 1);">delete</button>
            <input type="button" :style="'background-image: url(' + image.url + ')'" @click="addPlug(0, 0, image.url)"/>
          </div>
        </div>
       
      </div>

      <div class="tool backgroundbox" v-show="this.activeTool==='background'">
        <h2>Backgrounds</h2> <tooltip keyphrase="background-help"/>
          
          <div class="backgrounds">
            <div class="canvas-background">
              <input type="color" name="patterns" id="background-color" v-model="score.backgroundColor"/>
            </div>
            <div class="canvas-background">
              <input type="radio" name="patterns" value="none" id="canvas-background-none" v-model="score.backgroundPattern"/>
              <label for="canvas-background-none" :style="'background-image: none'"></label>
            </div>
            <div v-for="(bg,i) in this.backgroundImages" :key="i" class="canvas-background">
              <input type="radio" name="patterns" :value="bg" :id="'canvas-background-'+bg" v-model="score.backgroundPattern"/>
              <label :for="'canvas-background-'+bg" :style="'background-image: url(/assets/backgrounds/'+ bg + '.jpg)'"></label>
            </div>
          </div>
          <tooltip keyphrase="warning" icon="⚠️"/>
          <label>Allow background scrolling
            <input type="checkbox" v-model="allowScroll">
          </label>
        </div>

      <div class="tool canvasbox" v-show="this.activeTool==='canvas'">
        <h2>Canvas Dimensions</h2>
        <label for="canvas-width">width (px)</label>
        <input id="canvas-width" type="number" step="1" v-model.number="score.canvasSize.width"/>
        <label for="canvas-height">height (px)</label>
        <input id="canvas-height" type="number" step="1" v-model.number="score.canvasSize.height"/>

        <h2>Canvas Presets</h2>
          <div class="canvas-presets">
            <input id="canvas-1" type="radio" name="dimensions" :value="{width: 1080, height: 1080}" v-model="score.canvasSize"/>
            <label for="canvas-1">
              <img src="/assets/canvas/canvas-1.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1080px</div>
                <div class="canvas-preset-height">height: 1080px</div>
              </div>
            </label>
            <input id="canvas-2" type="radio" name="dimensions" :value="{width:600, height: 1800}" v-model="score.canvasSize"/>
            <label for="canvas-2">
              <img src="/assets/canvas/canvas-2.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 600px</div>
                <div class="canvas-preset-height">height: 1800px</div>
              </div>
            </label>
            <input id="canvas-3" type="radio" name="dimensions" :value="{width:1080, height: 1920}" v-model="score.canvasSize"/>
            <label for="canvas-3">
              <img src="/assets/canvas/canvas-3.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1080px</div>
                <div class="canvas-preset-height">height: 1920px</div>
              </div>
            </label>
            <input id="canvas-4" type="radio" name="dimensions" :value="{width:400, height: 300}" v-model="score.canvasSize"/>
            <label for="canvas-4">
              <img src="/assets/canvas/canvas-4.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 400px</div>
                <div class="canvas-preset-height">height: 300px</div>
              </div>
            </label>
            <input id="canvas-5" type="radio" name="dimensions" :value="{width:1200, height: 1800}" v-model="score.canvasSize"/>
            <label for="canvas-5">
              <img src="/assets/canvas/canvas-5.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1200px</div>
                <div class="canvas-preset-height">height: 1800px</div>
              </div>
            </label>
            <input id="canvas-6" type="radio" name="dimensions" :value="{width:1280, height: 720}" v-model="score.canvasSize"/>
            <label for="canvas-6">
              <img src="/assets/canvas/canvas-6.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1280px</div>
                <div class="canvas-preset-height">height: 720px</div>
              </div>
            </label>
          </div>
      </div>
      <div class="sandbox" ref="sandbox" >
        <div class="program" ref="program" :style="canvasStyle" :class="{'preview': programRunning, 'alive' : allowScroll} "> 
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

  import FieldText from "../components/FieldText.vue";
  import FieldCode from "../components/FieldCode.vue";
  import FieldMedia from "../components/FieldMedia.vue";
  import FieldShape from "../components/FieldShape.vue";
  import Tooltip from "../components/Tooltip.vue";
  import uniqueId from 'lodash.uniqueid';
  import styles from '../json/styles.json'

  export default {
    name: "EditorView",
    data() {
      return {
        panningMode: false,
        activeTool: "text",
        score: {
          opus: "Pseudo Program",
          version: "0.1",
          backgroundPattern: "none",
          backgroundColor: "white",
          program: [],
          canvasSize: { width: 800, height: 600 },
        },
        importedImages: [],
        newImageURL : "https://imgur.com/ftHNkoG.png",
        exportURL: null,
        screenX: 0,
        screenY: 0,
        canvasScale: 1,
        programRunning: false,
        allowScroll: false,
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
        styles: styles,
        backgroundImages: [ "asphalt", "bricks-1", "bricks-2", "bricks-3", "bricks-4", "building-1", "building-2", "building-3", "building-4", "building-5", "building-6", "building-7", "building-8", "building-9", "circuit", "clover", "door-1", "door-2", "dots-1", "dots-2", "flame-1", "flame-2", "flowers-1", "flowers-2", "giraffe", "leather", "machine", "pasta", "pattern-1", "pattern-10", "pattern-11", "pattern-12", "pattern-13", "pattern-14", "pattern-15", "pattern-16", "pattern-17", "pattern-18", "pattern-19", "pattern-2", "pattern-20", "pattern-21", "pattern-22", "pattern-23", "pattern-24", "pattern-25", "pattern-26", "pattern-27", "pattern-28", "pattern-29", "pattern-3", "pattern-30", "pattern-31", "pattern-32", "pattern-33", "pattern-34", "pattern-35", "pattern-36", "pattern-37", "pattern-4", "pattern-5", "pattern-6", "pattern-7", "pattern-8", "pattern-9", "plants", "plate", "rock-1", "rock-2", "rock-3", "rock-4", "shell", "siberian", "sponge", "stars", "tiger", "water", "windows-1", "windows-2", "wool-1", "wool-2"]
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
      user: {
        type: String,
        required: false,
        default: "growth"
      },
      task: {
        type: String,
        required: false,
        default: "spurt"
      }
    },
    mounted: function() {
      /*let program = this.$refs.program;*/
      this.score.canvasSize.width = this.width;
      this.score.canvasSize.height = this.height;
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
        addChord: function (x, y, style) {
          const uID = uniqueId();
          const fieldType = "text";
          const field = {id: uID, name: fieldType + "-" + uID, styling: style, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, stackOrder: parseInt(uID)};
          this.score.program.push(field);

        },
        addPlug: function(x,y, url) {
          const uID = uniqueId();
          const fieldType = "image";
          const field = {id: uID, name: fieldType + "-" + uID, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, media: url, stackOrder: parseInt(uID)};
          this.score.program.push(field);
        },
        addImage: function() {
          const fieldType = "import";
          if (this.newImageURL !== "") {
            this.importedImages.push({id: this.importedImages.length, type: fieldType, name: fieldType + "-" + this.importedImages.length, alive: true, url: this.newImageURL});
            this.newImageURL = "";
          }
        },
        addCode: function(x,y, style) {
          const uID = uniqueId();
          const fieldType = "code";
          const field = {id: uID, name:fieldType + "-" + uID, styling: style, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, stackOrder: parseInt(uID)};
          this.score.program.push(field);
        },
        
        addShape: function(x,y, style) {
          const uID = uniqueId();
          const fieldType = "shape";
          const field = {id: uID, name: fieldType + "-" + uID, styling: style, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, lockedResolution: false, stackOrder: parseInt(uID)};
          this.score.program.push(field);
        },

        updateFields: function(id, value, alive, x, y, w, h) {
          this.score.program = this.score.program.map(el =>
            el.id === id ? { ...el, style: value, alive:alive, x:x, y:y, w:w, h:h} : el
          )
        },
        save: async function() {
        this.exportURL = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.score,undefined,2));
          
        },

        controlSelection: function (control) {
            this.canSelect = !control;

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
        },
        goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        swapOrder(a, b) {
          if (a !== undefined && b !== undefined) {
            [a.stackOrder, b.stackOrder] = [b.stackOrder, a.stackOrder]
          }
        },
        
    },
    computed: {
      sortedFields(){
        var programByStackOrder = this.programQuery("alive");
        return programByStackOrder.sort((a, b) => a.stackOrder < b.stackOrder );
      },
      canvasStyle() {
        var backgroundImage = this.score.backgroundPattern !== "none" ? 'url(/assets/backgrounds/' + this.score.backgroundPattern + '.jpg)' : "white"
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

  .starter.code .program-input, .starter.code .program-output {
    display: none;
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