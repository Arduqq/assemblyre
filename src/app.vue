<template>
  <div class="app">
    <editor />
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
  

  
export default {
  name: "App",
	data: () => ({
    title: 'Assemblyre',
    version: 0.1,
    author: 'Artur Solomonik'
  }),
  components: {
    Editor
  }
}
</script>

<style>

@font-face {
  font-family: "Steps Mono";
  src: local("Steps Mono"),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Steps-Mono.otf?v=1654370543252) format("truetype");}

</style>