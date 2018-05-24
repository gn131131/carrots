app.controller('pwdCtrl', function ($scope, $rootScope, $http, $state) {
    $rootScope.open3 = true;
    $rootScope.articleBg = 'bg1';
    $rootScope.jobBg = 'bg1';
    $rootScope.companyBg ='bg1';
    $rootScope.idBg ='bg1';
    $rootScope.roleBg ='bg1';
    $rootScope.passwordBg ='bg';
    $rootScope.moduleBg ='bg1';

    //修改密码
    $scope.changePwd = function () {
        $http({
            method: 'Put',
            url: '/carrots-admin-ajax/a/u/pwd',
            params: {
                oldPwd: $scope.oldPwd,
                newPwd: $scope.newPwd
            }
        }).then(function (resp) {
            console.log(resp);
            if(resp.data.code === 0) {
                window.sessionStorage.clear();
                $state.go('login');
            } else {
                $scope.errorMessage = resp.data.message;
            }
        })
    }

    //监听两个输入框，如果修改输入值，http错误提示消失
    $scope.$watch('oldPwd + newPwd + confirm', function () {
        $scope.errorMessage = ''
    })
});