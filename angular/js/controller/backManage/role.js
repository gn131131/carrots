app.controller('roleCtrl', function ($scope,$rootScope, $http, $state, $stateParams, $filter, $request, types, status, formats, url, headers) {
    
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

    //获取角色列表
    $http({
        method: 'get',
        params: {
            page: $stateParams.page,
            size: $stateParams.size
        },
        url: url.getRoleIds
    }).then(function (resp) {
        console.log(resp);
        if (resp.data.code === 0) {
            $scope.roleIds = resp.data.data.ids;
            $scope.totalItems = resp.data.data.total;//总数
            $scope.perPage = resp.data.data.size;//一页数据量
            $scope.currentPage = resp.data.data.page;
            let params = {
                ids: $scope.roleIds
            };
            $request.ajax('GET', url.getRoleList, params, '')
                .then(function (resp) {
                    console.log(resp);
                    $scope.roleList = resp.data.data.roleList;
                }, function () {
                    console.log('请求失败')
                });
        }
    }, function () {
        console.log("请求失败");
    });

    //分页控件翻页传参+++
    $scope.pageChange = function () {
        $state.go('welcome.role', {
            page: $scope.currentPage,
            size: 10
        }, {reload: true})
    };

    //分页控件跳转确定传参+++
    $scope.determine = function () {
        $state.go('welcome.role', {
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
                        url: '/carrots-admin-ajax/a/u/role/' + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (resp) {
                        if (resp.data.code === 0) {
                            bootbox.alert({
                                message: '<p>删除成功<p>'
                            });
                            $state.reload('welcome.role');
                        } else {
                            bootbox.alert({
                                message: '<p>删除失败，请检测该角色下是否有账号<p>'
                            });
                        }
                    });
                }
            }
        });
    };
});