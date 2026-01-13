/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// View Transitions API 类型定义
interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
}

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
}