app.controller('welcome',function ($scope, $rootScope, $state, $request, url, $stateParams, $location) {
    $scope.welcomeInit = function () {
        let token = window.sessionStorage.getItem('token');
        if (token != 1) {
            $state.go('login');
        }
        //注销
        $scope.logout = function () {
            $request.ajax('POST', url.logout, '', '')
            .then(function(xhr) {
                window.sessionStorage.clear();
                $state.go('login');
            }, function() {
                console.log('注销失败，请检查设置');
            });
        }

        //获取列表
        $scope.moduleList = JSON.parse(sessionStorage.getItem('moduleList'));
        //获取 role id 权限
        $scope.permit = JSON.parse(sessionStorage.getItem('permit'));
        //获取 name
        $scope.role = JSON.parse(sessionStorage.getItem('role'));
        
        console.log('模块列表：');
        console.table($scope.moduleList);
        console.log('权限：');
        console.table($scope.permit);
        console.log('登陆信息：');
        console.table($scope.role);
        //为子列表添加权限属性
        $scope.moduleList.forEach(element => {
            let p = $scope.permit.role.permissionsSet;
            for (key in p) {
                element.nodes.forEach(el => {
                    if (el.id == key) {
                        el.permit = p[key];
                    }
                })
            }
        });
        console.log('列表添加权限：');
        console.table($scope.moduleList);

        //模块显隐
        Array.prototype.in_array = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element) {
            　　    return true;
                }
            } return false;
        }
        $scope.permission = function (id) {
            if ($scope.permit.role.id == 1) {
                return true;
            }
            else {
                let key = Object.keys($scope.permit.role.permissionsSet);
                return key.in_array(id);
            }
        };

        //1为收缩，0为展开
        let open = JSON.parse(sessionStorage.getItem('open'));
        if (open === null) {
            $scope.collapse = function () {
                console.log($scope.moduleList.length);
                let arr = [];
                for (let i = 0; i < $scope.moduleList.length; i++) {
                    arr[i] = 1;
                }
                return arr;
            }();
        }
        else {
            $scope.collapse = JSON.parse(sessionStorage.getItem('open'));
            console.log($scope.collapse);
        }
        //点击设置展开状态
        $scope.setCollapse = function (index) {
            $scope.collapse[index]?$scope.collapse[index] = 0:$scope.collapse[index] = 1;
            sessionStorage.setItem('open', JSON.stringify($scope.collapse));
        }

        //风琴菜单样式保存
        let currentUrl = $location.path();
        currentUrl = currentUrl.replace(/\//g, '.');
        currentUrl = currentUrl.slice(1);
        $scope.currentUrl = currentUrl;

        //风琴菜单选中样式
        $scope.select = function (event, index) {
            $('.menuList').removeClass('selected');
            $(event.target).addClass('selected');
        }
    }
});