import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgr from "vite-plugin-svgr";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
import { fileURLToPath } from "url";
import config from './config/proxy'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    // host: true,
    port: 9000,
    proxy: config['dev']
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    // SVG 雪碧图- 用于 <SvgIcon name="xxx" /> 方式
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件
      iconDirs: [path.resolve(process.cwd(), "app/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      // 注入位置
      inject: "body-last",
      // 自定义插入位
      customDomId: "__svg__icons__dom__",
    }),
    // SVG 作为 React 组件插件 - 用于 import Icon from './icon.svg' 方式
    svgr({
      // 包含所有的 svg 文件
      include: "**/*.svg",
    }),
    // Mock 数据插件
    viteMockServe({
      mockPath: "mock", // 指定mock文件存放的目录
      enable: true, // 是否启用mock功能
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  // 优化依赖配置 - 排除 FFmpeg 相关包（使用了 Web Workers）
  optimizeDeps: {
    exclude: [
      '@ffmpeg/ffmpeg',
      '@ffmpeg/util'
    ]
  },
  build: {

  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 可以在这里添加全局的less变量文件
        // additionalData: `@import "${path.resolve(__dirname, 'app/styles/variables.less')}";`
      },
    },
  },
});
