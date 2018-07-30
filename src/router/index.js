import Vue from 'vue'
import Router from 'vue-router'


// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

Vue.use(Router)


// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1
export default new Router({
  mode: 'hash',
  routes: [
  	{ path: '/404', component: _import('error/404'), name: '404', desc: '404未找到' },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: { name: 'home' },
      desc: '整体布局',
      children: [
        { path: '/home', component: _import('home/index'), name: 'home', desc: '首页' },
        {
          path: '/content-tabs',
          component: _import('layout/content-tabs'),
          name: 'content-tabs',
          redirect: { name: '404' },
          desc: '内容需通过tabs展示',
          children: [
            // 以'/n'开头统一拦截, 标记为左侧菜单导航tab展示内容方式路由
            { path: '/n/pool', component: _import('pool/index'), name: 'user', desc: '华为组pool' },
            { path: '/n/volte', component: _import('volte/index'), name: 'role', desc: 'volte一致性比对' }
          ]
        }
      ]
    },
    { path: '*', redirect: { name: '404' } }
  ]
})
