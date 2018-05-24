app.controller('companyList', function ($http, $scope, $rootScope, $state, $filter, $stateParams, infoManagementService,
    addIndustries, approvedStatus, freezedStatus, financing, url, province, city, county) {

    var vm = this;
    vm.params = $state.params;

    //获取权限列表
    $scope.permit = $stateParams.permit;
    console.log('当页权限:');
    console.log($scope.permit);
    //创建一个判断函数
    function check(arr, params) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == params || arr == params) {
                return true;
            }
        }
        return false;
    }

    //检查新增权限
    $scope.checkAdd = function () {
        if ($scope.permit) {
            return check($scope.permit, 'create');
        }
        else {
            return true;
        }
    }
    //检查编辑权限
    $scope.checkUpdate = function () {
        if ($scope.permit) {
            return check($scope.permit, 'update');
        }
        else {
            return true;
        }
    }
    //检查删除权限
    $scope.checkDelete = function () {
        if ($scope.permit) {
            return check($scope.permit, 'delete');
        }
        else {
            return true;
        }
    }

    //下拉列表数据
    $scope.industries = addIndustries;
    $scope.approvedStatus = approvedStatus;
    $scope.freezedStatuses = freezedStatus;
    $scope.financingOption = financing;
    $scope.provinces = province;

    //发送http请求,获取公司列表

    infoManagementService.getConpanyList(vm.params).then(function (res) {
        if (res.data.code === 0) {
            console.log(res.data);
            $scope.companyList = res.data.data;
            $scope.name = $stateParams.name;
            $scope.industry = setParseInt($stateParams.industry);
            $scope.approveStatus = setParseInt($stateParams.approved);
            $scope.freezedStatus = setParseInt($stateParams.freezed);
            $scope.financing = setParseInt($stateParams.financing);
            $scope.province = setParseInt($stateParams.province);  //省
            $scope.city = setParseInt($stateParams.city);          //市
            $scope.district = setParseInt($stateParams.county);    //县
            $scope.pageSize = res.data.size;
            $scope.currentPage = $stateParams.page;
            $scope.totalItems = res.data.total;
        }
    },function() {
        alert('请求失败');
    })
    //搜索框条件判断是否为undefined
    var setParseInt = function (params) {
        return (params === undefined) ? null : parseInt(params)
    };

    //省市区三级联动，监控省份变化，过滤城市信息
    $scope.$watch('province', function (newValue, oldValue) {
        if (newValue) {
            $scope.cities = city.filter(function (city) {
                return city.ProID === newValue;
            });
        } else {
            $scope.cities = null;
        }
    });

    //监控城市变化，过滤地区信息
    $scope.$watch('city', function (newValue, oldValue) {
        if (newValue) {
            $scope.districts = county.filter(function (district) {
                return district.CityID === newValue;
            })
        } else {
            $scope.districts = null;
        }
    });


    //搜索
    $scope.search = function () {
        $state.go('welcome.companyList', {
            name: $scope.name,
            industry: $scope.industry,
            province: $scope.province,
            city: $scope.city,
            county: $scope.district,
            financing: $scope.financing,
            approved: $scope.approveStatus,
            freezed: $scope.freezedStatus,
            page: $scope.currentPage,
            size: $scope.pageSize
        }, { reload: true })
    };

    //清空
    $scope.clear = function () {
        $state.go('welcome.companyList', {
            name: null,
            industry: null,
            province: null,
            city: null,
            county: null,
            financing: null,
            approved: null,
            freezed: null,
            page: 1,
            size: 10
        }, { reload: true })
    };

    //修改冻结按钮文本内容
    $scope.freezeText = function (items) {
        //----------------bug
        // return items.freezed === 1 ? '解冻' : '冻结'
        return items.freezed === 1 ? '冻结' : '解冻'
    };

    //修改认证按钮文本内容
    $scope.approveText = function (items) {
        return items.approved === 1 ? '解除' : '认证'
    };

    //修改认证状态操作
    $scope.changeApprove = function (id, status) {
        //提示框
        bootbox.confirm({
            title: "操作提示",
            message: status === 1 ? '<p>解除认证后该公司将不再标记为推荐公司</p><p>是否执行解除操作</p>'
                : "<p>认证后该公司将被标记为推荐公司</p><p>是否执行认证操作</p>",
            closeButton: true,
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger'
                }
            },
            //回调函数，发送http请求
            callback: function (result) {
                if (result) {
                    var changeStatus = function () {
                        status === 1 ? status = 0 : status = 1;
                        return status;
                    };
                    $http({
                        method: 'put',
                        url: url.changeCompanyStatus,
                        params: {
                            id: id,
                            type: 1,
                            status: changeStatus()
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (resp) {
                        if (resp.data.code === 0) {
                            bootbox.alert({
                                message: status === 1 ? '<p>认证成功</p>'
                                    : "<p>解除成功</p>"
                            });
                            $state.reload('welcome.companyList');
                        }
                    });
                }
            }
        })
    };

    //修改冻结状态操作
    $scope.changeFreeze = function (id, status) {
        bootbox.confirm({
            title: "操作提示",
            message: status === 1 ? '<p>解冻后该公司下的信息将可继续使用</p><p>是否执行解冻操作</p>'
                : "<p>冻结后该公司下的所有信息将不可用</p><p>是否执行冻结操作</p>",
            closeButton: true,
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger'
                }
            },
            //回调函数，发送http请求
            callback: function (result) {
                if (result) {
                    var changeStatus = function () {
                        status === 1 ? status = 0 : status = 1;
                        return status;
                    };
                    $http({
                        method: 'put',
                        url: url.changeCompanyStatus,
                        params: {
                            id: id,
                            type: 0,
                            status: changeStatus()
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (resp) {
                        if (resp.data.code === 0) {
                            bootbox.alert({
                                //----------------bug
                                // message: status === 1 ? "<p>冻结成功</p>" : '<p>解冻成功</p>'
                                message: status === 1 ? "<p>解冻成功</p>" : '<p>冻结成功</p>'
                            });
                            $state.reload('welcome.companyList');
                        }
                    });
                }
            }
        })
    };

    //删除公司
    $scope.delete = function () {
        $scope.id = this.items.id;
        console.log($scope.id);
        bootbox.confirm({
            title: '操作提示',
            message: '<p>删除后该公司职位信息将被删除</p><p>是否执行删除操作',
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    infoManagementService.delCompany($scope.id).then(function (res) {
                        if (res.data.code === 0) {
                            bootbox.alert({
                                message: '<p>删除成功<p>'
                            });
                            $state.reload('welcome.companyList');
                        }
                    },function() {
                        alert('请求失败');
                    });
                }
            }
        })
    };

    //点击职位跳转
    $scope.position = function () {
        $state.go('welcome.jobList', {
            companyName: this.items.name,
            companyId: this.items.id
        }, {
                reload: true
            }
        )
    }

    //点击编辑跳转
    $scope.edit = function () {
        $state.go('welcome.companyNew', {
            companyId: this.items.id
        }, {
                reload: true
            })
    }

});