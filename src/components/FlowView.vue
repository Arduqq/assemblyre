<template>
  <div id='flow-view' :style="flowStyle">
    <div class="flow-control">
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
  mounted() {
    var active = false;
    var canvas, pg, colorpicker, button;
    const script = function(p5) {
      p5.setup = () => {
        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent('#flow-view');

        pg = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        pg.parent('#flow-view');

        pg.canvas.remove()
        
        colorpicker = p5.createColorPicker('#ed225d');
        colorpicker.parent('#flow-view');
        colorpicker.position(0, 0, 'fixed');
        
        button = p5.createButton('Reset')
        button.mousePressed(resetGraphic);
        button.parent('#flow-view');
        button.position(0, 50, 'fixed');

        canvas.mousePressed(makeActive);
        canvas.mouseReleased(makeUnactive);
      };
      
      p5.draw = () => {
        handleInput();
        displayDrawing();
      };

      p5.windowResized  = () => {
        var newPG = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        newPG.image(pg, 0, 0, newPG.width, newPG.height);
        pg = newPG;
        
        p5.resizeCanvas(p5.windowWidth, p5.height);
      }

      function handleInput() {
        if (p5.mouseIsPressed && active ) {
          pg.push();
          pg.fill(colorpicker.color());
          variableEllipse(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
          pg.pop();
        }
      }

      function displayDrawing() {
        p5.image(pg, 0,0, p5.windowWidth, p5.windowHeight);
      }

      function resetGraphic() {
        pg.background(252);
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
      return {'--background-pattern': 'url(@/../assets/' + this.backgroundPattern + '.jpg)' }
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--background-pattern);
}
</style>
