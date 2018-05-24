app.controller('changeIdCtrl', function ($scope,$rootScope, $http, $state, $request, $stateParams, url) {

    //获取角色列表
    $http({
        method: 'get',
        params: {
            size: 6666
        },
        url: url.getRoleIds
    }).then(function (resp) {
        console.log(resp);
        if (resp.data.code === 0) {
            $scope.roleIds = resp.data.data.ids;
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

    //修改角色
    if ($stateParams.mid) {
        $http({
            method: 'GET',
            url: url.changeUser + $stateParams.mid,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (resp) {
            console.log(resp);
            if (resp.data.code === 0) {
                $scope.user = resp.data.data.manager.name;
                $scope.status = resp.data.data.manager.status;
                $scope.roleID = resp.data.data.manager.roleID;
            }
        });
        $scope.saveUser = function () {
            $http({
                method: 'put',
                url: url.changeUser + $stateParams.mid,
                params: {
                    id: $stateParams.mid,
                    name: $scope.user,
                    status: $scope.status,
                    roleID: $scope.roleID
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (resp) {
                console.log(resp);
                if (resp.data.code === 0) {
                    bootbox.alert({
                        message: '<p>修改成功，请重新登陆<p>'
                    });
                    $state.go('welcome.id');
                } else {
                    bootbox.alert({
                        message: '<p>修改失败，请检查相关信息<p>'
                    });
                }
            });
        }
    }
    else {
        $scope.saveUser = function () {
            $http({
                method: 'Post',
                url: url.addUser,
                params: {
                    name: $scope.user,
                    pwd: $scope.newPwd,
                    roleID: $scope.roleID
                }
            }).then(function (resp) {
                console.log(resp);
                if (resp.data.code === 0) {
                    bootbox.alert({
                        message: '<p>新增成功<p>'
                    });
                    $state.go('welcome.id');
                } else {
                    bootbox.alert({
                        message: '<p>'+ resp.data.message +'<p>'
                    });
                }
            })
        }
    }

});