import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Setmeal from '../views/Setmeal.vue'              //体检套餐管理
import Term from '../views/Term.vue'                    // 体检项管理
import Information from '../views/Information.vue'      //预约信息查询
import Mechanism from '../views/Mechanism.vue'          //体检机构管理
import StandardIndex from '../views/StandardIndex.vue'  //标准指标管理
import Institutional from '../views/Institutional.vue'  //机构指标管理
import Login from '../views/Login.vue'  //登陆

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: '/admin/setmeal',
        name: 'Setmeal',
        component: Setmeal,
      },
      {
        path: '/admin/term',
        name: 'Term',
        component: Term,
      },
      {
        path: '/admin/information',
        name: 'Information',
        component: Information,
      },
      {
        path: '/admin/mechanism',
        name: 'Mechanism',
        component: Mechanism,
      },
      {
        path: '/admin/standardindex',
        name: 'StandardIndex',
        component: StandardIndex,
      },
      {
        path: '/admin/institutional',
        name: 'Institutional',
        component: Institutional,
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
