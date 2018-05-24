"use strict";
//ajax请求----------
app.factory('$request', function($http, $q, url) {
    let service = {};
    service.ajax = function(method, url, data, headers) {
        var defer = $q.defer();
        $http({
            method: method,
            url: url,
            params: data,
            headers: headers
        })
        .then(function(xhr) {
            defer.resolve(xhr);
        }, function(xhr) {
            defer.reject(xhr);
        });
        return defer.promise;
    };
    return service;
})
//信息管理
.factory('infoManagementService',function($http,pathProject){
    return {
        //获取公司列表
        getConpanyList: function (params) {
            return $http.get(pathProject.getCompanyList_url,{params : params})
        },
        //删除公司信息
        delCompany: function (id) {
            return $http.delete(pathProject. delCompany_url(id))
        },
        //获取公司详情
        getCompanyDetail : function (id) {
            return $http.get(pathProject.getCompanyDetail_url(id))
        },

        // 编辑公司详情
        editCompany: function (id, data) {
            return $http({
                url: pathProject.editCompany_url(id),
                method: "PUT",
                headers: {'Content-Type': 'Application/json'},
                data: JSON.stringify(data),
                transformRequest: function (data, headersGetter) {
                    return data;
                }
            });
        },

        // 新增公司详情
        addCompany: function (data) {
            return $http({
                url: pathProject.addCompany_url,
                method: "POST",
                headers: {'Content-Type': 'Application/json'},
                data: JSON.stringify(data),
                transformRequest: function (data, headersGetter) {
                    return data;
                }

            });
        },
        //上传图片接口
        //------------
        //获取职位列表接口
        getPositionList: function(params) {
            return $http.get(pathProject.getPositionList_url,{params:params})
        },
        //职位上下架修改
        putPositionStatus: function(id,status) {
            return $http.put(pathProject.changPositionStatus_url(id,status))
        },
        //删除职位
        delPosition: function(id) {
            return $http.delete(pathProject.deletePosition_url(id))
        },
        //获取职位详细信息
        getPositionDetail : function (id) {
            return $http.get(pathProject.getPosition_url(id))
        },
        //编辑职业信息
        putPosition: function(data,id) {
            return $http({
                url: pathProject.putPosition_url(id),
                method: "PUT",
                headers: {'Content-Type': 'Application/json'},
                data: JSON.stringify(data),
                transformRequest: function (data, headersGetter) {
                    return data;
                }
            });
        },
        //新增职业
        postPosition: function(data) {
            return $http({
                url: pathProject.postPosition_url,
                method: "post",
                headers: {'Content-Type': 'Application/json'},
                data: JSON.stringify(data),
                transformRequest: function (data, headersGetter) {
                    return data;
                }
            });
        },
        //获取公司福利标签
        getCompanyTags: function (id) {
            return $http.get(pathProject.getCompanyTags_url(id))
        }
    }
})
    .factory('roleService', function ($http, $state, path) {
        return {
            getRole: function (rid) {
                return $http.get(path.role(rid));
            },
            saveOrUpdateRole: function (mid, params) {
                if (mid == undefined || mid == "") {
                    this.addRole(params).then(function (res) {
                        if (res.data.code === 0) {
                            bootbox.alert({
                                message: '<p>新增成功<p>'
                            });
                            $state.go('welcome.role')
                        } else {
                            bootbox.alert({
                                message: '<p>新增失败，请检查相关信息<p>'
                            });
                        }
                    });
                } else {
                    this.updateRole(mid, params).then(function (res) {
                        if (res.data.code === 0) {
                            bootbox.alert({
                                message: '<p>更新成功，请重新登陆<p>'
                            });
                            $state.go('welcome.role')
                        } else {
                            bootbox.alert({
                                message: '<p>更新失败，请检查相关信息<p>'
                            });
                        }
                    });
                }
            },
            //增加角色 Put  /a/u/role/{rid}
            addRole: function (params) {
                return $http({
                    url: path.role(),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function (data) {
                        return data;
                    }
                });
            },
            //修改角色 Put  /a/u/role/{rid}
            updateRole: function (rid, params) {
                return $http({
                    url: path.role(rid),
                    method: "PUT",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function (data) {
                        return data;
                    }
                });
            },
        }
    })
    .factory('moduleService', function ($http, path, commonUtil) {
        return {
            //批量获取模块详细信息 请求地址：Get  /a/u/multi/module
            getModuleList: function (params) {
                return $http.get(path.module_list, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            batchGetModule: function (params) {
                return $http.get(path.module_multi_detail(params));
            }
        }
    })