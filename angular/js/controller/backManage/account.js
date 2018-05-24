app.controller('accountCtrl', function ($scope,$rootScope, $http, $state, $stateParams, $filter, $request, types, status, formats, url) {
    
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

    //页码
    $scope.perPage = 10;
    $scope.currentPage = 1;
    $scope.resList = [];

    //获取所有账户ids
    $scope.getAllId = function () {
        $http({
            method: 'get',
            url: url.getAccountIds,
            params: {
                size: 9999
            }
        }).then(function (resp) {
            if(resp.data.code === 0) {
                $scope.accountIds = resp.data.data.ids;
                let params = {
                    ids: $scope.accountIds
                };
                //获取到ids后发送请求批量获取账户信息
                $request.ajax('GET', url.getAccountList, params, '')
                    .then(function (resp) {
                        console.log(resp);
                        $scope.resList = resp.data.data.managerList;
                    }, function () {
                        console.log('请求失败')
                    });
            }
        })
    };
    $scope.getAllId();

    $scope.$watch('resList', function () {
        $scope.search();
    });

    //模糊搜索
    $scope.search = function () {
        //检测搜索条件是否为空
        if ($scope.user === undefined || $scope.user === '') {
            $scope.accountList = $scope.resList;
        } else  {
            var arr = [];
            //利用indexof判断是否有匹配的字符
            for (var i = 0 ; i < $scope.resList.length; i++) {
                if ($scope.resList[i].name.indexOf($scope.user) >= 0) {
                    arr.push($scope.resList[i]);
                }
            }
            $scope.accountList = arr;
        }
        //确定分页控件中数据总数
        $scope.totalItems = $scope.accountList.length;

        if($scope.totalItems){
            //给数组添加页码
            angular.forEach($scope.accountList, function (date, index) {
                date.page = parseInt(index / $scope.perPage) + 1;
            });
            var newArr = [];
            //按照页码获取当前页的数组
            angular.forEach($scope.accountList, function (date) {
                if(date.page === $scope.currentPage){
                    newArr.push(date);
                }
                $scope.b = newArr;
            });
        } else {
            $scope.b = [];
        }
    };

    //换页
    $scope.$watch('currentPage', function () {
        $scope.b = [];
        angular.forEach($scope.accountList, function (date) {
            if(date.page === $scope.currentPage){
                $scope.b.push(date);
            }
        });
    });

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
                        url: '/carrots-admin-ajax/a/u/manager/' + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (resp) {
                        if (resp.data.code === 0) {
                            bootbox.alert({
                                message: '<p>删除成功<p>'
                            });
                            $state.reload('welcome.id');
                        } else {
                            bootbox.alert({
                                message: '<p>请勿删除正在登录的账号<p>'
                            });
                        }
                    });
                }
            }
        });
    };

});
