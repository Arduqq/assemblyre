<template>
  <div id='app'>
    <header v-show="title!=='Editor'">
      <router-link to="/"><img src="/assets/assemblyre-logo.png">Start</router-link>
      <router-link to="/about"><img src="/assets/dots-1.jpg">About</router-link>
      <router-link to="/more"><img src="/assets/dots-2.jpg">More</router-link>
    </header>
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
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Steps Mono'),   url("/public/fonts/Steps-Mono.otf") format('otf');
}

@font-face {
  font-family: 'Karrik';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Karrik'), url("/public/fonts/Karrik-Regular.woff") format('woff'), url("/public/fonts/Karrik-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'Abordage';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Abordage'), url("/public/fonts/Abordage-Regular.woff") format('woff'), url("/public/fonts/Abordage-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'Equateur';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Equateur'), url("/public/fonts/Equateur-Regular.woff") format('woff'), url("/public/fonts/Equateur-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'FT88';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('FT88'), url("/public/fonts/FT88-Regular.woff") format('woff'), url("/public/fonts/FT88-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'Latitude';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Latitude'), url("/public/fonts/Latitude-Regular.woff") format('woff'), url("/public/fonts/Latitude-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'Louise';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Louise'), url("/public/fonts/Louise-Regular.woff") format('woff'), url("/public/fonts/Louise-Regular.woff2") format('woff2');
}

@font-face {
  font-family: 'FT88 Gothique';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('FT88'), url("/public/fonts/FT88-Gothique.woff") format('woff'), url("/public/fonts/FT88-Gothique.woff2") format('woff2');
}

@font-face {
  font-family: 'FT88 School';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('FT88'), url("/public/fonts/FT88-School.woff") format('woff'), url("/public/fonts/FT88-School.woff2") format('woff2');
}

@font-face {
  font-family: 'CirrusCumulus';
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('CirrusCumulus'), url("/public/fonts/CirrusCumulus.woff") format('woff');
}

:root {
  /* For general text */
  --primary-color: #333333;
  /* For special text */
  --primary-alt-color: #7c1c4f;
  /* For backgrounds */
  --secondary-color: #e7deff;
  --secondary-alt-color: #b58fda;
  --gui-color: rgb(57, 47, 67);
  --success-color: rgb(170, 255, 139);
  --interact-color: #9f18ff;
  --display-font: 'Karrik', Arial, sans-serif;
  --text-font: 'Latitude', sans-serif;
  --code-font: 'Courier New', monospace;
  }

body {
  margin: 0;
  background: white;
  padding: 0;
  font-family: var(--text-font);
}

header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: var(--gui-color);
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
  overflow: hidden;
  transition: .3s;
  box-shadow: inset 0px -20px 20px 20px rgba(0, 0, 0, .2);
}

header:hover, html[scroll="0"] header {
  height: 180px;
}

header:hover + .content {
  margin: 220px auto;
}


header a {
  flex: 0 0 125px;
  height: 125px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 10px;
  text-decoration: none;
  text-transform: uppercase;
}

header a img {
  padding: 10px;
  filter: invert(0) contrast(.7);
  box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, .4);
  background: white;
  border-radius: 100%;
}

header a:hover img {
  filter: invert(1) contrast(.7);
  box-shadow: none;
}

header a img {
  width: 100%;
}

.content {
  display: flex;
  flex-flow: column nowrap;
  width: 90%;
  margin: 100px auto;
  gap: 20px;
  font-size: 120%;
  transition: .3s;
}

.content > section {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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

.content > section > * {
  flex: 0 1 100%;
}

h1, h2, h3, h4 {
  font-family: 'Karrik', Arial, sans-serif;
}

.content > h1, .content  > h2, .content  > h3 {
  text-align: center;
}

h1 span {
  display: inline-block;
  padding: 10px;
  border-radius: 25px;
  border: 5px solid var(--primary-alt-color);
  background: white;
  color: var(--primary-color);
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

a.route {
  max-width: 800px;
  align-self: center;
  padding: 10px;
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


@keyframes interact-wiggle-hv {
    0% {
    border-bottom: 7px solid var(--interact-color);
    border-right: 7px solid var(--interact-color);
    }
    80% {
    border-bottom: 4px solid var(--interact-color);
    border-right: 4px solid var(--interact-color);
    }
    100% {
    border-bottom: 7px solid var(--interact-color);
    border-right: 7px solid var(--interact-color);
    }
  }

  @keyframes interact-wiggle-h {
    0% {
    border-right: 7px solid var(--interact-color);
    }
    80% {
    border-right: 4px solid var(--interact-color);
    }
    100% {
    border-right: 7px solid var(--interact-color);
    }
  }

  
 /* 5s ani1 cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite */
 @keyframes ani1 {
    0% { transform: scale(1) }
    10% {transform: translate(10px,10px) }
    20% {transform: translate(0 , 10px) }
    30% {transform: translate(-10px, 10px) }
    40% {transform: translate(-10px, 0) }
    50% {transform: translate(-10px, -10px) }
    60% {transform: translate(0, 0) }
    90% { transform: scale(.8) }
    95% { transform: scale(1.2) }
    100% { transform: scale(1) }
  }

  /*  3s ani2 cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite */
  @keyframes ani2 {
    0% { transform: rotate(0) }
    20% {transform: translate(10px 0) }
    30% {transform: rotate(10deg) }
    50% {transform: translate(-10px 0) }
    60% {transform: rotate(-10deg) }
    100% { transform: rotate(0) }
  }

  /* 3s ani3 cubic-bezier(0.165, 0.84, 0.44, 1) infinite */
  @keyframes ani3 {
    0% { transform: rotate(0) }
    100% { transform: rotate(360deg) }
  }

  /* 5s ani4 cubic-bezier(0.23, 1, 0.320, 1) */
  @keyframes ani4 {
    0% { transform:  translate(0,0) scale(1) }
    10% { transform: translate(0,-20px) scale(.9)  }
    21% { transform: translate(0,20px) scaleY(.5)  }
    100% { transform:  translate(0,0) scale(1) }
  }

  /* 2s ani5 cubic-bezier(0.165, 0.84, 0.44, 1) infinite */
  @keyframes ani5 {
    0% { transform: scale(1)}
    12.5% { transform: scale(1.1)}
    25% { transform: scale(.95)}
    37.5% { transform: scale(1.1)}
    100% { transform: scale(1)}
  }

  /* 2s ani5 cubic-bezier(0.165, 0.84, 0.44, 1) infinite */
  @keyframes ani6 {
    0% { opacity: 1}
    22.1% { opacity: .1}
    55% { opacity: .95}
    85.5% { opacity: .1}
    100% { opacity: 1}
  }

  /* cubic-bezier(0.68, -0.55, 0.265, 1.55) */
  @keyframes ani7 {
    0% { transform: rotate(0deg)}
    12.5% { transform: rotate(45deg)}
    25% { transform: rotate(90deg)}
    37.5% { transform: rotate(135deg)}
    50% { transform: rotate(180deg)}
    62.5% { transform: rotate(225deg)}
    75% { transform: rotate(270deg)}
    87.5% { transform: rotate(315deg)}
    100% { transform: rotate(360deg)}
  }
  

  @keyframes background-scroll {
    0% {
		background-position: 0% 0%
    }
    50% {
      background-position: 200% 200%
    }
    100% {
      background-position: 0% 0%
    }
  }

</style>