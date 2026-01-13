const PageName = '用户管理'
export function meta() {
    return [
        { title: `${PageName} - ${window.sysTitle}` },
    ];
}

// 1. 页面使用的接口（接口映射）
const URL_M = {
    list: 'setting.userList',           // 列表接口
    store: 'setting.userStore',         // 添加/修改接口
    info: 'setting.userInfo',       // 角色详情接口
    roleAuthInfo: 'setting.roleAuthInfo' // 角色权限信息接口
}

// 2. 导出权限配置（供系统自动收集）
export const handle = {
    // 页面固定标识（不会因路由改变而改变）
    pageKey: 'settings.user',

    // 页面名称
    title: PageName,

    // 权限与接口的绑定关系
    permission: {
        list: { apis: [URL_M.list], title: '列表' },                      // 页面访问权限
        store: { apis: [URL_M.store, URL_M.info], title: '添加、修改' },    // 添加/修改功能权限
        auth: { apis: [URL_M.roleAuthInfo], title: '授权' },              // 授权功能权限
    },

    // 菜单配置（用于自动生成导航菜单和面包屑）
    menu: {
        title: PageName,
        icon: 'user',
        order: 1,
        level_2: 'settings.system',
        level_1: 'settings',
        path: '/settings/user',
        show: true,  // 是否在导航菜单中显示（默认 true，详情页/编辑页等可设为 false）
    },

    // 授权页面显示菜单（后台权限配置界面）
    authMenu: {
        list: '列表',
        store: '添加、修改',
        auth: '授权',
    },
};

export default function Index() {
    return <div>用户管理</div>;
}
