<template>
    <main class="content" id='hub' v-if="participants.indexOf(userCode) > -1 ">
      
      <h1>Assemblyng Hub: <span>{{userCode}}</span></h1>
      
      <section id="survey">
        <h2>Survey</h2>
        <p>Please fill out this survey before you begin working on your code.</p>
        <a class="route" :href="'https://www.soscisurvey.de/test326808/?r='+userCode">Composing Code Survey</a>
      </section>

      <section id="code">
        <h2>Course Progress</h2>
        <p>Here you can unlock your new courses. After every chapter in the zine, you can find a code that will lead you to your online resources and the editor for you to create your code piece. Take your time with the resources. Every link provided is optional and is not required for you to write pseudocode.</p>
        <p>If you are still unsure about what to code, you are provided with additional questions that you are free to answer through the editor. Again, they are meant to provide you with inspiration for reflecting on the respective topic.</p>
        <p>After accessing your course, codes will not be saved on the site, which means that you will have to navigate back to your course every time. After every submission, your code piece will be displayed on your Hub after some time. </p>
        <input type="text" class="big" placeholder="code" v-model="courseCode"/>

      </section>
      <div class="courses">
        <article class="course" v-for="course in courseData" :key="course.name">
          <section v-if="course.submissions[userCode] !== null || courseCode === course.code" class="course-details">
            <h2>{{course.title}}</h2>
            <p>{{course.excerpt}}</p>
            <router-link class="route" :to="{ name: 'course', params: { userCode: userCode , courseCode: course.code }}" >See More Details</router-link>
            <a href="" class="route">Submit Code</a>
          </section>
          
        </article>
      </div>
    </main>
    <main class="content" id="hub" v-else>
      <h1>Assemblyng Hub: <span>{{userCode}}</span></h1>
      <section id="error">
        <p>Seems like '{{userCode}}' is not a participant of the study. Check your Lyre Zine! The code is right at the front page.</p>
        <img src="/assets/zine-cover.png" />
        <input class="big" placeholder="code" type="text" v-model="userCodeNew"/>
        <router-link class="route" :to="{ name: 'hub', params: { userCode: userCodeNew }}" >Try again</router-link>
      </section>
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
      courseData: courses,
      courseCode: '',
      userCodeNew: this.userCode,
      participants: [
        "grape",
        "apple",
        "ananas",
        "jackfruit",
        "apricot",
        "peach",
        "lemon",
        "garden"
      ]
    }
  }
}
</script>

<style scoped>

.courses {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}

.courses .course .course-details {
  padding: 10px 20px;
  border-radius: 5px;
  border: 3px solid var(--primary-alt-color);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  gap: 10px;
}

.courses > * {
  flex: 1 1 500px;
}

</style>