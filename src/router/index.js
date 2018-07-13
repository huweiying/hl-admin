// import Vue from 'vue'
// import Router from 'vue-router'
// import index from '@/pages/index'
const index = resolve => require(['@/pages/index.vue'], resolve)
const areaDetail = resolve => require(['@/pages/areaDetail.vue'], resolve) 
const organization = resolve => require(['@/pages/organization.vue'], resolve) 
const user = resolve => require(['@/pages/user.vue'], resolve) 
const userGroup = resolve => require(['@/pages/userGroup.vue'], resolve) 
const role = resolve => require(['@/pages/role.vue'], resolve) 
const jobs = resolve => require(['@/pages/jobs.vue'], resolve) 
const authorization = resolve => require(['@/pages/authorization.vue'], resolve) 
const menuEdit = resolve => require(['@/pages/menuEdit.vue'], resolve) 
const configuration = resolve => require(['@/pages/configuration.vue'], resolve) 
const componentEdit = resolve => require(['@/pages/componentEdit.vue'], resolve) 
const componentLead = resolve => require(['@/pages/componentLead.vue'], resolve) 
const loginLog = resolve => require(['@/pages/loginLog.vue'], resolve) 
const operationLog = resolve => require(['@/pages/operationLog.vue'], resolve) 
const constraint = resolve => require(['@/pages/constraint.vue'], resolve) 

// Vue.use(Router)

export default [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/areaDetail',
      name: 'areaDetail',
      component: areaDetail
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/userGroup',
      name: 'userGroup',
      component: userGroup
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: jobs
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: authorization
    },
    {
      path: '/menuEdit',
      name: 'menuEdit',
      component: menuEdit
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: configuration
    },
    {
      path: '/componentEdit',
      name: 'componentEdit',
      component: componentEdit
    },
    {
      path: '/loginLog',
      name: 'loginLog',
      component: loginLog
    },
    {
      path: '/operationLog',
      name: 'operationLog',
      component: operationLog
    },
    {
      path: '/componentLead',
      name: 'componentLead',
      component: componentLead
    },
    {
      path: '/constraint',
      name: 'constraint',
      component: constraint
    },
  
]
