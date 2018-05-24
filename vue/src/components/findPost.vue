<template>
    <div class="findPost_wrap">
        <div class="container">
            <!-- 导航 -->
            <div class="banner_wrap row">
                <!-- 导航条 -->
                <div class="navigation_wrap">
                    <div class="nav_menu" v-for="(menu, index) in menus" :key="index">
                        <div class="nav_submenu_header">
                            <p class="nav_submenu_icon" :class="{'icon_1': index === 0, 'icon_2': index === 1, 'icon_3': index === 2}"></p>
                            <p class="nav_submenu_title">{{menu.submenuHeader}}</p>
                            <p class="nav_submenu_arrow glyphicon glyphicon-menu-right"></p>
                        </div>
                        <div class="nav_submenu_body">
                            <p class="nav_submenu_list" v-for="(submenuList, index) in menu.submenuLists" :key="index" @click="searchPost(submenuList)">{{submenuList}}</p>
                        </div>
                        <div class="nav_popup">
                            <div class="nav_popup_wrap" v-for="(submenuPopup, index) in menu.submenuPopups" :key="index">
                                <p class="nav_popup_header">{{submenuPopup.popupTitle}}</p>
                                <div class="nav_popup_body" v-for="(popupList, index) in submenuPopup.popupLists" :key="index">
                                    <input type="radio" :id="popupList.id" :name="popupList.name">
                                    <label :for="popupList.id" @click="searchPost(popupList.content)">{{popupList.content}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 轮播图插件uiv -->
                <section class="carousel_wrap">
                    <carousel :interval="interval" ref="carousel" icon-control-left="my_icon glyphicon glyphicon-menu-left" icon-control-right="my_icon glyphicon glyphicon-menu-right">
                    <slide v-for="(bannerImg, index) in bannerImgs" :key="index">
                        <div class="pic_wrap"><a :href="bannerImg.url" target="_blank"><img :src="bannerImg.img"></a></div>
                    </slide>
                    </carousel>
                </section>
                <!-- 搜索条 -->
                <form class="search_wrap_p">
                    <div class="search_content">
                        <p class="search_title">公司名称</p>
                        <input class="search_text" type="text" placeholder="输入公司名称" v-model="searchCompany" maxlength="38">
                    </div>
                    <button class="search_button" type="submit" @click="companySearch(searchCompany)">搜索</button>
                </form>
            </div>
            <!-- 推荐/最新职位 -->
            <tabs pills class="post_wrap_p row">
                <tab class="post_tab" title="推荐职位">
                    <div class="post_content_p">
                        <div class="post_block" v-for="(recommendPost, index) in recommendPosts" :key="index" @click="postDetail(recommendPost.companyId, recommendPost.id)">
                            <img class="post_block_logo" :src="recommendPost.logo">
                            <div class="post_block_content">
                                <p class="post_block_compensation">{{recommendPost.compensation | compensationFilter}}</p>
                                <p class="post_block_name">{{recommendPost.name}}</p>
                                <p class="post_block_company">{{recommendPost.companyName}}</p>
                            </div>
                        </div>
                    </div>
                    <a class="post_readmore" @click="suggestPage ()">查看更多<span class="glyphicon glyphicon-menu-right"></span></a>
                </tab>
                <tab class="post_tab" title="最新职位">
                    <div class="post_content_p">
                        <div class="post_block" v-for="(newestPost, index) in newestPosts" :key="index" @click="postDetail(newestPost.companyId, newestPost.id)">
                            <img class="post_block_logo" :src="newestPost.logo">
                            <div class="post_block_content">
                                <p class="post_block_compensation">{{newestPost.compensation | compensationFilter}}</p>
                                <p class="post_block_name">{{newestPost.name}}</p>
                                <p class="post_block_company">{{newestPost.companyName}}</p>
                            </div>
                        </div>
                    </div>
                    <a class="post_readmore" @click="newPage ()">查看更多<span class="glyphicon glyphicon-menu-right"></span></a>
                </tab>
            </tabs>
            <!-- 推荐公司 -->
            <div class="company_wrap_p row">
                <!-- 标题 -->
                <div class="company_header">
                    <p class="company_title">推荐公司</p>
                    <a class="company_readmore" @click="companySearch ()">查看更多<span class="glyphicon glyphicon-menu-right"></span></a>
                </div>
                <!-- 内容 -->
                <div class="company_content_p" v-if="getCompanies.length != 0">
                    <!-- 行业大图 -->
                    <div class="company_approved" @click="companyDetail(getCompaniesApr.id)">
                        <img class="company_approved_logo" :src="getCompaniesApr.industryImg">
                        <p class="company_approved_name">{{getCompaniesApr.name}}</p>
                        <p class="company_approved_slogan">{{getCompaniesApr.slogan}}</p>
                        <div class="company_approved_detail">
                            <p class="approved_detail_industry"><span class="icon_1"></span>{{getCompaniesApr.industryId | industryFilter}}</p>
                            <p class="approved_detail_financing"><span class="icon_2"></span>{{getCompaniesApr.financing |financingFilter}}</p>
                            <p class="approved_detail_city"><span class="icon_3"></span>{{getCompaniesApr.city | cityFilter}}</p>
                        </div>
                    </div>
                    <!-- 普通公司 -->
                    <div class="company_normal" v-if="getCompanies.length != 0">
                        <div class="company_normal_block" v-for="(getCompany, index) in getCompanies" :key="index" @click="companyDetail(getCompany.id)">
                            <img class="normal_block_logo" :src="getCompany.logo">
                        </div>
                    </div>
                </div>
                <!-- 公司轮播 -->
                <swiper class="company_swiper" :options="swiperOption" ref="mySwiper">
                    <swiper-slide class="swiper_wrap" v-for="(getCompanyAprSwiper, index) in getCompaniesAprSwiper" :key="index">
                        <div class="swiper_company" @click="companyDetail(getCompanyAprSwiper.id)">
                            <img class="swiper_company_logo" :src="getCompanyAprSwiper.logo">
                            <div class="swiper_company_content">
                                <p class="company_content_name">{{getCompanyAprSwiper.name}}</p>
                                <p class="company_content_slogan">{{getCompanyAprSwiper.slogan}}</p>
                                <div class="company_content_industry">
                                    <p v-for="(industry, index) in getCompanyAprSwiper.industryList" :key="index">{{industry | industryFilter}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper_post" @click="companyDetail(getCompanyAprSwiper.id)">
                            <p class="swiper_post_title">正在热招</p>
                            <div class="swiper_post_detail">
                                <p v-for="(post, index) in getCompanyAprSwiper.professionList" :key="index" v-if="index <= 2">{{post}}</p>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination">
                    </div>
                </swiper>
                <!-- 轮播下挡条 -->
                <div class="swiper_blank"></div>
            </div>
            <!-- 介绍文字 -->
            <div class="intro_wrap row">
                <div class="intro_inner_top">
                    <img src="../assets/findPost/icon_1.png">
                    <div>
                        <p>无成本，零风险</p>
                        <p>无任何隐含费用全程免费</p>
                        <p>人才从投递到成功入职不需要任何费用，通过测试后还可免费提供从业建议，不浪费每一分天赋。</p>
                    </div>
                </div>
                <div class="intro_inner_bottom">
                    <div>
                        <p>高效匹配，高度契合</p>
                        <p>1-3天发送首个聘请通知<br>甄选职位 深度匹配  发送聘请通知</p>
                        <p>3-5天安排候选人面试<br>安排面试 协助客户快速入职</p>
                        <p>平均15天推荐成功<br>多方洽谈 售后服务</p>
                    </div>
                    <img src="../assets/findPost/icon_2.png">
                </div>
            </div>
            <!-- 联系我们 -->
            <div class="contact_wrap row" :style="{background: 'url(' + bg + ') no-repeat'}">
                <p>加入萝卜多人才推荐计划</p>
                <p>投送简历:kefu@ptteng.com</p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .findPost_wrap {
        padding-top: .2rem;
        background: #f6f7f8;
        //导航
        .banner_wrap {
            position: relative;
            display: flex;
            height: 4.56rem;
            //导航条
            .navigation_wrap {
                position: relative;
                width: 2.36rem;
                height: 100%;
                .nav_menu {
                    height: 33.333333%;
                    padding: .15rem .15rem .15rem .2rem;
                    background: #f43851;
                    transition: all .2s ease-in-out;
                    &:hover {
                        background: #fff;
                    }
                    &:hover .nav_submenu_header,
                    &:hover .nav_submenu_body {
                        color: #f43851;
                    }
                    &:hover .nav_submenu_header .icon_1 {
                        background-position: -48px -10px;
                    }
                    &:hover .nav_submenu_header .icon_2 {
                        background-position: -86px -10px;
                    }
                    &:hover .nav_submenu_header .icon_3 {
                        background-position: -203px -10px;
                    }
                    .nav_submenu_header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: .15rem;
                        padding-right: .14rem;
                        height: .18rem;
                        font-size: .19rem;
                        line-height: 1;
                        color: #fff;
                        .nav_submenu_icon {
                            background: url('../assets/findPost/css_sprites.png');
                        }
                        .icon_1 {
                            width: 19px;
                            height: 19px;
                            background-position: -10px -10px;
                        }
                        .icon_2 {
                            width: 19px;
                            height: 17px;
                            background-position: -124px -10px;
                        }
                        .icon_3 {
                            width: 22px;
                            height: 18px;
                            background-position: -162px -10px;
                        }
                        .nav_submenu_title {
                            flex: 1;
                            text-align: left;
                            padding-left: .1rem;
                        }
                    }
                    .nav_submenu_body {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        // justify-content: space-between;
                        align-content: center;
                        height: calc(100% - .33rem);
                        font-size: .14rem;
                        line-height: 1;
                        color: #fff;
                        .nav_submenu_list {
                            margin: .1rem .155rem .1rem 0;
                            cursor: pointer;
                        }
                    }
                    .nav_popup {
                        position: absolute;
                        display: none;
                        left: 2.34rem;
                        top: 0;
                        border: 1px solid #f43851;
                        padding: .25rem;
                        width: 7.74rem;
                        height: 100%;
                        background: #fff;
                        z-index: 999999;
                        .nav_popup_wrap {
                            display: flex;
                            align-items: center;
                            .nav_popup_header {
                                padding: .15rem;
                                font-size: .16rem;
                                color: #f43851;
                            }
                            .nav_popup_body {
                                padding: .1rem;
                                font-size: .14rem;
                                color: #536a82;
                                input[type=radio] {
                                    -webkit-appearance: none;
                                    &:checked + label {
                                        background: #f43851;
                                        color: #fff;
                                    }
                                }
                                label {
                                    margin: 0;
                                    padding: 0 .1rem;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    &:hover .nav_popup {
                        display: block;
                    }
                }
            }
            //轮播图
            .carousel_wrap {
                float: right;
                width: 9.43rem;
                height: 100%;
                .carousel {
                    height: 100%;
                    .pic_wrap {
                        height: 4.56rem;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .carousel-control.left {
                        background-image: none;
                        opacity: .9;
                        &:hover {
                            opacity: 1;
                        }
                        &:hover .my_icon::before{
                            background: rgba(255, 255, 255, .8);
                        }
                        .my_icon {
                            position: absolute;
                            top: 50%;
                            left: .4rem;
                            margin-top: -10px;
                            &::before {
                                padding: .04rem .02rem;
                                border-radius: .03rem;
                                font-size: .24rem;
                                text-shadow: none;
                                box-shadow: 0 0 1px 0 #bbb;
                                background: rgba(255, 255, 255, .6);
                            }
                        }
                    }
                    .carousel-control.right {
                        .carousel-control.left;
                        .my_icon {
                            left: auto;
                            right: .4rem;
                        }
                    }
                    .carousel-indicators {
                        bottom: .46rem;
                        li {
                            margin: 0 .07rem;
                        }
                    }
                }
            }
            //搜索框
            .search_wrap_p {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: space-between;
                top: .4rem;
                right: 1.2rem;
                border-radius: .08rem;
                padding: .15rem;
                width: 7rem;
                height: .74rem;
                background: rgba(0, 0, 0, .3);
                box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
                z-index: 999;
                .search_content {
                    display: flex;
                    align-items: center;
                    border-radius: .05rem 0 0 .05rem;
                    width: calc(100% - .96rem);
                    height: 100%;
                    background: #fff;
                    .search_title {
                        display: flex;
                        justify-content: center;
                        border-right: 1px solid #999;
                        width: .95rem;
                        font-size: .16rem;
                        line-height: 1;
                        color: #2d3e50;
                    }
                    .search_text {
                        border: none;
                        padding: 0 .15rem;
                        width: calc(100% - .95rem);
                        background: #fff;
                        outline: none;
                    }
                }
                .search_button {
                    border-radius: 0 .05rem .05rem 0;
                    width: .96rem;
                    height: 100%;
                    font-size: .166rem;
                    background: #f43851;
                    color: #fff;
                }
            }
        }
        //推荐职位
        .post_wrap_p {
            position: relative;
            padding-top: .15rem;
            //职位切换标签(bootstrap)
            .nav {
                display: flex;
                align-items: center;
                padding-left: .12rem;
                li.active a {
                    font-size: .16rem;
                    font-weight: 700;
                    background: transparent;
                    color: #2d3e50;
                    &:focus {
                        font-weight: 700;
                        color: #2d3e50;
                        background: transparent;
                    }
                    &:hover {
                        color: #2d3e50;
                        background: transparent;
                    }
                }
                li a {
                    padding: .05rem .1rem;
                    font-size: .14rem;
                    color: #2d3e50;
                    background: transparent;
                }
            }
            //推荐/最新职位
            .post_content_p {
                display: flex;
                flex-wrap: wrap;
                padding: .24rem .14rem .4rem;
                background: #fff;
                .post_block {
                    display: flex;
                    padding: .1rem;
                    margin: .06rem;
                    border-radius: .04rem;
                    border: 1px solid #e8e8e8;
                    width: calc(25% - .12rem);
                    height: 1.28rem;
                    transition: all .2s ease-in-out;
                    cursor: pointer;
                    &:hover {
                        box-shadow: 0 0 10px 1px #eee;
                        transform: scale(1.01, 1.01);
                    }
                    .post_block_logo {
                        width: 1.04rem;
                        height: 100%;
                        border: 1px solid #e8e8e8;
                    }
                    .post_block_content {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: .15rem 0 .15rem .3rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .post_block_compensation {
                            font-size: .16rem;
                            color: #fc2b47;
                        }
                        .post_block_name {
                            font-size: .14rem;
                            color: #2d3e50;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .post_block_company {
                            font-size: .14rem;
                            color: #536a82;
                        }
                    }
                }
            }
            //推荐/最新职位-查看更多
            .post_readmore {
                position: absolute;
                display: flex;
                align-items: center;
                top: .2rem;
                right: .2rem;
                font-size: .16rem;
                line-height: 1;
                color: #2d3e50;
                cursor: pointer;
            }
        }
        //推荐公司
        .company_wrap_p {
            padding-top: .13rem;
            //标题
            .company_header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: .12rem;
                line-height: 1;
                .company_title {
                    padding: .05rem .1rem;
                    font-size: .16rem;
                    font-weight: 700;
                    color: #2d3e50;
                }
                .company_readmore {
                    padding-right: .2rem;
                    font-size: .12rem;
                    color: #2d3e50;
                    cursor: pointer;
                }
            }
            //内容
            .company_content_p {
                display: flex;
                padding: .28rem .12rem .24rem;
                background: #fff;
                .company_approved {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    position: relative;
                    margin: .08rem .12rem .08rem .08rem;
                    padding: .17rem .36rem;
                    border: 1px solid #e8e8e8;
                    width: 3.74rem;
                    height: 2.14rem;
                    color: #fff;
                    transition: all .2s ease-in-out;
                    cursor: pointer;
                    &:hover {
                        box-shadow: 0 0 10px 1px #eee;
                        transform: scale(1.01, 1.01);
                    }
                    .company_approved_logo {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .company_approved_name {
                        margin-bottom: .1rem;
                        font-size: .16rem;
                        z-index: 1;
                    }
                    .company_approved_slogan {
                        margin-bottom: .1rem;
                        font-size: .14rem;
                        z-index: 1;
                    }
                    .company_approved_detail {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: .14rem;
                        z-index: 1;
                        .approved_detail_industry{
                            .icon_1 {
                                display: inline-block;
                                margin-right: .05rem;
                                width: 14px;
                                height: 13px;
                                background: url(../assets/findPost/css_sprites_company.png) -10px -76px;
                            }
                        }
                        .approved_detail_financing {
                            .icon_2 {
                                display: inline-block;
                                margin-right: .05rem;
                                width: 15px;
                                height: 13px;
                                background: url(../assets/findPost/css_sprites_company.png) -10px -10px;
                            }
                        }
                        .approved_detail_city {
                            .icon_3 {
                                display: inline-block;
                                margin-right: .05rem;
                                width: 12px;
                                height: 13px;
                                background: url(../assets/findPost/css_sprites_company.png) -10px -43px;
                            }
                        }
                    }
                }
                .company_normal {
                    display: flex;
                    flex-wrap: wrap;
                    width: calc(100% - 3.94rem);
                    height: 2.3rem;
                    .company_normal_block {
                        margin: .08rem;
                        border: 1px solid #e8e8e8;
                        border-radius: .04rem;
                        width: calc(25% - .16rem);
                        height: calc(50% - .16rem);
                        transition: all .2s ease-in-out;
                        cursor: pointer;
                        &:hover {
                            box-shadow: 0 0 10px 1px #eee;
                            transform: scale(1.01, 1.01);
                        }
                        .normal_block_logo {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            //纵向轮播
            .company_swiper {
                display: flex;
                justify-content: space-between;
                padding: 0 .2rem;
                background: #fff;
                height: 1.6rem;
                .swiper_wrap {
                    display: flex;
                    padding: .06rem;
                    border: 1px solid #e8e8e8;
                    border-radius: .04rem;
                    width: 10.8rem;
                    cursor: pointer;
                    .swiper_company {
                        display: flex;
                        width: 6.4rem;
                        height: 100%;
                        border-right: 1px solid #e8e8e8;
                        .swiper_company_logo {
                            margin: .07rem;
                            border: 1px solid #e8e8e8;
                            border-radius: .04rem;
                            width: 1.8rem;
                            height: calc(100% - .14rem);
                        }
                        .swiper_company_content {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            padding: .26rem 0 .26rem .16rem;
                            width: calc(100% - 1.94rem);
                            height: 100%;
                            .company_content_name {
                                padding-left: .06rem;
                                font-size: .18rem;
                                font-weight: 700;
                                color: #2d3e50;
                            }
                            .company_content_slogan {
                                padding-left: .06rem;
                                font-size: .14rem;
                                color: #536a82;
                            }
                            .company_content_industry {
                                display: flex;
                                padding: .06rem 0;
                                p {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border: 1px solid #d9d9d9;
                                    margin: 0 .06rem;
                                    width: .73rem;
                                    height: .25rem;
                                }
                            }
                        }
                    }
                    .swiper_post {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: .32rem 0 .32rem .1rem;
                        width: calc(100% - 6.4rem);
                        height: 100%;
                        line-height: 1;
                        color: #2d3e50;
                        .swiper_post_title {
                            padding-left: .14rem;
                            font-size: .18rem;
                            font-weight: 700;
                        }
                        .swiper_post_detail {
                            display: flex;
                            p {
                                padding: 0 .14rem;
                                border-left: 1px solid #e8e8e8;
                                border-right: 1px solid #e8e8e8;
                                margin-left: -1px;
                                font-size: .16rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
                .swiper-pagination {
                    right: .36rem;
                    .swiper-pagination-bullet {
                        margin: .17rem 0;
                        border: 1px solid #e8e8e8;
                        width: .18rem;
                        height: .18rem;
                        background: #fff;
                        opacity: 1;
                    }
                    .swiper-pagination-bullet-active {
                        background: #fc2b47;
                    }
                }
            }
            //轮播下挡条
            .swiper_blank {
                height: .46rem;
                background: #fff;
            }
        }
        //介绍文字
        .intro_wrap {
            padding: .2rem 0;
            height: 9.2rem;
            .intro_inner_top {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50%;
                background: #fff;
                img {
                    margin-right: 1.45rem;
                }
                div {
                    display: flex;
                    flex-direction: column;
                    width: 3.08rem;
                    p {
                        margin: .09rem 0;
                        font-size: .24rem;
                        font-weight: 700;
                        color: #2d3e50;
                    }
                    p + p {
                        font-size: .18rem;
                        font-weight: 400;
                        color: #536a82;
                    }
                    p + p {
                        font-size: .14rem;
                        font-weight: 400;
                        color: #536a82;
                    }
                }
            }
            .intro_inner_bottom {
                .intro_inner_top;
                img {
                    margin-right: 0;
                    margin-left: 1.45rem;
                }
            }
        }
        //联系我们
        .contact_wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 4rem;
            color: #fff;
            p {
                font-size: .24rem;
            }
            P + P {
                font-size: .18rem;
            }
        }
    }
    @media screen and (max-width: 1200px) {
        .findPost_wrap {
            .banner_wrap {
                .navigation_wrap {
                    .nav_menu {
                        .nav_submenu_body {
                            .nav_submenu_list {
                                margin: .1rem .02rem;
                            }
                        }
                        .nav_popup {
                            left: 1.9rem;
                        }
                    }
                }
                .search_wrap_p {
                    right: .4rem;
                }
            }
            .post_wrap_p {
                .post_content_p {
                    .post_block {
                        .post_block_content {
                            padding-left: .02rem;
                        }
                    }
                }
            }
            .company_wrap_p {
                .company_swiper {
                    .swiper_wrap {
                        width: 95%;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 992px) {
        .findPost_wrap {
            .banner_wrap {
                .navigation_wrap {
                    .nav_menu {
                        .nav_submenu_body {
                            .nav_submenu_list {
                                margin: .05rem .02rem;
                            }
                        }
                        .nav_popup {
                            left: 1.5rem;
                        }
                    }
                }
                .search_wrap_p {
                    width: 5rem;
                    right: .4rem;
                }
            }
            .post_wrap_p {
                .post_content_p {
                    .post_block {
                        .post_block_content {
                            padding-left: .02rem;
                        }
                        .post_block_logo {
                            display: none;
                        }
                    }
                }
            }
            .company_wrap_p {
                .company_swiper {
                    .swiper_wrap {
                        width: 90%;
                        .swiper_company {
                            width: 60%;
                            .swiper_company_content {
                                padding-left: 0;
                            }
                        }
                        .swiper_post {
                            width: 40%;
                        }
                    }
                }
                .company_content_p {
                    .company_approved {
                        width: 3rem;
                        height: 2rem;
                    }
                    .company_normal {
                        width: calc(100% - 3rem);
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        header {
            .img-logo {
                padding-top: .1rem;
                width: 1.5rem;
            }
        }
        .findPost_wrap {
            .banner_wrap {
                display: none;
            }
            .post_wrap_p {
                .post_content_p {
                    .post_block {
                        width: calc(50% - .12rem);
                        .post_block_content {
                            padding-left: .02rem;
                        }
                        .post_block_logo {
                            display: none;
                        }
                    }
                }
            }
            .company_wrap_p {
                .company_swiper {
                    display: none;
                }
                .company_content_p {
                    .company_approved {
                        width: 3rem;
                        height: 2rem;
                    }
                    .company_normal {
                        display: none;
                        width: calc(100% - 3rem);
                    }
                }
            }
            .intro_wrap {
                height: auto;
                .intro_inner_top {
                    flex-direction: column;
                    img {
                        margin: 0;
                    }
                }
                .intro_inner_bottom {
                    flex-direction: column;
                    img {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>

<script>
    export default{
        data () {
            return {
                //导入联系我们背景图片
                bg: require('../assets/findPost/email_bg.png'),
                //搜索条内容
                searchCompany: '',
                //轮播设置
                interval: 3000,
                //获取数据
                //banner数据
                bannerImgs: [{img: '', url: ''}],
                //推荐职位
                recommendPosts: [{logo: '', id: '', companyId: '', compensation: '', name: '', companyName: ''}],
                //最新职位
                newestPosts: [{logo: '', id: '', companyId: '', compensation: '', name: '', companyName: ''}],
                //普通公司 *8
                getCompanies: [{id: '', logo: ''}],
                //行业大图 *1
                getCompaniesApr: {industryImg: '', name: '', slogan: '', industryId: '', financing: '', city: ''},
                //认证公司轮播 *4
                getCompaniesAprSwiper: [{logo: '', name: '', slogan: '', industryList: [], id: ''}],
                //所有职位
                getPosts: [{name: '', companyId: ''}],
                //导航栏列表数据
                menus: [
                    {
                        submenuHeader: '产品',
                        submenuLists: ['产品经理', '移动产品经理', '产品总监', '网页产品经理', '电商产品经理'],
                        submenuPopups: [
                            {
                                popupTitle: '产品经理',
                                popupLists: [
                                    {id: 'popupId_1_1_1', name: 'popupName_1_1', content: '产品经理'},
                                    {id: 'popupId_1_1_2', name: 'popupName_1_1', content: '移动产品经理'},
                                    {id: 'popupId_1_1_3', name: 'popupName_1_1', content: '网页产品经理'},
                                    {id: 'popupId_1_1_4', name: 'popupName_1_1', content: '电商产品经理'},
                                    {id: 'popupId_1_1_5', name: 'popupName_1_1', content: '游戏策划'}
                                ]
                            },
                            {
                                popupTitle: '高端职位',
                                popupLists: [
                                    {id: 'popupId_1_2_1', name: 'popupName_1_2', content: '产品总监'},
                                    {id: 'popupId_1_2_2', name: 'popupName_1_2', content: '游戏制作人'}
                                ]
                            }

                        ]
                    },
                    {
                        submenuHeader: '技术',
                        submenuLists: ['PHP', 'JAVA', 'IOS', 'HTML5', 'WEB前端', 'Android'],
                        submenuPopups: [
                            {
                                popupTitle: '前端',
                                popupLists: [
                                    {id: 'popupId_2_1_1', name: 'popupName_2_1', content: 'web前端'},
                                    {id: 'popupId_2_1_2', name: 'popupName_2_1', content: 'flash'},
                                    {id: 'popupId_2_1_3', name: 'popupName_2_1', content: 'javascript'},
                                    {id: 'popupId_2_1_4', name: 'popupName_2_1', content: 'html5'},
                                    {id: 'popupId_2_1_5', name: 'popupName_2_1', content: '前端开发其他'}
                                ]
                            },
                            {
                                popupTitle: '后端',
                                popupLists: [
                                    {id: 'popupId_2_2_1', name: 'popupName_2_2', content: 'web前端'},
                                    {id: 'popupId_2_2_2', name: 'popupName_2_2', content: 'flash'},
                                    {id: 'popupId_2_2_3', name: 'popupName_2_2', content: 'javascript'},
                                    {id: 'popupId_2_2_4', name: 'popupName_2_2', content: 'html5'},
                                    {id: 'popupId_2_2_5', name: 'popupName_2_2', content: '前端开发其他'}
                                ]
                            },
                            {
                                popupTitle: '移动',
                                popupLists: [
                                    {id: 'popupId_2_3_1', name: 'popupName_2_3', content: 'html5'},
                                    {id: 'popupId_2_3_2', name: 'popupName_2_3', content: 'Android'},
                                    {id: 'popupId_2_3_3', name: 'popupName_2_3', content: 'IOS'},
                                    {id: 'popupId_2_3_4', name: 'popupName_2_3', content: 'WP'},
                                    {id: 'popupId_2_3_5', name: 'popupName_2_3', content: '移动开发其他'}
                                ]
                            },
                            {
                                popupTitle: '测试',
                                popupLists: [
                                    {id: 'popupId_2_4_1', name: 'popupName_2_4', content: '测试工程师'},
                                    {id: 'popupId_2_4_2', name: 'popupName_2_4', content: '性能测试'},
                                    {id: 'popupId_2_4_3', name: 'popupName_2_4', content: '功能测试'},
                                    {id: 'popupId_2_4_4', name: 'popupName_2_4', content: '测试其他'}
                                ]
                            },
                            {
                                popupTitle: '运维',
                                popupLists: [
                                    {id: 'popupId_2_5_1', name: 'popupName_2_5', content: '运维工程师'},
                                    {id: 'popupId_2_5_2', name: 'popupName_2_5', content: '网络工程师'},
                                    {id: 'popupId_2_5_3', name: 'popupName_2_5', content: '系统工程师'},
                                    {id: 'popupId_2_5_4', name: 'popupName_2_5', content: '运维其他'}
                                ]
                            },
                            {
                                popupTitle: '高端职位',
                                popupLists: [
                                    {id: 'popupId_2_6_1', name: 'popupName_2_6', content: '技术总监'},
                                    {id: 'popupId_2_6_2', name: 'popupName_2_6', content: '技术经理'},
                                    {id: 'popupId_2_6_3', name: 'popupName_2_6', content: '架构师'},
                                    {id: 'popupId_2_6_4', name: 'popupName_2_6', content: 'CTO'},
                                    {id: 'popupId_2_6_5', name: 'popupName_2_6', content: '高端技术职位其他'}
                                ]
                            }
                        ]
                    },
                    {
                        submenuHeader: '设计',
                        submenuLists: ['UI设计', 'APP设计', '设计总监', '交互设计师'],
                        submenuPopups: [
                            {
                                popupTitle: '视觉设计',
                                popupLists: [
                                    {id: 'popupId_3_1_1', name: 'popupName_3_1', content: 'UI设计师'},
                                    {id: 'popupId_3_1_2', name: 'popupName_3_1', content: '平面设计师'},
                                    {id: 'popupId_3_1_3', name: 'popupName_3_1', content: '网页设计师'},
                                    {id: 'popupId_3_1_4', name: 'popupName_3_1', content: 'app设计师'}
                                ]
                            },
                            {
                                popupTitle: '交互设计',
                                popupLists: [
                                    {id: 'popupId_3_2_1', name: 'popupName_3_2', content: '网页交互设计师'},
                                    {id: 'popupId_3_2_2', name: 'popupName_3_2', content: '交互设计师'}
                                ]
                            },
                            {
                                popupTitle: '高端职位',
                                popupLists: [
                                    {id: 'popupId_3_3_1', name: 'popupName_3_3', content: '设计总监'},
                                    {id: 'popupId_3_3_2', name: 'popupName_3_3', content: '视觉设计总管'},
                                    {id: 'popupId_3_3_3', name: 'popupName_3_3', content: '交互设计总管'}
                                ]
                            }
                        ]
                    }
                ],
                //vue-awsome-swiper选项
                swiperOption: {
                    notNextTick: true,
                    direction: 'vertical',
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            };
        },
        mounted () {
            //轮播
            this.carousel ();
            //推荐职位
            this.post (1, 8);
            //最新职位
            this.post (0, 8);
            //获取公司
            this.company ();
        },
        methods: {
            //轮播获取banner数据
            carousel () {
                this.$http.get("/carrots-ajax/a/article/search", {params: {page: 1,size: 5, type: 1}})
                .then((res) => {
                    // console.log(res.data);
                    this.bannerImgs = res.data.data.articleList;
                    console.log('轮播图');
                    console.log(this.bannerImgs);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //获取职位数据
            post (recommend, size) {
                this.$http.get("/carrots-ajax/a/profession/search", {params: {recommend: recommend, size: size}})
                .then((res) => {
                    //推荐职位
                    if (recommend === 1) {
                        this.recommendPosts = res.data.data;
                        console.log('推荐职位');
                        console.log(this.recommendPosts);
                    }
                    //最新职位
                    else if (recommend === 0) {
                        this.newestPosts = res.data.data;
                        console.log('最新职位');
                        console.log(this.newestPosts);
                    }
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //获取公司数据
            company () {
                this.$http.get("/carrots-ajax/a/company/search", {params: {returnPage: 1}})
                .then((res) => {
                    // 行业大图
                    this.getCompaniesApr = res.data.industryImg;
                    console.log('行业大图');
                    console.log(this.getCompaniesApr);
                    // 普通公司
                    this.getCompanies = res.data.normalCompanyList;
                    console.log('普通公司');
                    console.log(this.getCompanies);
                    // 认证公司
                    this.getCompaniesAprSwiper = res.data.approvedCompanyList;
                    console.log('认证公司');
                    console.log(this.getCompaniesAprSwiper);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //跳转公司详情
            companyDetail (id) {
                this.$router.push({path: 'details', query: {companyId: id}});
            },
            //跳转职位详情
            postDetail (companyId, id) {
                this.$router.push({path: 'detailsPost', query: {companyId: companyId, id: id}})
            },
            //搜索公司
            companySearch (companyKeyword) {
                window.sessionStorage.setItem('tabs', 0);
                this.$router.push({path: 'search', query: {companyKeyword: companyKeyword}});
            },
            //搜索职位
            searchPost (postKeyword) {
                window.sessionStorage.setItem('tabs', 1);
                this.$router.push({path: 'search', query: {postKeyword: postKeyword}});
            },
            //最新职位
            newPage () {
                window.sessionStorage.setItem('post', 0);
                this.$router.push({path: 'positionNew'});
            },
            //推荐职位
            suggestPage () {
                window.sessionStorage.setItem('post', 1);
                this.$router.push({path: 'positionNew'});
            }

        },
        computed: {

        }
    };
</script>
