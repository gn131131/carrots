"use strict";
//列表页控制器----------
app.controller('articleCtrl', function($scope,$rootScope, $http, $state, $stateParams, $filter, $request, types, status, formats, url, headers) {
    
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
    
    //初始化列表数据----------
    $scope.loadLists = function() {
        //搜索框设置----------
        $scope.types = types;
        $scope.status = status;
        $scope.dateOptionsFrom = {
            maxDate: new Date(),
            monthColumns: 4,
            showWeeks: false
        }
        $scope.dateOptionsTo = {
            maxDate: new Date(),
            monthColumns: 4,
            showWeeks: false
        }
        $scope.formats = formats;
        $scope.format = $scope.formats[1];
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        //搜索验证----------
        $scope.modelCheck = function(model) {
            if (model == 0) {
                return false;
            }
            else if (model == '' || model == null){
                return true;
            }
            else {
                return false;
            }
        }
        //获取url参数----------
        let getParamsToInt = function(params) {
            return (params == null)?null:parseInt(params);
        }
        let sentParamsInIntPlus = function(params) {
            return (params == null)?null: params.valueOf() + 86399000;
        }
        let sentParamsInInt = function(params) {
            return (params == null)?null: params.valueOf();
        }
        $scope.modelTitle = $stateParams.title;
        $scope.modelAuthor = $stateParams.author;
        $scope.modelDateFrom = getParamsToInt($stateParams.startAt);
        ($stateParams.endAt == null)?null:($scope.modelDateTo = getParamsToInt($stateParams.endAt) - 86399000);
        $scope.modelType = getParamsToInt($stateParams.type);
        $scope.modelStatus = getParamsToInt($stateParams.status);
        //提交搜索，将参数保存在url中----------
        $scope.submitSearchForm = function() {
            $state.go('welcome.articleList', {
                page: 1,
                title: $scope.modelTitle,
                author: $scope.modelAuthor,
                startAt: sentParamsInInt($scope.modelDateFrom),
                endAt: sentParamsInIntPlus($scope.modelDateTo),
                type: $scope.modelType,
                status: $scope.modelStatus
            }, {
                reload: true
            });
        }
        //清空搜索内容----------
        $scope.resetSearchForm = function(form) {
            $scope.modelTitle = null;
            $scope.modelAuthor = null;
            $scope.modelDateFrom = null;
            $scope.modelDateTo = null;
            $scope.modelType = null;
            $scope.modelStatus = null;
            $state.go('welcome.articleList', {
                page: 1,
                title: $scope.modelTitle,
                author: $scope.modelAuthor,
                startAt: $scope.modelDateFrom,
                endAt: $scope.modelDateTo,
                type: $scope.modelType,
                status: $scope.modelStatus
            }, {
                reload: true
            });
            form.$setPristine();
        }
        //获取列表----------
        $scope.getLists = function() {
            let data = {
                page: $stateParams.page,
                size: $stateParams.size,
                title: $scope.modelTitle,
                author: $scope.modelAuthor,
                startAt: sentParamsInInt($scope.modelDateFrom),
                endAt: sentParamsInIntPlus($scope.modelDateTo),
                type: $scope.modelType,
                status: $scope.modelStatus
            };
            $request.ajax('GET', url.lists, data, '')
            .then(function(xhr) {
                if (xhr.data.code == 0) {
                    console.log('数据获取正常');
                    //列表数据----------
                    $scope.lists = xhr.data.data.articleList;
                    //每页最大显示----------
                    $scope.itemsPerPage = xhr.data.data.size;
                    //获取总数----------
                    $scope.totalItems = xhr.data.data.total;
                    console.log("现在总数为：" + $scope.totalItems);
                    //当前页面----------bug
                    $scope.currentPage = xhr.data.data.page;
                    // $scope.currentPage = $stateParams.page;
                }
            }, function() {
                console.log('数据获取异常，请检查相关设置');
            });
        }
        $scope.getLists();
        //拖拽列表----------
        $scope.cannotSort = false;
        $scope.sortableOptions = {
            'ui-preserve-size': true,
            stop: function(e, ui) {
                console.log($scope.lists);
                window.sessionStorage.setItem('lock', JSON.stringify($scope.lists));
            }
        };
        //最大页码修改确认----------
        $scope.pageMaximum = function() {
            let tt=/^\d+$/;
            if (tt.test($scope.maxSizeInput) && $scope.maxSizeInput != 0) {
                $state.go("welcome.articleList", {
                    page: 1,
                    size: $scope.maxSizeInput
                }, {
                    reload: true
                });
            }
            else {
                $scope.popoverOpen = true;
            }
        };
        //翻页----------
        $scope.pageChange = function() {
            $state.go("welcome.articleList", {
                page: $scope.currentPage
            },{
                reload: true
            }
        )};
        //重置----------
        $scope.pageReset = function() {
            $state.go("welcome.articleList", {
                page: 1,
                size: 10
            },{
                reload: true
            }
        )};
        //上下线按钮样式----------
        $scope.lineStatus = function(list) {
            //-----------bug
            // return (list.status == 1)?'上线':'草稿';
            return (list.status == 1)?'草稿':'上线';
        }
        $scope.statusColor1 = function(list) {
            return (list.status == 1)?true:false;
        }
        $scope.statusColor2 = function(list) {
            return (list.status == 2)?true:false;
        }
        //上下线模态框bootbox----------
        $scope.offline = function(list) {
            bootbox.confirm({
                size: 'small',
                backdrop: true,
                closeButton: false,
                title: (list.status == 1)?'确认上线？':'确认下线？',
                message: (list.status == 1)?'上线后会显示在轮播图中':'下线后会存为草稿并从轮播图中删除',
                buttons: {
                    confirm: {
                        label: '是的',
                        className: 'btn btn-success'
                    },
                    cancel: {
                        label: '点错了',
                        className: 'btn btn-danger'
                    }
                },
                callback: function(result) {
                    if (result) {
                        let stateChange = function() {
                            if (list.status == 1) {
                                return 2;
                            }
                            else if (list.status == 2) {
                                return 1;
                            }
                        }
                        let data = {
                            id: list.id,
                            status: stateChange()
                        };
                        $request.ajax('PUT', url.online, data, '')
                        .then(function(xhr) {
                            if (xhr.data.code == 0) {
                                console.log('上下线系统正常');
                                $state.reload('welcome.articleList');
                            }
                        }, function() {
                            console.log('上下线系统异常，请检查相关设置');
                        });
                    }
                    else {
                        console.log('已取消');
                    }
                }
            });
        }
        //删除条目----------
        $scope.deleteList = function (id) {
            bootbox.confirm({
                size: 'small',
                backdrop: true,
                closeButton: false,
                title: '确认删除？',
                message: '删除将不可恢复',
                buttons: {
                    confirm: {
                        label: '删除',
                        className: 'btn btn-danger'
                    },
                    cancel: {
                        label: '点错了',
                        className: 'btn btn-success'
                    }
                },
                callback: function(result) {
                    if (result) {
                        $request.ajax('DELETE', url.delete + id, '', '')
                        .then(function(xhr) {
                            if (xhr.data.code == 0) {
                                console.log('删除系统正常');
                                $state.reload('welcome.articleList');
                            }
                        }, function() {
                            console.log('删除系统异常，请检查相关设置');
                        });
                    }
                    else {
                        console.log('已取消');
                    }
                }
            });
        }
        //编辑条目----------
        $scope.edit = function(id) {
            $request.ajax('GET', url.single + id, '', '')
            .then(function(xhr) {
                if (xhr.data.code == 0) {
                    console.log('编辑系统正常');
                    window.sessionStorage.setItem('edit', JSON.stringify(xhr.data.data.article));
                    $state.go("welcome.articleNew");
                }
            }, function() {
                console.log('编辑系统异常，请检查相关设置');
            });
        }
        //新增条目----------
        $scope.addNew = function() {
            window.sessionStorage.removeItem('edit');
            $state.go('welcome.articleNew');
        }
    }    
});
