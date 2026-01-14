import { useEffect, useRef } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import { ConfigProvider, App, Button } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/utils/theme";
import "./app.css";
// 导入SVG图标注册
import "virtual:svg-icons-register";

export function Layout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* 在 React 加载前初始化主题，避免闪烁 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                console.error = function (message, ...args) {
                    if (typeof message === 'string') {
                        if (message.includes('************************************************')) {
                            return // 直接忽略 ag-Grid 相关的警告
                        }
                        if (message.includes('ag-grid.com')) {
                            return
                        }
                        if (message.includes('* Your license key is not valid.')) {
                            return
                        }
                        if (message.includes('* All AG Grid Enterprise features are unlocked for trial.')) {
                            return
                        }
                    }
                }
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className="bg-yy-50 text-yy-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
function Page() {
  const { message, notification, modal } = App.useApp();
  const time = useRef(null)
  useEffect(() => {
    window.message = message
    window.notification = notification
    window.modal = modal
    if (!time.current) {
      time.current = setInterval(async () => {
        let res = await fetch('/version.json?t' + new Date().getTime())
        let data = await res.json();
        if (localStorage.getItem('version') != data.version) {
          notification.success({
            title: '有新内容',
            description: '请点击“刷新”按钮或者手动刷新页面',
            btn: <Button type="primary"
              onClick={() => {
                localStorage.setItem('version', data.version);
                window.location.reload(true);
              }}
            >刷新</Button>,
            duration: 0,
            key: 'renewalTip',
          });
        }
      }, 60000)
    }
    return () => {
      clearInterval(time.current)
      time.current = null
    }
  }, [])
  return <Outlet />
}
export default function Root() {
  const themeConfig = useThemeStore();
  // Ant Design 主题配置 - 根据当前主题选择对应的配置
  const antdTheme = themeConfig.isDark ? darkTheme : lightTheme;

  return <ConfigProvider theme={antdTheme} locale={zhCN}>
    <App>
      <Page />
    </App>
  </ConfigProvider>
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-yy-50 pt-16 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-yy-100 border border-yy-300 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-yy-900 mb-4">{message}</h1>
          <p className="text-lg text-yy-700 mb-6">{details}</p>
          {stack && (
            <div className="bg-yy-900 text-yy-50 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm">
                <code>{stack}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
