import { Welcome } from "../welcome/welcome";

const PageName = '首页'
export function meta() {
  return [
    { title: `${PageName} - ${window.sysTitle}` },
  ];
}

export const handle = {
  // 页面固定标识（不会因路由改变而改变）
  pageKey: 'home',

  // 页面名称
  title: PageName,
  // 菜单配置（用于自动生成导航菜单和面包屑）
  menu: {
      title: PageName,
      path: '/',
  },
};
export default function Index() {
  return <Welcome />;
}
