import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: 'sayings/',
      name: "sayings",
      component: () => import('components/SayingList.vue')
    }, {
      path: 'posts/',
      component: () => import('components/PostIndex.vue'),
      children: [{
        path: "",
        name: "posts",
        component: () => import('components/PostList.vue'),
      }, {
        path: 'new/',
        name: "post-new",
        component: () => import('components/PostNew.vue')
      }, {
        path: 'edit/:id/',
        name: "post-edit",
        component: () => import('components/PostNew.vue')
      }, {
        path: ':id/',
        name: "post-detail",
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
