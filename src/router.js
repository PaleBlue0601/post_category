import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './components/Post.vue'
import PostList from './components/PostList.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/postlist/0',
      children: [
        {
          path: '/postlist/:sub_id',
          name: 'postlist',
          component: PostList,
          props: true
        },
        {
          path: '/post/:sub_id/:post_id',
          name: 'post',
          component: Post,
          props: true
        }
      ]
    }
  ]
})
