import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { KeepAliveProvider } from './context';

/**
 * 路由级别的 KeepAlive 组件
 * 用于缓存路由组件，避免切换路由时组件被销毁
 * 
 * @param {Object} props
 * @param {Array<string>} props.include - 需要缓存的路由路径列表
 * @param {Array<string>} props.exclude - 不需要缓存的路由路径列表
 * @param {number} props.maxCache - 最大缓存数量，默认 10
 */
export default function KeepAliveOutlet({ include = [], exclude = [], maxCache = 10 }) {
  const location = useLocation();
  const element = useOutlet();
  const cacheRef = useRef(new Map());
  const cacheOrderRef = useRef([]);
  const scrollPositionRef = useRef(new Map()); // 保存每个路由的滚动位置
  const [, forceUpdate] = useState({});

  const currentPath = location.pathname;

  // 判断当前路由是否需要缓存
  const shouldCache = (path) => {
    // 如果在 exclude 中，不缓存
    if (exclude.length > 0 && exclude.some(p => path.startsWith(p))) {
      return false;
    }
    // 如果 include 为空，缓存所有路由
    if (include.length === 0) {
      return true;
    }
    // 如果在 include 中，缓存
    return include.some(p => path.startsWith(p));
  };

  const needCache = shouldCache(currentPath);

  // 管理缓存
  useEffect(() => {
    if (element && needCache) {
      if (!cacheRef.current.has(currentPath)) {
        // 新增缓存
        cacheRef.current.set(currentPath, element);
        cacheOrderRef.current.push(currentPath);

        // 如果超过最大缓存数量，删除最早的缓存
        if (cacheOrderRef.current.length > maxCache) {
          const oldestPath = cacheOrderRef.current.shift();
          cacheRef.current.delete(oldestPath);
          scrollPositionRef.current.delete(oldestPath); // 同时删除滚动位置
        }

        // 强制重新渲染以显示新缓存的组件
        forceUpdate({});
      } else {
        // 更新访问顺序
        const index = cacheOrderRef.current.indexOf(currentPath);
        if (index > -1) {
          cacheOrderRef.current.splice(index, 1);
          cacheOrderRef.current.push(currentPath);
        }
      }
    }
  }, [currentPath, element, needCache, maxCache]);

  // 实时保存滚动位置（监听滚动事件）
  useEffect(() => {
    if (!needCache) return;

    // 节流函数 - 避免频繁保存
    let timeoutId = null;
    const saveScrollPosition = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

        scrollPositionRef.current.set(currentPath, { scrollTop, scrollLeft });
      }, 50); // 50ms 节流
    };

    // 监听滚动事件
    window.addEventListener('scroll', saveScrollPosition, { passive: true });

    // 清理事件监听器（不再在离开时保存，因为此时滚动位置已经是0了）
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [currentPath, needCache]);

  // 恢复滚动位置（使用 useLayoutEffect 避免闪动）
  useLayoutEffect(() => {
    if (needCache && scrollPositionRef.current.has(currentPath)) {
      const position = scrollPositionRef.current.get(currentPath);
      // 使用 useLayoutEffect 在浏览器绘制前同步恢复滚动位置，避免闪动
      // 由于是从缓存恢复，DOM 是完整的，可以立即滚动
      setTimeout(() => {
        window.scrollTo(position.scrollLeft, position.scrollTop);
      }, 0);
    } else {
      // 新路由或不需要缓存的路由，滚动到顶部
      window.scrollTo(0, 0);
    }
  }, [currentPath, needCache]);

  const isCached = cacheRef.current.has(currentPath);

  // 渲染逻辑
  return (
    <>
      {/* 渲染所有缓存的组件 */}
      {Array.from(cacheRef.current.entries()).map(([pathname, cachedElement]) => {
        const isActive = pathname === currentPath;
        return (
          <KeepAliveProvider
            key={pathname}
            value={{
              active: isActive,
              currentPath: pathname
            }}
          >
            <div
              style={{
                display: isActive ? 'block' : 'none',
                height: '100%',
              }}
            >
              {cachedElement}
            </div>
          </KeepAliveProvider>
        );
      })}
      {/* 如果当前路由不在缓存中，直接渲染（首次访问 + 不需要缓存的路由） */}
      {!isCached && (
        <KeepAliveProvider value={{ active: true, currentPath }}>
          {element}
        </KeepAliveProvider>
      )}
    </>
  );
}

/**
 * 手动清除缓存的工具函数
 */
export function useClearCache() {
  // 可以通过 Context 或其他方式实现
  // 这里提供一个简单的实现思路
  return {
    clearCache: (pathname) => {
      // 清除指定路径的缓存
      console.log('清除缓存:', pathname);
    },
    clearAllCache: () => {
      // 清除所有缓存
      console.log('清除所有缓存');
    },
  };
}

// 导出生命周期 Hooks
export {
  useKeepAliveEffect,
  useActivated,
  useDeactivated,
  useIsActivated,
} from './context';
