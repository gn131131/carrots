"use strict";
// let moduleList = JSON.parse(sessionStorage.getItem('moduleList'));
// let login = JSON.parse(sessionStorage.getItem('login'));
app
// .constant('moduleList', moduleList)
// .constant('login', login)
.constant('url', {
    //登录--- POST
    login: '/carrots-admin-ajax/a/login',
    //注销--- POST
    logout: '/carrots-admin-ajax/a/logout',
    //获取列表--- GET
    lists: '/carrots-admin-ajax/a/article/search',
    //上下线--- PUT
    online: '/carrots-admin-ajax/a/u/article/status',
    //删除条码---需要加id--- DELETE
    delete: '/carrots-admin-ajax/a/u/article/',
    //获取单个条目---需要加id--- GET
    single: '/carrots-admin-ajax/a/article/',
    //编辑提交---需要加id--- PUT
    edit: '/carrots-admin-ajax/a/u/article/',
    //新增提交--- POST
    added: '/carrots-admin-ajax/a/u/article',
    //上传图片--- POST
    upload: '/carrots-admin-ajax/a/u/img/task',
    //获取用户ids---GET
    getAccountIds: '/carrots-admin-ajax/a/u/manager/',
    //获取用户信息---GET,加id
    getAccountInfo: '/carrots-admin-ajax/a/u/manager/',
    //增加用户---POST
    addUser: '/carrots-admin-ajax/a/u/manager',
    //修改用户---PUT,加id
    changeUser: '/carrots-admin-ajax/a/u/manager/',
    //批量获取用户信息---GET,加ids
    getAccountList: '/carrots-admin-ajax/a/u/multi/manager',
    //修改公司状态---PUT,加id
    changeCompanyStatus: '/carrots-admin-ajax/a/u/company/status/',
    //获取角色ids---GET
    getRoleIds: '/carrots-admin-ajax/a/u/role/',
    //批量获取用户信息---GET,加ids
    getRoleList: '/carrots-admin-ajax/a/u/multi/role',
    //获取模块列表
    getModuleIds: '/carrots-admin-ajax/a/u/module/',
    //批量获取
    getModuleList: '/carrots-admin-ajax/a/u/multi/module'
})
    .constant('headers', {
        www: {'Content-Type': 'application/x-www-form-urlencoded'},
        undef: {'Content-Type': undefined}
    })

    //搜索type常量----------
    .constant('types',
        [
            {
                'id': 0,
                'name': "首页banner"
            },
            {
                'id': 1,
                'name': "找职位banner"
            },
            {
                'id': 2,
                'name': "找精英banner"
            },
            {
                'id': 3,
                'name': "行业大图"
            },
            {
                'id': null,
                'name': "全部"
            }
        ])
    //status常量
    .constant('status',
        [
            {
                'id': 1,
                'name': "草稿"
            },
            {
                'id': 2,
                'name': "上线"
            },
            {
                'id': null,
                'name': "全部"
            }
        ])
    //搜索时间制式----------
    .constant('formats', ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd HH:mm:ss'])
    //新增type常量----------
    .constant('addTypes',
        [
            {'id': 0, 'name': "首页banner"},
            {'id': 1, 'name': "找职位banner"},
            {'id': 2, 'name': "找精英banner"},
            {'id': 3, 'name': "行业大图"}
        ])
    //新增status常量----------
    .constant('addStatus',
        [
            {'id': 1, 'name': "草稿"},
            {'id': 2, 'name': "上线"}
        ])
    //新增industries常量----------
    .constant('addIndustries',
        [
            {'id': 0, 'name': "移动互联网"},
            {'id': 1, 'name': "电子商务"},
            {'id': 2, 'name': "企业服务"},
            {'id': 3, 'name': "O2O"},
            {'id': 4, 'name': "教育"},
            {'id': 5, 'name': "金融"},
            {'id': 6, 'name': "游戏"}
        ])

    //公司认证状态
    .constant('approvedStatus', [
        {id: 0, name: '未认证'},
        {id: 1, name: '已认证'}
    ])

    //冻结状态
    .constant('freezedStatus', [
        {id: 0, name: '正常'},
        {id: 1, name: '冻结'}
    ])

    //融资规模
    .constant('financing', [
        {id: 0, name: '无需融资'},
        {id: 1, name: '天使轮'},
        {id: 2, name: 'A轮'},
        {id: 3, name: 'B轮'},
        {id: 4, name: 'C轮'},
        {id: 5, name: 'D轮及以上'},
        {id: 6, name: '上市公司'}
    ])

    //职位列表category常量---------------
    .constant('category', {
        0: "产品",
        1: "运营",
        2: "技术",
        3: "设计",
        4: "测试"
    })
    //产品子类--------------
    .constant("subCategory", {
        0: "产品经理",
        1: "JAVA",
        2: "IOS",
        3: "Android",
        4: "Web前端",
        5: "运维",
        6: "UI设计",
        7: "功能测试"
    })
    //薪资---------
    .constant("compensation", {
        0: "8K以下",
        1: "8~15K",
        2: "16~25K",
        3: "26K及以上"
    })
    //学历-----------
    .constant("education", {
        0: "大专",
        1: "本科",
        2: "硕士",
        3: "博士"
    })
  
    //工作经验--------------
    .constant("experience", {
        0: "应届 ",
        1: "1~2年",
        2: "3~5年",
        3: "6~9年",
        4: "10年及以上"
    })
    //状态------------
    .constant("Status", {
        0: "上架 ",
        1: "下架"
    })
    //推荐类型
    .constant("recommend", {
        0: "普通 ",
        1: "推荐"
    })    
     // 二级三级类目数据
     .constant('categoryData', [
        {
            id: 1,
            name: "产品",
            subCategory: [
                {
                    id: 1,
                    name: "助理"
                },
                {
                    id: 2,
                    name: "初级"
                },
                {
                    id: 3,
                    name: "中级"
                },
                {
                    id: 4,
                    name: "高级"
                },
                {
                    id: 5,
                    name: "总监"
                }
            ]
        },
        {
            id: 2,
            name: "UI",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                },
                {
                    id: 4,
                    name: "总监"
                }
            ]
        },
        {
            id: 3,
            name: "QA",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 2,
                    name: "高级"
                }
            ]
        },
        {
            id: 4,
            name: "Android",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 5,
            name: "IOS",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 6,
            name: "WEB",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 7,
            name: "OP",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 8,
            name: "JAVA",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                },
                {
                    id: 4,
                    name: "总监"
                }
            ]
        },
        {
            id: 9,
            name: "NLP",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 10,
            name: "DM",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 11,
            name: "DL",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        }

    ]);

 
