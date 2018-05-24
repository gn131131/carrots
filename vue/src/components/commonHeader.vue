<template>
    <!--头部-->
    <header>
        <div class="container">
            <div class="row">
                <!--左侧导航栏-->
                <div class="">
                    <img class="img-logo" src="../assets/nav/logo.png" @click="toHome ()">
                    <div class="nav-location">
                        <img class="icon-location" src="../assets/nav/location-logo.png">
                        <span>北京站</span>
                    </div>
                </div>
                <ul class="header-nav">
                    <li @click="change(index)" v-for="(li, index) in lis" :key="index" :class="{open: open == index}">
                        <router-link :to="li.url">{{li.text}}</router-link>
                        <span class="nav-page-underline"></span>
                    </li>
                </ul>
                <div class="header-nav-768">
                    <navbar>
                        <template slot="collapse">
                            <navbar-nav right>
                                <dropdown tag="li" @click="change(index)" v-for="(li, index) in lis" :key="index">
                                    <router-link :to="li.url">{{li.text}}</router-link>
                                    <span class="nav-page-underline"></span>
                                </dropdown>
                            </navbar-nav>
                        </template>
                    </navbar>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                open: window.sessionStorage.getItem('nav'),
                lis: [
                    {
                        url: "/homepage",
                        text: "首页",
                    },
                    {
                        url: "/findPost",
                        text: "找职位",
                    },
                    {
                        url: "/findElite",
                        text: "找精英",
                    },
                    {
                        url: "/aboutus",
                        text: "关于我们",
                    }
                ]
            }
        },
        //data加载前存储导航栏状态
        beforeCreate () {
            let nav = window.sessionStorage.getItem('nav');
            if (nav === null) {
                window.sessionStorage.setItem('nav', 0);
            }
        },
        methods: {
            //导航栏点击按钮添加指示器 class
            change(i) {
                window.sessionStorage.setItem('nav', i);
                window.sessionStorage.setItem('aboutus', 0);
                this.open = i;
            },
            //点击logo返回首页
            toHome () {
                this.open = 0;
                window.sessionStorage.setItem('nav', 0);
                window.sessionStorage.setItem('aboutus', 0);
                this.$router.push({path: '/homepage'});
            }
        },
        //监测路由变化改变导航栏状态
        //----------------bug
        // watch: {
        //     $route: function () {
        //         this.open = window.sessionStorage.getItem('nav');
        //     }
        // }
    }
</script>
<style>
    header {
        background-color: #fff;
        box-shadow: 0 2px 5px #f1f1f1;
    }
    .padding-0 {
        padding: 0;
    }
    .navbar {
        margin: 0;
    }
    .img-logo {
        position: relative;
        float: left;
        margin-right: .15rem;
        margin-top: .17rem;
        z-index: 999;
        cursor: pointer;
    }
    .navbar-default {
        background-color: #fff;
        border: none;
    }
    .dropdown-menu {
        display: none !important;
    }
    .nav-location {
        position: relative;
        float: left;
        margin-top: .226rem;
        padding: .05rem .15rem;
        border-left: .01rem solid #e8e8e8;
        font-size: .16rem;
        z-index: 999;
    }
    .header-nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .header-nav a {
        display: inline-block;
        height: .76rem;
        padding: 0 .15rem;
        line-height: .76rem;
        color: #000;
    }
    .header-nav > li:hover a {
        color: #fc2b47;
    }
    .header-nav > li:hover .nav-page-underline {
        width: 100%;
        color: #fc2b47 !important;
    }
    header span {
        vertical-align: middle;
    }
    header .navbar-nav {
        text-align: center;
    }
    header .navbar-default .navbar-nav > .open > a {
        background: #fff;
    }
    header .navbar-default .navbar-nav > .open > a:hover {
        background: #fff;
    }
    header .navbar-default .navbar-nav > .open > a:focus {
        background: #fff;
    }
    header .navbar-default .navbar-nav > li > a {
        color: #000;
    }
    header .navbar-nav > li > a {
        line-height: .76rem;
        padding: 0 .15rem;
    }
    header .navbar-nav > li:hover .nav-page-underline, .open > .nav-page-underline, .open > a{
        width: 100%;
        color: #fc2b47 !important;
    }
    header .navbar-default .navbar-nav > li:hover a{
        color: #fc2b47 !important;
    }
    .nav-page-underline {
        display: block;
        width: 0;
        height: 4px;
        background-color: #fc2b47;
        margin: 0 auto;
        border-bottom: 0 solid #fc2b47;
        transition: width .2s;
    }
    /*面包屑图标位置*/
    .header-nav-768 .navbar-default .navbar-toggle {
        margin: .2rem .1rem;
    }
    .header-nav-768 .navbar-default .navbar-toggle:focus {
        background-color: #fff;
    }
    .header-nav-768 .navbar-default .navbar-toggle:hover {
        background: #fc2b47;
    }
    @media all and (min-width: 768px) {
        .header-nav-768 {
            display: none;
        }
    }
    @media all and (max-width: 768px){
        .header-nav {
            display: none;
        }
        .navbar-toggle {
            margin: .2rem 0!important;
        }
        .img-logo {
            width: 30%;
        }
    }
</style>
