<template>
<div id="editor-view">
  <input type="checkbox" value="Switch mode" class="mode-toggle" @click="editingPlugs = !editingPlugs"/>
    <div class="editor plugs" >
      <div class="toolbox">
        <div class="starter text" ref="textStarter"></div>
        <div class="starter code" ref="codeStarter"></div>
      </div>
      <div class="sandbox" ref="sandbox">
        <text-field v-for="chord in chords" :x="chord.x" :y="chord.y" :width="chord.width" :height="chord.height" :key="chord.id"></text-field>
        <code-field v-for="code in codes" :x="code.x" :y="code.y" :width="code.width" :height="code.height" :key="code.id"></code-field>
        <media-field v-for="plug in plugs" :x="plug.x" :y="plug.y" :width="plug.width" :height="plug.height" :media="plug.media" :key="plug.id"></media-field>
      </div>
      <div class="mediabox" ref="mediabox">
        <div class="imagebox"> 
          <linked-image v-for="image in images" :key="image.id" :url="image.url" ref="imageStarters" class="starter media" @rendered-image="initImageStarter"/>
        </div>
       <input type="text" v-model="newImageURL"/>
        <button @click="addImage">Add Image</button>
      </div>
    </div>
    <div class="editor flow" :style="editorFocus">
      <flow-view/>
    </div>
   </div>   
</template>

<script>
  /* import interact from "interactjs"; */
  import TextField from "./TextField.vue";
  import CodeField from "./CodeField.vue";
  import MediaField from "./MediaField.vue";
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  import LinkedImage from "./LinkedImage.vue";
  import FlowView from "./FlowView.vue";
  export default {
    name: "EditorView",
    data() {
      return {
        editingPlugs: true,
        chords: [],
        images: [],
        plugs: [],
        codes: [],
        newImageURL : "https://imgur.com/ftHNkoG.png",
        screenX: 0,
        screenY: 0
      };
    },
    mounted: function() {
      let sandbox = this.$refs.sandbox;
      let textStarter = this.$refs.textStarter;
      let codeStarter = this.$refs.codeStarter;
      this.initTextStarter(textStarter);
      this.initCodeStarter(codeStarter);
      this.initDropzone(sandbox);
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

            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
        },
        dropText: function(event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.addChord(event.clientX-200, event.clientY-70);
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
          this.screenX = 0;
          this.screenY = 0;
          this.addPlug(event.clientX-200, event.clientY-70, media);

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        dropCode: function(event) {
          var target = event.target;
          var code = target.getAttribute("data-code");
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.screenX = 0;
          this.screenY = 0;
          this.addCode(event.clientX-200, event.clientY-70, code);

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        addChord: function (x, y) {
          this.chords.push({id: uniqueId("chord-"), x: x, y: y, width: 100, height: 30});
        },
        addPlug: function(x,y, url) {
          this.plugs.push({id: uniqueId("plug-"), x: x, y: y, width: 100, height: 30, media: url});
        },
        addImage: function() {
          this.images.push({id: uniqueId("image-"), url: this.newImageURL});
        },
        addCode: function(x,y) {
          this.codes.push({id: uniqueId("chord-"), x: x, y: y, width: 100, height: 30});
        },
        controlSelection: function (control) {
            this.canSelect = !control;

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
            "--flow-editor-opacity": .8
          }
      }
    },
    components: {
    TextField,
    CodeField,
    MediaField,
    LinkedImage,
    FlowView
}
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .mode-toggle {
    position: fixed;
    top:0;
    left:0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    height: 50px;
    z-index: 100;
  }

  .editor {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    transition: .1s;
    z-index: 1;
    overflow: hidden;
  }

  .editor.flow {
    z-index: var(--flow-editor-stack-order);
    opacity: var(--flow-editor-opacity);
  }

  .sandbox {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: block;
  flex: 0 0 70%;
  background-color: transparent;
  background-image:  linear-gradient(#ffe9fa 2px, transparent 2px), linear-gradient(90deg, #ffe9fa 2px, transparent 2px), linear-gradient(#ffe9fa 1px, transparent 1px), linear-gradient(90deg, #ffe9fa 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }

  .toolbox {
    flex: 0 0 10%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: white;
    border-left: 2px solid #2c3e50;
  }

  .mediabox {
    flex: 0 0 20%;
    display: flex;
    flex-flow: column nowrap;
    padding: 20px;
    height: 100vh;
    border-right: 2px solid #2c3e50;
  }

  .mediabox .imagebox {
    display: flex;
    flex-flow: column wrap;
    gap: 5px;
    align-items: center;
    height: 80%;
    width: auto;
    flex: 0 0 80%;
  }

  .mediabox .imagebox img {
    flex: 0 1 50px;
    max-height: 50px;
    height: auto;
  }

  .mediabox input {
    flex: 0 0 10%;
  }

  .toolbox  .starter {
    flex: 0 0 100%;
    height: 200px;
    width: 100%;
    background: url(@/../public/assets/textarea.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

</style>