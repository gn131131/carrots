<template>
    <div class="detailsPost_wrap">
        <div class="container">
            <div class="detailsPost_inner">
                <div class="post_detail">
                    <p class="post_detail_name">{{getPost.name}}</p>
                    <p class="post_detail_companyName">{{getPost.companyName}}</p>
                    <div class="post_detail_require">
                        <p class="detail_require_compensation">{{getPost.compensation | compensationFilter}}</p>
                        <p class="detail_require_city">{{getPost.city | cityFilter}}</p>
                        <p class="detail_require_education">{{getPost.education | educationFilter}}</p>
                        <p class="detail_require_experience">{{getPost.experience | experienceFilter}}</p>
                    </div>
                    <div class="post_detail_tags">
                        <p v-for="(tag, index) in getPost.tags" :key="index">{{tag.tag}}</p>
                    </div>
                    <p class="post_detail_updateAt">发布时间：{{getPost.updateAt | updateAtFilter}}</p>
                    <p class="post_detail_intro">职位描述</p>
                    <div class="detail_intro_content">
                        <p class="intro_content_header">岗位职责</p>
                        <p class="intro_content_content">{{getPost.responsibility}}</p>
                        <p class="intro_content_header">必备条件</p>
                        <p class="intro_content_content">{{getPost.requisite}}</p>
                        <p class="intro_content_header">公司福利</p>
                        <p class="intro_content_content">{{getPost.boon}}</p>
                    </div>
                </div>
                <div class="company_detail">
                    <div class="company_detail_logo">
                        <img :src="getCompany.company.logo">
                        <p>{{getPost.companyName}}</p>
                    </div>
                    <p class="company_detail_info">基本信息</p>
                    <div class="detail_info_wrap">
                        <p class="detail_info_totalNum">{{getCompany.company.totalNum}}人</p>
                        <p class="detail_info_industry" v-for="(industry, index) in getCompany.industryList" :key="index">{{industry.industry | industryFilter}}</p>
                    </div>
                </div>
                <div class="share"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .detailsPost_wrap {
        background: #f6f7f8;
        padding-top: .2rem;
        .detailsPost_inner {
            display: flex;
            flex-wrap: wrap;
            padding: .4rem .2rem 0 .2rem;
            margin-bottom: .24rem;
            background: #fff;
            .post_detail {
                border-right: 3px solid #f4f4f4;
                width: 7.76rem;
                .post_detail_name {
                    margin-bottom: .1rem;
                    font-size: .16rem;
                    line-height: 1;
                    font-weight: 700;
                    color: #2d3e50;
                }
                .post_detail_companyName {
                    margin-bottom: .2rem;
                    font-size: .12rem;
                    line-height: 1;
                    color: #536a82;
                }
                .post_detail_require {
                    display: flex;
                    margin-bottom: .2rem;
                    p {
                        font-size: .14rem;
                        line-height: 1;
                        padding-left: .19rem;
                        margin-left: .14rem;
                        color: #536a82;
                    }
                    .detail_require_compensation {
                        padding-left: 0;
                        margin-left: 0;
                        color: #fc2a48;
                    }
                    .detail_require_city {
                        background: url(../assets/detailsPost/css_sprites.png) no-repeat -10px -42px;
                    }
                    .detail_require_education {
                        background: url(../assets/detailsPost/css_sprites.png) no-repeat -10px -75px;
                    }
                    .detail_require_experience {
                        background: url(../assets/detailsPost/css_sprites.png) no-repeat -10px -108px;
                    }
                }
                .post_detail_tags {
                    display: flex;
                    flex-wrap: wrap;
                    width: 4.5rem;
                    p {
                        display: flex;
                        align-items: center;
                        padding: 0 .1rem;
                        margin: 0 .2rem .15rem 0;
                        height: .22rem;
                        border: 1px solid #d9d9d9;
                        border-radius: .11rem;
                        font-size: .12rem;
                        color: #536a82;
                    }
                }
                .post_detail_updateAt {
                    position: relative;
                    margin: .12rem 0 .47rem;
                    padding-left: .17rem;
                    font-size: .12rem;
                    line-height: 1.1;
                    color: #999;
                    background: url(../assets/detailsPost/css_sprites.png) no-repeat -10px -10px;
                    &::after {
                        content: '';
                        position: absolute;
                        width: 7.6rem;
                        top: .32rem;
                        left: 0;
                        border-top: 1px solid #f6f7f8;
                    }
                }
                .post_detail_intro {
                    border-left: 5px solid #fc2b47;
                    padding-left: .15rem;
                    font-size: .16rem;
                    line-height: 1;
                    font-weight: 700;
                    color: #536a82;
                }
                .detail_intro_content {
                    display: flex;
                    flex-direction: column;
                    font-size: .14rem;
                    color: #536a82;
                    .intro_content_header {
                        margin: .15rem 0 .05rem;
                    }
                    .intro_content_content {
                        margin: .05rem 0;
                    }
                }
            }
            .company_detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 .5rem 0 .56rem;
                width: calc(100% - 7.76rem);
                .company_detail_logo {
                    img {
                        border: 1px solid #e8e8e8;
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                    p {
                        display: flex;
                        justify-content: center;
                        margin: .2rem 0;
                        font-size: .14rem;
                        color: #2d3e50;
                    }
                }
                .company_detail_info {
                    align-self: flex-start;
                    margin: .2rem 0 .4rem;
                }
                .detail_info_wrap {
                    display: flex;
                    flex-direction: column;
                    align-self: flex-start;
                    padding-left: .4rem;
                    p {
                        display: flex;
                        align-items: center;
                        padding-left: .32rem;
                        margin-bottom: .3rem;
                        font-size: .14rem;
                        color: #536a82;
                        background: url(../assets/detailsPost/css_sprites.png) no-repeat;
                    }
                    .detail_info_totalNum {
                        background-position: -10px -141px;
                    }
                    .detail_info_industry {
                        background-position: -7px -177px;
                    }
                }
            }
            .share {
                margin-top: .4rem;
                border-top: 1px solid #e8e8e8;
                padding: .32rem 0;
                width: 7.6rem;
            } 
        }
    }
    @media screen and (max-width: 1200px) {
        .detailsPost_wrap {
            .detailsPost_inner {
                .post_detail {
                    width: 70%;
                    .post_detail_updateAt {
                        &::after {
                            display: none;
                        }
                    }
                }
                .company_detail {
                    width: 30%;
                }
            }
        }
    }
    @media screen and (max-width: 992px) {
        .detailsPost_wrap {
            .detailsPost_inner {
                .post_detail {
                    width: 60%;
                }
                .company_detail {
                    width: 40%;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .detailsPost_wrap {
            .detailsPost_inner {
                .post_detail {
                    width: 100%;
                    border-right: none;
                }
                .company_detail {
                    display: none;
                }
            }
        }
    }
</style>

<script>
    //导入时间戳过滤器
    import {formatDate} from '../filter.js';
    export default {
        data () {
            return {
                getPost: {name: '', companyName: '', compensation: '', city: '', education: '', experience: '', updateAt: '', responsibility: '', requisite: '', boon: '', tags: [{tag: ''}]},
                getCompany: {company: {logo: '', totalNum: ''}, industryList: [{industry: ''}]}
            }
        },
        mounted () {
            this.company (this.$route.query.companyId);
            this.post (this.$route.query.id);
        },
        methods: {
            // 获取公司信息
            company (id) {
                this.$http.get("/carrots-ajax/a/company/" + id)
                .then((res) => {
                    this.getCompany = res.data.data;
                    console.log(this.getCompany);
                })
                .catch((error) => {
                    console.log('连接服务器失败');
                });
            },
            // 获取职位信息
            post (id) {
                this.$http.get("/carrots-ajax/a/profession/" + id)
                .then((res) => {
                    this.getPost = res.data.data;
                    console.log(this.getPost);
                })
                .catch((error) => {
                    console.log('连接服务器失败');
                });
            }
        },
        filters: {
            //时间戳过滤
            updateAtFilter (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    }
</script>