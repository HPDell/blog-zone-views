import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Index.vue'),
      children: [{
        path: 'sayings',
        name: "sayings",
        component: () => import('components/SayingList.vue')
      },{
        path: 'posts',
        name: "posts",
        component: () => import('components/Post.vue')
      }]
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
