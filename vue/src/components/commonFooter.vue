<template>
    <!--底部-->
    <footer>
        <div class="container pl-5">
            <div class="row">
                <div class="footer-left col-md-4 col-xs-12">
                    <p class="footer-link">关于我们</p>
                    <p class="font-14">萝卜多——知根知底的社群招聘</p>
                </div>
                <div class="footer-center col-md-5 col-xs-12">
                    <p class="footer-link">联系我们</p>
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
        <div class="copyright">Copyright © 2015 北京葡萄藤信息技术有限公司 All Rights Reserved | 京ICP备15035 拷贝 2</div>
    </footer>
</template>
<script>

</script>
<style lang="scss" scoped type="text/css">
    footer {
        width: 100%;
        height: 19rem;
        padding: 2.4rem 0 2.2rem;

    }
    .footer-left {
        padding-left: 7rem;
    }
    .footer-link {
        margin-bottom: 2rem;
        font-size: 1.6rem;
        line-height: 1.6rem;
        color: #b0b0b0;
    }
    .font-14 {
        font-size: 1.4rem;
        vertical-align: middle;
        color: #b0b0b0;
    }
    .footer-center {
        padding-left: 7.5rem;
    }
    .footer-center-info {
        margin-bottom: 1.5rem;
        &:last-child {
             margin-bottom: 2.5rem;
           }
    }
    .font-margin {
        margin-left: .5rem;
    }
    .img-code {
        margin-left: 4rem;
        margin-top: 2.6rem;
    }
    .copyright {
        padding: .6rem 0;
        font-size: 1.2rem;
        text-align: center;
        color: #999;
        background-color: #37485a;
    }
    @media screen and (max-width: 991px) {
        .pl-5 {
            padding-left: 10%;
            margin-bottom: 2rem;
        }
        .footer-left {
            padding: 0;
            margin-bottom: 2rem;
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
            margin-bottom: 1.5rem;
        }
    }
</style>
