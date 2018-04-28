<template>
    <!--头部-->
    <header>
        <div class="container">
            <div class="row">
                <!--左侧导航栏-->
                <div>
                    <img class="img-logo" src="../assets/nav/logo.png">
                    <div class="nav-location">
                        <img class="icon-location" src="../assets/nav/location-logo.png">
                        <span>北京站</span>
                    </div>
                </div>
                <nav class="navbar navbar-default head-nav pull-right">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="nav-button navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse nav-item" id="bs-example-navbar-collapse-1">
                            <ul class="nav-list nav navbar-nav">
                                <li>
                                    <router-link to='/homepage'>首页</router-link>
                                </li>
                                <li>
                                    <router-link to="/findPost">找职位</router-link>
                                </li>
                                <li>
                                    <router-link to="/findElite">找精英</router-link>
                                </li>
                                <li>
                                    <router-link to="/aboutus">关于我们</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>


<script>

</script>


<style lang="scss" scoped type="text/css">
    header {
        background-color: #fff;
        box-shadow: 0 2px 5px #f1f1f1;
        .head-nav {
            background-color: #fff;
            border: none;
        }
        .navbar {
            margin: 0;
            height: 8rem;
        }
        .img-logo {
            float: left;
            margin-right: 1.5rem;
            margin-top: 1.7rem;
        }
        .nav-item {
            margin-top: 1.5rem;
            font-size: 1.6rem;
            .nav {
                li > a {
                    color: #000;
                }
            }
        }
    }
    .nav-location {
        float: left;
        margin-top: 2.4rem;
        padding: .5rem 1.5rem;
        border-left: .1rem solid #e8e8e8;
        font-size: 1.6rem;
        span {
            vertical-align: middle;
        }
    }
</style>
