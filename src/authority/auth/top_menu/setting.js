import { Icon } from '@umijs/max';
export default {
    label: '系统设置',
    left:-150,
    children: [
        {
            label: '计划开停规则',
            icon:<Icon icon='local:qiting' width={20} height={20} fill="currentColor"/>,
            children: [
                { label: '计划关停规则列表', path: '/setting/ad_rule_list' },
                { label: '计划自动处理记录', path: '/setting/ad_action_records' },
                { label: '通知方式列表', path: '/setting/ding_list' },
            ]
        },
        {
            label: '系统管理',
            icon:<Icon icon='local:sys' width={20} height={20} fill="currentColor"/>,
            children: [
                { label: '角色管理', path: '/setting/role_manage' },
                { label: '账号管理', path: '/setting/admin_manage' },
                { label: '接口清单', path: '/setting/interface_list' },
            ]
        },        
    ]
}