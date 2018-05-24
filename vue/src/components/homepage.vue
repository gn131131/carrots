<template>
    <div class="homepage">
        <div class="swiperBox banner-h">
            <swiper :options="swiperOption" ref="mySwiper" v-if="bannerImgs.length">
                <swiper-slide v-for="(n,index) in bannerImgs" :key="index"><a :href="n.url" target="_blank"><img :src="n.img" alt="" class="img-w"></a></swiper-slide>
                <!-- 分页器 -->
            </swiper>
        </div>
        <div class="home-introduce">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 con-tag">
                        <div class="con-img">
                            <img src="../assets/homepage/xysj.png" alt="">
                        </div>
                        <p class="tag-test1">超短时间</p>
                        <p class="tag-test2">48小时高效推荐</p>
                    </div>
                    <div class="col-md-3 con-tag">
                        <div class="con-img">
                            <img src="../assets/homepage/hyjg.png" alt="">
                        </div>
                        <p class="tag-test1">行业1/3的价格</p>
                        <p class="tag-test2">成功推荐仅收费1月工资</p>
                    </div>
                    <div class="col-md-3 con-tag">
                        <div class="con-img">
                            <img src="../assets/homepage/rcpc.png" alt="">
                        </div>
                        <p class="tag-test1">三维的人才评测</p>
                        <p class="tag-test2">技术人事背景三维评定</p>
                    </div>
                    <div class="col-md-3 con-text ">
                        <div>
                            <p class="num">500+</p>
                            <p class="test">人才入职</p>
                        </div>
                        <div class="margin-top-25">
                            <p class="num">498人</p>
                            <p class="test">成功转正</p>
                        </div>
                        <div class="margin-top-25">
                            <p class="num">98%</p>
                            <p class="test">成功入职</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="newPosition">
            <div class="container">
                <div class="title">
                    <p class="chinese">最新职位</p>
                    <span class="redLine"></span>
                    <p class="english">NEW POSITION</p>
                    <div class="bb" @click="more ()">更多</div>
                </div>

                <!-- 最新职位轮播 -->
                <!-- <div>{{jobNews}}</div> -->

                <div class="row margin-bottom-80">

                    <div class="swiperBox col-md-10 col-md-offset-1">
                        <div class="swiper-button-prev mySwiperBtn" slot="button-prev"></div>

                        <swiper :options="swiperOption1" ref="mySwiper" v-if="jobNews">
                            <swiper-slide v-for="(items,index) in jobNews" :key="index">
                                <div class="imgBox" @click="searchPost (items.companyId, items.id)">
                                    <div class="img">
                                        <img :src="items.logo" alt="">
                                    </div>
                                    <div class="info">
                                        <p class="job">{{items.name}}</p>
                                        <span class="redLine"></span>
                                        <p class="netName">{{items.companyName}}</p>
                                    </div>
                                </div>
                            </swiper-slide>

                            <!-- 左右切换按钮 -->

                        </swiper>
                        <div class="swiper-button-next mySwiperBtn" slot="button-next"></div>
                    </div>
                </div>

                <!-- 最新职位轮播  over ================ -->

            </div>
        </div>
        <div class="serviceFlow">
            <div class="title">
                <p class="chinese">服务流程</p>
                <span class="redLine"></span>
                <p class="english">SERVICE FLOW</p>
            </div>
            <div class="main container">
                <div class="row ser-row">
                    <div class="col-md-2 service-items margin-left-8">
                        <div class="box">
                            <img src="../assets/homepage/service1.jpg" class="ser-img" alt="">
                            <p class="ser-p">1,意向洽谈,深入评审</p>
                        </div>
                    </div>
                    <div class="col-md-2 service-items middle">
                        <span class="line"></span>
                        <img src="../assets/homepage/shape.png" class="shape" alt="">
                    </div>

                    <div class="col-md-2 service-items">
                        <div class="box">
                            <img src="../assets/homepage/service2.jpg" class="ser-img" alt="">
                            <p class="ser-p">2,确认合作，签订合同</p>
                        </div>
                    </div>
                    <div class="col-md-2 service-items middle">
                        <span class="line"></span>
                        <img src="../assets/homepage/shape.png" class="shape" alt="">
                    </div>
                    <div class="col-md-2 service-items">
                        <div class="box">
                            <img src="../assets/homepage/service3.jpg" class="ser-img" alt="">
                            <p class="ser-p">3,提出需求，提出jd</p>
                        </div>
                    </div>

                </div>
                <div class="row ser-row">
                    <div class="col-md-2 service-items margin-left-8">
                        <div class="box">
                            <img src="../assets/homepage/service4.jpg" class="ser-img" alt="">
                            <p class="ser-p">4,开始招聘，人才海选</p>
                        </div>
                    </div>
                    <div class="col-md-2 service-items middle">
                        <span class="line"></span>
                        <img src="../assets/homepage/shape.png" class="shape" alt="">
                    </div>

                    <div class="col-md-2 service-items">
                        <div class="box">
                            <img src="../assets/homepage/service5.jpg" class="ser-img" alt="">
                            <p class="ser-p">5,人才评测，简历脱水</p>
                        </div>
                    </div>
                    <div class="col-md-2 service-items middle">
                        <span class="line"></span>
                        <img src="../assets/homepage/shape.png" class="shape" alt="">
                    </div>
                    <div class="col-md-2 service-items">
                        <div class="box">
                            <img src="../assets/homepage/service6.jpg" class="ser-img" alt="">
                            <p class="ser-p">6,上岗，转入售后</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="partnerAdvice">
            <div class="title">
                <p class="chinese">伙伴之言</p>
                <span class="redLine"></span>
                <p class="english">PARTNER ADVICE</p>
            </div>
            <div class="main container">
                <div class="row">
                    <div class="swiperBox col-md-10 col-md-offset-1">
                        <div class="swiper-button-prev mySwiperBtn" slot="button-prev"></div>
                        <swiper :options="swiperOption2" ref="mySwiper">
                            <swiper-slide>
                                <div class="imgBox">
                                    <div class="img1">
                                        <img src="../assets/homepage/partener-1.png" alt="">
                                    </div>
                                    <div class="info1">
                                        <p class="company">王思聪</p>
                                        <p class="tag">拓尔思集团创始人</p>
                                        <p class="partener-in">
                                            作为在萝卜多已经招募了50人的leader萝卜多除了是我成功的基石， 也是我的社交入口。
                                        </p>
                                    </div>
                                </div>

                            </swiper-slide>
                            <swiper-slide>
                                <div class="imgBox">
                                    <div class="img1">
                                        <img src="../assets/homepage/partener-2.png" alt="">
                                    </div>
                                    <div class="info1">
                                        <p class="company">王思聪</p>
                                        <p class="tag">拓尔思集团创始人</p>
                                        <p class="partener-in">
                                            作为在萝卜多已经招募了50人的leader萝卜多除了是我成功的基石， 也是我的社交入口。
                                        </p>
                                    </div>
                                </div>

                            </swiper-slide>
                            <swiper-slide>
                                <div class="imgBox">
                                    <div class="img1">
                                        <img src="../assets/homepage/partener-3.png" alt="">
                                    </div>
                                    <div class="info1">
                                        <p class="company">王思聪</p>
                                        <p class="tag">拓尔思集团创始人</p>
                                        <p class="partener-in">
                                            作为在萝卜多已经招募了50人的leader萝卜多除了是我成功的基石， 也是我的社交入口。
                                        </p>
                                    </div>
                                </div>

                            </swiper-slide>
                            <swiper-slide>
                                <div class="imgBox">
                                    <div class="img1">
                                        <img src="../assets/homepage/partener-4.png" alt="">
                                    </div>
                                    <div class="info1">
                                        <p class="company">王思聪</p>
                                        <p class="tag">拓尔思集团创始人</p>
                                        <p class="partener-in">
                                            作为在萝卜多已经招募了50人的leader萝卜多除了是我成功的基石， 也是我的社交入口。
                                        </p>
                                    </div>
                                </div>

                            </swiper-slide>
                            <swiper-slide>
                                <div class="imgBox">
                                    <div class="img1">
                                        <img src="../assets/homepage/partener-2.png" alt="">
                                    </div>
                                    <div class="info1">
                                        <p class="company">王思聪</p>
                                        <p class="tag">拓尔思集团创始人</p>
                                        <p class="partener-in">
                                            作为在萝卜多已经招募了50人的leader萝卜多除了是我成功的基石， 也是我的社交入口。
                                        </p>
                                    </div>
                                </div>

                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-next mySwiperBtn" slot="button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped type="text/css">
/* 首页轮播样式 */
.banner-h {
  height: 29vw;
  background-color: #f6f7f8;
  text-align: center;
}
.img-w {
  height: 29vw !important;
  cursor: pointer;
  vertical-align: middle;
}
.home-introduce {
  padding: 75px 0;
}
.con-tag {
  text-align: center;
  margin-top: 30px;
}
.tag-test1 {
  margin-top: 20px !important;
  margin-bottom: 10px !important;
  color: #22415d;
  font-size: 16px;
  font-weight: bold;
}
.tag-test2 {
  font-size: 14px;
  color: #63859f;
}
.con-img {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: 50px;
}
.num {
  font-size: 16px;
  color: #fc2e54;
  font-weight: bold;
}
.test {
  color: #22415d;
  font-size: 14px;
}
.con-text {
  text-align: center;
  border-left: 1px solid #e5e9eb;
}
.margin-top-25 {
  margin-top: 25px;
}

/* 最新职位 */
.newPosition {
  background: #f6f7f8;
}
.imgBox {
  background: #ffffff;
  border: 1px solid #e5e9eb;
  border-radius: 8px;
  cursor: pointer;
}
.img {
  height: 1.56rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e9eb;
}
.img1 {
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
.img img {
  max-height: 90%;
  max-width: 90%;
}
/* 更多 */
div.bb {
  position: absolute;
  right: 100px;
  bottom: 0;
  font-size: 16px;
  padding: 10px 0;
  cursor: pointer;
}
.company {
    color: #2d3e50;
    font-size: .16rem;
}
.tag {
    font-size: .14rem;
    color: #666666;
}
.partener-in {
    padding-top : .1rem;
    color: #999999;
    font-size: .14rem;
    text-align: left;
}
/* 最新职位轮播样式 */

.imgBox:hover {
    box-shadow:  0 0 3px #ccc;
    z-index: 11;
}
.mySwiperBtn {
     width: 30px;
    height: 38px;
    outline : none;
}

.swiper-button-prev {
  background-image: url(../assets/homepage/prev.png);

  left: -43px;
  right: auto;
}
.swiper-button-next {
  background-image: url(../assets/homepage/next.png);
  right: -43px;
  left: auto;
}

/* 最新职位轮播样式 */

.info {
  text-align: center;
  padding: 15px;
}
.info1 {
  text-align: center;
  padding: 0 15px 15px;
}
.redLine {
  display: block;
  width: 20px;
  height: 1px;
  background-color: red;
  margin: 5px auto;
}
.job {
  font-size: 16px;
  font-weight: bold;
  color: #22415d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.netName {
  font-size: 14px;
  color: #456e8d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.margin-bottom-80 {
  margin-bottom: 80px;
}
.title {
  position: relative;
  padding: 75px 0;
  text-align: center;
}
.chinese {
  font-size: 20px;
  font-weight: bold;
  color: #22415d;
}
.english {
  font-size: 16px;
  color: #8aa5b7;
}

.service-items {
  padding: 0 !important;
}
.box {
  border: 1px solid #ebeff0;
  border-radius: 8px;
}
.ser-row {
  margin-bottom: 40px;
}
.ser-p {
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
  color: #38556d;
}
.ser-img {
  display: block;
  max-width: 100%;
  height: auto;
}
.shape {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.line {
  display: block;
  width: 100%;
  border-bottom: 1px dashed #ffd8d9;
}
.middle {
  margin-top: 80px;
}
.margin-left-8 {
  margin-left: 8.3%;
}
.partnerAdvice {
  background: #f6f7f8;
  padding-bottom: 75px;
}

@media screen and (max-width: 992px){
    .service-items.middle span {
        display: none;
    }
    .service-items.middle img {
        display: none;
    }
    .margin-left-8 {
        margin-left: 0;
    }
    .ser-img {
        margin: 0 auto;
    }
}
@media screen and (max-width: 850px) {
    .mySwiperBtn {
        display: none;
    }
    div.bb {
        right: 10px;
    }
    .swiperBox.col-md-10 div.swiper-slide {
        width: 80%!important;
    }
}
</style>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      //获取数据
      bannerImgs: "", //首页banner数据
      jobNews: "", //最新职位列表
      swiperOption: {
        notNextTick: true,
        //   分页器
        pagination: {
          el: ".swiper-pagination"
        },
        slidesPerView: 1, //视图显示几个
        loop: true, //环路
        autoplay: {
          delay: 3000, //自动切换事件间隔
          disableOnInteraction: false //触碰后自动切换页会停止
        }
      },
      swiperOption1: {
        notNextTick: false,
        slidesPerView: 4, //视图显示几个
        slidesPerGroup: 4, //每组几个
        spaceBetween: 24, //spaceBetween : '10%',按container的百分比
        loop: true, //环路
        speed: 3000, //切换速度
        autoplay: {
          delay: 3000, //自动切换事件间隔
          disableOnInteraction: false //触碰后自动切换页会停止
        },
        // 左右切换按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOption2: {
        notNextTick: false,
        slidesPerView: 4, //视图显示几个
        slidesPerGroup: 1, //几组一轮
        spaceBetween: 24, //spaceBetween : '10%',按container的百分比
        loop: true, //环路
        autoplay: {
          delay: 3000, //自动切换事件间隔
          disableOnInteraction: false //触碰后自动切换页会停止
        },
        // 左右切换按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  mounted() {
    //   首页banner
    this.carousel();
    // 职位信息
    this.jobNew();
    var that = this;
    this.swiper.slideTo(0, 0, false);
  },

  methods: {
    //轮播获取首页banner数据
    carousel() {
      this.$http
        //-------------------bug
        // .get("/carrots-ajax/a/article/search", {params: {type: 0}})
        .get("/carrots-ajax/a/article/search")
        .then(res => {
            this.bannerImgs = res.data.data.articleList;
        })
        .catch(error => {
          console.log("服务器无响应");
        });
    },

    // 获取职位信息
    jobNew() {
      this.$http
        .get("/carrots-ajax/a/profession/search", {params: {size: 20, recommend: 0}})
        .then(res => {
          //   console.log(res.data.data);
          this.jobNews = res.data.data;
            console.log(this.jobNews);
        })
        .catch(error => {
          console.log("服务器无响应");
        });
    },

    //更多
    more () {
        window.sessionStorage.setItem('post', 0);
        this.$router.push({path: 'positionNew'});
    },

    //跳转职位页面
    searchPost (companyId, id) {
        this.$router.push({path: 'detailsPost', query: {companyId: companyId, id: id}});
    }
  }
};
</script>
