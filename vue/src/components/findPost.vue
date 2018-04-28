<template>
    <div class="container findPost_wrap">
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
                        <p class="nav_submenu_list" v-for="(submenuList, index) in menu.submenuLists" :key="index">{{submenuList}}</p>
                    </div>
                    <div class="nav_popup">
                        <div class="nav_popup_wrap" v-for="(submenuPopup, index) in menu.submenuPopups" :key="index">
                            <p class="nav_popup_header">{{submenuPopup.popupTitle}}</p>
                            <div class="nav_popup_body" v-for="(popupList, index) in submenuPopup.popupLists" :key="index">
                                <input type="radio" :id="popupList.id" :name="popupList.name">
                                <label :for="popupList.id">{{popupList.content}}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 轮播图插件uiv -->
            <section class="carousel_wrap">
                <carousel :interval="interval" ref="carousel" icon-control-left="my_icon glyphicon glyphicon-menu-left" icon-control-right="my_icon glyphicon glyphicon-menu-right">
                <slide v-if="bannerImg" v-for="(bannerImg, index) in bannerImgs" :key="index" :class="{'active': index === carouselIndex}">
                    <div class="pic_wrap"><a :href="bannerImg.url"><img :src="bannerImg.img"></a></div>
                </slide>
                </carousel>
            </section>
            <!-- 搜索条 -->
            <form class="search_wrap">
                <div class="search_content">
                    <p class="search_title">公司名称</p>
                    <input class="search_text" type="text" placeholder="输入公司名称">
                </div>
                <button class="search_button" type="submit">搜索</button>
            </form>
        </div>
        <!-- 推荐/最新职位 -->
        <tabs pills class="post_wrap row">
            <tab class="post_tab" title="推荐职位">
                <div class="post_content">
                    <!-- 需要后台数据 -->
                    <div class="post_block" v-for="(post, index) in posts" :key="index">
                        <img class="post_block_logo" v-if="getPosts" :src="getPosts[0].logo">
                        <div class="post_block_content">
                            <p class="post_block_compensation" v-if="getPosts">{{getPosts[0].compensation}}</p>
                            <p class="post_block_name" v-if="getPosts">{{getPosts[0].name}}</p>
                            <p class="post_block_company" v-if="getPosts">{{getPosts[0].companyName}}</p>
                        </div>
                    </div>
                </div>
            </tab>
            <tab class="post_tab" title="最新职位">
                <div class="post_content">
                    <!-- 需要后台数据 -->
                    <div class="post_block" v-for="(post, index) in posts" :key="index">
                        <img class="post_block_logo" v-if="getPosts" :src="getPosts[0].logo">
                        <div class="post_block_content">
                            <p class="post_block_compensation" v-if="getPosts">{{getPosts[0].compensation}}</p>
                            <p class="post_block_name" v-if="getPosts">{{getPosts[0].name}}</p>
                            <p class="post_block_company" v-if="getPosts">{{getPosts[0].companyName}}</p>
                        </div>
                    </div>
                </div>
            </tab>
            <a class="post_readmore">查看更多<span class="glyphicon glyphicon-menu-right"></span></a>
        </tabs>
        <!-- 推荐公司 -->
        <div class="company_wrap row">
            <!-- 标题 -->
            <div class="company_header">
                <p class="company_title">推荐公司</p>
                <a class="company_readmore">查看更多<span class="glyphicon glyphicon-menu-right"></span></a>
            </div>
            <!-- 内容 -->
            <div class="company_content">
                <div class="company_approved">
                    <img class="company_approved_logo" v-if="getCompaniesApr" :src="getCompaniesApr[0].logo">
                </div>
                <div class="company_normal">
                    <div class="company_normal_block" v-for="(post, index) in posts" :key="index">
                        <img class="normal_block_logo" v-if="getCompanies" :src="getCompanies[0].logo">
                    </div>
                </div>
            </div>
            <!-- 公司轮播 -->
            <swiper class="company_swiper" :options="swiperOption" ref="mySwiper">
                <swiper-slide class='swiper_wrap' v-for="(indicator, index) in indicators" :key="index">
                    <div class="swiper_company"></div>
                    <div class="swiper_post"></div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination">

                </div>
            </swiper>
            <!-- 轮播下挡条 -->
            <div class="swiper_blank"></div>
        </div>
    </div>
</template>

<style lang="less">
    body {
        background: #f6f7f8;
    }
    .findPost_wrap {
        padding-top: 2rem;
        //导航
        .banner_wrap {
            position: relative;
            display: flex;
            height: 45.6rem;
            //导航条
            .navigation_wrap {
                position: relative;
                width: 23.6rem;
                height: 100%;
                .nav_menu {
                    height: 33.333333%;
                    padding: 1.5rem 1.5rem 1.5rem 2rem;
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
                        margin-bottom: 1.5rem;
                        padding-right: 1.4rem;
                        height: 1.8rem;
                        font-size: 1.9rem;
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
                            padding-left: 1rem;
                            
                        }
                    }
                    .nav_submenu_body {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        // justify-content: space-between;
                        align-content: center;
                        height: calc(100% - 3.3rem);
                        font-size: 1.4rem;
                        line-height: 1;
                        color: #fff;
                        .nav_submenu_list {
                            margin: 1rem 1.55rem 1rem 0;
                        }
                    }
                    .nav_popup {
                        position: absolute;
                        display: none;
                        left: 23.6rem;
                        top: 0;
                        border: 1px solid #f43851;
                        padding: 2.5rem;
                        width: 77.4rem;
                        height: 100%;
                        background: #fff;
                        z-index: 999999;
                        .nav_popup_wrap {
                            display: flex;
                            align-items: center;
                            .nav_popup_header {
                                padding: 1.5rem;
                                font-size: 1.6rem;
                                color: #f43851;
                            }
                            .nav_popup_body {
                                padding: 1rem;
                                font-size: 1.4rem;
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
                                    padding: 0 1rem;
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
                width: 94.3rem;
                height: 100%;
                .carousel {
                    height: 100%;
                    .pic_wrap {
                        height: 45.6rem;
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
                            left: 4rem;
                            margin-top: -10px;
                            &::before {
                                padding: .4rem .2rem;
                                border-radius: .3rem;
                                font-size: 2.4rem;
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
                            right: 4rem;
                        }
                    }
                    .carousel-indicators {
                        bottom: 4.6rem;
                        li {
                            margin: 0 .7rem;
                        }
                    }
                }
            }
            //搜索框
            .search_wrap {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: space-between;
                top: 4rem;
                right: 12rem;
                border-radius: .8rem;
                padding: 1.5rem;
                width: 70rem;
                height: 7.4rem;
                background: rgba(0, 0, 0, .3);
                box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
                z-index: 999;
                .search_content {
                    display: flex;
                    align-items: center;
                    border-radius: .5rem 0 0 .5rem;
                    width: calc(100% - 9.6rem);
                    height: 100%;
                    background: #fff;
                    box-shadow: 0 0 1px 1px #fff;
                    .search_title {
                        display: flex;
                        justify-content: center;
                        border-right: 1px solid #999;
                        width: 9.5rem;
                        font-size: 1.6rem;
                        line-height: 1;
                        color: #2d3e50;
                    }
                    .search_text {
                        border: none;
                        padding: 0 1.5rem;
                        width: calc(100% - 9.5rem);
                        background: #fff;
                        outline: none;
                    }
                }
                .search_button {
                    border-radius: 0 .5rem .5rem 0;
                    width: 9.6rem;
                    height: 100%;
                    font-size: 1.66rem;
                    background: #f43851;
                    color: #fff;
                    box-shadow: 0 0 1px 1px #f43851;
                }
            }
        }
        //推荐职位
        .post_wrap {
            position: relative;
            padding-top: 1.5rem;
            //职位切换标签(bootstrap)
            .nav {
                display: flex;
                align-items: center;
                padding-left: 1.2rem;
                li.active a {
                    font-size: 1.6rem;
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
                    padding: .5rem 1rem;
                    font-size: 1.4rem;
                    color: #2d3e50;
                    background: transparent;
                }
            }
            //推荐/最新职位
            .post_tab {
                .post_content {
                    display: flex;
                    flex-wrap: wrap;
                    padding: 2.4rem 1.4rem 4rem;
                    background: #fff;
                    .post_block {
                        display: flex;
                        padding: 1rem;
                        margin: .6rem;
                        border-radius: .4rem;
                        border: 1px solid #e8e8e8;
                        width: calc(25% - 1.2rem);
                        height: 12.8rem;
                        transition: all .2s ease-in-out;
                        &:hover {
                            box-shadow: 0 0 10px 1px #eee;
                            transform: scale(1.01, 1.01);
                        }
                        .post_block_logo {
                            height: 100%;
                            border: 1px solid #e8e8e8;
                        }
                        .post_block_content {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 1.5rem 0 1.5rem 3rem;
                            .post_block_compensation {
                                font-size: 1.6rem;
                                color: #fc2b47;
                            }
                            .post_block_name {
                                font-size: 1.4rem;
                                color: #2d3e50;
                            }
                            .post_block_company {
                                font-size: 1.4rem;
                                color: #536a82;
                            }
                        }
                    }
                }
            }
            //推荐/最新职位-查看更多
            .post_readmore {
                position: absolute;
                display: flex;
                align-items: center;
                top: 2rem;
                right: 2rem;
                font-size: 1.6rem;
                line-height: 1;
                color: #2d3e50;
            }
        }
        //推荐公司
        .company_wrap {
            padding-top: 1.3rem;
            //标题
            .company_header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 1.2rem;
                line-height: 1;
                .company_title {
                    padding: .5rem 1rem;
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #2d3e50;
                }
                .company_readmore {
                    padding-right: 2rem;
                    font-size: 1.2rem;
                    color: #2d3e50;
                }
            }
            //内容
            .company_content {
                display: flex;
                padding: 2.8rem 1.2rem 2.4rem;
                background: #fff;
                .company_approved {
                    margin: .8rem 1.2rem .8rem .8rem;
                    border: 1px solid #e8e8e8;
                    width: 37.4rem;
                    height: 21.4rem;
                    transition: all .2s ease-in-out;
                    &:hover {
                        box-shadow: 0 0 10px 1px #eee;
                        transform: scale(1.01, 1.01);
                    }
                    .company_approved_logo {
                        width: 100%;
                        height: 100%;
                    }
                }
                .company_normal {
                    display: flex;
                    flex-wrap: wrap;
                    width: calc(100% - 39.4rem);
                    height: 23rem;
                    .company_normal_block {
                        margin: .8rem;
                        border: 1px solid #e8e8e8;
                        border-radius: .4rem;
                        width: calc(25% - 1.6rem);
                        height: calc(50% - 1.6rem);
                        transition: all .2s ease-in-out;
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
                padding: 0 2rem;
                background: #fff;
                height: 16rem;
                .swiper_wrap {
                    padding: .6rem;
                    border: 1px solid #e8e8e8;
                    border-radius: .4rem;
                    width: 111rem;
                }
                .swiper-pagination {
                    right: 3.6rem;
                    .swiper-pagination-bullet {
                        margin: 1.7rem 0;
                        border: 1px solid #e8e8e8;
                        width: 1.8rem;
                        height: 1.8rem;
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
                height: 4.6rem;
                background: #fff;
            }
        }
    }
</style>

<script>
    export default{
        data () {
            return {
                interval: 3000,
                posts: [0, 1, 2, 3, 4, 5, 6, 7],
                indicators: [0, 1, 2, 3],
                //获取数据
                bannerImgs: '',
                getPosts: '',
                getCompanies: '',
                getCompaniesApr: '',
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
                //轮播第一页不显示bug修复
                carouselIndex: 0,
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
            this.carousel ();
            this.carouselClass ();
            this.post ();
            this.company ();
            this.companyApproved ();
        },
        methods: {
            //轮播获取banner数据
            carousel () {
                this.$http.get("/carrots-ajax/a/article/search", {params: {page: 11,size: 3}})
                .then((res) => {
                    // console.log(res.data);
                    this.bannerImgs = res.data.data.articleList;
                    console.log('banner:' );
                    console.log(this.bannerImgs);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //轮播第一页不显示bug修复
            carouselClass () {
                setTimeout(() => {
                    this.carouselIndex = -1;
                }, 3000);
            },
            //获取职位数据
            post () {
                this.$http.get("/carrots-ajax/a/profession/search")
                .then((res) => {
                    // console.log(res.data);
                    this.getPosts = res.data.data;
                    console.log('getPosts:');
                    console.log(this.getPosts);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //获取公司信息
            company () {
                this.$http.get("/carrots-ajax/a/company/search")
                .then((res) => {
                    // console.log(res.data);
                    this.getCompanies = res.data.data;
                    console.log('getCompanies:');
                    console.log(this.getCompanies);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            },
            //获取认证公司
            companyApproved () {
                this.$http.get("/carrots-ajax/a/company/search", {params: {approvedStatus: 1}})
                .then((res) => {
                    // console.log(res.data);
                    this.getCompaniesApr = res.data.data;
                    console.log('getCompaniesApr:');
                    console.log(this.getCompaniesApr);
                })
                .catch((error) => {
                    console.log('服务器无响应');
                });
            }
        }
    };
</script>