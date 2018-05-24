app.controller('moduleCtrl', function ($scope,$rootScope, $http, $request, $state, $stateParams, url) {
    
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

    $http({
        method: 'get',
        params: {
            page: $stateParams.page,
            size: $stateParams.size
        },
        url: url.getModuleIds
    }).then(function (resp) {
        console.log(resp);
        if (resp.data.code === 0) {
            $scope.totalItems = resp.data.data.total;//总数
            $scope.perPage = resp.data.data.size;
            $scope.moduleIds = resp.data.data.ids;
            $scope.currentPage = resp.data.data.page;
            let params = {
                ids: $scope.moduleIds
            };
            $request.ajax('GET', url.getModuleList, params, '')
                .then(function (resp) {
                    console.log(resp);
                    if (resp.data.code === 0) {
                        $scope.moduleList = resp.data.data.moduleList;
                    }
                }, function () {
                    console.log('请求失败')
                });
        }
    },function () {
        console.log("请求失败");
    });
    //分页控件翻页传参+++
    $scope.pageChange = function () {
        $state.go('welcome.module',{
            page: $scope.currentPage,
            size: 10
        }, {reload: true})
    };

    //分页控件跳转确定传参+++
    $scope.determine = function () {
        $state.go('welcome.module', {
            page: $scope.page,
            size: 10
        }, {reload: true});
    };

    //删除列表某一项++++
    $scope.delete = function (id) {
        bootbox.confirm({
            title: "操作提示",
            message: "是否删除？",
            closeButton: false,
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
                    $http({
                        method: 'Delete',
                        url: '/carrots-admin-ajax/a/u/module/' + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (resp) {
                        if (resp.data.code === 0) {
                            bootbox.alert({
                                message: '<p>删除成功<p>'
                            });
                            $state.reload('welcome.module');
                        } else {
                            bootbox.alert({
                                message: '<p>' + resp.data.message + '<p>'
                            });
                        }
                    });
                }
            }
        });
    };
});