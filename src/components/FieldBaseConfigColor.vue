<template>
  <div class="field-config-color field-config-input">
      <img :src="'/assets/icons/' + property + '.png'" /><h3><b>{{property}}:</b> <div class="color-preview" :style="'background-color:' + currentValue"></div></h3>
      <div class="swatch-generator">
        <div class="swatch-generator-control">
          <input type="button" @click="generateColors(359, 'rgb')" value="RGB"/>
          <input type="button" @click="generateColors(0)" value="R"/>
          <input type="button" @click="generateColors(120)" value="G"/>
          <input type="button" @click="generateColors(240)" value="B"/>
        </div>
        <h4>Opacity</h4>
        <input type="range" min="0" max="100" v-model.number="opacity" @change="updateValue()"/>
        <input type="text" v-model="currentValue" @change="updateValue()"/>
      </div>
      
      <div class="swatches">
        <div class="swatch" title="Custom">
          <input :id="group+'-'+property+'--custom'" type="color" v-model="currentValue" @change="updateValue()"/>
          <label :for="group+'-'+property+'--custom'" :style="'background-color:' + currentValue">✨</label>
        </div>
          <div class="swatch"  v-for="(swatch, index) in swatches" :key="index" :title="swatch+alphaToHex(opacity)">
              <input :id="group+'-'+property+'-'+swatch+alphaToHex(opacity)" :name="group" :value="swatch+alphaToHex(opacity)"  type="radio" v-model="currentValue" @change="updateValue()"/>
              <label :for="group+'-'+property+'-'+swatch+alphaToHex(opacity)" :style="'background-color:' + swatch+alphaToHex(opacity)"></label>
          </div>
      </div>
  </div>
</template>

<script>
  import FieldBaseConfigInput from './FieldBaseConfigInput.vue'
  export default {
    name: "FieldConfigColor",
    extends: FieldBaseConfigInput,
    data() {
      return {
        swatches: [],
        lightnessMode: "light",
        opacity: 100
      }
    },
    mounted: function() {
      this.generateColors(359);
    },
    methods: {
      generateColors(hue, mode) {
        this.swatches = [];
        for (let i = 0; i < 15; i++) {
          if (mode === "rgb") {
            hue = Math.floor(Math.random() * 359);
          }
          var saturation = Math.floor(Math.random() * (100 - 50) + 50);
          var lightness = this.lightnessMode==="dark" ?  Math.floor(Math.random() * 50) :  Math.floor(Math.random() * (100 - 50) + 50);
          this.swatches.push(this.hslToHex(hue, saturation, lightness));
        }
        
      },
      /* Thank god for Kamil Kiełczewski
      https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428 */
      hslToHex(h, s, l) {
        
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      },
      alphaToHex() {
        var decimalAlpha = Math.round(this.opacity*255/100);
        return this.opacity < 7 ? "0"+decimalAlpha.toString(16).toUpperCase() : decimalAlpha.toString(16).toUpperCase();

      }
    }
  };
</script>

<style scoped>

  .swatch-generator {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .swatch-generator > * {
    flex: 0 0 100%;
  }

  .swatch-generator .swatch-generator-control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-evenly;
  }
  .swatch-generator .swatch-generator-control input[type="button"] {
    all: unset;
    flex: 0 0 50px;
    text-align: center;
    padding: 2.5px;
    border-radius: 5px;
    color: black;
    background: white;
    transition: .1s;
  }

  .swatch-generator .swatch-generator-control input[type="button"]:hover {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    transform: translate(3px, 3px);
    box-shadow: -1.5px -1.5px 0px 1.5px var(--primary-alt-color);
  }

  .swatch-generator .swatch-generator-control input[type="button"]:active {
    transform: translate(0px, 0px);
    background-color: var(--interact-color);
    box-shadow: none;
  }

  .swatch-generator h4 {
    margin-bottom: 0;
  }
  input[type="range"] {
    
    background-color: var(--primary-alt-color);
    height: 30px;
    color: var(--secondary-color);
    border-radius: 5px;
    padding: 5px;
    border: 1px solid var(--secondary-color);
  }

    .field-config-color .swatches {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 100%;
    }

    .field-config-color .swatches .swatch {
      flex: 0 0 20%;
      text-align: center;
    }

    .field-config-color .swatches label {  
        padding: 10px;
        transition: .1s;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        gap: 20px;
        mix-blend-mode: difference;
        line-height: 0;
    }

    .field-config-color .swatches .swatch input:checked + label {
        padding: 0 20px;
    }


    .field-config-color .swatches input {
        display: none;
    }

    .color-preview {
      width: 50px;
      display: inline-block;
      height: 10px;
      border-radius: 25px;
    }

    
</style>