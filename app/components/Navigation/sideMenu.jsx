import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Button, Menu } from 'antd';
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default (props) => {
    const { list, level2, handle } = props;
    const [openKeys, setOpenKeys] = useState([level2]);
    const navigate = useNavigate();
    const { collapsed, toggleCollapsed } = useUserStore();
    const menuPathMap = useRef({})
    useEffect(()=>{
        setOpenKeys([level2]);
    },[level2])

    useEffect(()=>{
        list.map(row=>{
            if(row.children){
                return row.children
            }else{
                return row
            }
        }).flat(1).forEach(row=>{
            menuPathMap.current[row.key] = row.path;
        })
    },[list])
    const onClick = (item) => {
        navigate(menuPathMap.current[item.key]);
    }
    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    }
    let spreadWidth = collapsed ? 200 : 80
    return <div style={{ width: spreadWidth }} className={`fixed top-0 pt-16 z-50 h-dvh box-border transition-all duration-200 ease-in`}>
        <div className="h-full overflow-y-auto">
            {!collapsed?<Menu
                mode="inline"
                selectedKeys={[handle.pageKey]}
                key={'min'}
                className="min-h-full w-full pt-2!"
                inlineCollapsed={true}
                items={list}
                onClick={onClick}
            /> :<Menu
                mode="inline"
                selectedKeys={[handle.pageKey]}
                openKeys={openKeys}
                key={'max'}
                className="min-h-full w-full pt-2!"
                onOpenChange={onOpenChange}
                items={list}
                onClick={onClick}
            />}            
        </div>
        <Button size="small" className="!absolute top-1/2 -translate-y-1/2 -right-7 z-50 flex items-center justify-center" onClick={() => toggleCollapsed()} icon={!collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />} type="dashed" shape="circle" />
    </div>
}