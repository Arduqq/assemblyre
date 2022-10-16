<template>
    <main class="content">
    <h1>Assemblyng Hub</h1>
    
    <section id="welcome">
      <p>Thank you for participating in my study on <em>Composing Code</em>. Here, I will guide you through a learning platform alongside all of the resources that you may use for your sessions. Below, you can find further details on what will happen in this study.</p>
    </section>
    
    <section id="code">
      <h2>Setup</h2>
      <p>On the front page of your <em>Lyre Zine</em> you can find your case-sensitive code to view your personal hub. From there you will be able to unlock your digital resources and tools for creating your very own programs. </p>
      <p>It is advised to work on a laptop or desktop for your code work. Most digital resources can be viewed on all devices.</p>
      <input class="big" placeholder="code" type="text" v-model="userCode"/>
      <router-link class="route" :to="{ name: 'hub', params: { userCode: userCode }}" >Enter Hub</router-link>

    </section>
    
    <section id="instructions">
      <h2>Study Instructions</h2>
      <p>~ Please fill out the provided consent information form that you can find in your <em>Zine</em> and proceed if you agree with the conditions.</p>
      <p>~ This study will be conducted over <strong>two weeks</strong> in which you may choose freely when to work on your tasks. There are <strong>no time obligations</strong>. It is up to you to spend as much time as you like on your individual works.</p>
      <p>~ You will be asked to read and observe resources that are related to the fundamental ideas of programming, digital culture and computer science. Alongside conventional explanations, you will be provided with artwork, prose, and various kinds of digital media.</p>
      <p>~ You will be working on a minimum of <strong>five creative tasks in total</strong>. After reading every chapter in your <em>Lyre Zine</em>, you may choose which of the eight tasks sparked the most interest in you. You may explore all the digital resources, and then decide what you would like work on.</p>
      <p>~ After each reading session, you will be asked to create code based on your reading, or the interpretation thereof. For this, you can use the provided <em>coding environment Assemblyre</em>. If you are unable to do so, or would like to express your code through analogue media, you are free to do so. </p> 
      <p>~ <em>Assemblyre</em> as a coding environment is less of an environment for writing production code, but more of a graphical editor. You can import images, write pseudocode in your own syntax, and just write a text to express your thoughts on each individual topic. The digital resources are meant to help you with that process. By <em>running your code</em>, you can see how your code is interpreted by the <em>Assemblyre</em> through animations and effects that you can adjust for individually. <em>Features that may affect people with photosensitivity issues are tagged with a ⚠️ tooltip.</em></p>
      <p>~ For each code piece that you submit, you will fill out a <strong>short survey</strong> where you can summarize your vision and reflection of the program. Here you will be prompted to think about the concept you weretrying to capture critically. Why did you create the piece? What does it try to convey?</p>
      <p>~ In the end of the study, we will discuss the results in a short interview to clear up possible questions and your personal experience during the course.</p>
    </section>

    <h3>Thank you for participating. Enjoy the resources and happy coding!</h3>
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