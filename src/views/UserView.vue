<template>
  <main id='hub' v-if="['apple', 'grape'].indexOf(userCode) > -1 ">
    <h1>Assemblyng Hub: {{userCode}}</h1>
     
    <section id="code">
      <h2>Setup</h2>
      <p>Here you can unlock your new courses. After every chapter in the zine, you can find a code that will lead you to your online resources and the editor for you to create your code piece.</p>
      <input type="text" class="big" placeholder v-model="courseCode"/>

    </section>
    <article class="course" v-for="course in courseData" :key="course.name">
      <section v-if="course.submissions[userCode] !== null || courseCode === course.code" class="course-details">
        <h2>{{course.title}}</h2>
        <p>{{course.description}}</p>
        <a :href="resource.url" v-for="resource in course.resources" :key="resource.title">
          <h3>{{resource.title}}</h3>
          <p>{{resource.excerpt}}</p>
        </a>
        <router-link :to="{ name: 'edit', params: { task: userCode + ' ' + course.code }}" >Start Coding</router-link>
      </section>
      
    </article>
  </main>
  <main id="hub" v-else>
    Seems like {{userCode}} is not a participant of the study. Check your Lyre Zine! The code is right at the front page.
    <input type="text" v-model="userCodeNew"/>
    <router-link :to="{ name: 'hub', params: { userCode: userCodeNew }}" >Try again</router-link>
  </main>
</template>

<script>
import courses from '../json/courses.json'
export default {
  name: 'HubView',
  props: {
    userCode: {
      type: String,
      required: false,
      default: 'growth'
    }
  },
  data() {
    return {
      userCodeNew: '',
      courseData: courses,
      courseCode: ''
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