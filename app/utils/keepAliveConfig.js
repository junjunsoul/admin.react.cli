/**
 * KeepAlive 路由缓存配置
 * 
 * 🎯 推荐方式：在路由的 handle 中配置 keepAlive 参数（优先级最高）
 * 
 * 例如：
 * export const handle = {
 *   keepAlive: true,  // 缓存此页面
 *   // 或 keepAlive: false,  // 不缓存此页面
 * }
 * 
 * 本配置文件作为全局默认配置，当路由 handle 中没有配置 keepAlive 时才会使用
 */

/**
 * 需要缓存的路由列表（全局配置）
 * 支持前缀匹配，例如 '/settings' 会匹配 '/settings/user', '/settings/role' 等
 * 
 * 注意：如果路由的 handle 中配置了 keepAlive，则 handle 配置优先
 */
export const keepAliveInclude = [
  // '/keepalive-demo',     // KeepAlive 生命周期演示页面
  // 添加其他需要缓存的路由...
];

/**
 * 不需要缓存的路由列表（全局配置，优先级高于 include）
 * 
 * 注意：如果路由的 handle 中配置了 keepAlive，则 handle 配置优先级更高
 */
export const keepAliveExclude = [
  // '/settings/user/detail', // 例如：详情页不需要缓存
];

/**
 * 最大缓存数量
 */
export const maxCacheCount = 10;
