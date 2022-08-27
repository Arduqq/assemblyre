import Vue from 'vue'
import App from './app.vue'
import SetupView from './views/SetupView.vue'
import UserView from './views/UserView.vue'
import CourseView from './views/CourseView.vue'
import EditorView from './views/EditorView.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/edit', name: 'edit', component: EditorView, props: true},
    { path: '/hub/:userCode', name: 'hub', component: UserView, props: true },
    { path: '/hub/:userCode/:courseCode', name: 'course', component: CourseView, props: true },
    { path: '/', name: 'setup', component: SetupView }
  ]

const router = new VueRouter({
    routes 
  })

Vue.config.productionTip = false
window.onload = function() {
    new Vue({
        render: h => h(App),
        router
    }).$mount('#app')
}
