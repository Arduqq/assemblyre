<template>
  <div>
    <main>
    <h1>Assemblyng Hub: {{userCode}} {{courseCode}}</h1>
    <router-link class="route" :to="{ name: 'hub', params: { userCode: userCode }}" >Back to Hub</router-link>

    <section>
      <h2>{{this.course.title}}</h2>
        <p v-for="(paragraph, index) in course.description" :key="index">{{paragraph}}</p>
        <a :href="resource.url" v-for="resource in this.course.resources" :key="resource.title">
          <h3>{{resource.title}}</h3>
          <p>{{resource.excerpt}}</p>
        </a>
    </section>
    <router-link class="route" :to="{ name: 'edit', params: { task: userCode + ' ' + course.code }}" >Start Coding</router-link>

    </main>
    <footer>
      <a href="https://www.uni-weimar.de/"><img src="https://www.uni-weimar.de/fileadmin/_processed_/0/a/csm_Logo_Medien_R0_G155_B180_67f4f287e5.png"/></a>
    </footer>
  </div>
</template>

<script>
import courses from '../json/courses.json'
export default {
  name: 'CourseView',
  props: {
    userCode: {
      type: String,
      required: false,
      default: 'growth'
    },
    
    courseCode: {
      type: String,
      required: false,
      default: 'spurt'
    }
  },
  data() {
    return {
      course: courses[this.courseCode],
    }
  }
}
</script>

<style scoped>



</style>