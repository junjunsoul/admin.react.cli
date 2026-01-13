import { useEffect, useState,memo } from 'react';
import { Result } from 'antd';
import { useUserStore } from '@/store/userStore';
import { usePagePermissions } from '@/utils/usePermission';
import { Outlet } from 'react-router'
export default memo(({ handle }) => {
    const { permissions } = useUserStore();
    const { canAccess } = usePagePermissions(permissions);
    if (handle?.needLogin !== false) {
        if (!canAccess) {
            return <Result status="403" title="无权限访问" />;
        }        
    }
    return <Outlet />;
})