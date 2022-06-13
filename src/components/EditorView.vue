<template>
  <div class="editor">
    <div class="toolbox">
      <div class="starter text" ref="textStarter"></div>
      <div class="starter media" ref="mediaStarter"></div>
    </div>
    <div class="sandbox" ref="sandbox">
      <text-field v-for="chord in chords" :x="chord.x" :y="chord.y" :width="chord.width" :height="chord.height" :key="chord.id"></text-field>
      <media-field v-for="plug in plugs" :x="plug.x" :y="plug.y" :width="plug.width" :height="plug.height" media="sample.jpg" :key="plug.id"></media-field>
    </div>
    <div class="mediabox" ref="mediabox">

    </div>
  </div>
      
</template>

<script>
  /* import interact from "interactjs"; */
  import TextField from "./TextField.vue";
  import MediaField from "./MediaField.vue";
  import interact from "interactjs";
  import uniqueId from 'lodash.uniqueid';
  export default {
    name: "EditorView",
    data() {
      return {
        canSelect: true,
        chords: [],
        plugs: [],
        screenX: 0,
        screenY: 0
      };
    },
    mounted: function() {
      let sandbox = this.$refs.sandbox;
      let textStarter = this.$refs.textStarter;
      let mediaStarter = this.$refs.mediaStarter;
      this.initTextStarter(textStarter);
      this.initMediaStarter(mediaStarter);
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
        initMediaStarter: function(starter) {
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
              onend: this.dropMedia
            })
        },
        dragMoveListener: function(event) {
            var target = event.target,
              x = (parseFloat(target.getAttribute("data-x")) || this.screenX) + event.dx,
              y = (parseFloat(target.getAttribute("data-y")) || this.screenY) + event.dy;
            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";

            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
        },
        dropText: function(event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.screenX = 0;
          this.screenY = 0;
          this.addChord(event.clientX, event.clientY);

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        dropMedia: function(event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
              "translate(" + 0 + "px, " + 0 + "px)";
          this.screenX = 0;
          this.screenY = 0;
          this.addPlug(event.clientX, event.clientY);

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
        addChord: function (x, y) {
          this.chords.push({id: uniqueId("chord-"), x: x, y: y, width: 100, height: 30});
        },
        addPlug: function(x,y) {
          this.plugs.push({id: uniqueId("plug-"), x: x, y: y, width: 100, height: 30});
        },
        controlSelection: function (control) {
            this.canSelect = !control;

        }
    },
    components: {
      TextField,
      MediaField
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .editor {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row wrap;
  }

  .sandbox {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: block;
  flex: 0 0 70%;
  background-color: #fbfbff;
  background-image:  linear-gradient(#ffe9fa 2px, transparent 2px), linear-gradient(90deg, #ffe9fa 2px, transparent 2px), linear-gradient(#ffe9fa 1px, transparent 1px), linear-gradient(90deg, #ffe9fa 1px, #fbfbff 1px);
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
  }

  .mediabox {
    flex: 0 0 20%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
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