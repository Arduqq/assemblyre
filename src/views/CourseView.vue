<template>
    <main class="content">
    <h1>Assemblyng Hub: <span>{{userCode}} {{courseCode}}</span></h1>
    <router-link class="route" :to="{ name: 'hub', params: { userCode: userCode }}" >Back to Hub</router-link>

    <section>
      <h2>{{this.course.title}}</h2>
      <p v-for="(paragraph, index) in course.description" :key="index">{{paragraph}}</p>
      <a class="resource" :href="resource.url" v-for="resource in this.course.resources" :key="resource.title">
        <h3>{{resource.title}}</h3>
        <p>{{resource.excerpt}}</p>
      </a>
    </section>
    <router-link class="route" :to="{ name: 'edit', params: { user: userCode, task: course.code  }}" >Start Coding</router-link>

    </main>
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

a.resource {
  display: block;
  text-decoration: none;
  background-color: white;
  border-radius: 25px;
  padding: 10px;
  color: var(--primary-color);
  border: 2px solid var(--primary-alt-color);
  box-shadow: 5px 5px 0 5px var(--primary-alt-color);
  margin-bottom: 20px;
  transition: .05s;
}

a.resource:hover {
  transform: scale(1.05);
}

a.resource h3:before {
  height: 10px;
  width: 10px;
  margin-right: 10px;
  border-radius: 100%;
  background-color: var(--interact-color);
  display: inline-block;
  content: " ";
}

a.resource:visited h3:before {
  background-color: var(--success-color);
}

</style>