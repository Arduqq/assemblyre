<template>
  <div class="editor">
    <h1>{{msg}}</h1>
        <text-field></text-field>
        <text-field></text-field>
  
  </div>
      
</template>

<script>
  import interact from "interactjs";
  import TextField from "./TextField.vue";
  export default {
    name: "Editor",
    data() {
      return {
        msg: "Editor View",
      };
    },
    components: {
      TextField
    }
  };
</script>

<style>
  .editor {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fbfbff;
  background-image:  linear-gradient(#ffe9fa 2px, transparent 2px), linear-gradient(90deg, #ffe9fa 2px, transparent 2px), linear-gradient(#ffe9fa 1px, transparent 1px), linear-gradient(90deg, #ffe9fa 1px, #fbfbff 1px);
  background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }
</style>