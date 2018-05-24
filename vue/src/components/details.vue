<template>
    <div class="details_wrap">
        <div class="container">
            <div class="company_header row">
                <img class="company_header_logo" :src="getCompany.company.logo">
                <div class="company_header_detail">
                    <div class="header_detail_name">
                        <p>{{getCompany.company.name}}</p>
                        <img v-if="getCompany.company.approved === 1" src="../assets/details/approved.png">
                    </div>
                    <p class="header_detail_slogan">{{getCompany.company.slogan}}</p>
                    <p class="header_detail_product" v-for="(product, index) in getCompany.productList" :key="index">{{product.name}}</p>
                </div>
            </div>
            <div class="company_body row">
                <div class="company_body_tabs">
                    <tabs pills>
                        <tab title="公司详情">
                            <p class="body_product_title">公司产品</p>
                            <div class="body_product_detail" v-for="(product, index) in getCompany.productList" :key="index">
                                <img class="body_product_logo" :src="product.logo">
                                <div class="body_product_content">
                                    <p class="product_content_name">{{product.name}}</p>
                                    <p class="product_content_summary">{{product.summary}}</p>
                                    <p class="product_content_slogan">{{product.slogan}}</p>
                                </div>
                            </div>
                            <p class="body_product_title">公司介绍</p>
                            <p class="product_intro_content">{{getCompany.company.summary}}</p>
                        </tab>
                        <tab title="在招职位">
                            <p class="body_post_title">在招职位{{totalRows}}个</p>
                            <div class="body_post_filter">
                                <p>职业类别</p>
                                <div class="post_filter_wrap" v-for="(filter, index) in filters" :key="index">
                                    <input type="radio" :id="filter.id" name="filter" :value="filter.category" v-model="categoryModel">
                                    <label :for="filter.id">{{filter.name}}</label>
                                </div>
                            </div>
                            <!-- 职位列表 -->
                            <tr class="body_post_content" v-for="(getPost, index) in page" :key="index" @click="postDetail(getPost.companyId, getPost.id)">
                                <td class="post_content_name">{{getPost.name}}</td>
                                <td class="post_content_compensation">{{getPost.compensation | compensationFilter}}</td>
                                <td class="post_content_expEdu">{{getPost.experience | experienceFilter}}/{{getPost.education | educationFilter}}</td>
                                <td class="post_content_updateAt">{{getPost.updateAt | updateAtFilter}}发布</td>
                            </tr>
                            <b-pagination class="body_post_pagination" size="md" v-if="page.length != 0" v-model="currentPage" :per-page="perPage" :total-rows="totalRows" first-text="首页" last-text="末页"></b-pagination>
                        </tab>
                    </tabs>
                </div>
                <!-- 公司信息 -->
                <div class="company_body_info">
                    <p class="body_info_title">公司信息</p>
                    <div class="body_info_detail">
                        <p class="icon_1">{{getCompany.company.totalNum}}人</p>
                        <p class="icon_2" v-for="(industry, index) in getCompany.industryList" :key="index">{{industry.industry | industryFilter}}</p>
                        <p class="icon_3">{{getCompany.company.city | cityFilter}}</p>
                    </div>
                    <p class="body_info_title">公司标签</p>
                    <div class="body_info_tag">
                        <p v-for="(tag, index) in getCompany.tagList" :key="index">{{tag.tag}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="less">
    .details_wrap {
        background: #f6f7f8;
        padding-top: .2rem;
        //公司标题条
        .company_header {
            display: flex;
            margin-bottom: .4rem;
            height: 2rem;
            background: #fff;
            .company_header_logo {
                width: 2rem;
                height: 100%;
                border: 1px solid #e8e8e8;
            }
            .company_header_detail {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: .56rem 0 .56rem .3rem;
                width: calc(100% - 2rem);
                line-height: 1;
                .header_detail_name {
                    display: flex;
                    font-size: .18rem;
                    font-weight: 700;
                    color: #2d3e50;
                    img {
                        margin-left: .1rem;
                    }
                }
                .header_detail_slogan {
                    font-size: .14rem;
                    color: #536a82;
                }
                .header_detail_product {
                    font-size: .12rem;
                    color: #536a82;
                }
            }
        }
        //详情条
        .company_body {
            display: flex;
            margin-bottom: .2rem;
            background: #fff;
            //公司详情/在招职位
            .company_body_tabs {
                padding: .05rem .3rem .37rem .2rem;
                width: calc(100% - 4rem);
                .nav-pills {
                    border-bottom: 1px solid #e8e8e8;
                    li {
                        font-size: .16rem;
                        a {
                            border-radius: 0;
                            color: #536a82;
                            &:hover {
                                background: none;
                            }
                        }
                    }
                    li.active {
                        a {
                            border-bottom: 3px solid #fc2a48;
                            color: #fc2a48;
                            background: none;
                        }
                    }
                }
                //公司详情
                .body_product_title {
                    border-left: 5px solid #fc2a48;
                    margin: .2rem 0 .15rem;
                    padding-left: .09rem;
                    font-size: .16rem;
                    font-weight: 700;
                    line-height: 1;
                    color: #2d3e50;
                }
                .body_product_detail {
                    display: flex;
                    .body_product_logo {
                        border: 1px solid #e8e8e8;
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                    .body_product_content {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: .3rem 0 .3rem .2rem;
                        .product_content_name {
                            font-size: .16rem;
                            font-weight: 700;
                            color: #2d3e50;
                        }
                        .product_content_summary {
                            font-size: .14rem;
                            color: #536a82;
                        }
                        .product_content_slogan {
                            .product_content_summary;
                        }
                    }
                }
                .product_intro_content {
                    font-size: .12rem;
                    line-height: 2;
                    color: #536a82;
                }
                //在招职位
                .body_post_title {
                    .body_product_title;
                    color: #536a82;
                }
                .body_post_filter {
                    display: flex;
                    flex-wrap: wrap;
                    padding: .1rem 0 .1rem .1rem;
                    border: 1px solid #e8e8e8;
                    font-size: .14rem;
                    line-height: .25rem;
                    p {
                        margin-right: .15rem;
                        font-weight: 700;
                        color: #2d3e50;
                    }
                    .post_filter_wrap {
                        input[type=radio] {
                            -webkit-appearance: none;
                            &:checked + label{
                                background: #fc2b47;
                                color: #fff;
                            }
                        }
                        label {
                            margin: 0 .035rem;
                            padding: 0 .12rem;
                            font-weight: 400;
                            color: #536a82;
                            cursor: pointer;
                        }
                    }
                }
                .body_post_content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: .15rem;
                    border: 1px solid #e8e8e8;
                    border-radius: .04rem;
                    padding: .26rem .3rem;
                    font-size: .14rem;
                    font-weight: 700;
                    cursor: pointer;
                    &:hover {
                        background: #f6f7f8;
                    }
                    .post_content_name {
                        width: 40%;
                        font-size: .16rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .post_content_compensation {
                        width: 20%;
                        color: #fc2a48;
                    }
                    .post_content_expEdu {
                        width: 30%;
                        color: #536a82;
                    }
                    .post_content_updateAt {
                        margin-left: 1.45rem;
                        width: 20%;
                        font-weight: 400;
                        color: #999;
                    }
                }
                .body_post_pagination {
                    float: right;
                    margin-top: .25rem;
                    .page-item {
                        .page-link {
                            margin: 0 .05rem;
                            border: 1px solid #e8e8e8;
                            border-radius: .03rem;
                            background: #f5f5f7;
                            color: #666;
                            &:focus {
                                outline: none;
                            }
                        }
                    }
                    .page-item.disabled {
                        .page-link {
                            background: #f5f5f7;
                            color: #bbb;
                        }
                    }
                    .page-item.active {
                        .page-link {
                            background: #fc2b47;
                            color: #fff;
                        }
                    }
                }
            }
            .company_body_info {
                margin: .38rem 0;
                padding: 0 .52rem;
                border-left: 3px solid #f4f4f4;
                width: 4rem;
                font-size: .14rem;
                line-height: 1;
                color: #536a82;
                .body_info_title {
                    position: relative;
                    font-weight: 700;
                    &::after {
                        content: '';
                        position: absolute;
                        top: .05rem;
                        left: .75rem;
                        border: 1px solid #e8e8e8;
                        width: 2rem;
                    }
                }
                .body_info_detail {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: .3rem .4rem .53rem;
                    p {
                        display: flex;
                        align-items: center;
                        margin: .17rem 0;
                        padding-left: .35rem;
                        height: .17rem;
                        background: url(../assets/details/css_sprites.png) no-repeat;
                    }
                    .icon_1 {
                        background-position: -10px -10px;
                    }
                    .icon_2 {
                        background-position: -10px -46px;
                    }
                    .icon_3 {
                        background-position: -10px -82px;
                    }
                }
                .body_info_tag {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-around;
                    padding: .42rem .2rem .3rem;
                    p {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #d9d9d9;
                        margin: .1rem 0;
                        border-radius: .11rem;
                        padding: 0 .1rem;
                        height: .22rem;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1200px) {
        .details_wrap {
            .company_body {
                .company_body_tabs {
                    width: 70%;
                    .body_post_content {
                        .post_content_updateAt {
                            margin: 0;
                        }
                    }
                }
                .company_body_info {
                    width: 30%;
                    .body_info_title {
                        &::after {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .details_wrap {
            .company_header {
                height: 1rem;
                .company_header_logo {
                    width: 1rem;
                    height: 1rem;
                }
                .company_header_detail {
                    padding: 0 0 0 .15rem;
                    width: calc(100% - 1rem);
                    p {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    img {
                        display: none;
                    }
                }
            }
            .company_body {
                .company_body_tabs {
                    width: 100%;
                    .body_product_detail {
                        .body_product_logo {
                            display: none;
                        }
                    }
                    .body_post_content {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
                .company_body_info {
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
                //获取公司数据
                getCompany: {
                    company: {logo: '', name: '', approved: '', slogan: '', summary: '', id: '', city: '', totalNum: ''},
                    industryList: [{industry: ''}],
                    productList: [{id: '', name: '', slogan: '', logo: '', summary: ''}],
                    tagList: [{tag: ''}]
                },
                //获取职位数据
                getPosts: [{companyId: '', name: '', education: '', experience: '', compensation: '', updateAt: '', logo: '', category: ''}],
                //过滤
                filters: [{name: '全部', id: 'all', category: ''}, {name: '产品', id: 'product', category: 1}, {name: 'UI', id: 'operate', category: 2},{name: 'ANDROID', id: 'android', category: 3}, {name: 'IOS', id: 'ios', category: 4}, {name: 'CSS', id: 'css', category: 5}, {name: 'JS', id: 'js', category: 6}, {name: 'JAVA', id: 'java', category: 7}, {name: 'QA', id: 'qa', category: 8}, {name: 'OP', id: 'op', category: 9}],
                //翻页
                totalPosts: [],
                arr: [],
                currentPage: 1,
                totalRows: 20,
                perPage: 10,
                // 过滤model
                categoryModel: ''
            }
        },
        mounted () {
            this.company (this.$route.query.companyId);
            this.post (999, '');
        },
        methods: {
            // 获取公司信息
            company (id) {
                this.$http.get("/carrots-ajax/a/company/" + id)
                .then((res) => {
                    this.getCompany = res.data.data;
                })
                .catch((error) => {
                    console.log('连接服务器失败');
                });
            },
            // 获取职位信息
            post (size, category) {
                this.$http.get("/carrots-ajax/a/profession/search", {params: {size: size, category: category}})
                .then((res) => {
                    this.getPosts = res.data.data;
                })
                .catch((error) => {
                    console.log('连接服务器失败');
                });
            },
            //职位跳转
            postDetail (companyId, id) {
                this.$router.push({path: 'detailsPost', query: {companyId: companyId, id: id}});
            }
        },
        watch: {
            //监听职业类别
            categoryModel: function () {
                // console.log(typeof(this.$route.query.companyId));
                this.arr = [];
                if (this.categoryModel != '') {
                    this.getPosts.forEach(getPost => {
                        if (getPost.category == this.categoryModel && getPost.companyId == this.$route.query.companyId) {
                            this.arr.push(getPost);
                        }
                    });
                    this.totalPosts = this.arr;
                    console.log(this.totalPosts);
                }
                else {
                    this.totalPosts = [];
                    this.getPosts.forEach(getPost => {
                        if (getPost.companyId == this.$route.query.companyId) {
                            this.totalPosts.push(getPost);
                        }
                    });
                    console.log(this.totalPosts);
                }
                //设定翻页总长度
                this.totalRows = this.totalPosts.length;
                //根据设定的每页显示个数为数组中对象添加页码属性
                this.totalPosts.forEach((totalPost, index) => {
                    totalPost.page = parseInt(index / this.perPage) + 1;
                });
                console.log(this.totalPosts);
                console.log('职业类别过滤完成分页');
            },
            //监听异步获取数据后运行添加页码函数
            getPosts: function () {
                // console.log(typeof(this.$route.query.companyId));
                this.getPosts.forEach(getPost => {
                    if (getPost.companyId == this.$route.query.companyId) {
                        this.totalPosts.push(getPost);
                    }
                });
                //设定翻页总长度
                this.totalRows = this.totalPosts.length;
                //根据设定的每页显示个数为数组中对象添加页码属性
                this.totalPosts.forEach((totalPost, index) => {
                    totalPost.page = parseInt(index / this.perPage) + 1;
                });
                console.log(this.totalPosts);
                console.log('完成分页');
            },
            //监听翻页
            currentPage: function () {
                $('html').scrollTop(0);
            }
        },
        computed: {
            //过滤本公司所有职位为当前页
            page: function() {
                return this.totalPosts.filter(getPost => {
                    if (getPost.page === this.currentPage) {
                        return getPost;
                    }
                });
            }
        },
        filters: {
            //时间戳过滤
            updateAtFilter (time) {
                let date = new Date(time);
                return formatDate(date, 'MM.dd');
            }
        }
    }
</script>
