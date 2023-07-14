<template>
  <main class="content" id='hub'>
    
    <h1>Assemblyng Hub: <span>{{userCode}}</span></h1>
    <section>
      <h2>Course Overview</h2>
      <p>Here you can find all the resources for every zine chapter. Skim through them, and feel free to mail me your code! By submitting your code, you consent for it to be displayed on this website.</p>
    </section>
    <div class="courses">
      <article class="course" v-for="course in courseData" :key="course.code">
        <section class="course-details">
          <h2>{{course.title}}</h2>
          <p>{{course.excerpt}}</p>
          <router-link class="route" :to="{ name: 'course', params: { userCode: userCode , courseCode: course.code }}" >See More Details</router-link>
           <program-preview :score="course.submissions[userCode]" :id="userCode + course.code" />
          <a :href="'mailto:lyonid@protonmail.com?subject=[assemblyre ' + course.code + ']'" class="route">Submit Code [Mail]</a>
        </section>
        
      </article>
    </div>
  </main>
</template>

<script>
import courses from '../json/courses.json'
import ProgramPreview from '../components/ProgramPreview'
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
      "maracuja",
      "jackfruit",
      "pineapple",
      "peach",
      "lemon",
      "garden"
    ]
  }
},
components: {
  ProgramPreview
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