<template>
<div id="editor-view">
  <div class="canvas-control">        
    <input type="range" min=".1" max="2" step=".1" v-model.number="canvasScale" />
  </div>
  
    <div class="editor-control active" >
      <a class="logo" href="/"></a>
      <label>Title
        <input type="text" v-model="score.opus"/>
      </label>
      <label>Version
        <input type="text" v-model="score.version"/>
      </label>
      {{this.task}}
        
      <button @click="save">save_</button>
      <a v-if="this.exportURL!=null" :href="'data:'+this.exportURL" :download="score.opus + '-' + score.version + '.json'">Download</a>
      <tooltip keyphrase="export-help"/>
    </div>
    
    <div class="editor program.plugs">
      <div class="tool-control">
          <input id="control-text" type="radio" v-model="activeTool" value="text" name="tool"/>
          <label for="control-text">Text</label>
          <input id="control-code" type="radio" v-model="activeTool" value="code" name="tool"/>
          <label for="control-code">Code</label>
          <input id="control-shape" type="radio" v-model="activeTool" value="shape" name="tool"/>
          <label for="control-shape">Shape</label>
          <input id="control-media" type="radio" v-model="activeTool" value="media" name="tool"/>
          <label for="control-media">Media</label>
          <input id="control-background" type="radio" v-model="activeTool" value="background" name="tool"/>
          <label for="control-background">Background</label>
          <input id="control-canvas" type="radio" v-model="activeTool" value="canvas" name="tool"/>
          <label for="control-canvas">Canvas</label>
          <input id="control-layers" type="radio" v-model="activeTool" value="layers" name="tool"/>
          <label for="control-layers">Layers</label>
      </div>

      <div class="tool" v-show="this.activeTool==='text'">
        <h2>Text Presets</h2> <tooltip keyphrase="text-help"/>
        <div class="starter text" ref="textStarter"></div>
      </div>

      <div class="tool" v-show="this.activeTool==='code'">
        <h2>Code Presets</h2> <tooltip keyphrase="code-help"/>
        <div class="starter code" ref="codeStarter"></div>
      </div>

      <div class="tool" v-show="this.activeTool==='shape'">
        <h2>Shape Presets</h2> <tooltip keyphrase="shape-help"/>
        <div class="starter shape" ref="shapeStarter"></div>
      </div>

      <div class="tool layerbox" v-show="this.activeTool==='layers'">
        <h2>Layers</h2> <tooltip keyphrase="layer-help"/>
        <div class="layer" 
          v-for="(field, i) in sortedFields"
            :key="field.id"
            @mouseenter="program[i].active = true; updateFields()"
            @mouseleave="program[i].active = false; updateFields()">
            <input type="text" v-model="program[i].name"/> 
            <button @click="swapOrder(program[i], program[i-1])">↑</button>
            <button @click="swapOrder(program[i], program[i+1])">↓</button> 
        </div>
      </div>
      
      <div class="tool mediabox" v-show="this.activeTool==='media'">
        <div class="imagebox"> 
          <div class="image" v-for="(image, i) in importedImages" :key="image.id" :id="image.id" >
            <button @click="importedImages.splice(i, 1);">delete</button>
            <input type="button" :style="'background-image: url(' + image.url + ')'" @click="dropMedia(image.url)"/>
          </div>
          </div>
        <h2>Gallery</h2> 
       <tooltip keyphrase="image-help"/>
        <button @click="addImage">Add Image</button>
       <input type="text" v-model="newImageURL"/>
       
      </div>

      <div class="tool" v-show="this.activeTool==='background'">
        <h2>Backgrounds</h2> <tooltip keyphrase="background-help"/>
        <input type="radio" name="patterns" value="none" v-model="backgroundPattern"/>
        <input type="radio" name="patterns" value="pattern-1" v-model="backgroundPattern"/>
        <input type="radio" name="patterns" value="pattern-2" v-model="backgroundPattern"/>
        <input type="radio" name="patterns" value="pattern-3" v-model="backgroundPattern"/>
        <input type="radio" name="patterns" value="pattern-4" v-model="backgroundPattern"/>
        <input type="radio" name="patterns" value="pattern-5" v-model="backgroundPattern"/>
      </div>

      <div class="tool canvasbox" v-show="this.activeTool==='canvas'">
        <h2>Canvas Dimensions</h2>
        <label for="canvas-width">width (px)</label>
        <input id="canvas-width" type="number" step="1" v-model.number="canvasSize.width"/>
        <label for="canvas-height">height (px)</label>
        <input id="canvas-height" type="number" step="1" v-model.number="canvasSize.height"/>

        <h2>Canvas Presets</h2>
          <div class="canvas-presets">
            <input id="canvas-1" type="radio" name="dimensions" :value="{width: 1080, height: 1080}" v-model="canvasSize"/>
            <label for="canvas-1">
              <img src="/assets/canvas/canvas-1.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1080px</div>
                <div class="canvas-preset-height">height: 1080px</div>
              </div>
            </label>
            <input id="canvas-2" type="radio" name="dimensions" :value="{width:600, height: 1800}" v-model="canvasSize"/>
            <label for="canvas-2">
              <img src="/assets/canvas/canvas-2.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 600px</div>
                <div class="canvas-preset-height">height: 1800px</div>
              </div>
            </label>
            <input id="canvas-3" type="radio" name="dimensions" :value="{width:1080, height: 1920}" v-model="canvasSize"/>
            <label for="canvas-3">
              <img src="/assets/canvas/canvas-3.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1080px</div>
                <div class="canvas-preset-height">height: 1920px</div>
              </div>
            </label>
            <input id="canvas-4" type="radio" name="dimensions" :value="{width:400, height: 300}" v-model="canvasSize"/>
            <label for="canvas-4">
              <img src="/assets/canvas/canvas-4.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 400px</div>
                <div class="canvas-preset-height">height: 300px</div>
              </div>
            </label>
            <input id="canvas-5" type="radio" name="dimensions" :value="{width:1200, height: 1800}" v-model="canvasSize"/>
            <label for="canvas-5">
              <img src="/assets/canvas/canvas-5.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1200px</div>
                <div class="canvas-preset-height">height: 1800px</div>
              </div>
            </label>
            <input id="canvas-6" type="radio" name="dimensions" :value="{width:1280, height: 720}" v-model="canvasSize"/>
            <label for="canvas-6">
              <img src="/assets/canvas/canvas-6.png"/>
              <div class="canvas-preset-size">
                <div class="canvas-preset-width">width: 1280px</div>
                <div class="canvas-preset-height">height: 720px</div>
              </div>
            </label>
          </div>
      </div>
      <div class="sandbox" ref="sandbox">
        <div class="program" ref="program" :style="canvasStyle"> 
          <field-text v-for="chord in programQuery('text')" 
            :id="chord.id"
            :name=chord.name
            :x="chord.x" 
            :y="chord.y" 
            :alive = chord.alive
            :modifier="canvasScale"
            :lockedResolution="chord.lockedResolution"
            :key="chord.id"
            @change="updateFields"
            :stackOrder = chord.stackOrder
            :active = chord.active />
          <field-code v-for="code in programQuery('code')" 
            :id="code.id"
            :name=code.name
            :x="code.x" 
            :y="code.y" 
            :alive = code.alive
            :modifier="canvasScale"
            :lockedResolution="code.lockedResolution"
            :key="code.id"
            @change="updateFields"
            :stackOrder = code.stackOrder 
            :active = code.active />
          <field-media v-for="plug in programQuery('image')" 
            :id="plug.id"
            :name=plug.name
            :x="plug.x" 
            :y="plug.y" 
            :alive = plug.alive
            :modifier="canvasScale"
            :media="plug.media" 
            :lockedResolution="plug.lockedResolution"
            :key="plug.id"
            @change="updateFields"
            :stackOrder = plug.stackOrder 
            :active = plug.active />
          <field-shape v-for="shape in programQuery('shape')" 
            :id="shape.id"
            :name=shape.name
            :x="shape.x" 
            :y="shape.y" 
            :alive = shape.alive
            :modifier="canvasScale"
            :lockedResolution="shape.lockedResolution"
            :styling="shape.styling"
            :key="shape.id"
            @change="updateFields"
            :stackOrder = shape.stackOrder 
            :active = shape.active />
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
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  export default {
    name: "EditorView",
    data() {
      return {
        panningMode: false,
        activeTool: "text",
        canvasSize: { width: 0, height: 0 },
        backgroundPattern: "none",
        score: {
          opus: "Pseudo Program",
          version: "0.1",
          type: "square"
        },
        program: [],
        importedImages: [],
        newImageURL : "https://imgur.com/ftHNkoG.png",
        exportURL: null,
        screenX: 0,
        screenY: 0,
        canvasScale: 1
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
      task: {
        type: String,
        required: false,
        default: "growth spurt"
      }, 
      import: {
        type: Array,
        required: false,
        default() { return [] }
      }
    },
    mounted: function() {
      this.program = this.import;
      let program = this.$refs.program;
      let textStarter = this.$refs.textStarter;
      let codeStarter = this.$refs.codeStarter;
      let shapeStarter = this.$refs.shapeStarter;
      this.canvasSize.width = this.width;
      this.canvasSize.height = this.height;
      this.initTextStarter(textStarter);
      this.initShapeStarter(shapeStarter);
      this.initCodeStarter(codeStarter);
      this.initDropzone(program);
    },
    methods: {
      initDropzone: function(zone) {
        interact(zone)
          .dropzone({
            accept: ".starter",
            overlap: 1
          })
      },
      initTextStarter: function(starter) {
        starter.setAttribute('data-x', this.x)
        starter.setAttribute('data-y', this.y)
        interact(starter)
          .draggable({
            inertia: false,
            restrict: {
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.dropText
          })
        },
        initCodeStarter: function(starter) {
        starter.setAttribute('data-x', this.x)
        starter.setAttribute('data-y', this.y)
        interact(starter)
          .draggable({
            inertia: false,
            restrict: {
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.dropCode
          })
        },
        initShapeStarter: function(starter) {
        starter.setAttribute('data-x', this.x)
        starter.setAttribute('data-y', this.y)
        interact(starter)
          .draggable({
            inertia: false,
            restrict: {
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: this.dropShape
          })
        },
        dragMoveListener: function(event) {
            var target = event.target,
              x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx,
              y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy;
            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";
            target.style.zIndex = "1000";

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
        },
        dropText: function(event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.addChord(event.screenX, event.screenY);
          this.screenX = 0;
          this.screenY = 0;

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        dropMedia: function(media) {
          this.addPlug(0, 0, media);
        },
        dropCode: function(event) {
          var target = event.target;
          var code = target.getAttribute("data-code");
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.addCode(event.screenX, event.screenY, code);
          this.screenX = 0;
          this.screenY = 0;

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        dropShape: function(event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.addShape(event.screenX, event.screenY);
          this.screenX = 0;
          this.screenY = 0;

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        addChord: function (x, y) {
          const uID = uniqueId();
          const fieldType = "text";
          const field = {id: uID, name: fieldType + "-" + uID, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, stackOrder: parseInt(uID)};
          this.program.push(field);

        },
        addPlug: function(x,y, url) {
          const uID = uniqueId();
          const fieldType = "image";
          const field = {id: uID, name: fieldType + "-" + uID, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, media: url, stackOrder: parseInt(uID)};
          this.program.push(field);
        },
        addImage: function() {
          const fieldType = "import";
          if (this.newImageURL !== "") {
            this.importedImages.push({id: this.importedImages.length, type: fieldType, name: fieldType + "-" + this.importedImages.length, alive: true, url: this.newImageURL});
            this.newImageURL = "";
          }
        },
        addCode: function(x,y) {
          const uID = uniqueId();
          const fieldType = "code";
          const field = {id: uID, name:fieldType + "-" + uID, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, stackOrder: parseInt(uID)};
          this.program.push(field);
        },
        
        addShape: function(x,y) {
          const uID = uniqueId();
          const fieldType = "shape";
          const field = {id: uID, name: fieldType + "-" + uID, type: fieldType, x: x, y: y, alive: true, modifier: this.canvasScale, lockedResolution: false, styling: "default", stackOrder: parseInt(uID)};
          this.program.push(field);
        },

        updateFields: function(id, value, alive, x, y, w, h) {
          this.program = this.program.map(el =>
            el.id === id ? { ...el, style: value, alive:alive, x:x, y:y, w:w, h:h} : el
          )
        },
        save: async function() {
        this.exportURL = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.program,undefined,2));
          
        },
        controlSelection: function (control) {
            this.canSelect = !control;

        },
        
        programQuery(type) {
          if (type==="alive") {
            return this.program.filter(function (field) {
              return field.alive;
            })
          }
          return this.program.filter(function (field) {
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
        return programByStackOrder.sort((a, b) => b.stackOrder - a.stackOrder );
      },
      canvasStyle() {
        var backgroundImage = this.backgroundPattern !== "none" ? 'url(@/../assets/' + this.backgroundPattern + '.jpg)' : "white"
        return {
          "--canvas-scale": 'scale(' + this.canvasScale + ')',
          "--canvas-width": this.canvasSize.width + "px",
          "--canvas-height": this.canvasSize.height + "px",
          "--canvas-background": backgroundImage
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    gap: 30px;
    padding: 10px;
    z-index: 2;
    background: var(--gui-color);
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    color: rgb(235, 235, 235);
    border: 1px solid rgb(191, 146, 195);
  }

  .editor-control > * {
    gap: 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
  }

  .editor-control input {
    flex: 0 1 150px;
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

  .canvas-control {
    position: fixed;
    bottom: 0;
    left: 10%;
    right: 20%;
    margin: 0 auto;
    text-align: center;
    z-index: 100;
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

  .editor.flow {
    z-index: var(--flow-editor-stack-order);
    opacity: var(--flow-editor-opacity);
  }

  .editor > * {
    margin-top: 50px;
    height: calc(100% - 50px);
    transition: .1s;
  }

  .sandbox {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
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
    background: var(--canvas-background);
    transform-origin: top left;;
    transition: .1s;
    margin: 20px;
  }
  

  .tool {
    flex: 0 0 275px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    background: var(--gui-color);
    color: white;
    border: 1px solid rgb(191, 146, 195);
  }

  
  .tool  .starter {
    flex: 0 0 auto;
    height: 200px;
    width: 100%;
    background: url(@/../public/assets/textarea.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  #exported-image {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 100px;
  }

  .tool.mediabox {
    flex: 0 0 275px;
    display: flex;
    flex-flow: column-reverse  wrap-reverse;
    background: var(--gui-color);
    color: white;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid rgb(191, 146, 195);
  }

  .tool-control {
    flex: 0 1 75px;
    display: flex;
    flex-flow: column nowrap;
    background: var(--gui-color);
    color: white;
    height: 100%;
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
  }

  .tool-control label:hover, .tool-control input:checked + label {
    background: #633e5f;
    color: var(--interact-color);
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


</style>