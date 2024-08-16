## 权限配置模块

```html
目录结构
authority
	-auth     				--授权模块
		-auth_menu			--授权菜单数据结构
		-orm				--页面与接口的绑定关系结构
        -top_menu			--显示导航菜单数据结构
	-services 				--接口集合
```
#### 配置信息

1. 先配置页面与接口的绑定关系 authority/auth/orm
```javascript
	//页面显示权限配置（必须配置）
    '/setting/interface_list':[
        setting.getApiList.url,
    ],
	//页面功能权限配置 通过页面链接加 #xxx区分
    '/setting/interface_list#add':[
        setting.storeApi.url,
    ],
```
2. 配置授权页面的显示菜单 authority/auth/auth_menu
```javascript
    {
        title: '接口清单',
        fm: {
            '/setting/interface_list': '列表',
            '/setting/interface_list#store': '新增/修改',
        },
    },
```
3. 配置导航显示菜单 authority/auth/top_menu
```javascript
    {
        label: '系统管理',
        children: [
            { label: '接口清单', path: '/setting/interface_list' },
        ]
    },
```