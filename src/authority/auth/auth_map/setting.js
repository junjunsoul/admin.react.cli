import api from '@/authority/services/api';
import setting from '@/authority/services/setting';
export default {
    '/common/base':[
        api.logout.url,
        api.password.url,
        api.getUserInfo.url,
    ],
    //管理员列表
    '/setting/admin_manage':[
        '/page/admin_manage/tag',
        setting.roleSelect.url,
        setting.user_getUsers.url
    ],
    '/setting/admin_manage#add':[
        setting.user_create.url,
    ],
    '/setting/admin_manage#edit':[
        setting.user_read.url,
        setting.user_update.url,
        setting.changeUserInfo.url,
    ],
    //接口清单
    '/setting/interface_list':[
        setting.getApiList.url,
        setting.roleSelect.url,
    ],
    '/setting/interface_list#store':[
        setting.storeApi.url,
        setting.getApiInfo.url,
    ],
    //角色管理 
    '/setting/role_manage':[
        setting.roleSelect.url
    ],
    '/setting/role_manage#add':[setting.roleCreate.url],
    '/setting/role_manage#edit':[
        setting.roleUpdate.url,
        setting.roleRead.url,
        setting.authorizeApiMenu.url,
        setting.getApiList.url,
        setting.getRoleAuthApiList.url,
    ],
    '/setting/role_manage#del':[setting.roleDelete.url],
}