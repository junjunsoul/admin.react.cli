/**
 * 判断文件路径是否是真正的路由文件
 * 排除规则：
 * - 文件名以 _ 开头（除了 _index）
 * - 路径中包含 components
 * - 路径中包含 business
 * 
 * @param {string} path - 文件路径
 * @returns {boolean} 是否是路由文件
 */
function isRouteFile(path) {
  // 排除 components 目录
  if (path.includes('/components/')) {
    return false;
  }
  // 排除 business 目录
  if (path.includes('/business/')) {
    return false;
  }
  
  return true;
}

export function getAllRouteHandles() {
  // eager: true 表示立即加载所有模块
  const modules = import.meta.glob('@/pages/**/*.{jsx,js,tsx,ts}', { eager: true });
  
  const handles = [];
  
  for (const path in modules) {
    // 过滤掉非路由文件
    if (!isRouteFile(path)) {
      continue;
    }
    
    const module = modules[path];
    if (module.handle) {
      handles.push({
        routePath: path,
        ...module.handle,
      });
    }
  }
  
  return handles;
}
