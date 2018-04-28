//引入并安装vue-router插件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//引入less-loader
import less from 'less-loader';
//引入jquery
import $ from 'jquery';
//引入axios并创建原型转化为$http
import axios from 'axios';
Vue.prototype.$http = axios;
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//引入uiv
import * as uiv from 'uiv';
Vue.use(uiv);
//引入vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);
//引入css-reset
import '../static/reset.css';

//引入index.vue组件
import App from './App.vue';
import findPost from './components/findPost.vue';
//定义路由
const routes = [
    {path: '/', component: App},
    {path: '/findPost', component: findPost}
]
//创建 router 实例，然后传 routes 配置
const router = new VueRouter({
    routes
});
//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app');