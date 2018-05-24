<template>
    <div id="app">
        <common-header></common-header>
        <router-view></router-view>
        <common-footer></common-footer>
    </div>
</template>


<script>
    import commonHeader from './components/commonHeader.vue' // 导入header组件
    import commonFooter from './components/commonFooter.vue' // 导入footer组件

    // 导出默认输出一个对象
    export default {
        name: 'app',
        // 导出子组件到当前页面使用
        components: {
            commonHeader,
            commonFooter,
        },
        watch: {
            // 监听路由变化滚动至顶部
            $route: function () {
                $('html').scrollTop(0);
                // document.documentElement.scrollTop = 0;
            }
        }
    }
</script>

