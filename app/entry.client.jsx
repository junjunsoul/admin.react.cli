import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

window.sysTitle = 'React App'
// 关闭严格模式，避免双重渲染
ReactDOM.hydrateRoot(
  document,
  <HydratedRouter />
);