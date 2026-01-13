import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";

// 获取初始主题 - 避免 hydration 不匹配
const getInitialTheme = () => {
  // 在服务端或首次渲染时，默认为 light
  if (typeof document === 'undefined') {
    return 'light';
  }
  // 在客户端，从 HTML class 读取（由内联脚本设置）
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

// 创建主题状态
const state = proxy({
  theme: getInitialTheme(),
  isInitialized: false,
});

export const useThemeStore = () => {
  const snap = useSnapshot(state);
  
  // 在客户端挂载后同步状态
  useEffect(() => {
    if (!state.isInitialized) {
      state.theme = getInitialTheme();
      state.isInitialized = true;
    }
  }, []);
  
  return {
    theme: snap.theme,
    isDark: snap.theme === "dark",
    
    // 切换主题
    toggleTheme() {
      if (typeof window === 'undefined') return;
      
      const newTheme = state.theme === "light" ? "dark" : "light";
      
      // 使用 View Transitions API 实现平滑过渡（如果浏览器支持）
      const updateTheme = () => {
        state.theme = newTheme;
        
        // 保存到 localStorage
        try {
          localStorage.setItem("theme", newTheme);
        } catch (e) {
          console.warn('Failed to save theme to localStorage:', e);
        }
        
        // 更新 document 类名（用于 Tailwind）
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };
      
      // 检查是否支持 View Transitions API
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(() => updateTheme());
      } else {
        updateTheme();
      }
    },
    
    // 设置主题
    setTheme(theme) {
      if (typeof window === 'undefined') return;
      if (theme !== "light" && theme !== "dark") return;
      
      // 使用 View Transitions API 实现平滑过渡（如果浏览器支持）
      const updateTheme = () => {
        state.theme = theme;
        
        try {
          localStorage.setItem("theme", theme);
        } catch (e) {
          console.warn('Failed to save theme to localStorage:', e);
        }
        
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };
      
      // 检查是否支持 View Transitions API
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(() => updateTheme());
      } else {
        updateTheme();
      }
    },
  };
};
