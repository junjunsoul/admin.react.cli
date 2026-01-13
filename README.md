# AdClient 管理平台

基于 React Router v7、Ant Design 和 AG-Grid 构建的企业级后台管理系统，具有完善的权限管理、主题切换和数据表格功能。

## 📋 目录

- [技术栈](#技术栈)
- [功能特性](#功能特性)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [核心功能](#核心功能)
- [组件使用](#组件使用)
- [开发指南](#开发指南)
- [API 服务](#api-服务)
- [状态管理](#状态管理)
- [部署说明](#部署说明)
- [常见问题](#常见问题)

---

## 🎯 技术栈

### 核心框架
- **React 19.2.3** - 前端框架
- **React Router 7.10.1** - 路由管理（SPA 模式）
- **Vite 7.1.7** - 构建工具

### UI 组件库
- **Ant Design 6.1.3** - 企业级 UI 组件库
- **AG-Grid Enterprise 35.0.0** - 高性能数据表格
- **Lucide React 0.562.0** - 图标库
- **Tailwind CSS 4.1.13** - 原子化 CSS 框架

### 状态管理
- **Valtio 2.2.0** - 轻量级响应式状态管理

### 工具库
- **Lodash 4.17.21** - 工具函数库
- **FFmpeg** - 视频处理（Web Assembly）

### 开发工具
- **Less 4.5.1** - CSS 预处理器
- **Mock.js** - 数据模拟
- **MSW** - API Mock 服务

---

## ✨ 功能特性

### 🎨 界面与交互
- ✅ **响应式导航系统** - 可折叠侧边栏 + 顶部导航
- ✅ **主题切换** - 支持亮色/暗色模式，带平滑过渡动画
- ✅ **自适应布局** - 支持各种屏幕尺寸
- ✅ **SVG 图标系统** - 雪碧图 + React 组件两种方式

### 🔐 权限与认证
- ✅ **用户登录认证** - Token 机制
- ✅ **权限控制** - 基于菜单和路由的权限管理
- ✅ **路由守卫** - 自动检查登录状态
- ✅ **快速登录组件** - 弹窗式登录

### 📊 数据管理
- ✅ **高性能表格** - AG-Grid 企业版，支持百万行数据
- ✅ **表格功能** - 搜索、排序、过滤、导出 Excel、列配置
- ✅ **汇总行** - 自动计算数据汇总
- ✅ **服务端分页** - 支持大数据量场景

### 🛠️ 开发体验
- ✅ **热更新提示** - 自动检测新版本并提醒刷新
- ✅ **请求封装** - 统一的请求处理和错误提示
- ✅ **代理配置** - 开发环境 API 代理
- ✅ **Mock 数据** - 本地模拟数据支持

---

## 📁 项目结构

```
e:\adclient\
├── app/                          # 应用主目录
│   ├── assets/                   # 静态资源
│   │   └── home.png              # 首页图片
│   ├── components/               # 公共组件
│   │   ├── DataSelect/           # 数据选择器
│   │   ├── Icon/                 # SVG 图标组件
│   │   ├── JTable/               # AG-Grid 表格封装
│   │   │   ├── index.jsx         # 表格主组件
│   │   │   ├── locale.js         # 中文本地化
│   │   │   └── server.jsx        # 服务端分页
│   │   ├── Navigation/           # 导航系统
│   │   │   ├── components/       # 导航子组件
│   │   │   │   ├── AvatarDropdown.jsx  # 用户头像下拉
│   │   │   │   ├── RightContent.jsx    # 右侧内容区
│   │   │   │   ├── Setting.jsx         # 设置面板
│   │   │   │   └── ThemeToggle.jsx     # 主题切换按钮
│   │   │   ├── index.jsx         # 导航主入口
│   │   │   ├── sideMenu.jsx      # 侧边菜单
│   │   │   └── topMenu.jsx       # 顶部菜单
│   │   ├── QuickLogin/           # 快速登录弹窗
│   │   └── RouteGuard/           # 路由守卫
│   ├── icons/                    # SVG 图标文件
│   │   ├── chevronLeft.svg
│   │   ├── chevronRight.svg
│   │   ├── home.svg
│   │   ├── interface.svg
│   │   ├── mail.svg
│   │   ├── role.svg
│   │   ├── setting.svg
│   │   ├── test.svg
│   │   ├── theme.svg
│   │   └── user.svg
│   ├── layout/                   # 布局组件
│   │   └── basic.jsx             # 基础布局（登录验证+导航）
│   ├── pages/                    # 页面组件
│   │   ├── settings/             # 设置模块
│   │   │   ├── components/       # 设置子组件
│   │   │   │   ├── auth.jsx      # 权限配置
│   │   │   │   └── commonPermissions.js  # 通用权限
│   │   │   ├── interface.jsx     # 接口管理
│   │   │   ├── role.jsx          # 角色管理
│   │   │   └── user.jsx          # 用户管理
│   │   ├── about.jsx             # 关于页面
│   │   ├── antd-demo.jsx         # Ant Design 演示
│   │   └── home.jsx              # 首页
│   ├── services/                 # API 服务层
│   │   ├── api.js                # API 接口定义
│   │   ├── comm.js               # 公共接口
│   │   ├── setting.js            # 设置相关接口
│   │   └── index.js              # 统一导出
│   ├── store/                    # 状态管理
│   │   ├── themeStore.js         # 主题状态
│   │   └── userStore.js          # 用户状态
│   ├── utils/                    # 工具函数
│   │   ├── collectRouteHandles.js     # 路由信息收集
│   │   ├── enumMenu.js                # 菜单枚举
│   │   ├── index.js                   # 工具函数集合
│   │   ├── request.js                 # 请求封装
│   │   ├── theme.js                   # 主题配置
│   │   └── usePermission.js           # 权限钩子
│   ├── welcome/                  # 欢迎页
│   │   ├── logo-dark.svg
│   │   ├── logo-light.svg
│   │   └── welcome.jsx
│   ├── app.css                   # 全局样式（含主题配置）
│   ├── entry.client.jsx          # 客户端入口
│   ├── root.jsx                  # 根组件
│   └── routes.js                 # 路由配置
├── config/                       # 配置文件
│   ├── proxy.js                  # 代理配置
│   ├── setting.js                # 项目配置
│   └── setting.js.default        # 配置模板
├── mock/                         # Mock 数据
│   ├── README.md
│   └── user.ts
├── public/                       # 静态文件
│   ├── favicon.ico
│   └── version.json              # 版本信息
├── react-router.config.js        # React Router 配置
├── vite.config.js                # Vite 配置
├── package.json                  # 项目依赖
└── README.md                     # 本文档
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0（推荐）或 npm

### 安装依赖

```bash
# 使用 Yarn（推荐）
yarn install

# 或使用 npm
npm install
```

### 配置后端地址

1. 复制配置文件模板：
```bash
cp config/setting.js.default config/setting.js
```

2. 编辑 `config/setting.js`：
```javascript
export default {
    target: 'https://your-api-domain.com/',  // 修改为你的后端 API 地址
}
```

### 启动开发服务器

```bash
yarn dev
```

访问 http://localhost:9000/ 即可看到应用。

### 构建生产版本

```bash
# 开发环境构建
yarn build

# 预发布环境构建
yarn build:stage

# 生产环境构建
yarn build:prod
```

构建产物位于 `build/` 目录。

### 预览生产版本

```bash
yarn preview
```

访问 http://localhost:4173/ 预览生产版本。

---

## ⚙️ 配置说明

### 1. Vite 配置 (`vite.config.js`)

```javascript
export default defineConfig({
  server: {
    port: 9000,                    // 开发服务器端口
    proxy: config['dev']           // API 代理配置
  },
  plugins: [
    tailwindcss(),                 // Tailwind CSS 支持
    reactRouter(),                 // React Router 插件
    createSvgIconsPlugin({         // SVG 雪碧图
      iconDirs: [path.resolve(process.cwd(), "app/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    svgr(),                        // SVG 组件化
    viteMockServe({                // Mock 数据
      mockPath: "mock",
      enable: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),  // @ 别名指向 app 目录
    },
  },
})
```

### 2. 代理配置 (`config/proxy.js`)

开发环境下，所有 `/api` 请求会被代理到配置的后端地址：

```javascript
export default {
    dev: {
        '/api': {
            target: 'https://aiplaylet-test.eyuconnect.com/',  // 后端地址
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            }
        }
    }
}
```

### 3. 路由配置 (`app/routes.js`)

使用手动路由配置：

```javascript
export default [
    layout('layout/basic.jsx', [         // 基础布局
        index("pages/home.jsx"),         // 首页 /
        route('/settings/user','pages/settings/user.jsx'),
        route('/settings/role','pages/settings/role.jsx'),
        route('/settings/interface','pages/settings/interface.jsx'),
        route('/about','pages/about.jsx'),
        route('/antd-demo','pages/antd-demo.jsx'),
    ]),
]
```

### 4. React Router 配置 (`react-router.config.js`)

```javascript
export default {
  ssr: false,  // 禁用服务端渲染，使用 SPA 模式
}
```

---

## 🎨 核心功能

### 1. 主题切换系统

#### 使用主题

```javascript
import { useThemeStore } from "@/store/themeStore";

function MyComponent() {
  const { isDark, theme, toggleTheme, setTheme } = useThemeStore();
  
  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
      <button onClick={() => setTheme('dark')}>设置为暗色</button>
    </div>
  );
}
```

#### 主题颜色系统

项目使用统一的 `yy-*` 颜色系统，自动适配亮色/暗色模式：

```jsx
// 背景色（从浅到深）
<div className="bg-yy-50">页面背景（最浅）</div>
<div className="bg-yy-100">卡片背景</div>
<div className="bg-yy-200">次级区域</div>

// 文字颜色（从浅到深）
<p className="text-yy-600">辅助文字</p>
<p className="text-yy-700">正文</p>
<h1 className="text-yy-900">主标题（最深）</h1>

// 边框
<div className="border border-yy-300">带边框</div>

// 功能色
<button className="bg-primary-500">主要按钮</button>
<span className="text-success-500">成功</span>
<span className="text-warning-500">警告</span>
<span className="text-error-500">错误</span>
```

#### 主题配置

主题在 `app/app.css` 中配置（Tailwind v4 方式）：

```css
/* 1. 定义颜色变量 */
:root {
  --color-yy-50: #ffffff;
  --color-yy-900: #111827;
}

.dark {
  --color-yy-50: #030712;
  --color-yy-900: #f3f4f6;
}

/* 2. 注册到 Tailwind（生成工具类） */
@theme {
  --color-yy-50: var(--color-yy-50);
  --color-yy-900: var(--color-yy-900);
}
```

#### 主题切换动画

项目支持现代浏览器的 View Transitions API，实现平滑的主题切换动画。如果浏览器不支持，会降级使用 CSS transition。

### 2. 用户认证与权限

#### 用户状态管理

```javascript
import { useUserStore, userActions } from "@/store/userStore";

function MyComponent() {
  const { 
    user,               // 用户信息
    permissions,        // 用户权限列表
    isInitialized,      // 是否已初始化
    checkLogin,         // 检查登录状态
    logout,             // 登出
    fetchCurrent,       // 获取当前用户信息
  } = useUserStore();
  
  return (
    <div>
      {user && <p>欢迎, {user.name}</p>}
      <button onClick={logout}>登出</button>
    </div>
  );
}

// 在非组件中使用
userActions.clearUser();              // 清除用户信息
userActions.setUser(userData);        // 设置用户信息
userActions.setPermissions(perms);    // 设置权限
userActions.isLoggedIn();             // 检查是否登录
```

#### 路由守卫

基础布局 (`layout/basic.jsx`) 自动处理登录检查：

```javascript
export default () => {
    const matches = useMatches();
    const handle = matches[matches.length - 1]?.handle;
    const { checkLogin, isInitialized } = useUserStore();

    // 需要登录
    if (handle?.needLogin !== false) {
        if (isInitialized) {
            if (!checkLogin()) {
                return null;  // 未登录，显示登录弹窗
            }
        } else {
            // 加载中...
            return <Spin />;
        }
    }
    
    // 已登录，显示内容
    return <Navigation />;
}
```

#### 页面权限配置

在页面组件中配置权限和菜单（参考 `app/pages/settings/role.jsx`）：

```javascript
// pages/settings/user.jsx
import { transferPost } from '@/services';
import { getPagePermissions } from '@/utils/usePermission';

const PageName = '用户管理';

// 1. 定义页面使用的接口映射
const URL_M = {
    list: 'setting.userList',           // 列表接口
    store: 'setting.userStore',         // 添加/修改接口
    info: 'setting.userInfo',           // 详情接口
    delete: 'setting.userDelete',       // 删除接口
};

// 2. 导出 handle 配置（供系统自动收集）
export const handle = {
    // 页面固定标识（不会因路由改变而改变）
    pageKey: 'settings.user',
    
    // 页面名称
    title: PageName,
    
    // 权限与接口的绑定关系
    permission: {
        list: { apis: [URL_M.list], title: '列表' },                    // 页面访问权限
        store: { apis: [URL_M.store, URL_M.info], title: '添加、修改' }, // 添加/修改功能权限
        delete: { apis: [URL_M.delete], title: '删除' },                // 删除功能权限
    },
    
    // 菜单配置（用于自动生成导航菜单和面包屑）
    menu: {
        title: PageName,
        icon: 'user',             // 图标名称
        order: 1,                 // 排序
        level_1: 'settings',      // 一级菜单 key
        level_2: 'settings.system', // 二级菜单 key（可选）
        path: '/settings/user',   // 路径
        show: true,               // 是否在导航菜单中显示
    },
};

// 3. 页面组件
export default function UserPage() {
  // 获取当前用户对本页面的权限
  const authorized = getPagePermissions();
  
  return (
    <div className="p-8">
      {/* 根据权限显示功能按钮 */}
      {authorized['store'] && <Button>新建用户</Button>}
      
      {/* 表格内容 */}
      <div>用户列表...</div>
    </div>
  );
}
```

**权限配置说明：**

- `pageKey`: 页面唯一标识，用于权限判断
- `title`: 页面名称，用于显示
- `permission`: 定义页面的各项功能权限
  - key（如 `list`、`store`）: 权限标识
  - `apis`: 该权限关联的后端接口列表
  - `title`: 权限说明
- `menu`: 菜单配置
  - `level_1`: 一级菜单（顶部导航）
  - `level_2`: 二级菜单（侧边栏分组，可选）
  - `show`: 是否在菜单中显示（详情页可设为 false）

#### 权限系统工作原理

1. **权限收集**：系统启动时，自动扫描所有页面的 `handle.permission` 配置，收集所有权限和对应的 API
2. **权限分配**：管理员在"角色管理"页面为不同角色分配权限（选择接口）
3. **权限判断**：前端通过 `getPagePermissions()` 获取当前用户对当前页面的权限
4. **菜单过滤**：导航系统根据用户权限自动过滤菜单，只显示有权限的菜单项

```javascript
// 使用示例
import { getPagePermissions } from '@/utils/usePermission';

function MyPage() {
  const authorized = getPagePermissions();
  
  // authorized 是一个对象，key 对应 handle.permission 中定义的权限标识
  // 值为 true/false，表示当前用户是否有该权限
  console.log(authorized);
  // 输出: { list: true, store: true, delete: false }
  
  return (
    <div>
      {authorized['store'] && <Button>只有 store 权限的用户才能看到</Button>}
    </div>
  );
}
```

### 3. 导航系统

#### 导航层级

项目使用三级导航结构：
1. **顶部导航（Level 1）** - 大模块分类
2. **侧边栏导航（Level 2）** - 功能分组
3. **页面内容** - 具体功能

#### 配置菜单枚举

编辑 `app/utils/enumMenu.js`：

```javascript
// 一级菜单
export const Level1Map = {
  setting: {
    title: '系统设置',
    icon: 'setting',
    show: true,  // 是否显示
  },
  // ... 更多菜单
};

// 二级菜单
export const Level2Map = {
  user: {
    title: '用户管理',
    icon: 'user',
  },
  // ... 更多菜单
};
```

#### 导航组件使用

```javascript
import Navigation from "@/components/Navigation";

<Navigation handle={handle} />
```

### 4. SVG 图标系统

项目支持两种 SVG 使用方式：

#### 方式一：雪碧图（推荐）

将 SVG 文件放在 `app/icons/` 目录下：

```jsx
import Icon from "@/components/Icon";

<Icon name="home" size={24} />
<Icon name="user" size={20} color="#1890ff" />
```

#### 方式二：React 组件

```jsx
import HomeIcon from "@/assets/home.png";

<img src={HomeIcon} alt="Home" width={24} />
```

---

## 🧩 组件使用

### JTable - 高性能数据表格

基于 AG-Grid Enterprise 封装的表格组件。

#### 基础用法

```jsx
import JTable from '@/components/JTable';
import { useRef } from 'react';

function MyPage() {
  const tableRef = useRef();
  
  const columnDefs = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: '姓名', flex: 1 },
    { field: 'email', headerName: '邮箱', flex: 1 },
    { field: 'age', headerName: '年龄', width: 80 },
  ];
  
  const rowData = [
    { id: 1, name: '张三', email: 'zhang@example.com', age: 28 },
    { id: 2, name: '李四', email: 'li@example.com', age: 32 },
  ];
  
  return (
    <JTable
      ref={tableRef}
      name="用户列表"              // 表格名称（导出文件名）
      tbKey="user-table"          // 唯一标识（保存列配置）
      columnCus={columnDefs}      // 列定义
      rowData={rowData}           // 数据
      loading={false}             // 加载状态
      isSearch={true}             // 显示搜索框
      isDownLoad={true}           // 显示导出按钮
      autoColumnWidth={false}     // 自适应列宽
    />
  );
}
```

#### 高级功能

```jsx
<JTable
  ref={tableRef}
  columnCus={columnDefs}
  rowData={rowData}
  
  // 自定义搜索栏
  searchBar={
    <Space>
      <Input placeholder="搜索..." />
      <Button type="primary">查询</Button>
    </Space>
  }
  
  // 导出格式化
  formatCus={{
    status: (params) => params.value === 1 ? '启用' : '禁用',
    createTime: (params) => dayjs(params.value).format('YYYY-MM-DD'),
  }}
  
  // 汇总行处理
  totalNextTick={(total, dataList) => ({
    name: `共 ${dataList.length} 条`,
    amount: total.amount,
  })}
  
  // 自定义上下文
  context={{
    onEdit: (row) => console.log('编辑', row),
    onDelete: (row) => console.log('删除', row),
  }}
/>
```

#### 列定义示例

```javascript
const columnDefs = [
  {
    field: 'name',
    headerName: '姓名',
    flex: 1,
    pinned: 'left',           // 固定列
  },
  {
    field: 'status',
    headerName: '状态',
    cellRenderer: (params) => {
      return params.value === 1 ? 
        <Tag color="green">启用</Tag> : 
        <Tag color="red">禁用</Tag>;
    },
  },
  {
    field: 'actions',
    headerName: '操作',
    cellRenderer: (params) => (
      <Space>
        <Button size="small" onClick={() => params.context.onEdit(params.data)}>
          编辑
        </Button>
        <Button size="small" danger onClick={() => params.context.onDelete(params.data)}>
          删除
        </Button>
      </Space>
    ),
  },
];
```

#### 表格 API

```javascript
const tableRef = useRef();

// 调用表格方法
tableRef.current.tableApi.setGridOption('quickFilterText', '搜索文本');
tableRef.current.autoSizeColumns();  // 自动调整列宽

// 获取数据
const selectedRows = tableRef.current.tableApi.getSelectedRows();
const allData = [];
tableRef.current.tableApi.forEachNode(node => allData.push(node.data));
```

### DataSelect - 数据选择器

数据选择下拉组件（支持远程搜索）。

```jsx
import DataSelect from '@/components/DataSelect';

<DataSelect
  value={value}
  onChange={setValue}
  placeholder="请选择"
  api="api.getUserList"      // API 地址
  searchKey="keyword"        // 搜索参数名
  labelKey="name"            // 显示字段
  valueKey="id"              // 值字段
/>
```

### QuickLogin - 快速登录

弹窗式登录组件。

```javascript
import { login } from '@/components/QuickLogin';

// 显示登录弹窗
login.show();

// 隐藏登录弹窗
login.hide();

// 在登录成功后
login.hide();
userActions.setUser(userData);
```

---

## 🔌 API 服务

### API 定义

在 `app/services/` 目录下定义 API：

```javascript
// app/services/api.js
export default {
    getUserInfo: {
        url: '/api/user/info',
    },
    getUserList: {
        url: '/api/user/list',
    },
    logout: {
        url: '/api/user/logout',
    },
}
```

### 调用 API

使用 `transferPost` 统一调用：

```javascript
import { transferPost } from '@/services';

// 调用 API
const res = await transferPost('api.getUserInfo', {
  userId: 123,
});

if (res?.code === 200) {
  console.log('用户信息:', res.data);
}
```

### 直接使用 request

```javascript
import { post } from '@/utils/request';

// POST 请求
const res = await post('/api/user/login', {
  username: 'admin',
  password: '123456',
});

// 自定义请求
import request from '@/utils/request';

const res = await request('/api/user/info', {
  method: 'GET',
});
```

### 请求拦截

请求自动处理：
- ✅ Token 自动附加
- ✅ 错误统一处理
- ✅ 登录过期自动跳转
- ✅ 成功/失败通知

错误码处理：
- `2012/2013` - 登录过期，清除用户信息
- `其他错误` - 显示错误通知

---

## 📦 状态管理

### Valtio 基础

项目使用 Valtio 进行状态管理，它是一个轻量级的响应式状态库。

#### 创建 Store

```javascript
// store/myStore.js
import { proxy, useSnapshot } from "valtio";

// 创建状态
const state = proxy({
  count: 0,
  user: null,
});

// 导出 Hook（在组件中使用）
export const useMyStore = () => {
  const snap = useSnapshot(state);
  
  return {
    count: snap.count,
    user: snap.user,
    
    increment() {
      state.count++;
    },
    
    setUser(user) {
      state.user = user;
    },
  };
};

// 导出 Actions（在任何地方使用）
export const myActions = {
  reset() {
    state.count = 0;
    state.user = null;
  },
};
```

#### 在组件中使用

```javascript
import { useMyStore } from '@/store/myStore';

function MyComponent() {
  const { count, user, increment, setUser } = useMyStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

#### 在非组件中使用

```javascript
import { myActions } from '@/store/myStore';

// 在 API 回调、事件处理等地方
myActions.reset();
```

---

## 🛠️ 开发指南

### 添加新页面

1. **创建页面组件**

```javascript
// app/pages/my-page.jsx
import { transferPost } from '@/services';
import { getPagePermissions } from '@/utils/usePermission';

const PageName = '我的页面';

// 1. 定义页面使用的接口
const URL_M = {
    list: 'api.myList',           // 列表接口
    store: 'api.myStore',         // 添加/修改接口
    info: 'api.myInfo',           // 详情接口
    delete: 'api.myDelete',       // 删除接口
};

// 2. 导出页面元信息和权限配置
export const handle = {
    // 页面固定标识（不会因路由改变而改变）
    pageKey: 'my.page',
    
    // 页面名称
    title: PageName,
    
    // 权限与接口的绑定关系（系统会自动收集）
    permission: {
        list: { apis: [URL_M.list], title: '列表' },                    // 页面访问权限
        store: { apis: [URL_M.store, URL_M.info], title: '添加、修改' }, // 添加/修改功能权限
        delete: { apis: [URL_M.delete], title: '删除' },                // 删除功能权限
    },
    
    // 菜单配置（用于自动生成导航菜单和面包屑）
    menu: {
        title: PageName,
        icon: 'home',             // 图标名称（对应 app/icons/ 下的 SVG 文件）
        order: 10,                // 排序（数字越小越靠前）
        level_1: 'setting',       // 一级菜单 key
        level_2: 'my',            // 二级菜单 key（可选）
        path: '/my-page',         // 页面路径
        show: true,               // 是否在导航菜单中显示（默认 true）
    },
};

// 3. 页面组件
export default function MyPage() {
  // 获取当前用户对本页面的权限
  const authorized = getPagePermissions();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-yy-900 mb-4">{PageName}</h1>
      
      <div className="bg-yy-100 rounded-lg p-6">
        {/* 根据权限显示不同内容 */}
        {authorized['list'] && <p>有列表权限</p>}
        {authorized['store'] && <button>添加</button>}
        {authorized['delete'] && <button>删除</button>}
      </div>
    </div>
  );
}
```

2. **添加路由**

编辑 `app/routes.js`：

```javascript
export default [
    layout('layout/basic.jsx', [
        // ... 其他路由
        route('/my-page', 'pages/my-page.jsx'),
    ]),
]
```

3. **添加菜单枚举**（如需要）

编辑 `app/utils/enumMenu.js`：

```javascript
export const Level2Map = {
  my: {
    title: '我的模块',
    icon: 'home',
  },
  // ... 其他菜单
};
```

### 添加新 API

1. **定义 API**

编辑 `app/services/api.js`：

```javascript
export default {
    // ... 其他 API
    getMyData: {
        url: '/api/my/data',
    },
}
```

2. **调用 API**

```javascript
import { transferPost } from '@/services';

const res = await transferPost('api.getMyData', { id: 123 });
```

### 样式开发规范

#### 使用 Tailwind 类名

```jsx
// ✅ 推荐
<div className="bg-yy-100 text-yy-900 p-4 rounded-lg shadow-md">
  内容
</div>

// ❌ 避免内联样式
<div style={{ background: '#fff', padding: '16px' }}>
  内容
</div>
```

#### 响应式设计

```jsx
<div className="
  w-full              /* 移动端全宽 */
  md:w-1/2            /* 平板半宽 */
  lg:w-1/3            /* 桌面1/3宽 */
  p-4                 /* 默认内边距 */
  md:p-6              /* 平板加大内边距 */
  lg:p-8              /* 桌面更大内边距 */
">
  响应式内容
</div>
```

#### 主题适配

```jsx
{/* 自动适配亮色/暗色模式 */}
<div className="bg-yy-50 text-yy-900 border border-yy-300">
  自适应主题内容
</div>

{/* Ant Design 组件自动跟随主题 */}
<Button type="primary">按钮</Button>
```

### 添加 SVG 图标

1. 将 SVG 文件放入 `app/icons/` 目录
2. 在组件中使用：

```jsx
import Icon from '@/components/Icon';

<Icon name="my-icon" size={24} />
```

---

## 🚀 部署说明

### 构建应用

```bash
# 生产环境构建
yarn build:prod

# 构建产物位于 build/ 目录
```

### 部署到 Nginx

1. **构建应用**

```bash
yarn build:prod
```

2. **配置 Nginx**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/adclient/build/client;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理（可选）
    location /api/ {
        proxy_pass https://your-api-domain.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

3. **上传文件**

```bash
# 上传 build/client 目录到服务器
rsync -avz build/client/ user@server:/var/www/adclient/build/client/
```

4. **重启 Nginx**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 版本更新通知

项目内置版本检测功能，当新版本部署后：

1. 更新 `public/version.json`：
```json
{
  "version": "1.0.1"
}
```

2. 用户浏览器会每分钟检测一次
3. 发现新版本会弹出提示，引导用户刷新

### 环境变量

根据不同环境配置：

```javascript
// config/setting.js

// 开发环境
if (import.meta.env.MODE === 'development') {
  export default { target: 'http://localhost:3000/' };
}

// 预发布环境
if (import.meta.env.MODE === 'staging') {
  export default { target: 'https://staging.example.com/' };
}

// 生产环境
if (import.meta.env.MODE === 'production') {
  export default { target: 'https://api.example.com/' };
}
```

---

## ❓ 常见问题

### 1. 如何修改开发端口？

编辑 `vite.config.js`：

```javascript
export default defineConfig({
  server: {
    port: 9000,  // 修改为你想要的端口
  },
})
```

### 2. 如何配置后端 API 地址？

编辑 `config/setting.js`：

```javascript
export default {
    target: 'https://your-api-domain.com/',
}
```

### 3. Token 如何存储？

Token 存储在 `localStorage` 中：

```javascript
// 存储
localStorage.setItem('token', 'your-token');

// 获取
const token = localStorage.getItem('token');

// 清除
localStorage.removeItem('token');
```

每次请求会自动附加 Token。

### 4. 如何自定义主题颜色？

编辑 `app/app.css`：

```css
:root {
  --color-primary-500: #3b82f6;  /* 修改品牌色 */
}

.dark {
  --color-primary-500: #60a5fa;  /* 暗色模式品牌色 */
}

@theme {
  --color-primary-500: var(--color-primary-500);
}
```

### 5. 如何禁用 Mock 数据？

编辑 `vite.config.js`：

```javascript
viteMockServe({
  mockPath: "mock",
  enable: false,  // 设置为 false 禁用 Mock
})
```

### 6. 表格列配置如何保存？

给 JTable 组件设置 `tbKey` 属性：

```jsx
<JTable tbKey="my-table" ... />
```

列的显示/隐藏、固定、顺序会自动保存到 `localStorage`。

### 7. 如何处理跨域问题？

开发环境使用 Vite 代理（已配置）。

生产环境：
- 方案 1：后端配置 CORS
- 方案 2：Nginx 反向代理（推荐）

### 8. 如何集成新的 Ant Design 组件？

直接导入使用，主题会自动适配：

```jsx
import { DatePicker, Modal, Tabs } from 'antd';

<DatePicker />
<Modal>...</Modal>
<Tabs>...</Tabs>
```

### 9. 如何优化表格性能？

```jsx
<JTable
  rowData={data}
  
  // 1. 使用虚拟滚动（AG-Grid 默认启用）
  
  // 2. 禁用不需要的功能
  cellRendererSelector={false}
  
  // 3. 使用服务端分页
  // 见 app/components/JTable/server.jsx
/>
```

### 10. 如何添加权限控制？

```javascript
// 1. 在页面中定义接口和权限配置
const URL_M = {
    list: 'api.list',
    store: 'api.store',
    delete: 'api.delete',
};

export const handle = {
    pageKey: 'my.page',
    title: '我的页面',
    
    // 定义权限与接口的绑定关系
    permission: {
        list: { apis: [URL_M.list], title: '列表' },
        store: { apis: [URL_M.store], title: '添加、修改' },
        delete: { apis: [URL_M.delete], title: '删除' },
    },
    
    menu: { /* ... */ },
};

// 2. 在组件中获取并使用权限
import { getPagePermissions } from '@/utils/usePermission';
import { Button, Space } from 'antd';

function MyComponent() {
  // 获取当前页面的权限对象
  const authorized = getPagePermissions();
  
  // authorized 对象格式：
  // {
  //   list: true/false,    // 是否有列表权限
  //   store: true/false,   // 是否有添加/修改权限
  //   delete: true/false,  // 是否有删除权限
  // }
  
  return (
    <div>
      {/* 根据权限显示功能 */}
      {authorized['store'] && <Button type="primary">新建</Button>}
      
      <Space>
        {authorized['store'] && <a>编辑</a>}
        {authorized['delete'] && <a>删除</a>}
      </Space>
    </div>
  );
}

// 3. 完整示例（参考 role.jsx）
const Page = () => {
    const authorized = getPagePermissions();
    
    // 根据权限决定是否显示按钮
    const searchBar = useMemo(() => 
        authorized['store'] && <Button>新建</Button>, 
        [authorized]
    );
    
    // 根据权限决定表格列
    const columnCus = useMemo(() => {
        let col = [
            { headerName: '名称', field: 'name' },
            { headerName: '状态', field: 'status' },
        ];
        
        // 有权限才显示操作列
        if (authorized['store'] || authorized['delete']) {
            col.push({
                headerName: '操作',
                field: 'action',
                cellRenderer: (params) => (
                    <Space>
                        {authorized['store'] && <a>编辑</a>}
                        {authorized['delete'] && <a>删除</a>}
                    </Space>
                ),
            });
        }
        
        return col;
    }, [authorized]);
    
    return <Table columns={columnCus} />;
};
```

---

## 📞 技术支持

- **项目地址**: e:\adclient
- **开发端口**: http://localhost:9000
- **构建命令**: `yarn build:prod`

---

## 📝 更新日志

### v1.0.0 (当前版本)

- ✅ 完成基础架构搭建
- ✅ 实现用户认证与权限管理
- ✅ 集成 AG-Grid 表格组件
- ✅ 实现主题切换功能
- ✅ 完善导航系统
- ✅ 添加版本检测功能

---

## 📄 许可证

Private

---

**祝你使用愉快！如有问题，请查阅本文档或联系开发团队。** 🎉
