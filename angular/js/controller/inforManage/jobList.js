app.controller('jobList', function ($http, $scope, $rootScope, $state, $filter, $stateParams, experience, education, categoryData, compensation, Status, infoManagementService) {

    var vm = this;
    console.log(vm);
    vm.params = $state.params;
    console.log(vm.params);

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
    
    //常量注入
    $scope.experience = experience;  //工作经验
    $scope.education = education;    //学历

    $scope.compensation = compensation;  //薪资
    $scope.Status = Status;  //状态
    $scope.categoryData = categoryData;//新职位类别

    $scope.startAt = "";
    $scope.endAt = "";


    //获取职位列表数据
    infoManagementService.getPositionList(vm.params).then(function (res) {
        console.log(res.data.data);
        $scope.jobList = res.data.data;
        $scope.pageSize = res.data.size;
        $scope.totalItems = res.data.total;

        $scope.currentPage = $stateParams.page;
        $scope.experiences = $stateParams.experience;
        $scope.educations = $stateParams.education;
        $scope.categoryJob = $stateParams.category;
        $scope.salaryJob = $stateParams.compensation;
        $scope.statusJob = $stateParams.status;
        $scope.companyName = $stateParams.companyName;
        $scope.name = $stateParams.name;

        if (typeof ($stateParams.startAt) != "undefined") {
            $scope.startAt = parseInt($stateParams.startAt);
        }
        if (typeof ($stateParams.endAt) != "undefined") {
            $scope.endAt = parseInt($stateParams.endAt);
        }
    });
    // 搜索--------------
    $scope.search = function () {
        console.log($scope.startAt);
        console.log($scope.startAt.valueOf());

        if (typeof ($scope.endAt) == "object") {
            $scope.endAt = $scope.endAt.valueOf() + 86399999;
        }
        $state.go('welcome.jobList', {
            page: $scope.currentPage,
            size: $scope.pageSize,
            experience: $scope.experiences,
            education: $scope.educations,
            category: $scope.categoryJob,
            compensation: $scope.salaryJob,
            status: $scope.statusJob,
            startAt: $scope.startAt.valueOf(),
            endAt: $scope.endAt.valueOf(),
            companyName: $scope.companyName,
            name: $scope.name,
        }, {
                reload: true
            }
        )
    };
    //清除按钮
    $scope.clear = function () {
        $scope.experiences = "";
        $scope.educations = "";
        $scope.categoryJob = "";
        $scope.salaryJob = "";
        $scope.statusJob = "";
        $scope.currentPage = 1;
        $scope.startAt = "";
        $scope.endAt = "";
        $scope.companyName = "";
        $scope.name = "";
        $scope.search();
    };

    // 日历插件开始
    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: true
    };
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {//定义周末
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === -1 || date.getDay() === 7);//用来定义那些天禁用无法选择
    }

    $scope.toggleMin = function () {//定义小于当前日期的日期
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.toggleMin();
    //禁用日期部分结束，以上定义无禁用

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    // 日历插件结束

    //上下线状态
    bootbox.setLocale("zh_CN");
    $scope.btn_onLine = (function () {
        //---------------bug
        // if (this.items.status === 1) {
        //     return "下架";
        // }
        // if (this.items.status === 0) {
        //     return "上架";
        // }
        if (this.items.status === 1) {
            return "上架";
        }
        if (this.items.status === 0) {
            return "下架";
        }
    });

    //上线
    $scope.OnLine = function () {
        var id = this.items.id;
        console.log(id)
        $scope.status = this.items.status;
        // console.log($scope.status);
        //上线
        if ($scope.status === 0) {
            bootbox.confirm({
                title: '操作提示',
                message: '<p>上架后该职位将在前台展示</p><p>是否执行上架操作</p>',
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

                        infoManagementService.putPositionStatus(id, 1).then(function (res) {
                            if (res.data.code === 0) {
                                bootbox.alert({
                                    message: '<p>上架成功<p>'
                                });
                                $state.reload('welcome.jobList');
                            }

                        });

                    }
                }
            });
        }
        //下线
        else {
            bootbox.confirm({
                title: '操作提示',
                message: '<p>下架后该职位将不在前台展示</p><p>是否执行下架操作</p>',
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
                        // alert('你点了确定');
                        infoManagementService.putPositionStatus(id, 0).then(function (res) {
                            if (res.data.code === 0) {
                                bootbox.alert({
                                    message: '<p>下架成功<p>'
                                });
                                $state.reload('welcome.jobList');
                            }
                        });
                    }
                }
            })
        }

    };
    //删除职位信息
    $scope.delete = function () {
        $scope.id = this.items.id;
        console.log($scope.id);
        bootbox.confirm({
            title: '提示',
            message: '<p>删除后该职位信息将无法使用及还原</p><p>是否执行删除操作</p>',
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
                    // alert('你点了确定');
                    infoManagementService.delPosition($scope.id).then(function (res) {
                        console.log(res);
                        $state.go($state.current, {
                            page: $scope.currentPage
                        }, {
                                reload: true
                            });
                    });
                }
            }
        })
    };

    //编辑
    $scope.edit = function () {
        $state.go('welcome.jobNew', {
            id: this.items.id,
            companyId: this.items.companyId
        }, {
                reload: true
            }
        )
    };


    //判断当前页面
    if ($stateParams.companyId) {  //编辑职位页面
        $scope.selectBar = true;
        $scope.title = $stateParams.companyName + '的在招职位'
    } else {
        $scope.title = '职位列表'
    }
    
    //新增按钮
    $scope.addList = function () {  
        $state.go('welcome.jobNew', {
            companyName: $stateParams.companyName,
            companyId: $stateParams.companyId
        })

    }

})