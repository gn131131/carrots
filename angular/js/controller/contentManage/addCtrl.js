"use strict";
//新增/编辑页面控制器----------
app.controller('addCtrl', function($rootScope, $scope, $http, $state, $timeout, $request, addTypes, addStatus, addIndustries, url, headers, Upload) {
   //侧边栏状态
   $rootScope.open2 = true;
   $rootScope.articleBg = 'bg';
   $rootScope.jobBg = 'bg1';
   $rootScope.companyBg ='bg1';
   $rootScope.idBg ='bg1';
   $rootScope.roleBg ='bg1';
   $rootScope.passwordBg ='bg1';
   $rootScope.moduleBg ='bg1';
   
   
   
    $scope.loadEdit = function() {
        let editLists = JSON.parse(window.sessionStorage.getItem('edit'));
        //编辑----------
        if (editLists != null) {
            //id\status不显示，status\createAt必须
            $scope.modelEditId = editLists.id;
            $scope.modelEditIndustry = editLists.industry;
            $scope.modelEditStatus = editLists.status;
            $scope.modelEditCreateAt = editLists.createAt;
            //以下参数均必须
            $scope.modelEditTitle = editLists.title;
            $scope.modelEditType = editLists.type;
            $scope.modelEditUrl = editLists.url;
            $rootScope.modelEditImg = editLists.img;   
            //content显示，非必需
            $scope.modelEditContent = editLists.content;
        }
        //新增----------
        else {
            $scope.modelEditCreateAt = new Date().valueOf();
            $scope.modelEditType = 0;
            $scope.modelEditIndustry = 0;
            //图片预览------------
            $rootScope.modelEditImg = null;
        }

        $scope.types = addTypes;
        $scope.status = addStatus;
        $scope.industries = addIndustries;
        //判断显示industry----------
        $scope.type3 = function() {
            return ($scope.modelEditType == 3)?true:false;
        }
        //上下线----------
        $scope.offline = function() {
            $scope.modelEditStatus = 1;
        }
        $scope.online = function() {
            $scope.modelEditStatus = 2;
        }
        //提交编辑----------
        $scope.editSubmit = function(id) {
            if ($rootScope.modelEditImg == null) {
                ($scope.modelEditStatus == 2)?($scope.popoverOpen1 = true):($scope.popoverOpen2 = true);
            }
            else {
                //编辑----------
                $scope.modelEditIndustry = ($scope.modelEditIndustry == null)?'':$scope.modelEditIndustry;
                if (editLists != null) {
                    let data = {
                        title: $scope.modelEditTitle,
                        status: $scope.modelEditStatus,
                        img: $rootScope.modelEditImg,
                        url: $scope.modelEditUrl,
                        createAt: $scope.modelEditCreateAt,
                        type: $scope.modelEditType,
                        content: $scope.modelEditContent,
                        industry: $scope.modelEditIndustry
                    };
                    $request.ajax('PUT', url.edit + id, data, '')
                    .then(function(xhr) {
                        if (xhr.data.code == 0) {
                            console.log("编辑系统正常");
                            $state.go('welcome.articleList');
                        }
                    }, function() {
                        console.log("编辑系统异常，请检查相关设置");
                    });
                }
                //新增----------
                else {
                    let data = {
                        title: $scope.modelEditTitle,
                        status: $scope.modelEditStatus,
                        img: $rootScope.modelEditImg,
                        url: $scope.modelEditUrl,
                        createAt: $scope.modelEditCreateAt,
                        type: $scope.modelEditType,
                        content: $scope.modelEditContent,
                        industry: $scope.modelEditIndustry
                    };
                    $request.ajax('POST', url.added, data, '')
                    .then(function(xhr) {
                        if (xhr.data.code == 0) {
                            console.log("新增系统正常");
                            $state.go('welcome.articleList');
                        }
                    }, function() {
                        console.log("新增系统异常，请检查相关设置");
                    });
                }
            }
        }
        //返回----------
        $scope.back = function() {
            $state.go('welcome.articleList');
        }
            //提交-----
        $scope.submit = function () {
            $scope.upload($scope.picLogo);
        }
            //上传-----
        $scope.upload = function (file) {
            Upload.upload({
                url: url.upload,
                fields: {'file': $scope.picLogo}
            })
            .progress(function(evt) {
                $scope.picLogo.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
            .success(function(data) {
                if (data.code == 0) {
                    console.log("上传系统正常");
                    console.log(data);
                    $rootScope.modelEditImg = data.data.url;
                }
            })
            .error(function() {
                $scope.popoverOpen = true;
                console.log("上传系统异常，请检查相关设置")
            });
        };
        $scope.clear = function () {
            $scope.picLogo = null;
            $rootScope.modelEditImg = null
        }
    }
});