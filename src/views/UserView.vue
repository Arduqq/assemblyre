<template>
  <div>
    <main id='hub' v-if="['apple', 'grape'].indexOf(userCode) > -1 ">
      <h1>Assemblyng Hub</h1>
      
      <section id="code">
        <h2>Course Progress: {{userCode}}</h2>
        <p>Here you can unlock your new courses. After every chapter in the zine, you can find a code that will lead you to your online resources and the editor for you to create your code piece. Take your time with the resources. Every link provided is optional and is not required for you to write pseudocode.</p>
        <p>If you are still unsure about what to code, you are provided with additional questions that you are free to answer through the editor. Again, they are meant to provide you with inspiration for reflecting on the respective topic.</p>
        <p>After accessing your course, codes will not be saved on the site, which means that you will have to navigate back to your course every time. After every submission, your code piece will be displayed on your Hub after some time. </p>
        <input type="text" class="big" placeholder="code" v-model="courseCode"/>

      </section>
      <article class="course" v-for="course in courseData" :key="course.name">
        <section v-if="course.submissions[userCode] !== null || courseCode === course.code" class="course-details">
          <h2>{{course.title}}</h2>
          <p>{{course.excerpt}}</p>
          <router-link class="route" :to="{ name: 'course', params: { userCode: userCode , courseCode: course.code }}" >See More Details</router-link><br/>
        </section>
        
      </article>
    </main>
    <main id="hub" v-else>
      Seems like {{userCode}} is not a participant of the study. Check your Lyre Zine! The code is right at the front page.
      <input type="text" v-model="userCodeNew"/>
      <router-link :to="{ name: 'hub', params: { userCode: userCodeNew }}" >Try again</router-link>
    </main>
    <footer>
      <a href="https://www.uni-weimar.de/"><img src="https://www.uni-weimar.de/fileadmin/_processed_/0/a/csm_Logo_Medien_R0_G155_B180_67f4f287e5.png"/></a>
    </footer>
  </div>
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
      courseData: courses,
      courseCode: ''
    }
  }
}
</script>

<style scoped>
</style>