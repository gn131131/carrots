app
    .factory('commonUtil', function ($rootScope, $state) {
        return {
            pageDefault: {page: 1, size: 10, next: true},
            process4Page: function (params) {
                if (params == undefined) {
                    params = {};
                } else {

                }
                if (params.page == undefined) {
                    params.page = $state.params.page || this.pageDefault.page;
                }
                if (params.size == undefined) {
                    params.size = $state.params.size || this.pageDefault.size;
                }
                if (params.next == undefined) {
                    params.next = $state.params.next || this.pageDefault.true;
                }
                return {"params": params};
            },

            processPageResult: function (res) {
                $state.params.next = res.data.data.next;
                return res;
            },

            page: {current: 1, size: 5, next: true},
            concactArrayParam: function (name, params) {
                var tempUrls = "?";
                angular.forEach(params, function (data, index, array) {
                    tempUrls = tempUrls + name + "=" + data + "&";
                });
                var url = tempUrls.substring(0, tempUrls.length - 1);
                return url;
            },

            // 处理模块列表数据，将map添加进list结果
            buildTree: function (modules) {
                var tree = [];
                return this.buildTreeNode(0, null, tree, modules);
            },

            buildTreeNode: function (pid, node, tree, modules) {
                var now = this;
                angular.forEach(modules, function (data, index, array) {
                    var module = data;
                    if (module.parentID == pid) {
                        tree = now.buildTreeNode(module.id, module, tree, modules);
                        if (pid == 0) {
                            tree.push(module);
                        } else {
                            if (node.nodes == undefined) {
                                node.nodes = [];
                            }
                            node.nodes.push(module);
                        }
                    }
                });
                tree = tree.sort(now.treeSort);
                angular.forEach(tree, function (item, index) {
                    if (item.nodes) {
                        item.nodes = item.nodes.sort(now.treeSort);
                    }
                });
                return tree;
            },

            treeSort: function (a, b) {
                if (a.level < b.level)
                    return -1;
                else if (a.level > b.level)
                    return 1;
                else
                    return 0;
            },

            arrayContains: function (array, obj) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
        }
    })
    .factory('path', function (commonUtil) {
        return {
            /*角色管理*/
            role: function (rid) {
                if (rid == undefined || rid == "") {
                    //增加角色
                    return "/carrots-admin-ajax/a/u/role";
                } else {
                    //修改角色 //删除角色
                    return "/carrots-admin-ajax/a/u/role/" + rid;
                }
            },
            //查找角色列表
            role_list: "/carrots-admin-ajax/a/u/role/",
            role_multi_detail: function (params) {
                //批量获取角色详细信息
                return "/carrots-admin-ajax/a/u/multi/role" + commonUtil.concactArrayParam("ids", params);

            },
            role_module: function (rid) {
                // 返回单个角色及权限
                return "/carrots-admin-ajax/a/u/role/" + rid + "/module"
            },
            role_manager: function (rid) {
                return "/carrots-admin-ajax/a/u/role/" + rid + "/manager"
            },

            /*模块管理*/
            module: function (mid) {
                if (mid == undefined || mid == "") {
                    //增加模块
                    return "/carrots-admin-ajax/a/u/module";
                } else {
                    //根据ID查找模块 //修改模块 //删除模块
                    return "/carrots-admin-ajax/a/u/module/" + mid
                }
            },
            //查询模块列表
            module_list: "/carrots-admin-ajax/a/u/module/",
            //批量获取模块详细信息
            module_multi_detail: function (params) {
                return "/carrots-admin-ajax/a/u/multi/module" + commonUtil.concactArrayParam("ids", params);
            }
        }
    });
