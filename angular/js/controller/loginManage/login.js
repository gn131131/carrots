angular.module("app").controller('login',function ($timeout, $http,$scope,$state, roleService, moduleService, commonUtil) {
    $scope.loginInit = function () {
        $scope.login=function(){  //按钮点击函数
            //风琴菜单获取数据
            moduleService.getModuleList({size: 6666}).then(function (res) {
                if (res.data.code === 0) {
                    moduleService.batchGetModule(res.data.data.ids).then(function (res) {
                        if(res.data.code === 0) {
                            let moduleList = commonUtil.buildTree(res.data.data.moduleList).filter(function (value) {
                                return value.updateBy !== 2;
                            });
                            sessionStorage.setItem('moduleList', JSON.stringify(moduleList));
                        } else {
                            console.log('请求失败，请检查设置')
                        }
                    })
                } else {
                    console.log('请求失败，请检查设置')
                }
            });
    
            $http({  //angularJS中的$http服务
                method:'post', //转送方式
                url:'/carrots-admin-ajax/a/login',//  发送地址
                headers:{"Content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
                params: {
                    name: $scope.userName,
                    pwd: $scope.passWord
                }
            }).then(function(rest){
                if (rest.data.code===0){  //这里是个判断，当输入正确的用户名和密码时，后天返回的code为0，则执行以下操作
                    window.sessionStorage.setItem('token', 1);
                    roleService.getRole(rest.data.data.role.id).then(function (res) {
                        sessionStorage.setItem('permit', JSON.stringify(res.data.data));
                        $scope.data = res.data.data;
                    });
                    sessionStorage.setItem('role', JSON.stringify(rest.data.data));
                    $timeout(function () {
                        $state.go('welcome');
                    }, 500);
                }else {
                    $scope.msg =rest.data.message; //利用ng-bind将后台返回的信息显示在HTML中
                }
            })
        };
    }
});