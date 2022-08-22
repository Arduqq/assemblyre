<template>
<div id="editor-view">
  <div class="canvas-control">
    <input type="checkbox" value="Switch mode" class="mode-toggle" @click="editingPlugs = !editingPlugs"/>            
    <input type="range" min=".1" max="2" step=".1" v-model.number="canvasScale" />

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
    <div class="editor plugs">
      <div class="toolbox"  :class="this.collapsed.includes('toolbox') ? 'collapsed' : ''">
        <div class="starter text" ref="textStarter"></div>
        <div class="starter code" ref="codeStarter"></div>
        <div class="starter shape" ref="shapeStarter"></div>
      <button @click="toggleCollapse('toolbox')" class="collapse-toggle">TOOLS</button>
      </div>
      <div class="sandbox" ref="sandbox">
        <div class="program" ref="program" :style="canvasStyle"> 
          <text-field v-for="chord in chords" 
            :id="chord.id"
            :x="chord.x" 
            :y="chord.y" 
            :modifier="canvasScale"
            :key="chord.id"
            @change="updateFields"/>
          <code-field v-for="code in codes" 
            :id="code.id"
            :x="code.x" 
            :y="code.y" 
            :modifier="canvasScale"
            :key="code.id"
            @change="updateFields"/>
          <media-field v-for="plug in plugs" 
            :id="plug.id"
            :x="plug.x" 
            :y="plug.y" 
            :modifier="canvasScale"
            :media="plug.media" 
            :key="plug.id"
            @change="updateFields"/>
          <shape-field v-for="shape in shapes" 
            :id="shape.id"
            :x="shape.x" 
            :y="shape.y" 
            :modifier="canvasScale"
            :key="shape.id"
            @change="updateFields"/>
          </div>
         </div>
      <div class="mediabox" :class="this.collapsed.includes('mediabox') ? 'collapsed' : ''"  ref="mediabox">
      
        <div class="imagebox"> 
          <linked-image v-for="image in images" :key="image.id" :url="image.url" ref="imageStarters" class="starter media" @rendered-image="initImageStarter"/>
        </div>
       <input type="text" v-model="newImageURL"/>
        <button @click="addImage">Add Image</button>
        
        <button @click="toggleCollapse('mediabox')" class="collapse-toggle">MEDIA</button>
      </div>
    </div>
      <flow-view class="editor flow" :style="editorFocus" :width="width" :height="height" :modifier="canvasScale"/>
   </div>   
</template>

<script>

  import TextField from "../components/TextField.vue";
  import CodeField from "../components/CodeField.vue";
  import MediaField from "../components/MediaField.vue";
  import ShapeField from "../components/ShapeField.vue";
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import LinkedImage from "../components/LinkedImage.vue";
  import FlowView from "../components/FlowView.vue";
  export default {
    name: "EditorView",
    data() {
      return {
        editingPlugs: true,
        panningMode: false,
        score: {
          opus: "Pseudo Program",
          version: "0.1",
          type: "square"
        },
        collapsed: [],
        chords: [],
        images: [],
        plugs: [],
        codes: [],
        shapes: [],
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
      program.style.width = this.width + "px";
      program.style.height = this.height + "px";
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
          this.chords.push({id: uniqueId("chord-"), x: x, y: y, modifier: this.canvasScale});
        },
        addPlug: function(x,y, url) {
          this.plugs.push({id: uniqueId("chord-"), x: x, y: y, modifier: this.canvasScale, media: url});
        },
        addImage: function() {
          this.images.push({id: uniqueId("chord-"), url: this.newImageURL});
        },
        addCode: function(x,y) {
          this.codes.push({id: uniqueId("chord-"), x: x, y: y, modifier: this.canvasScale});
        },
        
        addShape: function(x,y) {
          this.shapes.push({id: uniqueId("chord-"), x: x, y: y, modifier: this.canvasScale});
        },

        updateFields: function(id, value, x, y, w) {
          this.chords = this.chords.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w} : el
          )
          this.plugs = this.plugs.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w} : el
          )
          this.codes = this.codes.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w} : el
          )
          this.shapes = this.shapes.map(el =>
            el.id === id ? { ...el, style: value, x:x, y:y, w:w} : el
          )
        },
        save: async function() {
          var exportFile = {
            chords: this.chords,
            plugs: this.plugs,
            codes: this.codes,
            shapes: this.shapes
          };
        this.exportURL = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportFile,undefined,2));
          console.log(exportFile);
          
        },
        controlSelection: function (control) {
            this.canSelect = !control;

        },
        toggleCollapse: function(container) {
          if (this.collapsed.includes(container)) {
            this.collapsed = this.collapsed.filter(el => el !== container);
          } else {
            this.collapsed.push(container);
          }
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
            "--flow-editor-opacity": .5,
          }
        }
        return {
            "--flow-editor-stack-order": 2,
            "--flow-editor-opacity": 1
          }
      },
      canvasStyle() {
        return {"--canvas-scale": 'scale(' + this.canvasScale + ')' }
      }
    },
    components: {
    TextField,
    CodeField,
    MediaField,
    ShapeField,
    LinkedImage,
    FlowView
}
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .editor-control {
    display: flex;
    flex-flow: row nowrap;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    gap: 30px;
    padding: 10px;
    z-index: 2;
    background: white;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
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

  .editor > *:not(.sandbox) {
    padding-top: 50px;
    transition: .1s;
  }

  .editor > *.collapsed {
    flex: 0;
    padding: 0;
    width: 0;
    gap: 0;
  }

  .sandbox {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  background: transparent;
  }

  .sandbox .program {
    display: block;
    background: rgba(255, 255, 255, .6);
    transform: var(--canvas-scale);
  }
  
  
  .editor > * > .collapse-toggle {
    flex: 1 1 100%;
    width: 50px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    z-index: 1000;
  }

  .toolbox {
    flex: 0 1 10%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    background: white;
  }

  
  .toolbox  .starter {
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

  .mediabox {
    flex: 0 1 20%;
    display: flex;
    flex-flow: column-reverse  wrap-reverse;
    background: white;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  .mediabox > * {
    width: 100%;
    flex: 0 0 auto;
    padding: 0;
  }

  .mediabox .imagebox {
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    flex: 0 0 80%;
  }

  .mediabox .imagebox img {
    flex: 0 0 20%;
    width: 100%;
  }


</style>