<template>
  <main id='hub'>
    <h1>Assemblyng Hub</h1>
    <section id="welcome">
      <h2>Hello!</h2>
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
      
    <section>
      <p>On the front page of your <em>Lyre Zine</em> you can find your personal code to view your personal hub. From there you will be able to unlock your digital resources and tools for creating your very own programs- </p>
      <input type="text" v-model="userCode"/>
      <router-link :to="{ name: 'hub', params: { userCode: userCode }}" >Enter Hub</router-link>

    </section>
  </main>
</template>

<script>
export default {
  name: 'HubView',
  data() {
    return {
      userCode: ''
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  font-size: 120%;
}

main > * {
  padding: 10px;
  border: 1px solid #a8a8a8;
  border-radius: 15px;
  box-shadow: 2px 2px 0 2px #a8a8a8;
}

h1, h2, h3, h4 {
  font-family: 'Karrik', Arial, sans-serif;
}
</style>