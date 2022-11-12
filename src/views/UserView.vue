<template>
    <main class="content" id='hub'>
      
      <h1>Assemblyng Hub: <span>{{userCode}}</span></h1>
      
      <div class="courses">
        <article class="course" v-for="course in courseData" :key="course.code">
          <section v-if="course.submissions[userCode] !== null" class="course-details">
             <program-preview :score="course.submissions[userCode]" :id="userCode + course.code" />
             <div class="submission-details">
              <h2>{{course.title}}</h2>
              <h3>What inspired your piece?</h3>
              <p class="comment">{{course.submissions[userCode].comments[0]}}</p>
              <h3>How does the topic influence yourself?</h3>
              <p class="comment">{{course.submissions[userCode].comments[1]}}</p>
              <h3>Would the program or the topic you are tackling influence anyone else?</h3>
              <p class="comment">{{course.submissions[userCode].comments[2]}}</p>
              <router-link 
                  :score="course.submissions[userCode]" :id="course.code" class="route" 
                  :to="{ name: 'edit', params: { user: userCode, task: course.code, import: course.submissions[userCode], width: course.submissions[userCode].canvasSize.width, height: course.submissions[userCode].canvasSize.height }}">
                  View in Editor
              </router-link>
             </div>
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
    mounted: function() {
      console.log(courses);

    },
  data() {
    return {
      courseData: courses,
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
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 10px;
}

.courses .course .course-details .submission-details {
  flex: 0 0 600px;
  padding: 20px;
  border-radius: 5px;
  border: 3px solid var(--primary-alt-color);
}

.courses .course .course-details .submission-details .comment {
  font-size: 80%;
  background: var(--secondary-color);
  padding: 10px;
}

.courses > * {
  flex: 0 0 100%;
}
  
</style>