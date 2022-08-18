<template>
  <div id='app'>
    <router-link to="/">Home</router-link>
    <router-link to="/hub">Hub</router-link>
    <router-link to="/edit">Editor</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
	data: () => ({
    title: 'Assemblyre',
    version: 0.1,
    author: 'Artur Solomonik'
  }),
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



@font-face {
  font-family: 'Steps Mono';
  src: local('Steps Mono'),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Steps-Mono.otf?v=1654370543252) format('truetype');
  }

@font-face {
  font-family: 'Karrik';
  src: local('Karrik'),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Karrik-Regular.ttf?v=1660665887309) format('truetype');
  }

</style>