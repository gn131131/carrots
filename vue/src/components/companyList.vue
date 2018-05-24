<template>
    <div class="companyList-wrap">
        <div class="container padding-0">
            <div class="banner">
                <img src="../assets/findElite/img-banner.png">
            </div>
            <!-- 公司搜索栏 -->
            <ul class="search_wrap">
                <li>
                    <p>所在地区：</p>
                    <div v-for="(city, index) in filter.cityC" :key="index">
                        <input type="radio" name="cityC" :id="city.id" :value="city.value" v-model="cityCModel">
                        <label :for="city.id">{{city.name}}</label>
                    </div>
                </li>
                <li>
                    <p>所属行业：</p>
                    <div v-for="(industry, index) in filter.industryC" :key="index">
                        <input type="radio" name="industryC" :id="industry.id" :value="industry.value" v-model="industryCModel">
                        <label :for="industry.id">{{industry.name}}</label>
                    </div>
                </li>
                <li>
                    <p>融资规模：</p>
                    <div v-for="(financing, index) in filter.financingC" :key="index">
                        <input type="radio" name="financingC" :id="financing.id" :value="financing.value" v-model="financingCModel">
                        <label :for="financing.id">{{financing.name}}</label>
                    </div>
                </li>
                <li class="buttons">
                    <button class="clear" @click="clearC ()">清空</button>
                    <button class="search" @click="pageC ()">搜索</button>
                </li>
            </ul>
            <div class="company">
                <!--公司选择栏-->
                <div class="company-sort">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <!--公司列表-->
                <div class="company-bg clearfix">
                    <div class="company-list row">
                        <div class="company-content col-md-4" v-for="(company, index) in companyLists" :key="index" v-if="index < 9" @click="details (company.id)">
                            <div class="company-details">
                                <div class="company-content-top">
                                    <img class="company-logo" :src="company.logo">
                                    <div class="company-text">
                                        <p class="company-name">{{company.name}}</p>
                                        <p class="company-slogan">{{company.slogan}}</p>
                                        <p class="company-job"><span>{{company.professionNum}}</span>个在招职位</p>
                                    </div>
                                </div>
                                <div class="company-content-bottom">
                                    <ul>
                                        <li><i class="icon-phone"></i><span>{{company.industryList[0] | industryFilter}}</span></li>
                                        <li><i class="icon-up"></i><span>{{company.financing | financingFilter}}</span></li>
                                        <li><i class="icon-address"></i><span>{{company.city | cityFilter}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 搜索为空页面 -->
                    <div class="ufo" v-if="companyLists.length === 0">
                        <img src="../../static/ufo.png">
                        <ul>
                            <li>暂时没有符合该搜索条件的公司</li>
                            <li>请重新修改搜索条件后再进行搜索</li>
                        </ul>
                    </div>
                    <!--分页控件-->
                    <div class="company-pagination">
                        <b-pagination v-model="currentPageC" :per-page="perPageC" :total-rows="totalRowsC" first-text="首页" last-text="末页"></b-pagination>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .search_wrap {
        display: flex;
        flex-direction: column;
        padding: .15rem .2rem;
        background: #fff;
        li {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-size: .14rem;
            p {
                color: #2d3e50;
                font-weight: 700;
            }
            input[type = radio] {
                line-height: 1;
                -webkit-appearance: none;
                outline: none;
                &:checked + label {
                    background: #fc2b47;
                    color: #fff;
                }
            }
            label {
                padding: .05rem .13rem;
                font-weight: 400;
                color: #536a82;
                cursor: pointer;
            }
        }
        .keyword {
            margin-bottom: .1rem;
            input {
                margin-right: .2rem;
                width: 4rem;
                height: .4rem;
            }
            input + p {
                font-weight: 400;
                color: #999;
            }
        }
        .buttons {
            align-self: flex-end;
        }
    }
    .companyList-wrap {
        background: #f6f7f8;
        .banner {
            margin: .2rem 0;
        }
    }
    .padding-0 {
        padding: 0;
    }
    .company {
        margin-bottom: .2rem;
    }
    .company-bg {
        padding-bottom: .65rem;
        background: #fff;
    }
    .company-list {
        padding: .05rem;
        margin: 0;
    }
    .company-content {
        margin: .15rem 0;
    }
    .company-details {
        border: .01rem solid #d9d9d9;
        border-radius: .05rem;
        cursor: pointer;
        &:hover {
         box-shadow: 0 0 .1rem #d9d9d9;
         }
    }
    .company-logo {
        margin: .23rem;
        width: 1.15rem;
        height: 1.15rem;
    }
    .company-text {
        margin-top: .23rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: .2rem;
        }
    }
    .company-name {
        margin-bottom: .14rem;
        font-size: .16rem;
        font-weight: 600;
        color: #2d3e50;
    }
    .company-slogan {
        margin-bottom: .13rem;
        font-size: .14rem;
        color: #536a82;
    }
    .company-job {
        font-size: .14rem;
        color: #536a82;
        span {
            color: #fc2a48;
        }
    }
    .company-content-top {
        display: flex;
    }
    .company-content-bottom {
        padding: .1rem 0;
        border-bottom-right-radius: .05rem;
        border-bottom-left-radius: .05rem;
        background: #fafafa;
        ul {
            display: flex;
            justify-content: space-around;
        }
        li {
            float: left;
            text-align: center;
            i, span {
                vertical-align: middle;
            }
            span {
                margin-left: .05rem;
            }
        }
    }
    .icon-phone {
        display: inline-block;
        width: .14rem;
        height: .13rem;
        background: url("../assets/findElite/img-phone.png");
    }
    .icon-up {
        display: inline-block;
        width: .15rem;
        height: .13rem;
        background: url("../assets/findElite/img-up.png");
    }
    .icon-address {
        display: inline-block;
        width: .12rem;
        height: .13rem;
        background: url("../assets/findElite/img-address.png");
    }
    .company-pagination {
        float: right;
        margin: 0 .15rem;
        .pagination {
            margin: 0;
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
    .buttons {
        button {
            margin-left: .1rem;
            width: .6rem;
            height: .25rem;
            font-size: .14rem;
        }
        .search {
            background: #fc2b47;
            color: #fff;
        }
        .clear {
            background: #fff;
            color: #536a82;
        }
    }
    .ufo {
        display: flex;
        justify-content: center;
        margin-top: .2rem;
        padding: 1.7rem 0 1.45rem;
        height: 4.95rem;
        background: #fff;
        ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            li {
                margin-top: .1rem;
                font-size: .2rem;
                font-weight: 700;
                color: #2b3d51;
            }
            li + li {
                font-size: .18rem;
                color: #536a82;
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                 //公司列表
                companyLists: [{id: '', logo: '', name: '', slogan: '', professionNum: '', financing: '', city: '', industryList: []}],
                suggestCompanyLists: [{id: '', logo: '', name: '', slogan: '', professionNum: '', financing: '', city: '', industryList: []}],
                //公司翻页
                currentPageC: 1,
                totalRowsC: 20,
                perPageC: 9,
                //搜索
                filter: {
                    // 公司搜索
                    cityC: [{name: '不限', id: 'cityC', value: ''}, {name: '北京', id: 'cityC_0', value: 1}],
                    industryC: [{name: '不限', id: 'industryC', value: ''}, {name: '移动互联网', id: 'industryC_0', value: 0}, {name: '电子商务', id: 'industryC_1', value: 1}, {name: '企业服务', id: 'industryC_2', value: 2}, {name: 'O2O', id: 'industryC_3', value: 3}, {name: '教育', id: 'industryC_4', value: 4}, {name: '金融', id: 'industryC_5', value: 5}, {name: '游戏', id: 'industryC_6', value: 6}],
                    financingC: [{name: '不限', id: 'financingC', value: ''}, {name: '无需融资', id: 'financingC_0', value: 0}, {name: '天使轮', id: 'financingC_1', value: 1}, {name: 'A轮', id: 'financingC_2', value: 2}, {name: 'B轮', id: 'financingC_3', value: 3}, {name: 'C轮', id: 'financingC_4', value: 4}, {name: 'D轮及以上', id: 'financingC_5', value: 5}, {name: '上市公司', id: 'financingC_6', value: 6}],
                },
                //公司搜索绑定数据
                cityCModel: '',
                industryCModel: '',
                financingCModel: '',
            }
        },
        methods: {
            //公司列表请求
            getCompanyLists: function (size, page, industry, financing, approved) {
                this.$http.get("/carrots-ajax/a/company/search", {params: {size: size, page: page, industry: industry, financing: financing, approved: approved}})
                    .then((resp) => {
                        console.log(resp);
                        if (size === 9) {
                            this.companyLists = resp.data.data;
                            this.totalRowsC = resp.data.total;
                            console.log(this.companyLists);
                        }
                        else {
                            this.suggestCompanyLists = resp.data.data;
                            console.log(this.suggestCompanyLists);
                        }


                    })
                    .catch((resp) => {
                        console.log("请求失败");
                    })
            },
            //公司翻页
            pageC () {
                this.getCompanyLists (9, this.currentPageC, this.industryCModel, this.financingCModel, '');
            },
            //点击公司跳转
            details (id) {
                this.$router.push({path: 'details', query: {companyId: id}});
            },
            //公司清空按钮
            clearC () {
                this.cityCModel = '';
                this.industryCModel = '';
                this.financingCModel = '';
                this.pageC ();
            }
        },
        mounted() {
            // 公司
            this.getCompanyLists(9, 1, this.$route.query.companyKeyword, '', '', '');
            this.getCompanyLists(3, 1, '', '', '', 1);
        },
        watch: {
            //监听公司翻页
            currentPageC: function() {
                this.pageC ();
            },
            //监听翻页滚动
            currentPageC: function () {
                $('html').scrollTop(0);
            },
        }
    }
</script>

