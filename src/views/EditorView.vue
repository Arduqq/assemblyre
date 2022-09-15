<template>
<div id="editor-view">
  <div class="canvas-control">
    <input type="checkbox" value="Switch mode" class="mode-toggle" @click="editingPlugs = !editingPlugs"/>            
    <input type="range" min=".1" max="2" step=".1" v-model.number="canvasScale" />
    <input type="button" @click="previewProgram = !previewProgram"/>
  </div>
  
    <div class="editor-control active" >
      <label>Title
        <input type="text" v-model="score.opus"/>
      </label>
      <label>Version
        <input type="text" v-model="score.version"/>
      </label>
      {{this.task}}
        
      <button @click="save">save_</button>
      <a v-if="this.exportURL!=null" :href="'data:'+this.exportURL" :download="score.opus + '-' + score.version + '.json'">Download</a>
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
        <div class="starter text" ref="textStarter"></div>
      </div>

      <div class="tool" v-show="this.activeTool==='code'">
        <div class="starter code" ref="codeStarter"></div>
      </div>

      <div class="tool" v-show="this.activeTool==='shape'">
        <div class="starter shape" ref="shapeStarter"></div>
      </div>

      <div class="tool layerbox" v-show="this.activeTool==='layers'">
        <div class="layer" 
              v-for="field in program.chords.concat(program.images, program.codes, program.plugs, program.shapes)"
              :key="field.id">{{field.stackOrder}} | {{field.id}}</div>
      </div>
      
      <div class="tool mediabox" v-show="this.activeTool==='media'">
      
        <div class="imagebox"> 
          <linked-image v-for="image in program.images" :key="image.id" :url="image.url" ref="imageStarters" class="starter media" @rendered-image="initImageStarter"/>
        </div>
       <input type="text" v-model="newImageURL"/>
        <button @click="addImage">Add Image</button>
      </div>

      <div class="tool" v-show="this.activeTool==='background'">
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
        <program-preview :program="program" v-show="previewProgram" class="program-preview" :width="canvasSize.width" :height="canvasSize.height"/>
        <div class="program" ref="program" :style="canvasStyle"> 
          <field-text v-for="chord in program.chords" 
            :id="chord.id"
            :x="chord.x" 
            :y="chord.y" 
            :modifier="canvasScale"
            :lockedResolution="chord.lockedResolution"
            :key="chord.id"
            @change="updateFields"/>
          <field-code v-for="code in program.codes" 
            :id="code.id"
            :x="code.x" 
            :y="code.y" 
            :modifier="canvasScale"
            :lockedResolution="code.lockedResolution"
            :key="code.id"
            @change="updateFields"/>
          <field-media v-for="plug in program.plugs" 
            :id="plug.id"
            :x="plug.x" 
            :y="plug.y" 
            :modifier="canvasScale"
            :media="plug.media" 
            :lockedResolution="plug.lockedResolution"
            :key="plug.id"
            @change="updateFields"/>
          <field-shape v-for="shape in program.shapes" 
            :id="shape.id"
            :x="shape.x" 
            :y="shape.y" 
            :modifier="canvasScale"
            :lockedResolution="shape.lockedResolution"
            :styling="shape.styling"
            :key="shape.id"
            @change="updateFields"/>
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
  import LinkedImage from "../components/LinkedImage.vue";
  import ProgramPreview from "../components/ProgramPreview.vue";
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  export default {
    name: "EditorView",
    data() {
      return {
        editingPlugs: true,
        previewProgram: false,
        panningMode: false,
        activeTool: "text",
        canvasSize: { width: 0, height: 0 },
        backgroundPattern: "none",
        score: {
          opus: "Pseudo Program",
          version: "0.1",
          type: "square"
        },
        program: {
          chords: [],
          images: [],
          codes: [],
          plugs: [],
          shapes: []
        },
        programs: [],
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
      }
    },
    mounted: function() {
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
      initImageStarter: function(isRendered) {
        if (isRendered) {
            this.initMediaStarter(this.$refs.imageStarters.at(-1).$el, isRendered);
        }
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
        initMediaStarter: function(starter, media) {
          starter.setAttribute('data-x', this.x)
          starter.setAttribute('data-y', this.y)
          starter.setAttribute('data-media', media)
          interact(starter)
            .draggable({
              inertia: false,
              restrict: {
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
              },
              autoScroll: true,
              onmove: this.dragMoveListener,
              onend: this.dropMedia
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
        sandboxPanListener: function(event) {
          var target = event.target,
            x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx,
            y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy;
            console.log(this.panningMode);
          if (this.panningMode === true) {
            target.firstChild.style.webkitTransform = target.firstChild.style.transform =
              "translate(" + x + "px, " + y + "px)";
          }

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
        dropMedia: function(event) {
          var target = event.target;
          var media = target.getAttribute("data-media");
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.addPlug(event.screenX, event.screenY, media);
          this.screenX = 0;
          this.screenY = 0;

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
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
          this.program.chords.push({id: uniqueId("field-"), x: x, y: y, modifier: this.canvasScale});
        },
        addPlug: function(x,y, url) {
          this.program.plugs.push({id: uniqueId("field-"), x: x, y: y, modifier: this.canvasScale, media: url});
        },
        addImage: function() {
          this.program.images.push({id: uniqueId("field-"), url: this.newImageURL});
        },
        addCode: function(x,y) {
          this.program.codes.push({id: uniqueId("field-"), x: x, y: y, modifier: this.canvasScale});
        },
        
        addShape: function(x,y) {
          this.program.shapes.push({id: uniqueId("field-"), x: x, y: y, modifier: this.canvasScale, lockedResolution: false, styling: "default"});
        },

        updateFields: function(id, value, x, y, w, h) {
          this.program.chords = this.program.chords.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w, h:h} : el
          )
          this.program.plugs = this.program.plugs.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w, h:h} : el
          )
          this.program.codes = this.program.codes.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w, h:h} : el
          )
          this.program.shapes = this.program.shapes.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w, h:h} : el
          )
        },
        save: async function() {
        this.exportURL = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.program,undefined,2));
          
        },
        controlSelection: function (control) {
            this.canSelect = !control;

        },
        
        goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    },
    computed: {
      editorFocus() {
        if (this.editingPlugs) {
          return {
            "--flow-editor-stack-order": 0,
            "--flow-editor-opacity": .8,
          }
        }
        return {
            "--flow-editor-stack-order": 2,
            "--flow-editor-opacity": .9
          }
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
    LinkedImage,
    ProgramPreview
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
    flex: 0 1 100px;
    gap: 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
  }

  .editor-control input {
    flex: 0 1 150px;
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
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
  }

  .tool.layerbox > * {
    flex: 0 0 90%;
    padding: 5px;
    border: 1px solid var(--primary-color);
    background: var(--secondary-alt-color);
    color: var(--primary-color);
  }

  .tool.mediabox > * {
    width: 100%;
    flex: 0 0 auto;
    padding: 0;
  }

  .tool.mediabox .imagebox {
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    flex: 0 0 80%;
  }

  .tool.mediabox .imagebox img {
    flex: 0 0 20%;
    width: 100%;
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

  .program-preview {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 800px;
    height: 600px;
    margin: auto;
    background: white;
  }

</style>