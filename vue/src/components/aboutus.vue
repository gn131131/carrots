<template>
    <div class="bg">
        <div class="container">
            <div class="row">
                <div class="content">
                    <div class="sidebar">
                        <ul>
                            <li @click="change(index)" v-for="(tab, index) in tabs" :key="index" :class="{active: active == index}">
                                <router-link class="link" :to="tab.url">
                                    <i :class="tab.icon"></i><span class="font-16">{{tab.text}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="content-information">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: window.sessionStorage.getItem('aboutus'),
                tabs: [
                    {
                        url: "/aboutus/aboutUsText",
                        text: "关于我们",
                        icon: 'icon-person'
                    },
                    {
                        url: "/aboutus/contactUsText",
                        text: "联系我们",
                        icon: 'icon-phone'
                    }
                ]
            }
        },
        methods: {
            change(i) {
                this.active = i;
                window.sessionStorage.setItem('nav', 3);
                window.sessionStorage.setItem('aboutus', i);
            }
        },
        watch: {
            $route: function () {
                this.active = window.sessionStorage.getItem('aboutus')
            }
        }
    }
</script>
<style lang="scss" scoped type="text/css">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .bg {
        padding: .2rem 0;
        background: #f6f7f8;
    }
    .content {
        display: flex;
    }
    .sidebar {
        height: 2.2rem;
        width: calc(220 / 1200 * 100%);
        padding: 0;
        text-align: center;
        background: #fff;
        ul {
            padding: .7rem 0;
            .active {
                border-left: .05rem solid #fc2b47;
                background: #f7f7f7;
                span {
                    color: #fc2b47;
                }
                .icon-person {
                    background: url("../assets/aboutus/icon-person-red.png")
                }
                .icon-phone {
                    background: url("../assets/aboutus/icon-phone-red.png")
                }
            }
        }
        li {
            border-left: .05rem solid transparent;
            span {
                vertical-align: middle;
                color: #2b3d51;
            }
        }
        .link {
            display: inline-block;
            padding: .1rem 0;
            width: 100%;
        }
    }
    .icon-person {
        display: inline-block;
        margin-right: .1rem;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background: url("../assets/aboutus/icon-person.png") no-repeat;
    }
    .icon-phone {
        display: inline-block;
        margin-right: .1rem;
        width: 17px;
        height: 16px;
        vertical-align: middle;
        background: url("../assets/aboutus/icon-phone.png") no-repeat;
    }
    .font-16 {
        font-size: .16rem;
    }
    .content-information {
        flex: 1;
        margin-left: .5rem;
        background: #fff;
    }

    @media screen and (max-width: 768px) {
        .sidebar {
            width: calc(220 / 768 * 100%);
        }
        .content-information {
            margin-left: .1rem;
        }
    }
</style>
