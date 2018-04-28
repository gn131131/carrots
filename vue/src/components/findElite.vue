<template>
    <main>
        <div>
            <!--找职位轮播图-->
            <div class="banner">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide>
                    <swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide>
                    <swiper-slide>Slide 9</swiper-slide>
                    <swiper-slide>Slide 10</swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <!--预付部分-->
            <div class="content-prepaid">
                <div class="text-prepaid">
                    <p class="font-24">0预付，无风险</p>
                    <p class="font-16">入职付一半，转正付一半</p>
                    <p class="font-14">普通猎头是三个月的薪水。非一般的我们只收一个月的薪水。如果试用期不通过，免费推荐另一个</p>
                </div>
                <img src="../assets/findElite/img-center.jpg" class="img-lock">
            </div>
            <!--专注-->
            <div class="content-focus">
                <img src="../assets/findElite/img-focus.png" class="img-people">
                <div class="text-focus">
                    <p class="font-24">专注于</p>
                    <p class="font-16">最新最热门的IT互联网运人才</p>
                    <p class="font-14">萝卜多自己开发了一套强大的IT互联网人才库系统，有业界最新最活跃最有效的人才库，这里有最新最热门的IT互联网运营和技术人才，在各大互联网公司都有足够强的人脉圈。</p>
                </div>
            </div>
            <!--推荐部分-->
            <div class="content-recommend">
                <div class="text-recommend">
                    <p class="font-24">优选人才，高效推荐</p>
                    <div class="mg-10">
                        <p class="font-14">1-3天推荐首批候选人</p>
                        <p class="font-14">甄选人才 简历脱水 推荐人才</p>
                    </div>
                    <div class="mg-10">
                        <p class="font-14">3-5天安排候选人面试</p>
                        <p class="font-14">安排面试 协助客户选人用人</p>
                    </div>
                    <p class="font-14">平均15天推荐成功</p>
                    <p class="font-14">背景调查 多方洽谈 增值服务</p>
                </div>
                <img src="../assets/findElite/img-agreement.jpg">
            </div>
            <!--流程图-->
            <div class="content-process">
                <div class="process-details clearfix">
                    <p class="title">萝卜多，服务流程<span class="red-line"></span></p>
                    <div class="process-list">
                        <p class="text-job">开始招聘、候选人评审，初步确立聘用意向，背景调查</p>
                        <img src="../assets/findElite/img-process.png">
                        <div class="text-item">
                            <p class="mg-34">意向洽谈、深入评审、确认合作、签订合同、提出需求、提供jd、确立招聘标准</p>
                            <p>发送聘请通知，候选人上岗，付款、转入售后服务</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--我们的优势-->
            <div class="content-advantage">
                <div class="advantage-details">
                    <p class="title">我们的优势<span class="red-line"></span></p>
                    <ul class="advantage-list">
                        <li>
                            <img src="../assets/findElite/round-1.jpg">
                            <p>30%的行业标准收费水平</p>
                        </li>
                        <li>
                            <img src="../assets/findElite/round-2.jpg">
                            <p>一半一半无风险的收费模式</p>
                        </li>
                        <li>
                            <img src="../assets/findElite/round-3.jpg">
                            <p>试用期内不满重推的推荐制度</p>
                        </li>
                        <li>
                            <img src="../assets/findElite/round-4.jpg">
                            <p>高价值高数量的人才储备机制</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content-success">
                <p class="title">成功案例<span class="red-line"></span></p>
                <ul class="success-list">
                    <li><img src="" alt=""></li>
                    <li><img src="" alt=""></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li><img src="" alt=""></li>
                </ul>
                <button class="more-company btn btn-danger">更多合作公司</button>
            </div>
        </div>
    </main>
</template>

<script>
    //轮播图设置
    export default {
        data() {
            return {
                swiperOption: {
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        }
    }
</script>


<style lang="scss" scoped type="text/css">
    main {
        background: #f6f7f8;
    }
    .banner {
        height: 50rem;
    }
    .content-prepaid, .content-recommend{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40rem;
        background: #fff;
    }
    .text-prepaid {
        margin-right: 14rem;
        width: 27rem;
    }
    .font-24 {
         margin-bottom: 1.8rem;
         font-size: 2.4rem;
         color: #2b3d51;
     }
    .font-16 {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        color: #536a82;
    }
    .font-14 {
        font-size: 1.4rem;
        color: #536a82;
    }
    .content-focus {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 10rem;
        height: 40rem;
    }
    .text-focus {
        margin-left: 15rem;
        width: 32.5rem;
    }
    .text-recommend {
        margin-right: 15rem;
        width: 22rem;
    }
    .mg-10 {
        margin-bottom: 1rem;
    }
    .content-process {
        padding: 7.5rem 0 7rem;
        background: #fcfcfc;
    }
    .title {
        position: relative;
        margin-bottom: 5rem;
        font-size: 2rem;
        font-weight: 600;
        color: #2d3e50;
        text-align: center;
    }
    .red-line {
        position: absolute;
        top: 3rem;
        right: calc(50% - 1.45rem);
        width: 2.9rem;
        height: .2rem;
        background: #ff5652;
     }
    .process-list {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 2.4rem;
        color: #2d3e50;
    }
    .text-job {
        margin-right: 2rem;
        width: 24.5rem;
    }
    .text-item {
        margin-top: -1rem;
        margin-left: 2rem;
        width: 24.5rem;
    }
    .mg-34 {
        margin-bottom: 33rem;
    }
    .content-advantage {
        padding: 7.5rem 0;
        background: #fff;
    }
    .advantage-list {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 116rem;
        font-weight: 600;
        li {
            text-align: center;
            img {
                margin-bottom: 2rem;
            }
            p {
                font-size: 1.6rem;
                color: #2d3e50;
            }
        }
    }
    .success-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 auto;
        width: 116rem;
        li {
            margin-bottom: 4rem;
            width: 26rem;
            height: 18rem;
            border: 1px solid #e8e8e8;
            border-radius: .5rem;
            background: #fff;
        }
    }
    .content-success {
        padding: 7.5rem 0 3rem;
    }
    .more-company {
        display: block;
        margin: 0 auto;
        width: 18rem;
        height: 5.5rem;
        font-size: 1.6rem;
    }
</style>
