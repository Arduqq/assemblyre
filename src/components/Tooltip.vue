<template>
  <div class="tooltip">
    <span>{{icon}}</span>
    <div :id="keyphrase" class="message"></div>
  </div>
</template>
<script>
import DOMPurify from 'dompurify';
  import { marked } from 'marked';
  export default {
  name: "IconTooltip",
    props: {
      icon: {
        type: String,
        required: false,
        default: "?"
      },
      keyphrase: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        renderedMessage: "",
        tips: {
          "text-help": "Text fields display plain text that you can customize further using *Markdown*. You can find a short guide on its features to format your texts. You can use these fields to explain your code, write some prose or express whatever you like.",
          "code-help": "Code fields are suited for writing your pseudocode. Each line can represent a call, a variable, a function, etc. By pressing *Tab*, you can create indents to structure your program. Each line can also be tagged for more flavour.\
             **PRINT** lines could be what the algorithm says, screams, or writes. (e.g. `print('I am done')`. `This cake has {cherry_count} litte cherries on top!`, `END`)\
             **ASSIGN** lines could be assignments and definitions of variables. (e.g. `turnips = 10`, `variable guilt`, `fun <- #people / experiences.with(people[cool])`)\
             **UNASSIGN** lines could be the reverse process of assignment and up to your imagination! Why would one *unassign* a variable? How would you detach something from its definition?\
             **GENERATE** lines could be processes where you create data from an imagined source, like a random generator, a database, or something picking up information from the real world. (e.g. `current_day = pick2({dance, eat, cook, sing})`, `generatePopulation(stigma, paradigm)`, `learn?`)",
          "shape-help": "Shape fields are simple geometrical forms.",
          "image-help": "You can use your own images by uploading them to an image host of your trust, and importing them through their URL. Click on your images in your gallery to put them on the canvas.",
          "background-help": "Like with images, you can import your own backgrounds and use them on your canvas. Backgrounds can be animated which will result in them panning under the canvas.",
          "canvas-help": "You can customize the dimensions of your canvas to fit your code. You placed items will not be adjusted, so beware of possible changes!",
          "layer-help": "Layers are created with every field you add to the canvas. You can adjust what field is on top of which by clicking the respective arrows.",
          "warning": "Features tagged with the **⚠️ warning icon** may cause harm to people vulnerable to parallax movement and fast motions. Please use these features with caution.",
          "export-help": "Here you can give your program the final touches. Find a suitable **title** like *The Great Algorithm*, *How to build a sandwich* or *my code*, give it a **version** (number) like *0.001*, *build-e15* or *twenty* if you like, and save your JSON file. Back at your course page you can submit your work to finish this project."
        }
      }
    },
    mounted: function() {
        this.renderedMessage =  DOMPurify.sanitize(marked.parse(this.tips[this.keyphrase])); 
        const el = document.getElementById(this.keyphrase);
        el.innerHTML = this.renderedMessage
      },
  };
  
  
</script>

<style scoped>
  .tooltip {  
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .tooltip span {
    background: white;
    color: var(--primary-color);
    width: 20px;
    height: 20px;
    font-weight: bold;
    border-radius: 100%;
    text-align: center;
    border: 2px solid var(--secondary-alt-color);
    transition: .1s;
    user-select: none; 
  }

  .tooltip span:hover {
    transform: rotate(360deg);
    background: var(--secondary-alt-color);
    color: white;
  }

  .tooltip .message {
    display:none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    color: black;
    padding: 25px;
    font-size: 90%;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    width: auto;
  }

  .tooltip span:hover + .message {
    display: block;
  }

</style>
