<template>
    <main class="content">
    <h1>Assemblyng Hub: <span>Screening</span></h1>
    <h1>Participant Progress</h1>
    <section v-for="(participant, i) in participants" :key="i">
        <h2>{{i}} - {{participant}} <router-link :title="'Visit Hub'" class="hub-link route" :to="{ name: 'hub', params: { userCode: participant}}" >Visit Hub</router-link> </h2>
        <span v-for="(course, i) in courses" :key="i">
            <router-link 
                v-if="course.submissions[participant]!==null"
                :score="course.submissions[participant]" :key="i + course.code" :id="i + course.code" class="route" 
                :to="{ name: 'edit', params: { user: participant, task: course.code, import: course.submissions[participant], width: course.submissions[participant].canvasSize.width, height: course.submissions[participant].canvasSize.height }}">
                {{course.code}}
            </router-link>
            <span v-else class="route">
                {{course.code}}
            </span>
        </span>
    
    </section>
    <h1>Course Entries</h1>
    <section v-for="(course, i) in courses" :key="i">
      <h2>{{course.title}}</h2>
      <span v-for="(submission, user, i) in course.submissions" :key="user + course.code">
        <router-link v-if="submission!==null"
            :score="submission"  :id="i + user + course.code" class="route" 
            :to="{ name: 'edit', params: { user: user, task: course.code, import: submission, width: submission.canvasSize.width, height: submission.canvasSize.height }}">
        {{user}}</router-link>
        
        <span v-else class="route">
                {{user}}
            </span>
      </span>
    </section>
    

    </main>
</template>

<script>
import courseList from '../json/courses.json'
export default {
  name: 'ScreenView',
  data() {
    return {
      courses: courseList,
      participants: [
        "grape",
        "apple",
        "maracuja",
        "jackfruit",
        "pineapple",
        "peach",
        "lemon"
      ]
    }
  }
}
</script>

<style scoped>
.content > section > span {
    flex: unset;
}

span.route {
    background: rgba(0,0,0,.3);
    max-width: 800px;
    align-self: center;
    padding: 10px;  
    font-family: var(--display-font);
    color: white;
    text-align: center;
    display: inline-block;
    cursor:default;
}
</style>