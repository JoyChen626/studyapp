import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/Login'], resolve)
    },{
      path: '/register',
      name: 'register',
      component: resolve => require(['../views/Register'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        routeCode: 0,
        title: '首页'
      }
    },
    {
      path: '/privatelessons',
      name: 'privatelessons',
      component: resolve => require(['../views/PrivateLessons'], resolve),
      meta: {
        routeCode: 1,
        title: '私教课'
      }
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: resolve => require(['../views/MyInfo'], resolve),
      meta: {
        routeCode: 2,
        title: '我的'
      }
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: resolve => require(['../views/myinfo/MyOrder'], resolve),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: resolve => require(['../views/ClassRoom'], resolve),
      meta: {
        title: '课程详情'
      }
    },
    {
      path: '/homework',
      name: 'homework',
      component: resolve => require(['../views/classroom/HomeWork'], resolve),
      meta: {
        title: '课后习题'
      }
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: resolve => require(['../views/myinfo/Certificate'], resolve),
      meta: {
        title: '我的证书'
      }
    },
    {
      path: '/tocomment',
      name: 'tocomment',
      component: resolve => require(['../views/ToComment'], resolve),
      meta: {
        title: '评论'
      }
    },
    {
      path: '/aboutours',
      name: 'aboutours',
      component: resolve => require(['../views/myinfo/AboutOurs'], resolve),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/myscore',
      name: 'myscore',
      component: resolve => require(['../views/myinfo/MyScore'], resolve),
      meta: {
        title: '我的分数'
      }
    },
    {
      path: '/spread',
      name: 'spread',
      component: resolve => require(['../views/myinfo/Spread'], resolve),
      meta: {
        title: '推荐'
      }
    },
    {
      path: '/teachingfeatures',
      name: 'teachingfeatures',
      component: resolve => require(['../views/myinfo/TeachingFeatures'], resolve),
      meta: {
        title: '教学特色'
      }
    }
  ]
})
