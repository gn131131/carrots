app.controller('jobNew', function ($scope, $rootScope, $stateParams, $http, recommend, experience, education, compensation, categoryData, $state, infoManagementService) {
    //侧边栏状态
    $rootScope.open1 = true;
    $rootScope.articleBg = 'bg1';
    $rootScope.jobBg = 'bg';
    $rootScope.companyBg = 'bg1';
    $rootScope.idBg = 'bg1';
    $rootScope.roleBg = 'bg1';
    $rootScope.passwordBg = 'bg1';
    $rootScope.moduleBg = 'bg1';

    //引入常量
    $scope.recommend = recommend;//认证状态
    $scope.experience = experience;//工作经验
    $scope.education = education;    //学历
    $scope.compensation = compensation;  //薪资
    $scope.categoryData = categoryData;  //二级职位类别


    //获取公司标签列表
    infoManagementService.getCompanyTags($stateParams.companyId).then(function (res) {
        console.log(res.data);
        $scope.companyTags = res.data.tags;
    })

    //获取职位详情
    if ($stateParams.id) {
        infoManagementService.getPositionDetail($stateParams.id).then(function (res) {
            $scope.name = res.data.data.name;
            $scope.companyName = res.data.data.companyName;
            $scope.experiences = res.data.data.experience.toString();
            $scope.educations = res.data.data.education.toString();
            $scope.compensations = res.data.data.compensation.toString();
            $scope.category = res.data.data.category.toString();
            $scope.subCategorys = res.data.data.subCategory.toString();
            $scope.responsibility = res.data.data.responsibility;
            $scope.requisite = res.data.data.requisite;
            $scope.boon = res.data.data.boon;
            $scope.recommends = res.data.data.recommend.toString();
            $scope.tags = res.data.data.tags;

            if ($scope.companyTags) {  //获取选中标签
                for (var i = 0; i < $scope.companyTags.length; i++) {
                    for (var j = 0; j < $scope.tags.length; j++) {
                        if ($scope.companyTags[i].tag == $scope.tags[j].tag) {
                            $('.tag-f').eq(i).prop('checked', true);
                            $scope.companyTags[i].status = 1;
                        }
                    }
                }
            }

        })
    }

    $scope.typeChange = function (category) {
        $scope.subCategorys = '';
    }

    //保存按钮
    $scope.saveJob = function () {
        if ($stateParams.id) {  //编辑职位详情
            if ($scope.tags1 == undefined) {
                $scope.tags1 = [];
            } else {
                for (var i = 0; i < $scope.tags1.length; i++) {
                    delete $scope.tags1[i].status;
                    delete $scope.tags1[i].$$hashKey;
                }
            }
            let data = {
                profession: {
                    companyName: $scope.companyName,
                    id: $stateParams.id,
                    name: $scope.name,
                    category: $scope.category,
                    subCategory: $scope.subCategorys,
                    education: $scope.educations,
                    experience: $scope.experiences,
                    recommend: $scope.recommends,
                    compensation: $scope.compensations,
                    responsibility: $scope.responsibility,
                    requisite: $scope.requisite,
                    boon: $scope.boon,
                    companyId: $stateParams.companyId
                },
                tags: $scope.tags1

            };
            infoManagementService.putPosition(data, $stateParams.id).then(function (res) {
                console.log(res.data);
                $state.go("welcome.jobList", {
                    companyName: $scope.companyName,
                    companyId: $stateParams.companyId
                }, {
                        reload: true
                    })
            },function() {
                alert('请求失败');
            })

        } else { //新增职位
            if ($scope.tags1 == undefined) {
                $scope.tags1 = [];
            } else {
                for (var i = 0; i < $scope.tags1.length; i++) {
                    delete $scope.tags1[i].status;
                    delete $scope.tags1[i].$$hashKey;
                }
            }
            let dataAdd = {
                profession: {
                    companyName: $stateParams.companyName,
                    status: 1,
                    name: $scope.name,
                    category: $scope.category,
                    subCategory: $scope.subCategorys,
                    education: $scope.educations,
                    experience: $scope.experiences,
                    recommend: $scope.recommends,
                    compensation: $scope.compensations,
                    responsibility: $scope.responsibility,
                    requisite: $scope.requisite,
                    boon: $scope.boon,
                    companyId: $stateParams.companyId
                },
                tags: $scope.tags1   //必填

            };
            infoManagementService.postPosition(dataAdd).then(function (res) {
                console.log(res.data);
                $state.go("welcome.jobList", {
                    companyName: $scope.companyName,
                    companyId: $stateParams.companyId
                }, {
                        reload: true
                    })

            },function() {
                alert('请求失败');
            })
        }
    }

    //判断新增页面
    if ($stateParams.companyName) {
        $scope.companyName = $stateParams.companyName;
    }

    //获取标签点击值
    $scope.checkboxMulti = function (a, b) {
        $scope.tags1 = [];
        $scope.companyTags[a].status = b;
        for (var i = 0; i < $scope.companyTags.length; i++) {
            if ($scope.companyTags[i].status == 1) {
                $scope.tags1.push($scope.companyTags[i]);
                console.log($scope.tags1);
            }
        }
        console.log($scope.tags1);
    }
})
