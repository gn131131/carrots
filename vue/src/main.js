//引入并安装vue-router插件
import Vue from 'vue';
import Router from 'vue-router';
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
import commonHeader from './components/commonHeader.vue'
import commonFooter from './components/commonFooter.vue'
import homepage from './components/homepage.vue'
import findElite from './components/findElite.vue'
import aboutus from './components/aboutus.vue'

Vue.use(Router);
//路由配置
const routes = [
    {
        path: '/',
        redirect: '/homepage',  //重定向，进入页面默认为/homepage
        components: {
            commonHeader,
            commonFooter
        }
    },
    {
        path: '/homepage',
        component: homepage
    },
    {
        path: '/findPost',
        component: findPost,
    },
    {
        path: '/findElite',
        component: findElite
    },
    {
        path: '/aboutus',
        component: aboutus
    }
];

const router = new Router({routes});
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
