import { useState, useEffect, useRef, forwardRef, useImperativeHandle, memo, useCallback } from 'react'
import {
    Divider,
    Button,
    Space,
    Modal,
    Form,
    Input,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { transferPost } from '@/services'
import JTable from '@/components/JTable'
import DataCart from '@/components/DataSelect';
import { getPagePermissions } from '@/utils/usePermission'
const { TextArea } = Input

const PageName = '接口清单'
export function meta() {
    return [
        { title: `${PageName} - ${window.sysTitle}` },
    ];
}

// 1. 页面使用的接口（接口映射）
const URL_M = {
    list: 'setting.apiList',
    store: 'setting.apiStore',
    getApiInfo: 'setting.getApiInfo',
    roleSelect: 'setting.roleSelect',  
}

// 2. 导出权限配置（供系统自动收集）
export const handle = {
    // 页面固定标识（不会因路由改变而改变）
    pageKey: 'settings.interface',

    // 页面名称
    title: PageName,

    // 是否缓存页面（KeepAlive）- 管理页面通常需要缓存以保持状态
    keepAlive: true,

    // 权限与接口的绑定关系
    permission: {
        list: [URL_M.list],                      // 页面访问权限
        store: [URL_M.store],    // 添加/修改功能权限
    },


    // 菜单配置（用于自动生成导航菜单和面包屑）
    menu: {
        title: PageName,
        icon: 'interface',
        order: 1,
        level_2: 'settings.system',
        level_1:'settings',
        path: '/settings/interface',
        show: true,  // 是否在导航菜单中显示（默认 true，详情页/编辑页等可设为 false）
    },
};
const FormLayout = memo(forwardRef((props, ref) => {
    const {
        reload,
    } = props
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [formState, setFormState] = useState('add')
    const [initialValues, setInitialValues] = useState({})
    const [roleList, setRoleList] = useState([])
    useImperativeHandle(ref, () => ({
        add,
        edit,
    }))
    const add = (data) => {
        getRoleSelect()
        setInitialValues(data)
        setFormState('add')
        setVisible(true)
    }
    const edit = (data) => {
        getRoleSelect()
        setInitialValues(data)
        setFormState('update')
        setVisible(true)
    }
    const getRoleSelect = async () => {
        if (roleList.length == 0) {
            const res = await transferPost(URL_M['roleSelect'], {})
            if (res.code == 200) {
                setRoleList(res.data)
            }
        }
    }
    const onFinish =async (values)=>{
        setLoading(true)
        let result = { ...values };
        const res = await transferPost(URL_M['store'], result)
        if (res.code == 200) {
            reload()
            onCancel()
        }
        setLoading(false)
    }
    const onCancel = useCallback(() => {
        setVisible(false)
    }, [])
    const dist = {
        add: '添加',
        update: '更新',
    }
    return <Modal
        destroyOnHidden
        maskClosable={false}
        title={`${dist[formState]}${PageName}`}
        width={600}
        size="small"
        open={visible}
        onCancel={onCancel}
        footer={null}
        modalRender={dom => (
            <Form
                initialValues={{

                }}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                {dom}
            </Form>
        )}
    >
        <Form
            layout="vertical"
            ref={formRef}
            initialValues={initialValues}
        >
            <Form.Item
                label="接口地址"
                name="route"
                rules={[{ required: true }]}
            >
                <Input placeholder="请输入" size='large' />
            </Form.Item>
            <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true }]}
            >
                <Input placeholder="请输入" size='large' />
            </Form.Item>
            <Form.Item
                label="描述"
                name="description"
            >
                <TextArea rows={3} placeholder="请输入" size='large' />
            </Form.Item>
            <Form.Item
                name="role_ids"
                noStyle
            >
                <DataCart
                    title="接口授权"
                    list={roleList.map(item => {
                        return {
                            label: item.role_name,
                            value: item.role_id,
                        };
                    })}
                    bodyStyle={{ height: 300, overflowY: 'auto' }}
                    chunkSpan={2}
                />
            </Form.Item>
            <div className='flex justify-center gap-6 mt-4'>
                <Button className='flex-1' size={'large'}  onClick={onCancel}>取消</Button>
                <Button className='flex-1' type={'primary'} loading={loading} htmlType={'submit'} size={'large'}>确定</Button>
            </div>
        </Form>
    </Modal>
}))

const Page = (props) => {
    const authorized = getPagePermissions()
    const [tableList, setList] = useState([])
    const tableRef = useRef(null)
    const formRef = useRef(null)
    useEffect(() => {
        tableReloader()
    }, [])
    const tableReloader = async () => {
        const res = await transferPost(URL_M['list'], {})
        if (res.code == 200) {
            setList(res.data)
        }
    }

    const handleAdd = () => {
        formRef.current.add({})
    }
    const handleUpdate = async data => {
        const res = await transferPost(URL_M['getApiInfo'], {})
        if (res.code == 200) {
            formRef.current.edit(res.data)
        }
    }
    const handleCopy = async data => {
        const res = await transferPost(URL_M['getApiInfo'], {})
        if (res.code == 200) {
            formRef.current.add({ role_ids: res.data.role_ids })
        }
    }
    const actionRenderer = (props) => {
        const {
            data
        } = props
        return <Space separator={<Divider orientation="vertical" />}>
            <a onClick={() => handleUpdate(data)}>修改</a>
            <a onClick={() => handleCopy(data)}>复制</a>
        </Space >
    }
    const searchBar = authorized['store'] && <Button onClick={handleAdd} icon={<PlusOutlined />} type="primary"> 新建 </Button>
    const columnCus = [
        { headerName: '接口地址', suppressHeaderMenuButton: false, field: 'route' },
        { headerName: '名称', field: 'name' },
        { headerName: '访问次数', field: 'count',sortable: true, total: true },
        { 
            headerName: '接口描述', 
            field: 'description',
            headerTooltip: "Tooltip for Sport Column Header",
        },
    ]
    if (authorized['store']) {
        columnCus.push({
            headerName: '',
            field: 'action',
            // width: 100,
            // pinned: 'right',
            cellStyle: { textAlign: 'center' },
            cellRenderer: actionRenderer,
        })
    }
    return <>
        <div className='p-8'>
            <JTable
                ref={tableRef}
                searchBar={searchBar}
                name={PageName}
                columnCus={columnCus}
                rowData={tableList}
                tbKey="/setting/interface_list"
                totalNextTick={(total, dataList) => {
                    total.route = '汇总'
                    return total
                }}
            />
        </div>
        <FormLayout ref={formRef} {...props} reload={tableReloader} />
    </>
}
export default Page
