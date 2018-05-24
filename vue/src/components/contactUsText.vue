<template>
    <div class="content-contactUs">
        <p class="contactUs-company-name">北京葡萄腾信息技术有限公司</p>
        <ul class="contactUs-details">
            <li>
                <i class="icon-tel"></i>
                <span>电话：(010)59478634</span>
            </li>
            <li>
                <i class="icon-round"></i>
                <span>网址：www.luoboduo.com</span>
            </li>
            <li>
                <i class="icon-email"></i>
                <span>邮箱：fuhua@ptteng.com</span>
            </li>
            <li>
                <i class="icon-address"></i>
                <span>北京市海淀区翠微路甲10院225室</span>
            </li>
        </ul>
        <!--<div class="img-address" :style="{backgroundImage: 'url(' + bg + ')'}"></div> -->
        <img class="img-address" src="../../static/img-address.png">
    </div>
</template>
<script>
//     export default {
//         data() {
//             return {
//                 bg: require('../assets/aboutus/img-address.png')
//             }
//         }
//     }
</script>
<style lang="scss" scoped type="text/css">
    .content-contactUs {
        padding: .8rem;
    }
    .contactUs-company-name {
        margin-bottom: .2rem;
        font-size: .16rem;
        font-weight: 600;
        color: #2b3d51;
    }
    .contactUs-details {
        display: flex;
        flex-wrap: wrap;
        li {
            margin-bottom: .15rem;
            width: 50%;
        }
        i {
            display: inline-block;
            vertical-align: middle;
        }
        span {
            margin-left: .05rem;
            font-size: .14rem;
            vertical-align: middle;
            color: #2b3d51;
        }
    }
    .icon-tel {
        width: .14rem;
        height: .13rem;
        background: url("../assets/aboutus/icon-littlephone.png")
    }
    .icon-round {
        width: .14rem;
        height: .14rem;
        background: url("../assets/aboutus/icon-round.png");
    }
    .icon-email {
        width: .14rem;
        height: .13rem;
        background: url("../assets/aboutus/icon-email.png");
    }
    .icon-address {
        width: .14rem;
        height: .15rem;
        background: url("../assets/aboutus/icon-address.png");
    }
    .img-address {
        margin-top: .15rem;
        max-width: 100%;
    }

    @media screen and (max-width: 768px) {
        .content-contactUs {
            padding: .4rem;
        }
        .contactUs-details {
            flex-direction: column;
            li {
                width: 100%;
            }
        }
        .img-address {
            display: none;
        }
    }
</style>
