export default {
  title: '系统设置',
  children: [
    {
      title: '系统管理',
      children: [
        {
          title: '账号管理',
          fm: {
            '/setting/admin_manage': '列表',
            '/setting/admin_manage#add': '新增',
            '/setting/admin_manage#edit': '修改',
          },
        },
        {
          title: '角色设置',
          fm: {
            '/setting/role_manage': '列表',
            '/setting/role_manage#add': '新增',
            '/setting/role_manage#edit': '修改/授权',
          },
        },
        {
          title: '接口清单',
          fm: {
            '/setting/interface_list': '列表',
            '/setting/interface_list#add': '新增',
            '/setting/interface_list#edit': '修改',
          },
        }
      ]
    },
  ],
};