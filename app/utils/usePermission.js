import { useMatches } from 'react-router';
import { getPath } from '@/services';
import { isEmpty } from 'lodash';
import { userActions } from '@/store/userStore';
/**
 * 获取当前页面的权限配置
 * @param {string[]} userApis - 用户拥有的接口列表
 * @returns {object} 权限配置
 * @returns {boolean} hasPermission - 是否有权限
 * @returns {boolean} canAccess - 是否可访问
 */
export function usePagePermissions(userApis = []) {
    const matches = useMatches();
    const handle = matches[matches.length - 1]?.handle;
    if (!handle) {
        return {
            hasPermission: () => true,
            canAccess: true,
        };
    }

    return {
        // 检查是否有某个功能权限
        hasPermission: (action) => {
            return checkPagePermission(handle, action, userApis);
        },

        // 当前页面是否可访问
        canAccess: checkPagePermission(handle, 'list', userApis),
    };
}
/**
 * 获取当前页面的权限配置
 * @returns {object} 权限配置
 */
export function getPagePermissions() {
    const permissions = userActions.getPermissions();
    const matches = useMatches();
    const handle = matches[matches.length - 1]?.handle;
    if (!handle) {
        return false;
    }
    let temp = {}
    if (handle.permission) {
        Object.keys(handle.permission).forEach(key => {
            temp[key] = checkPagePermission(handle, key, permissions);
        });
    }
    return temp;
}
/**
 * 检查页面权限
 * @param {object} handle - 页面handle配置
 * @param {string} action - 功能标识（list/store/auth 等）
 * @param {string[]} userApis - 需要的接口列表
 * @returns {boolean}
 */
export function checkPagePermission(handle, action = 'list', userApis = []) {
    // 获取该功能需要的接口列表
    const apiUrls = handle?.permission?.[action]?.apis;
    if (isEmpty(apiUrls)) return true;

    // 检查权限
    return hasApiPermission(apiUrls, userApis);
}

/**
 * 检查接口权限
 * @param {string[]} apis - 需要的接口列表
 * @param {string[]} userApis - 用户拥有的接口列表
 * @returns {boolean}
 */
export function hasApiPermission(apis, userApis) {
    // 🔑 超级管理员拥有所有权限
    if (userApis.length === 1 && userApis[0] === '*') {
        return true;  // 直接通过
    }

    // 普通用户需要逐一检查
    const requiredApis = Array.isArray(apis) ? apis : [apis];
    return requiredApis.every(api =>
        userApis.some(userApi =>
            userApi?.toLowerCase() === getPath(api)?.toLowerCase()
        )
    );
}

/**
 * 获取菜单权限
 * @param {object[]} handles - 路由handles配置
 * @param {string[]} userApis - 用户拥有的接口列表
 * @returns {object[]} 菜单权限
 */
export function getMenuHandles(handles, userApis) {
    return handles.filter(handle => {
        if (handle?.menu?.show === false) return false;
        if (handle.needLogin === false) return false;
        return checkPagePermission(handle, 'list', userApis);
    });
}