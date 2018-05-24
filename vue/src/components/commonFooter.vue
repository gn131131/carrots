<template>
    <!--底部-->
    <footer>
        <div class="container pl-10">
            <div class="row">
                <div class="footer-left col-md-4 col-xs-12">
                    <p class="footer-link" @click="aboutus ()"><span>关于我们</span></p>
                    <p class="font-14">萝卜多——知根知底的社群招聘</p>
                </div>
                <div class="footer-center col-md-5 col-xs-12">
                    <p class="footer-link" @click="contactus ()"><span>联系我们</span></p>
                    <ul>
                        <li class="footer-center-info">
                            <img src="../assets/nav/icon-tel.jpg">
                            <span class="font-14 font-margin">联系电话：</span>
                            <span class="font-14">（010）59478634</span>
                        </li>
                        <li class="footer-center-info">
                            <img src="../assets/nav/icon-email.jpg">
                            <span class="font-14 font-margin">邮箱支持：</span>
                            <span class="font-14">fuhua@ptteng.com</span>
                        </li>
                        <li class="footer-center-info">
                            <img src="../assets/nav/icon-address.jpg">
                            <span class="font-14 font-margin">地&emsp;&emsp;址：</span>
                            <span class="font-14">北京市海淀区翠微路甲10#225室</span>
                        </li>
                    </ul>
                </div>
                <div class="footer-right col-md-3 col-xs-12">
                    <img src="../assets/nav/code.jpg" class="img-code">
                    <p class="font-14">微信号：ptteng-fuhuaqi</p>
                </div>
            </div>
        </div>
        <div class="copyright">Copyright © 2015 北京葡萄藤信息技术有限公司 All Rights Reserved | 京ICP备15035</div>
    </footer>
</template>
<script>
    export default {
        methods: {
            aboutus () {
                window.sessionStorage.setItem('nav', 3);
                window.sessionStorage.setItem('aboutus', 0);
                this.$router.push({path: '/aboutus/aboutUsText'});
            },
            //-----------------bug
            // contactus () {
            //     window.sessionStorage.setItem('nav', 3);
            //     window.sessionStorage.setItem('aboutus', 1);
            //     this.$router.push({path: '/aboutus/contactUsText'});
            // }
        }
    }
</script>
<style lang="scss" scoped type="text/css">
    footer {
        width: 100%;
        height: 1.9rem;
        padding: .24rem 0 .22rem;

    }
    .footer-left {
        padding-left: .7rem;
    }
    .footer-right {
        padding-left: .4rem;
    }
    .footer-link {
        margin-bottom: .2rem;
        font-size: .16rem;
        line-height: .16rem;
        color: #b0b0b0;
        cursor: pointer;
        span {
            &:hover {
                 color: #fc2b47;
             }
        }
    }
    .font-14 {
        font-size: .14rem;
        vertical-align: middle;
        color: #b0b0b0;
    }
    .footer-center {
        padding-left: .75rem;
    }
    .footer-center-info {
        margin-bottom: .15rem;
        &:last-child {
             margin-bottom: .25rem;
           }
    }
    .font-margin {
        margin-left: .05rem;
    }
    .img-code {
        margin-left: .4rem;
        margin-top: .26rem;
    }
    .copyright {
        padding: .06rem 0;
        font-size: .12rem;
        text-align: center;
        color: #999;
        background-color: #37485a;
    }
    @media screen and (max-width: 991px) {
        .pl-10 {
            padding-left: 10%;
            margin-bottom: .2rem;
        }
        .footer-left {
            padding: 0;
            margin-bottom: .2rem;
        }
        .footer-center {
            padding: 0;
        }
        .footer-right {
            padding: 0;
        }
        .img-code {
            margin: 0;
        }
        .footer-center-info:last-child {
            margin-bottom: .15rem;
        }
    }
</style>
