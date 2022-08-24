<template>
  <div id='flow-view' :style="flowStyle">
    <div id="flow-control">
      <input type="radio" name="patterns" value="pattern-1" v-model="backgroundPattern"/>
      <input type="radio" name="patterns" value="pattern-2" v-model="backgroundPattern"/>
      <input type="radio" name="patterns" value="pattern-3" v-model="backgroundPattern"/>
      <input type="radio" name="patterns" value="pattern-4" v-model="backgroundPattern"/>
      <input type="radio" name="patterns" value="pattern-5" v-model="backgroundPattern"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlowView',
  props: {
    width: {
      type: Number,
      required: false,
      default: 800,
    },
    height: {
      type: Number,
      required: false,
      default: 600
    },
    modifier: {
      type: Number,
      required: false,
      default: 1
    }
  },
  mounted() {
    var active = false;
    var canvas, pg, colorpicker, button;
    var width = this.width;
    var height = this.height;
    var offset = this.modifier;
    const script = function(p5) {
      p5.setup = () => {
        canvas = p5.createCanvas(width, height);
        canvas.parent('#flow-view');

        pg = p5.createGraphics(width, height);
        pg.parent('#flow-view');

        pg.canvas.remove()
        
        colorpicker = p5.createColorPicker('#ed225d');
        colorpicker.parent('#flow-control');
        
        button = p5.createButton('Reset')
        button.mousePressed(resetGraphic);
        button.parent('#flow-control');

        canvas.mousePressed(makeActive);
        canvas.mouseReleased(makeUnactive);
      };
      
      p5.draw = () => {
        handleInput();
        displayDrawing();
      };

      p5.windowResized  = () => {
        var newPG = p5.createGraphics(width, height);
        newPG.image(pg, 0, 0, newPG.width, newPG.height);
        pg = newPG;
        
        p5.resizeCanvas(width, p5.height);
      }

      function handleInput() {
        if (p5.mouseIsPressed && active ) {
          pg.push();
          pg.fill(colorpicker.color());
          variableEllipse(p5.mouseX/offset, p5.mouseY/offset, p5.pmouseX/offset, p5.pmouseY/offset);
          pg.pop();
        }
      }

      function displayDrawing() {
        p5.image(pg, 0,0, width, height);
      }

      function resetGraphic() {
        p5.reset()
      }
      
      function makeActive() {
        active = true;
      }
      function makeUnactive() {
        active = false;
      }
      function variableEllipse(x, y, px, py) {
        var speed = p5.abs(x - px) + p5.abs(y - py);
        pg.stroke(speed);
        pg.ellipse(x, y, speed, speed);
      }
    };
    
    const P5 = require('p5');
    new P5(script);
  },
  data() {
    return {
      backgroundPattern: "pattern-1",
    }
  },
  computed: {
    flowStyle() {
      return {
        '--background-pattern': 'url(@/../assets/' + this.backgroundPattern + '.jpg)' ,
        '--canvas-scale': 'scale(' + this.modifier + ')',
        '--canvas-width': this.width + 'px',
        '--canvas-height': this.height + 'px',
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#flow-view {
  display: block;
  position: absolute;
  margin: 0 auto;
  padding: 0;
  width: var(--canvas-width);
  height: var(--canvas-height);
  overflow: hidden;
  background: var(--background-pattern);
  transform: var(--canvas-scale);
  left: 400px;
  right: 0;
  top: 52px;
}

#flow-control {
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
}

</style>
