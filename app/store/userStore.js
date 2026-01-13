import { proxy, useSnapshot } from "valtio";
import { isEmpty } from "lodash";
import { login } from '@/components/QuickLogin'
import { transferPost } from '@/services'
// 创建用户状态
const state = proxy({
  user: null,
  isLoggedIn: false,
  theme: "light",
  permissions: [],
  collapsed: true,
  isInitialized: false,
});

export const useUserStore = () => {
  const snap = useSnapshot(state);

  return {
    user: snap.user,
    theme: snap.theme,
    permissions: snap.permissions,
    isInitialized: snap.isInitialized,
    collapsed: snap.collapsed,
    setIsInitialized(isInitialized) {
      state.isInitialized = isInitialized;
    },
    toggleCollapsed() {
      state.collapsed = !state.collapsed;
    },
    checkLogin() {
      if (!isEmpty(snap.user)) {
        return true
      } else {
        login.show()
        return false
      }
    },

    async logout() {
      const res = await transferPost('api.logout', {})
      if (res?.code == 200) {
        localStorage.removeItem('token')
        state.user = {}
        state.permissions = [];
      }
    },

    async clear() {
      localStorage.removeItem('token')
      state.user = {}
      state.permissions = [];
    },

    async fetchCurrent() {
      if (localStorage.getItem('token')) {
        const res = await transferPost('api.getUserInfo', {})
        if (res?.code == 200) {
          const { user, permissions } = res.data;
          state.user = user;
          state.permissions = permissions;
        } else {
          localStorage.removeItem('token')
          setTimeout(() => {
            state.user = {}
            state.permissions = []
          }, 100)
        }
      } else {
        state.user = {}
        state.permissions = [];
      }
      state.isInitialized = true
    },

    // 切换主题
    toggleTheme() {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    // 设置主题
    setTheme(theme) {
      state.theme = theme;
    },
  };
};

// 导出工具函数（不是 hook，可以在任何地方使用）
export const userActions = {
  // 清除用户信息
  clearUser() {
    state.user = null;
    state.permissions = [];
    localStorage.removeItem('token');
  },

  // 设置用户信息
  setUser(user) {
    state.user = user;
  },

  // 设置权限
  setPermissions(permissions) {
    state.permissions = permissions;
  },
  // 获取权限
  getPermissions() {
    return state.permissions;
  },
  // 检查是否登录
  isLoggedIn() {
    return !isEmpty(state.user) && state.isInitialized;
  }
};