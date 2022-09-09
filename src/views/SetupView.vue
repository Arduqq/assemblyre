<template>
    <main class="content">
    <h1>Assemblyng Hub</h1>
    <section id="welcome">
      <p>Thank you for participating in my study on <em>Composing Code</em>. Here, I will guide you through a learning platform alongside all of the resources that you may use for your sessions. Below, you can find further details on what will happen in this study.</p>
    </section>
    <section id="instructions">
      <h2>Instructions</h2>
      <p>~ This study will be conducted over <strong>two weeks</strong> in which you may choose freely when to work on your tasks. There are <strong>no time obligations</strong>. It is up to you to spend as much time as you like on your individual works.</p>
      <p>~ You will be asked to read and observe resources that are related to the fundamental ideas of programming. Alongside conventional explanations, you will be provided with artwork, prose, and various kinds of digital media.</p>
      <p>~ You will be working on a minimum of <strong>five creative tasks in total</strong>. For your first three tasks, you will be provided with a selection of <em>required reading</em>. Any additional topic is up to you to explore.</p>
      <p>~ After each reading session, you will be asked to create code based on your reading, or the interpretation thereof. For this, you can use the provided <em>coding environment</em>. If you are unable to do so, or would like to express your code through analogue media, you are free to do so.</p> 
      <p>~ For each code piece that you create, you will fill out a <strong>short survey</strong> where you can summarize your vision and reflection of the program.</p>
    </section>
      
    <section id="code">
      <h2>Setup</h2>
      <p>On the front page of your <em>Lyre Zine</em> you can find your case-sensitive code to view your personal hub. From there you will be able to unlock your digital resources and tools for creating your very own programs. </p>
      <p>It is advised to work on a laptop or desktop for your code work. Most digital resources can be viewed on all devices.</p>
      <input class="big" placeholder="code" type="text" v-model="userCode"/>
      <router-link class="route" :to="{ name: 'hub', params: { userCode: userCode }}" >Enter Hub</router-link>

    </section>
    </main>
</template>

<script>
export default {
  name: 'SetupView',
  data() {
    return {
      userCode: ''
    }
  }
}
</script>

<style scoped>
a {
  font-size: 150%;
}




</style>