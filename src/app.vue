<template>
  <div id='app'>
    <editor-view :width="1000" :height="600"></editor-view>
  </div>
</template>

<script>
import EditorView from './components/EditorView.vue';

export default {
  name: 'App',
	data: () => ({
    title: 'Assemblyre',
    version: 0.1,
    author: 'Artur Solomonik'
  }),
  components: {
    EditorView
  }
}
</script>

<style>
:root {
  --primary-color: #523b38;
  --primary-alt-color: rgb(110, 164, 192);
  --secondary-color: #d1f4f6;
  --success-color: rgb(170, 255, 139);
  --interact-color: rgb(224, 87, 255);
  }

body {
    margin: 0;
  overflow: hidden;
}

#app {
  display: flex;
}


@font-face {
  font-family: 'Steps Mono';
  src: local('Steps Mono'),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Steps-Mono.otf?v=1654370543252) format('truetype');}

</style>