
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useMatches } from 'react-router';
import { useUserStore } from '@/store/userStore';
import RouteGuard from "@/components/RouteGuard";
import Navigation from "@/components/Navigation";
export default () => {
    const matches = useMatches();
    const handle = matches[matches.length - 1]?.handle;
    const { checkLogin, isInitialized, fetchCurrent } = useUserStore();

    if (handle) {
        //需要登录
        if (handle.needLogin !== false) {
            if (isInitialized) {
                if (!checkLogin()) {
                    return null;
                }
            } else {
                fetchCurrent()
                return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size="large" /></div>;
            }
        }
        //不显示导航菜单
        if (handle.showNavMenu === false || handle.needLogin === false) {
            return <>
                <RouteGuard handle={handle} />
            </>
        }
    } else {
        return <RouteGuard handle={handle} />
    }
    return <>
        <Navigation handle={handle} />
        <div style={{ paddingTop: 64 }} className={`transition-all duration-300 ease-in-out`}>
            <RouteGuard handle={handle} enableKeepAlive={true} />
        </div>
    </>
}