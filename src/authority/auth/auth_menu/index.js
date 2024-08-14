import setting from './setting'
export default [
  {
    title: '基础权限（必须勾选）',
    children: [
      {
        title: '公共权限',
        fm: {
          '/common/base': '修改密码，个人信息',
        },
      },
    ],
  },
  ...setting,
]