<template>
  <div id='app'>
    <router-link to="/">Home</router-link>
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

@font-face {
  font-family: 'Steps Mono';
  src: local('Steps Mono'),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Steps-Mono.otf?v=1654370543252) format('truetype');
  }

@font-face {
  font-family: 'Karrik';
  src: local('Karrik'),   url(https://cdn.glitch.global/22cc7a42-914e-43a3-b0a6-f80d3ec54cd9/Karrik-Regular.ttf?v=1660665887309) format('truetype');
  }

:root {
  /* For general text */
  --primary-color: #333333;
  /* For special text */
  --primary-alt-color: #4d2f3f;
  /* For backgrounds */
  --secondary-color: #e7deff;
  --secondary-alt-color: #8d6cae;
  --gui-color: rgb(57, 47, 67);
  --success-color: rgb(170, 255, 139);
  --interact-color: #9f18ff;
  --display-font: 'Karrik', Arial, sans-serif;
  --text-font: 'Open Sans', sans-serif;
  --code-font: 'Steps Mono', monospace;
  }

body {
  margin: 0;
  background: rgb(170, 143, 178);
  padding: 0;
}

main {
  display: flex;
  flex-flow: column nowrap;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  font-size: 120%;
}

main > section {
  padding: 20px;
  border: 1px solid var(--secondary-alt-color);
  border-radius: 5px;
  box-shadow: 2px 2px 0 2px var(--secondary-alt-color);
  display: flex;
  flex-flow: row wrap;
  background: var(--secondary-color);
  justify-content: center;
  align-items: center;
  gap:10px
}

main > section > * {
  flex: 0 1 100%;
}

h1, h2, h3, h4 {
  font-family: 'Karrik', Arial, sans-serif;
}


a.route, button {
  font-family: var(--display-font);
  text-decoration: none;
  background: var(--primary-alt-color);
  color: white;
  transition: .1s;
  text-align: center;
  display: inline-block;
}

a.route:hover, button:hover {
  background: var(--primary-color);
}

input[type="text"] {
  border: none;
  outline: none;
  display: inline-block;
  background: var(--secondary-alt-color);
  border-bottom: 1px solid var(--primary-alt-color);
  font-family: var(--code-font);
  transition: .1s;
}

input[type="text"].big{
  font-size: 200%;
  text-align: center;
}

input[type="text"]:focus {
  border-bottom: 1px solid var(--interact-color);
  background: white;
}

footer {
  padding: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: var(--primary-alt-color);
  position: relative;
  margin-top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>