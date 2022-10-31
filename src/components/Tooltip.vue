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
          "shape-help": "Shape fields are simple geometrical forms. Shapes currently do not support borders or shadows.",
          "image-help": "You can use your own images by uploading them to an image host of your trust, and importing them through their URL. Click on your images in your gallery to put them on the canvas.",
          "background-help": "Like with images, you can import your own backgrounds and use them on your canvas. Backgrounds can be animated which will result in them panning under the canvas.",
          "canvas-help": "You can customize the dimensions of your canvas to fit your code. You placed items will not be adjusted, so beware of possible changes!",
          "layer-help": "Layers are created with every field you add to the canvas. You can adjust what field is on top of which by clicking the respective arrows.",
          "warning": "Features tagged with the **⚠️ warning icon** may cause harm to people vulnerable to parallax movement and fast motions. Please use these features with caution. Programs featuring these functions, I tagged as such in the preview for other people.",
          "export-help": "Here you can give your program the final touches. Find a suitable **title** like *The Great Algorithm*, *How to build a sandwich* or *my code*, give it a **version** (number) like *0.001*, *build-e15* or *twenty* if you like, and save your JSON file. Back at your course page you can submit your work to finish this project.",
          "leaf": "Data forms an opportunity to convey data not only to computers, but to us. What role does data play to a machine compared to a human being? Is data an objective representation of information? What kind of data would you like to gather? How would you try to do that? What would you do with the data and in which ways would you share it, if so? Imagine a button that would jumpstart a variety of tasks invisible to you. Do these buttons exist and where? How would you make such a button appealing to press? Have you ever “datafied” yourself? What were your experiences back then compared to this very moment?",
          "twig": "When do you encounter loops in daily life? Think of them in the digital and analogue context! How do loops represent (or even steal) time? What the conditions of your loop? What are the variables? Have you encountered infinite loops in daily life? What is needed TO loop? Can we think of lifecycles as loops? Where are the boundaries?",
          "branch": "When do you encounter loops in daily life? Think of them in the digital and analogue context! How do loops represent (or even steal) time? What the conditions of your loop? What are the variables?Have you encountered infinite loops in daily life? What is needed TO loop? Can we think of lifecycles as loops? Where are the boundaries?",
          "fruit": "Picture an object. What properties does it have, and how can we interact with it? Try to model yourself in an object. Start with a very basic representation of yourself and put your Me-object into simple scenarios? What would the scenario need from you? How would you want to improve your object for new scenarios? Could a computer help you improve your Me-object, or would it make things difficult? Think of a game that you played sometime! What objects might have been used? Try to imagine a game yourself and how you could implement it! Which parts of the real world would need to be abstracted?",
          "vine": "With large databases, developers create contact points for you to see, query and process. These so-called APIs are possibilities for you to explore complex data that others have gathered in the scope of the internet. Which large databases would you like to explore? Whose API would you like to query, and what would you use it for? Think more about the API that you would like to address! What are its capabilities? What does it tell about the instance providing you with that information? How and why would you process your desired data from that API? Do you have any concerns regarding the public APIs? How could power dynamics be exploited with such a concept? Who would you share your API with? What if there was an API for you as a human being - or does it already exist?",
          "seed": "Look at the creative works others have produced. What might have they used to achieve it? Try to decompose their process and how you would tackle it. What resources would you need? Where would you apply them, and what would be your result? Who is someone who understands code? What makes people interact with code? Where are technology and code intertwined? Picture possible interactions between you and a machine? Are there possible dangers with people understanding code that you do not? Is coding a process of writing text, or is it something else? What does your piece mean to you? Would you like to turn your pseudocode into something real? Do you believe society has the capabilities to produce the code you wrote?",
          "tree": "In your course, you have been playing around with the editor to create diagrams of programs from the very beginning. Use this exercise to maybe create a piece that hasn’t really fit into any of the other courses. Try to imagine that someone else is reading your code: How can you make it understandable, clear and as transparent as possible? How would you convey the “flow of information” with the graphical tools provided? You may even just create a flowchart as explained above. Would you stick to the geometric forms presented? Look at your previous work! What has been the most complex work until now? How could you make it more concise? How could you make it even more complex? Do you think that simplifying, making your code as clear as possible, is something one should always keep in mind? What is the main problem with communicating your code in the most simple ways while remaining a complex code base? What are the technical challenges?",
          "thicket": "Where do you see the duality of children learning, and machines learning? Where are its boundaries? From your understanding of designing a learning task, conceptualize a model that could solve some issue. What are the benefits of machine learning to you personally, and where would you draw the line? If machines are fit to learn, how would you implement them in a societal context? What is the common perception of machine learning in your daily life? How do you think different kinds of people perceive the possibilities of learning models? What could be done to further communicate their potential and its benefits and dangers? Generate some images or other kinds of media yourself! What do you see? What do you think went into its generation? Would you consider the result to be art?",
          "spurt": "No tasks here. You can let your mind go wild!",
          "run-help": "You can *run* your code to see how your design could be processed by the Assemblyre! **Do note that this will commence all animations step by step including swiftly moving objects, sliding background, and possibly rapid effects!**"
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
    font-family: var(--text-font);
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
    font-size: .7em;
    line-height: 150%;
    margin: auto;
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
    bottom: 100px;
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
