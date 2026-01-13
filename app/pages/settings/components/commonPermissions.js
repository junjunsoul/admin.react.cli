/**
 * 公共权限配置
 * 这些权限是所有用户都应该拥有的基础权限
 */
export const commonPermissions = {
  pageKey: 'common.base',
  title: '公共权限',
  
  permission: {
    base: {
      apis: [
        'api.logout',      // 退出登录
        'api.password',    // 修改密码
        'api.getUserInfo', // 获取用户信息
      ],
      title: '基础权限（必须勾选）'
    }
  },
  
  menu: {
    title: '公共权限',
    level_1: 'common',
    level_2: 'common',
    order: 0,
    show: true, // 在授权界面显示
  }
}
