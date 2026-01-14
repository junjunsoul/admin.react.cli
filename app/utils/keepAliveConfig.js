/**
 * KeepAlive 路由缓存配置
 * 
 * 配置哪些路由需要被缓存
 */

/**
 * 需要缓存的路由列表
 * 支持前缀匹配，例如 '/settings' 会匹配 '/settings/user', '/settings/role' 等
 */
export const keepAliveInclude = [
  '/settings/user',      // 用户管理页面
  '/settings/role',      // 角色管理页面
  '/settings/interface', // 接口管理页面
  '/antd-demo',          // Antd 组件演示页面
  '/keepalive-demo',     // KeepAlive 生命周期演示页面
  // 添加其他需要缓存的路由...
];

/**
 * 不需要缓存的路由列表（优先级高于 include）
 */
export const keepAliveExclude = [
  // '/settings/user/detail', // 例如：详情页不需要缓存
];

/**
 * 最大缓存数量
 */
export const maxCacheCount = 10;
