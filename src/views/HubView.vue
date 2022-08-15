<template>
  <main id='hub'>
    <h1>Assemblyng Hub</h1>
    <section id="welcome">
      <h2>Hello!</h2>
      <p>Thank you for participating in my study on Composing Code. Here, I will guide you through a learning platform alongside all of the resources that you may use for your sessions. Below, you can find a Privacy and Consent Form as well as further details on what will happen in this study.</p>
    </section>
    <section id="instructions">
      <h2>Instructions</h2>
      <p>~ You will be asked to read and observe resources that are related to the fundamental ideas of programming. Alongside conventional explanations, you will be provided with artwork, prose, and various kinds of digital media.</p>
      <p>~ You will be working on a minimum of five creative tasks in total. For your first three tasks, you will be provided with a selection of required reading. Any additional topic is up to you to explore.</p>
      <p>~ After each reading session, you will be asked to create code based on your reading, or the interpretation thereof. For this, you can use the provided coding environment. If you are unable to do so, or would like to express your code through analogue media, you are free to do so.</p> 
      <p>~ For each code piece that you create, you will fill out a short survey where you can summarize your vision and reflection of the program.</p>
      </section>
    <article id="progress">
      <router-link to="/edit">Start Editing</router-link>
    </article>
  </main>
</template>

<script>
export default {
  name: 'HubView',
  props: {
    userCode: {
      type: String,
      required: false,
      default: 'growth'
    }
  }
}
</script>

<style>

</style>