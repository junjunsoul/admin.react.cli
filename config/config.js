import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy';
export default defineConfig({
  mako: {},
  antd: {},
  dva: {
      hmr: true,
  },
  locale: {
      default: 'zh-CN',
      antd: true,
      baseNavigator: true,
  },
  alias: {},
  icons: {},
  routes,
  proxy: proxy['dev'],
  npmClient: 'npm',
});

