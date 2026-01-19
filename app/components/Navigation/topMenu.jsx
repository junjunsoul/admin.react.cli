import { useState, useMemo, Fragment } from "react";
import {
    Link,
} from "react-router";
import RightContent from './components/RightContent';
import { ExternalLink } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import logo from '@/assets/logo.png';
import { chunk } from 'lodash';
const MenuItem = (props) => {
    const { items, pageKey } = props;
    const list = useMemo(() => {
        let noChildrenItems = items.filter(row => !row.children);
        let childrenItems = items.filter(row => row.children);
        let arr = [];
        if (noChildrenItems.length) {
            arr.push([...noChildrenItems, ...childrenItems.splice(0, 1)]);
        }
        arr.push(...chunk(childrenItems, 2));
        return arr
    }, [items]);
    const ItemComponent = ({row}) => {
        return <span className={`relative group/item cursor-pointer text-sm hover:bg-primary-500/10 py-1.5 pl-3 pr-13 rounded-md text-nowrap ${pageKey===row.key?'bg-primary-500/10':''}`}>
            <Link to={row.path} className={`group-hover/item:text-primary-600! peer flex h-full items-center ${pageKey===row.key?'text-primary-600!':'text-yy-800!'}`}>{row.label}</Link>
            <Link title="打开新页面" className="hidden group-hover/item:flex text-yy-800! group-hover/item:text-primary-600! absolute top-0 right-1 px-1 h-full items-center justify-center" to={row.path} target="_blank"><ExternalLink size={16}/></Link>
        </span>
    }
    return <div className="flex gap-2 absolute top-full left-0 bg-yy-100 backdrop-blur-sm hidden rounded-b-lg group-hover:flex p-2.5 shadow-lg">
        {list.map((rows, index) => <div className="flex flex-col shrink-0 gap-1" key={index}>
            {rows.map(row => <Fragment key={row.key}>
                {!row.children && <ItemComponent row={row}/>}
                {row.children && <div className="flex flex-col gap-1">
                    <span className="text-sm text-yy-600 font-medium text-nowrap py-1.5 px-3">{row.label}</span>
                    {row.children.map(item =>  <ItemComponent key={item.key} row={item}/>)}
                </div>}
            </Fragment>)}
        </div>
        )}
    </div>
}
export default (props) => {
    const { menus, handle } = props;
    const { level_1 } = handle?.menu || {};
    const { pageKey } = handle || {};
    const title = window.sysTitle;
    return <nav className="fixed top-0 z-60 w-full h-16 px-6 box-border bg-yy-900 text-yy-50">
        <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" width={48}/>
                <span className="text-xl font-bold text-yy-50 hover:text-primary-300">{title}</span>
            </Link>
            {/* 主题切换 */}
            <div className="flex items-center gap-4 h-full">
                {/* 导航链接 */}
                <div className="flex gap-2 h-full items-center">
                    {menus.map(row => (
                        <div className="relative h-full flex items-center group">
                            <span key={row.key} className={`relative cursor-pointer px-2 py-2 flex items-center gap-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-primary-400/80 font-medium transition-colors after:transition-all after:duration-300 ${level_1 === row.key ? 'after:w-full text-primary-300' : 'after:w-0 hover:after:w-full hover:text-primary-300'}`}>
                                {row.label}
                            </span>
                            {row.children && <MenuItem items={row.children} pageKey={pageKey} />}
                        </div>
                    ))}
                </div>
                <ThemeToggle />
                <RightContent />
            </div>
        </div>
    </nav>
}