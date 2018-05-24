app.controller('roleNewCtrl', function ($scope, $http, $state, $rootScope, commonUtil, roleService, moduleService) {
    //初始化
    var vm = $scope.vm = {};
    vm.id = $state.params.id;
    vm.moduleList = [];
    vm.permissionsSet = [];
    vm.mid_module = {};
    $scope.change = vm.id ? '编辑': '新增';

    //创建对应功能
    var selectedData = function () {
        var result = {};
        angular.forEach(vm.moduleList, function (data) {
            angular.forEach(data.nodes, function (data) {
                if (data.use) {
                    var selectedAction = [];
                    if (data.create) {
                        selectedAction.push('create')
                    }
                    if (data.update) {
                        selectedAction.push('update')
                    }
                    if (data.delete) {
                        selectedAction.push('delete')
                    }
                    result[data.id] = selectedAction;
                    if (commonUtil.arrayContains(result, data.parentID)) {
                    } else {
                        result[data.parentID] = [];
                    }
                }
            });
        });
        return result;
    };

    // 获取所有模块列表ID
    moduleService.getModuleList({size: 66666}).then(function (res) {
        if (res.data.code === 0) {
            // 根据模块列表ID，获取列表name和层级关系等信息
            moduleService.batchGetModule(res.data.data.ids).then(function (res) {
                if (res.data.code === 0) {
                    // 拼出页面要展示的模块列表信息格式
                    vm.moduleList = commonUtil.buildTree(res.data.data.moduleList).filter(function (value) {
                        return value.updateBy !== 2
                    });
                    console.log(vm.moduleList);
                    if (vm.id) {
                        // 请求角色下的模块权限
                        roleService.getRole(vm.id).then(function (res) {
                            if (res.data.code === 0) {
                                vm.name = res.data.data.role.name;
                                vm.currentModuleList = res.data.data.role.permissionsSet;
                                angular.forEach(vm.moduleList, function (items) {
                                    angular.forEach(items.nodes, function (item) {
                                        // 循环查找是否已选中并打上标记
                                        angular.forEach(vm.currentModuleList, function (value, key) {
                                            if (item.id == key) {
                                                item.use = true;
                                                item.create = value.in_array("create");
                                                item.update = value.in_array("update");
                                                item.delete = value.in_array("delete");
                                            }
                                        })
                                    })
                                });
                            }
                            else {
                                console.log('请求失败')
                            }
                        })
                    } else {
                        console.log("create new role");
                    }
                } else {
                    console.log('error');
                }
            })
        } else {
            console.log('error');
        }
    });

    //设置全选功能
    vm.changeAll = function () {
        var bool = vm.moduleList.$selected;
        angular.forEach(vm.moduleList, function (items) {
            items.$checked = bool;
            angular.forEach(items.nodes, function (item) {
                item.use = bool;
                item.create = bool;
                item.update = bool;
                item.delete = bool;
            })
        })
    };

    //设置对应大模块的全选功能
    vm.changeModule = function (index) {
        var bool = vm.moduleList[index].$checked;
        angular.forEach(vm.moduleList[index].nodes, function (item) {
            item.use = bool;
            item.create = bool;
            item.update = bool;
            item.delete = bool;
        })
    };

    //设置对应小模块的全选功能
    vm.changeSubModule = function (pindex, index) {
        var bool = vm.moduleList[pindex].nodes[index].use;
        vm.moduleList[pindex].nodes[index].create = bool;
        vm.moduleList[pindex].nodes[index].update = bool;
        vm.moduleList[pindex].nodes[index].delete = bool;
    };

    //保存
    vm.saveOrUpdate = function (roleId) {
        if (roleId) {
            vm.data = {
                id: vm.id,
                name: vm.name,
                permissionsSet: selectedData()
            };
        }
        else {
            vm.data = {
                name: vm.name,
                permissionsSet: selectedData()
            };
        }
        sessionStorage.mineSide = '';
        roleService.saveOrUpdateRole(vm.id, vm.data, "welcome.role");
    };

    Array.prototype.in_array = function (e) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == e)
                return true;
        }
        return false;
    };
});