app.controller('companyNew', function ($scope, $rootScope, $http, $state, $stateParams, Upload, $timeout, approvedStatus, financing, addIndustries, province, city, county, infoManagementService) {
    //侧边栏状态
    $rootScope.open1 = true;
    $rootScope.articleBg = 'bg1';
    $rootScope.jobBg = 'bg1';
    $rootScope.companyBg = 'bg';
    $rootScope.idBg = 'bg1';
    $rootScope.roleBg = 'bg1';
    $rootScope.passwordBg = 'bg1';
    $rootScope.moduleBg = 'bg1';

    var vm = this;
    vm.params = $state.params;
    console.log(vm.params);
    vm.approvedStatus = approvedStatus;   //认证状态
    $scope.financing = financing;     //融资规模
    $scope.industry = addIndustries;  //行业
    $scope.provinces = province;   //省

    //省市区三级联动，监控省份变化，过滤城市信息
    $scope.$watch('province', function (newValue, oldValue) {
        if (newValue) {
            $scope.cities = city.filter(function (city) {
                return city.ProID === newValue;
            });
        } else {
            $scope.cities = null;
        }
        // if (newValue !== oldValue) {
        //     $scope.city = $scope.district = null;
        // }

    });

    //监控城市变化，过滤地区信息
    $scope.$watch('city', function (newValue, oldValue) {
        if (newValue) {
            $scope.districts = county.filter(function (district) {
                return district.CityID === newValue;
            })
        } else {
            $scope.districts = null;
        }
        // if (newValue !== oldValue) {
        //     $scope.district = null;
        // }
    });

    //获取公司详细信息
    if ($stateParams.companyId) {
        infoManagementService.getCompanyDetail($stateParams.companyId).then(function (res) {
            $scope.name = res.data.data.company.name;
            $scope.slogan = res.data.data.company.slogan;
            $scope.totalNum = res.data.data.company.totalNum;
            $scope.financings = res.data.data.company.financing;
            $scope.province = parseInt(res.data.data.company.province);
            $scope.city = parseInt(res.data.data.company.city);
            $scope.county = parseInt(res.data.data.company.county);
            $scope.industrys = res.data.data.industryList[0].industry; //行业
            $scope.logo = res.data.data.company.logo;
            $scope.summary = res.data.data.company.summary; //公司介绍
            $scope.tagList = res.data.data.tagList;  //公司标签数组----
         
            $scope.productName = res.data.data.productList[0].name;  //产品名称
            $scope.productSlogan = res.data.data.productList[0].slogan;
            $scope.productlogo = res.data.data.productList[0].logo;
            $scope.productSummary = res.data.data.productList[0].summary;
            //招聘信息
            $scope.phone = parseInt(res.data.data.company.phone);
            console.log(typeof ($scope.phone));
            $scope.mail = res.data.data.company.mail;
            $scope.address = res.data.data.company.address;
            $scope.map = res.data.data.company.map;
            //认证状态
            $scope.approved = res.data.data.company.approved;
        },function() {
            alert('请求失败');
        })

    } else {
        $scope.tagList = [];
    }

    console.log(vm.params);

    //保存按钮
    $scope.newCompany = function () {
        if ($stateParams.companyId) {
            let data = {
                company: {
                    id: $stateParams.companyId,
                    name: $scope.name,
                    slogan: $scope.slogan,
                    totalNum: $scope.totalNum,
                    province: $scope.province,
                    city: $scope.city,
                    county: $scope.county,
                    financing: $scope.financings,
                    approved: $scope.approved,
                    freezed: 0,   //正常，
                    logo: $scope.logo,
                    summary: $scope.summary,
                    phone: $scope.phone,
                    mail: $scope.mail,
                    address: $scope.address,
                    map: $scope.map
                },
                industryList: [
                    {
                        industry: $scope.industrys
                    }
                ],
                tagList: $scope.tagList,
                productList: [{
                    name: $scope.productName,
                    slogan: $scope.productSlogan,
                    summary: $scope.productSummary,
                    logo: $scope.productlogo
                }]

            }
            infoManagementService.editCompany($stateParams.companyId, data).then(function (res) {
                console.log(res.data);
                $state.go("welcome.companyList")
            })
        } else {
            let dataAdd = {
                company: {
                    name: $scope.name,
                    slogan: $scope.slogan,
                    totalNum: $scope.totalNum,
                    province: $scope.province,
                    city: $scope.city,
                    county: $scope.county,
                    financing: $scope.financings,
                    approved: $scope.approved,
                    // freezed: 0,   //正常   新公司默认正常 这里传此参数无效
                    logo: $scope.logo,
                    summary: $scope.summary,
                    phone: $scope.phone,
                    mail: $scope.mail,
                    address: $scope.address,
                    map: $scope.map
                },
                industryList: [
                    {
                        industry: $scope.industrys
                    }
                ],

                tagList: $scope.tagList,
                productList: [{
                    name: $scope.productName,
                    slogan: $scope.productSlogan,
                    logo: $scope.productlogo,
                    summary: $scope.productSummary
                }]

            }
            infoManagementService.addCompany(dataAdd).then(function (res) {
                console.log(res.data);
                $state.go("welcome.companyList")
            })
        }
    }


    //开始操作
    // 上传图片
    $scope.uploadFiles = function (file) {
        $scope.f = file;
        $scope.upSent = function () {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/task',
                data: { file: file }
            });
            file.upload.then(function (response) {
                console.log(response);
                console.log(response.data.data.url);
                $scope.logo = response.data.data.url;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };
    //删除
    $scope.imgDelete = function () {
        $scope.f = '';
        $scope.imgView = ''
    };

    // 上传公司图片
    $scope.uploadFiles1 = function (file) {
        $scope.f1 = file;
        $scope.upSent1 = function () {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/task',
                data: { file: file }
            });
            file.upload.then(function (response) {
                $scope.productlogo = response.data.data.url;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };
    //删除
    $scope.imgDelete1 = function () {
        $scope.f1 = '';
        $scope.productlogo = ''
    };


    // 上传地图
    $scope.uploadFiles2 = function (file) {
        $scope.f2 = file;
        $scope.upSent2 = function () {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/task',
                data: { file: file }
            });
            file.upload.then(function (response) {
                $scope.map = response.data.data.url;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };
    //删除
    $scope.imgDelete2 = function () {
        $scope.f2 = '';
        $scope.map = ''
    };

    //标签列表
    $scope.dagers = true;
    //增加列表项
    $scope.adds = function () {
        var tags = {
            tag: $scope.tagContent
        };
        console.log($scope.tagContent);
        if ($scope.tagContent !== '' && $scope.tagContent !== undefined) {
            $scope.dagers = true;
            $scope.tagList.push(tags);
            console.log($scope.tagList.length);
            for (var i = 0; i < $scope.tagList.length - 1; i++) {
                if ($scope.tagContent == $scope.tagList[i].tag) {
                    $scope.dagers = false;
                    $scope.tagList.splice($scope.tagList.length - 1);
                }
            }
            $scope.tagContent = '';
        } else {
            $scope.dagers = false;
        }

    }

});


