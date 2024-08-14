import topMenu from './top_menu'
import { deepCopy } from '@/utils'
import FM from './orm'
export const getFM = key => {
    return FM[key];
};
//通过路由获取对应的权限
export const getFMFuzzy = (inKey, authority = []) => {
    let result = {};
    for(let key in FM){
        let value =FM[key]
        if (key.indexOf(inKey) > -1) {
            let has = true;
            value.forEach(val => {
                if (authority.indexOf(val.toLocaleLowerCase()) < 0) {
                    has = false;
                }
            });
            if (has) {
                if (key.indexOf('#') > -1) {
                    result[key.split('#')[1]] = value;
                }
            }
        }        
    }
    return result;
};
//根据路由获取对应的配置信息
export const getAllAuthforPaths = path => {
    let arr = [];
    if (path && path.length) {

        for(let key in FM){
            let value =FM[key]
            let has = true;
            value.map(row => {
                if ((path.map(val => val.toLocaleLowerCase())).indexOf(row.toLocaleLowerCase()) < 0) {
                    has = false;
                }
            });
            if (has) {
                arr.push(key);
            }
        }
    }
    return arr;
};
//根据路由检查权限
export const checkAuth = (path, authority = []) => {
    let available = true;
    let arr = FM[path]
    if (arr) {
        arr.forEach(row => {
            if (!row || authority.indexOf(row.toLocaleLowerCase()) < 0) {
                available = false;
            }
        });
    }
    return available;
};

function loop(row, authority) {
    if (row.children) {
        row.children = row.children
            .map(chil => loop(chil, authority))
            .filter(item => item)
            .filter(item => {
                if (item.children) {
                    return item.children.length > 0;
                } else {
                    return true;
                }
            }); //过滤空子项
        return row;
    } else {
        if (checkAuth(row.path, authority)) {
            return row;
        } else {
            return false;
        }
    }
};
//根据权限获取菜单
export const getMenus = (authority = []) => {
    let arr = deepCopy(topMenu)
        .map(row => {
            if (row.children) {
                row.children = row.children
                    .map(chil => loop(chil, authority))
                    .filter(item => item) //过滤没权限
                    .filter(item => {
                        if (item.children) {
                            return item.children.length > 0;
                        } else {
                            return true;
                        }
                    }); //过滤空子项
            }
            return row;
        })
        .filter(item => {
            if (item.children) {
                return item.children.length > 0;
            } else {
                return true;
            }
        }); //过滤空子项
    return arr;
};