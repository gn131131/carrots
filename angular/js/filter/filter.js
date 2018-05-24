"use strict";
//type过滤器----------
app.filter('typeFilter', function() {
    return function(text) {
        switch (text) {
            case 0: return '首页banner';break;
            case 1: return '找职位banner';break;
            case 2: return '找精英banner';break;
            case 3: return '行业大图';break;
        }
    }
})
//status过滤器----------
.filter('statusFilterA', function() {
    return function(text) {
        switch (text) {
            //------------bug
            // case 1: return '草稿';break;
            // case 2: return '上线';break;
            case 1: return '上线';break;
            case 2: return '草稿';break;
        }
    }
})

//公司列表过滤器------------------
   //公司行业--------
.filter("industryFilter", function (addIndustries) {
    return function (index) {
        return addIndustries[index].name
    }
})
 // 省
 .filter('provinceFilter', function (province) {
    return function (id) {
        var name;
        angular.forEach(province, function (data) {
            if (data.ProID == id) {
                name = data.ProName;
            }
        });
        return name;
    }
})
// 城市
.filter('cityFilter', function (city) {
    return function (id) {
        for (var i = 0; i < city.length; i++) {
            if (city[i].CityID == id) {
                return city[i].CityName;
            }
        }
    }
})
// 县
.filter('countyFilter', function (county) {
    return function (id) {
        var name;
        angular.forEach(county, function (data) {
            if (data.Id == id) {
                name = data.countyName;
            }
        });
        return name;
    }
})


   //融资规模--------
.filter('financingFilter',function() {
    return function(text) {
        switch (text) {
            case 0: return '无需融资';break;
            case 1: return '天使轮';break;
            case 2: return 'A轮';break;
            case 3: return 'B轮';break;
            case 4: return 'C轮';break;
            case 5: return 'D轮及以上';break;
            case 6: return '上市公司';break;
   
        }
    }
})
    //认证状态-----------
.filter('approvedFilter',function() {
    return function(text) {
        switch (text) {
            case 0: return '未认证';break;
            case 1: return '已认证';break;
   
        }
    }
})
    // 冻结状态----------
.filter('freezedFilter',function() {
    return function(text) {
        switch (text) {
            //-------------bug
            // case 0: return '正常';break;
            // case 1: return '冻结';break;
            case 0: return '冻结';break;
            case 1: return '正常';break;
        }
    }
})

//职位列表---------------

  // 薪资-------------
  .filter("compensationFilter", function (compensation) {
    return function (index) {
        return compensation[index]
    }
})
// 学历-----------
.filter("educationFilter", function (education) {
    return function (index) {
        return education[index]
    }
})
//工作经验---------
 .filter("experienceFilter", function (experience) {
    return function (index) {
        return experience[index]
    }
})
 // 上下架状态
 .filter("statusFilter", function () {
    return function(text) {
        switch (text) {
            //----------------bug
            // case 0: return '下架';break;
            // case 1: return '上架';break;
            case 0: return '上架';break;
            case 1: return '下架';break;
        }
    }
})
//职业类别
.filter("categoryFilter", function (categoryData) {
    return function (index) {
        return categoryData[index-1].name
    }
})
//文件大小过滤
.filter('sizeFilter', function () {
    return function (value) {
        if(null==value||value==''){
            return "0 Bytes";
        }
        var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
        var index=0;
        var srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize)/Math.log(1024));
        var size = srcsize/Math.pow(1024,index);
        size=size.toFixed(2);//保留的小数位数
        return size + unitArr[index];
    }
})
.filter('checkAdd', function () {
    return function (value) {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] == 'create' || value == 'create') {
                    return true;
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
})
.filter('checkUpdate', function () {
    return function (value) {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] == 'update' || value == 'create') {
                    return true;
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
})