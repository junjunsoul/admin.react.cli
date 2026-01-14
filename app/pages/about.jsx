import { useEffect } from 'react';
const PageName = '关于我们'
export function meta() {
  return [
    { title: `${PageName} - ${window.sysTitle}` },
  ];
}
// 2. 导出权限配置（供系统自动收集）
export const handle = {
  // 页面固定标识（不会因路由改变而改变）
  pageKey: 'other.about',

  // 页面名称
  title: PageName,
  
  // 是否缓存页面（KeepAlive）
  keepAlive: false,
  
  // 菜单配置（用于自动生成导航菜单和面包屑）
  menu: {
      title: PageName,
      order: 1,
      level_1:'other',
      path: '/about',
  },
};
export default function About() {
  useEffect(() => {
    console.log('About');
  }, []);
  return (
    <div className="min-h-screen bg-yy-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-yy-100 border border-yy-300 rounded-lg p-8 shadow-lg space-y-6">
          <h1 className="text-4xl font-bold text-yy-900 mb-4">关于我们</h1>
          <p className="text-lg text-yy-700 leading-relaxed">
            这是一个基于 React Router v7 的现代化应用，使用文件系统路由。
          </p>
          <div className="bg-yy-200 border border-yy-400 rounded-lg p-6 space-y-3">
            <h2 className="text-xl font-semibold text-yy-900">技术栈</h2>
            <ul className="space-y-2 text-yy-700">
              <li>✅ <strong>React Router v7</strong> - 文件系统路由</li>
              <li>✅ <strong>Tailwind CSS</strong> - yy-* 颜色系统</li>
              <li>✅ <strong>Valtio</strong> - 状态管理</li>
              <li>✅ <strong>Ant Design</strong> - UI 组件库</li>
              <li>✅ <strong>Vite</strong> - 构建工具</li>
            </ul>
          </div>
          <p className="text-sm text-yy-600 pt-4 border-t border-yy-300">
            文件位置: <code className="px-2 py-1 bg-yy-200 rounded text-primary-600 font-mono">app/routes/about.jsx</code>
          </p>
        </div>
      </div>
    </div>
  );
}
