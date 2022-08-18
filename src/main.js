import Vue from 'vue'
import App from './app.vue'
import HubView from './views/HubView.vue'
import UserView from './views/UserView.vue'
import EditorView from './views/EditorView.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/edit', name: 'edit', component: EditorView, props: true},
    { path: '/hub/:userCode', name: 'hub', component: UserView, props: true },
    { path: '/', name: 'hub', component: HubView }
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
