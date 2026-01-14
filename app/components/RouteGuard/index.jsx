import { useEffect, useState,memo } from 'react';
import { Result } from 'antd';
import { useUserStore } from '@/store/userStore';
import { usePagePermissions } from '@/utils/usePermission';
import { Outlet } from 'react-router'
import KeepAliveOutlet from '@/components/KeepAlive';
import { keepAliveInclude, keepAliveExclude, maxCacheCount } from '@/utils/keepAliveConfig';

export default memo(({ handle, enableKeepAlive = false }) => {
    const { permissions } = useUserStore();
    const { canAccess } = usePagePermissions(permissions);
    if (handle?.needLogin !== false) {
        if (!canAccess) {
            return <Result status="403" title="无权限访问" />;
        }        
    }
    
    // 如果启用了 KeepAlive，使用 KeepAliveOutlet
    if (enableKeepAlive) {
        return <KeepAliveOutlet 
            include={keepAliveInclude}
            exclude={keepAliveExclude}
            maxCache={maxCacheCount}
        />;
    }
    
    return <Outlet />;
})