app.factory('pathProject',function () {
    return {
        //获取公司列表接口
        getCompanyList_url: '/carrots-admin-ajax/a/company/search',
        //删除公司信息接口
        delCompany_url: function(id) {
            return '/carrots-admin-ajax/a/u/company/' + id
        },
        //获取公司详情接口
        getCompanyDetail_url: function(id) {
            return '/carrots-admin-ajax/a/company/' + id
        },
        //编辑公司详情
        editCompany_url: function(id) {
            return '/carrots-admin-ajax/a/u/company/' + id
        },
        //新增公司详情
        addCompany_url: '/carrots-admin-ajax/a/u/company/',
        //上传图片接口
        upload_url: function () {
            return '/carrots-admin-ajax/a/u/img/task'
        },

        //获取职位列表接口
        getPositionList_url:  "/carrots-admin-ajax/a/profession/search",
        //修改职位上下架接口
        changPositionStatus_url: function(id,status) {
            return '/carrots-admin-ajax/a/u/profession/status?id=' + id + "&status=" + status
        },
        //删除职位接口
        deletePosition_url: function (id) {
            return '/carrots-admin-ajax/a/u/profession/' + id
        },
        //获取职位明细信息接口
        getPosition_url: function (id) {
            return '/carrots-admin-ajax/a/profession/' + id
        },
        //编辑职业接口
        putPosition_url: function(id) {
            return '/carrots-admin-ajax/a/u/profession/' + id
        },
        //新增职业接口
        postPosition_url: '/carrots-admin-ajax/a/u/profession/',
        //获取公司福利标签列表
        getCompanyTags_url: function(id) {
            return '/carrots-admin-ajax/a/tags/' + id
        }

    }
})