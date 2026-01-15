import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * KeepAlive Context
 * 用于在组件中监听缓存状态变化
 */
const KeepAliveContext = createContext({
  active: true,
  currentKey: '',
});

export const KeepAliveProvider = KeepAliveContext.Provider;

/**
 * 获取 KeepAlive 上下文
 */
export function useKeepAliveContext() {
  return useContext(KeepAliveContext);
}

/**
 * 监听页面激活/失活的 Hook（类似 Vue 的 activated/deactivated）
 * 
 * @param {Function} onActivated - 页面从缓存中恢复时的回调
 * @param {Function} onDeactivated - 页面被隐藏到缓存时的回调
 * 
 * @example
 * function MyPage() {
 *   useKeepAliveEffect(
 *     () => {
 *       console.log('页面从缓存中恢复，重新请求数据');
 *       fetchData();
 *     },
 *     () => {
 *       console.log('页面被隐藏到缓存');
 *     }
 *   );
 * }
 */
export function useKeepAliveEffect(onActivated, onDeactivated) {
  const { active } = useKeepAliveContext();
  const isFirstMount = useRef(true);
  const prevActive = useRef(active);

  useEffect(() => {
    // 跳过首次挂载
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevActive.current = active;
      return;
    }

    // 从隐藏变为激活
    if (!prevActive.current && active) {
      onActivated?.();
    }

    // 从激活变为隐藏
    if (prevActive.current && !active) {
      onDeactivated?.();
    }

    prevActive.current = active;
  }, [active, onActivated, onDeactivated]);
}

/**
 * 仅在页面激活时执行的 Hook
 * 
 * @param {Function} callback - 页面激活时的回调
 * @param {Array} deps - 依赖数组
 * 
 * @example
 * function MyPage() {
 *   const [data, setData] = useState([]);
 *   
 *   // 每次页面从缓存恢复时重新请求数据
 *   useActivated(() => {
 *     fetchData().then(setData);
 *   }, []);
 * }
 */
export function useActivated(callback, deps = []) {
  const { active } = useKeepAliveContext();
  const isFirstMount = useRef(true);
  const prevActive = useRef(active);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevActive.current = active;
      return;
    }

    if (!prevActive.current && active) {
      callback?.();
    }

    prevActive.current = active;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...deps]);
}

/**
 * 仅在页面失活时执行的 Hook
 * 
 * @param {Function} callback - 页面失活时的回调
 * @param {Array} deps - 依赖数组
 * 
 * @example
 * function MyPage() {
 *   // 页面被隐藏时保存草稿
 *   useDeactivated(() => {
 *     saveDraft();
 *   }, [formData]);
 * }
 */
export function useDeactivated(callback, deps = []) {
  const { active } = useKeepAliveContext();
  const prevActive = useRef(active);

  useEffect(() => {
    if (prevActive.current && !active) {
      callback?.();
    }

    prevActive.current = active;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...deps]);
}

/**
 * 获取当前页面是否处于激活状态
 * 
 * @returns {boolean} 是否激活
 * 
 * @example
 * function MyPage() {
 *   const isActive = useIsActivated();
 *   
 *   return (
 *     <div>
 *       {isActive ? '当前页面激活' : '当前页面在缓存中'}
 *     </div>
 *   );
 * }
 */
export function useIsActivated() {
  const { active } = useKeepAliveContext();
  return active;
}
