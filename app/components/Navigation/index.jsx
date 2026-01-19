import { useEffect, useState, useMemo } from "react";
import TopMenu from "./topMenu";
import { useUserStore } from "@/store/userStore";
import { getAllRouteHandles } from '@/utils/collectRouteHandles'
import { getMenuHandles } from '@/utils/usePermission';
import { Level1Map, Level2Map } from "@/utils/enumMenu";
import { unionBy, groupBy, map } from "lodash";
import Icon from '@/components/Icon'
export default ({ handle }) => {
    const { permissions } = useUserStore();
    const handles = getAllRouteHandles();
    const menuHandles = getMenuHandles(handles, permissions);

    const level1ListData = Object.keys(Level1Map).filter(row => unionBy(menuHandles.map(item => item.menu?.level_1).filter(item => item).includes(row)) && Level1Map[row].show !== false);

    const getLevel2List = (level1) => {
        const groupList = groupBy(menuHandles.map(item => ({ ...item.menu, pageKey: item.pageKey })).filter(item => item.level_1 === level1 && item.level_2), 'level_2')
        const noLevel2List = menuHandles
            .map(item => ({ ...item.menu, pageKey: item.pageKey }))
            .sort((a, b) => a.order - b.order)
            .filter(item => item.level_1 === level1 && !item.level_2)
            .map(item => ({
                key: item.pageKey, icon: item.icon && <Icon name={item.icon} size={20} />, label: item.title, path: item.path
            }))
        const list = map(groupList, (values, key) => {
            return {
                key: key,
                label: Level2Map[key].title,
                icon: Level2Map[key].icon && <Icon name={Level2Map[key].icon} size={20} />,
                children: values.sort((a, b) => a.order - b.order).map(item => ({
                    key: item.pageKey, icon: item.icon && <Icon name={item.icon} size={20} />, label: item.title, path: item.path
                }))
            }
        })
        return [...noLevel2List, ...list]
    }
    const menus = useMemo(() => {
        return level1ListData.map(row => ({
            key: row,
            label: Level1Map[row].title,
            icon: Level1Map[row].icon && <Icon name={Level1Map[row].icon} size={20} />,
            children: getLevel2List(row)
        }))
    })
    return <>
        <TopMenu menus={menus} handle={handle} />
    </>
}