app.controller('moduleNewCtrl', function ($scope,$rootScope, $http, $stateParams, $state) {
    //限制条数输入框只能输入正整数
    $scope.limitInput = function () {
        $scope.parentId = $scope.parentId.replace(/[^0-9]/g, '');
    };

    //获取模块信息
    if($stateParams.mid) {
        console.log('修改模块信息');
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/u/multi/module',
            params: {
                ids: $stateParams.mid
            }
        }).then(function (resp) {
            if(resp.data.code === 0) {
                $scope.module = resp.data.data.moduleList[0];
                $scope.name = $scope.module.name;
                $scope.menuId = $scope.module.menuID;
                $scope.url = $scope.module.url;
                $scope.parentId = $scope.module.parentID;
                $scope.type = $scope.module.type;
            }
        });
        $scope.save = function () {
            $http({
                method: 'PUT',
                url: '/carrots-admin-ajax/a/u/module/' + $stateParams.mid,
                params: {
                    id: $stateParams.mid,
                    name: $scope.name,
                    menuID: $scope.menuId,
                    url: $scope.url,
                    parentID: $scope.parentId,
                    type: $scope.type
                }
            }).then(function (resp) {
                if(resp.data.code === 0) {
                    $state.go('welcome.module');
                }
            })
        }
    } else {
        console.log('新增模块');
        $scope.save = function () {
            $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/u/module/',
                params: {
                    name: $scope.name,
                    menuID: $scope.menuId,
                    url: $scope.url,
                    parentID: $scope.parentId,
                    type: $scope.type
                }
            }).then(function (resp) {
                if(resp.data.code === 0) {
                    bootbox.alert({
                        message: '<p>新增成功<p>'
                    });
                    $state.go('welcome.module', {reload: true});
                }
            })
        }
    }
});