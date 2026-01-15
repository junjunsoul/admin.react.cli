import { useRef, useLayoutEffect } from 'react';
import { useLocation, useOutlet, useMatches } from 'react-router';
import { KeepAliveProvider } from './context';

/**
 * 路由级别的 KeepAlive 组件
 * 用于缓存路由组件，避免切换路由时组件被销毁
 * 
 * 特性：
 * - 页面激活时自动播放切入动画（淡入 + 轻微上移）
 * - 离开时不播放动画，直接隐藏
 * - 动画样式定义在 app/app.css 中
 * 
 */
const MAX_CACHE = 10;

export default function KeepAliveOutlet() {
  const location = useLocation();
  const element = useOutlet();
  const matches = useMatches();
  const cacheRef = useRef(new Map());
  const cacheOrderRef = useRef([]);
  const scrollPositionRef = useRef(new Map()); // 保存每个路由的滚动位置
  const cacheAllRef = useRef(new Map());// 保存所有进来过的路由
  
  // 获取当前路由的 handle 配置
  const currentHandle = matches[matches.length - 1]?.handle;
  const currentPath = location.pathname;
  const currentKey = currentHandle?.pageKey;
  const needCache = currentHandle?.keepAlive === true && Boolean(currentKey);
  // 在渲染前添加缓存，避免重复渲染
  if (element && needCache && !cacheRef.current.has(currentKey)) {
    // 新增缓存
    cacheRef.current.set(currentKey, element);
    cacheOrderRef.current.push(currentKey);

    // 如果超过最大缓存数量，删除最早的缓存
    if (cacheOrderRef.current.length > MAX_CACHE) {
      const oldestKey = cacheOrderRef.current.shift();
      cacheRef.current.delete(oldestKey);
      scrollPositionRef.current.delete(oldestKey); // 同时删除滚动位置
    }
  }

  useLayoutEffect(() => {
    cacheAllRef.current.set(currentPath, true);
  }, [currentPath])

  // 更新访问顺序
  useLayoutEffect(() => {
    if (needCache && cacheRef.current.has(currentKey)) {
      const index = cacheOrderRef.current.indexOf(currentKey);
      if (index > -1) {
        cacheOrderRef.current.splice(index, 1);
        cacheOrderRef.current.push(currentKey);
      }
    }
  }, [currentKey, needCache]);

  // 实时保存滚动位置（监听滚动事件）
  useLayoutEffect(() => {
    if (!needCache) return;

    // 节流函数 - 避免频繁保存
    let timeoutId = null;
    const saveScrollPosition = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

        scrollPositionRef.current.set(currentKey, { scrollTop, scrollLeft });
      }, 50); // 50ms 节流
    };

    // 监听滚动事件
    window.addEventListener('scroll', saveScrollPosition, { passive: true });

    // 清理事件监听器（不再在离开时保存，因为此时滚动位置已经是0了）
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [currentKey, needCache]);

  // 恢复滚动位置（使用 useLayoutEffect 避免闪动）
  useLayoutEffect(() => {
    if (needCache && scrollPositionRef.current.has(currentKey)) {
      const position = scrollPositionRef.current.get(currentKey);
      // 使用 useLayoutEffect 在浏览器绘制前同步恢复滚动位置，避免闪动
      // 由于是从缓存恢复，DOM 是完整的，可以立即滚动
      setTimeout(() => {
        window.scrollTo(position.scrollLeft, position.scrollTop);
      }, 0);
    } else {
      // 新路由或不需要缓存的路由，滚动到顶部
      window.scrollTo(0, 0);
    }
  }, [currentKey, needCache]);

  const isCached = needCache && cacheRef.current.has(currentKey);
  const hasLoaded = cacheAllRef.current.has(currentPath);
  // 渲染逻辑
  return (
    <>
      {/* 渲染所有缓存的组件 */}
      {Array.from(cacheRef.current.entries()).map(([cacheKey, cachedElement]) => {
        const isActive = cacheKey === currentKey;
        return (
          <KeepAliveProvider
            key={cacheKey}
            value={{
              active: isActive,
              currentKey: cacheKey
            }}
          >
            <div
              className={isActive&&!hasLoaded ? 'page-enter' : ''}
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
        <KeepAliveProvider value={{ active: true, currentKey }}>
          <div
            className={!hasLoaded ? 'page-enter' : ''}
            style={{ height: '100%' }}
          >
            {element}
          </div>
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
