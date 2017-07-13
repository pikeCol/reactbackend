module.exports = {
	api: {
		base: 'http://192.168.0.209:8099',
		login: '/sys/login.do',
		findRoleRepeat: '/role/findRoleRepeat.do',  //查询账户名是否存在
    addRole: '/role/addRole.do',    //角色新增
    editRole: '/role/editRole.do',  //角色修改
    queryRoleList: '/role/queryRoleList.do',  //角色列表
    getRoleDetail: '/role/getRoleDetail.do',  //角色详情
    updateRoleStatus: '/role/updateRoleStatus.do',  //修改角色状态
    delRole: '/role/delRole.do',  //删除角色
    getRoleList: '/role/getRoleList.do' //获取角色的数据
	}
}
