import Vue from 'vue'
import App from './app.vue'
import SetupView from './views/SetupView.vue'
import UserView from './views/UserView.vue'
import CourseView from './views/CourseView.vue'
import EditorView from './views/EditorView.vue'
import InfoView from './views/InfoView.vue'
import MoreView from './views/MoreView.vue'
import ZineView from './views/ZineView.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/edit', name: 'edit', component: EditorView, props: true },
    { path: '/hub/:userCode', name: 'hub', component: UserView, props: true },
    { path: '/hub/:userCode/:courseCode', name: 'course', component: CourseView, props: true },
    { path: '/about', name: 'about', component: InfoView },
    { path: '/more', name: 'more', component: MoreView },
    { path: '/zine', name: 'zine', component: ZineView },
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