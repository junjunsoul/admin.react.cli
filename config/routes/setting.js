//系统设置
export default {
    path: '/setting',
    name: '系统设置',
    routes: [
        {
            name: '角色管理',
            path: '/setting/role_manage',
            component: './setting/role_manage',
        },
        {
            name: '接口清单',
            path: '/setting/interface_list',
            component: './setting/interface_list',
        },
    ]
}