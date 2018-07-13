// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routes from './router/index'
import $ from 'jquery'
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false
const router = new VueRouter({
  routes,
})

Vue.prototype.getUserId = ()=>{ 
    let id = '123456' 
    return id
},
Vue.userId = '123213';
Vue.prototype.$=$;
Vue.prototype.fomateDate = (s)=>{
   let time = new Date(Number(s));
   let year = time.getFullYear();
   let month = time.getMonth()+1 <10 ? '0'+ (time.getMonth()+1) : time.getMonth()+1;
   let date = time.getDate() <10 ? '0'+time.getDate() : time.getDate();
   let hour = time.getHours() <10 ? '0'+time.getHours() : time.getHours();
   let min = time.getMinutes()<10 ? '0' +time.getMinutes() : time.getMinutes();
   return year + '-'+ month + '-' + date + ' ' + hour +':'+min
}
Vue.prototype.ajax = function(url,type,data,callback){
  // let baseUrl = 'http://192.168.1.82:8003/';
  if (type == 'GET'){
    this.$.ajax({
      url:url,
      type:type,
      dataType:"json",
      contentType:'application/json',
      success:(res)=>{
        if(res.code == '200'){
          callback(res.map)
        }else{
          console.log(res.msg)
        }
      }
   })
  //   this.$.ajax({
  //     url:this.Basse_Port+'company/'+item.id+'/txm',
  //     beforeSend: function(xhr) {
  //          xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
  //     },
  //     type:'PATCH'
  // }).done(()=>{
  //         this.$Message.success('激活成功')
  //         this.init();

  // }).catch(()=>{
  //     this.$Message.error('激活失败')
  // })
  }else{
    this.$.ajax({
      url:url,
      type:type,
      dataType:"json",
      contentType:'application/json',
      data:JSON.stringify(data),
      success:(res)=>{
        if(res.code == '200'){
          callback(res.map)
        }else{
          console.log(res.msg)
        }
      }
   })

  }

}

/* eslint-disable no-new */
new Vue({
  router,
  render:(h)=>h(App)
}).$mount("#app")
