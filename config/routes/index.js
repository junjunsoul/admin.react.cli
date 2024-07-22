import setting from './setting'
export default [
  {
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      {
        name: '登录页',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component:'@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './home',
      },
      setting
    ],
  },
  {
    path: '*',
    component: './404',
  },
]