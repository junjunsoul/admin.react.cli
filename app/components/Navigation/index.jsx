import { useEffect, useState, useMemo } from "react";
import TopMenu from "./topMenu";
import SideMenu from "./sideMenu";
import { useUserStore } from "@/store/userStore";
import { getAllRouteHandles } from '@/utils/collectRouteHandles'
import { getMenuHandles } from '@/utils/usePermission';
import { Level1Map, Level2Map } from "@/utils/enumMenu";
import { unionBy, groupBy, map } from "lodash";
import Icon from '@/components/Icon'
export default ({ handle }) => {
    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const { permissions } = useUserStore();
    const handles = getAllRouteHandles();
    const menuHandles = getMenuHandles(handles, permissions);
    const level1ListData = Object.keys(Level1Map).filter(row => unionBy(menuHandles.map(item => item.menu?.level_1).filter(item => item).includes(row))&&Level1Map[row].show!==false);

    useEffect(() => {
        let tempLevel1 = '';
        if (handle?.menu?.level_1) {
            tempLevel1 = handle?.menu?.level_1
        } else {
            tempLevel1 = level1ListData[0];
        }
        onLevel1Change(tempLevel1)
    }, [handle])

    const onLevel1Change = (levelKey) => {
        const level2List = Object.keys(Level2Map).filter(row => unionBy(menuHandles.filter(item => item.menu?.level_1 === levelKey).map(item => item.menu?.level_2).filter(item => item).includes(row)));
        let tempLevel2 = '';
        if (handle?.menu?.level_2) {
            tempLevel2 = handle?.menu?.level_2;
        } else {
            tempLevel2 = level2List[0];
        }
        setLevel1(levelKey)
        setLevel2(tempLevel2);
    }
    const onLevel2Change = (level2) => {
        setLevel2(level2);
    }

    const level2List = useMemo(() => {
        const groupList = groupBy(menuHandles.map(item => ({ ...item.menu, pageKey: item.pageKey })).filter(item => item.level_1 === level1 && item.level_2), 'level_2')
        const noLevel2List = menuHandles
            .map(item => ({ ...item.menu, pageKey: item.pageKey }))
            .sort((a, b) => a.order - b.order)
            .filter(item => item.level_1 === level1 && !item.level_2)
            .map(item => ({
                key: item.pageKey, icon: item.icon&&<Icon name={item.icon} size={20} />, label: item.title, path: item.path
            }))
        const list = map(groupList, (values, key) => {
            return {
                key: key,
                label: Level2Map[key].title,
                icon: Level2Map[key].icon&&<Icon name={Level2Map[key].icon} size={20} />,
                children: values.sort((a, b) => a.order - b.order).map(item => ({
                    key: item.pageKey, icon: item.icon&&<Icon name={item.icon} size={20} />, label: item.title, path: item.path
                }))
            }
        })
        return [...noLevel2List, ...list]
    }, [level1])
    const level1List = useMemo(() => {
        return level1ListData.map(row => ({
            key: row,
            label: Level1Map[row].title,
            icon: Level1Map[row].icon&&<Icon name={Level1Map[row].icon} size={20} />
        }))
    }, [level1ListData])
    return <>
        <TopMenu list={level1List} onChange={onLevel1Change} level={level1} />
        <SideMenu list={level2List} onChange={onLevel2Change} level2={level2} handle={handle} />
    </>
}