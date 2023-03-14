import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPostsPage from '../pages/MainPostsPage.vue'
import ReadPostPage from '../pages/ReadPostPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPostsPage',
    component: MainPostsPage
  },
  {
    path: '/post/read/:id',
    name: 'ReadPostPage',
    component: ReadPostPage,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
