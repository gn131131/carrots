"use strict";
//路由
var app = angular.module ('app',['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.sortable', 'textAngular', 'ngFileUpload', 'ngMessages']);
//懒加载----------
app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
    }]);
//路由-----------
app.config(["$stateProvider", "$urlRouterProvider", "$provide", function ( $stateProvider, $urlRouterProvider, $provide ) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider

    // 登录页
        .state('login', {
        url: '/login',
        templateUrl: 'template/loginManage/login.html',
        controller : 'login',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/loginManage/login.js']);
            }]
        }
    })

    // 后台页
        .state('welcome', {
        url: '/welcome',
        templateUrl: 'template/loginManage/welcome.html',
        controller: 'welcome',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/loginManage/welcome.js']);
            }]
        }
    })

    // 信息 管理
        // 公司列表
    .state('welcome.companyList', {
        url: '/companyList?page&size&name&industry&province&city&county&financing&approved&freezed&permit',
        templateUrl: 'template/infoManage/companyList.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/inforManage/companyList.js']);
            }]
        }
    })
        //公司新增/编辑页
    .state('welcome.companyNew',{
        url: '/companyNew?companyId',
        templateUrl: 'template/infoManage/companyNew.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/inforManage/companyNew.js']);
            }]
        }
    })
    // 职位列表
        .state('welcome.jobList', {
            url: '/jobList?page&size&experience&education&category&compensation&status&startAt&endAt&companyName&name&companyId&permit',
            templateUrl: 'template/infoManage/jobList.html',
            controller: 'jobList',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/inforManage/jobList.js']);
                }]
            }
        })
        //职位新增/编辑页
        .state('welcome.jobNew',{
            url: '/jobNew?id&companyId&companyName',
            templateUrl: 'template/infoManage/jobNew.html',
            controller: 'jobNew',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/inforManage/jobNew.js']);
                }]
            }
        })

    // Article 管理
        // Article 列表
    .state('welcome.articleList', {
        url: '/articleList?page&size&title&author&startAt$endAt&type&status&permit',
        templateUrl: 'template/contentManage/articleList.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/contentManage/articleCtrl.js']);
            }]
        }
    })
      //article新增
    .state('welcome.articleNew',{
        url: '/articleNew',
        templateUrl: 'template/contentManage/articleNew.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(['./js/controller/contentManage/addCtrl.js']);
            }]
        }

    })

    // 后台 管理

       // 账号管理
        .state('welcome.id', {
            url: '/id?permit',
            templateUrl: 'template/backManage/id.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/account.js']);
                }]
            }
        })
        //账号新增
        .state('welcome.idNew',{
            url: '/idNew',
            templateUrl: 'template/backManage/idNew.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/idNew.js']);
                }]
            }

        })
        //账号编辑
        .state('welcome.idChange',{
            url: '/idChange?mid',
            templateUrl: 'template/backManage/idChange.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/idNew.js']);
                }]
            }
        })

        // 角色管理
        .state('welcome.role', {
            url: '/role?page&size&permit',
            templateUrl: 'template/backManage/role.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/role.js']);
                }]
            }
        })
        //角色新增
        .state('welcome.roleNew',{
            url: '/roleNew?id',
            templateUrl: 'template/backManage/roleNew.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/roleNew.js']);
                }]
            }
        })

        // 模块管理
        .state('welcome.module', {
            url: '/module?page&size&permit',
            templateUrl: 'template/backManage/module.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/module.js']);
                }]
            }
        })

        //模块新增
        .state('welcome.moduleNew',{
            url: '/moduleNew?mid',
            templateUrl: 'template/backManage/moduleNew.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/moduleNew.js']);
                }]
            }
        })

        // 修改密码
        .state('welcome.changePassword', {
            url: '/changePassword',
            templateUrl: 'template/backManage/changePassword.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['./js/controller/backManage/password.js']);
                }]
            }
        })

}]);