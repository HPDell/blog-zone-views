import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: {
      name: "welcome"
    },
    children: [{
      path: 'welcome',
      name: "welcome",
      component: () => import('components/Welcome.vue')
    }, {
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
        path: 'setting/',
        name: "post-setting",
        component: () => import('components/PostSetting.vue')
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
  },
  {
    path: "/login-page",
    name: "login",
    component: () => import('pages/Login.vue')
  },
  {
    path: "/register-page",
    name: "register",
    component: () => import('pages/Register.vue')
  },
  {
    path: "/refresh",
    name: "refresh",
    component: () => import('pages/Refresh.vue')
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
