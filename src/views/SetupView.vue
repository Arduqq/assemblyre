<template>
    <main class="content">
    <h1>Assemblyng Hub: Preview</h1>

    <section id="welcome">
      <p>Here are the profiles for every participant. All information is privately stored on an offline harddrive. This branch is for interview showcase and data analysis purposes.</p>
    </section>
    
    <section id="profiles">
      <router-link v-for="(participant, i) in participants" :key="i" :title="'Visit ' + participant.toUpperCase() + ' Hub'" class="profile-link" :to="{ name: 'hub', params: { userCode: participant}}" >{{participantMap[participant]}}</router-link>
    
    </section>

    </main>
</template>

<script>
import courseList from '../json/courses.json'
export default {
  name: 'SetupView',
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
      ],
      
      participantMap:  {
          "lemon": "🍋",
          "peach": "🍑",
          "pineapple": "🍍",
          "grape": "🍇",
          "apple": "🍏",
          "maracuja": "🍹",
          "jackfruit": "🫒",
          "growth": "🌱",
          "garden": "🌿"
        },
    }
  }
}
</script>

<style scoped>
section#profiles {
  background: var(--gui-color);
}
.profile-link {
  display: block;
  width: 80px;
  flex: 0 0 80px;
  height: 80px;
  border-radius: 100%;
  background: var(--gui-color);
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 30px;
  line-height: 0;
  padding: 35px 0;
  border: 5px solid var(--secondary-alt-color);
  transition: .1s;
}

.profile-link:hover {
  background: var(--secondary-alt-color);
  transform: scale(1.1);

}

</style>