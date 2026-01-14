
import { useState, useRef, forwardRef, useImperativeHandle, memo, useCallback, useMemo } from 'react'
import {
    Divider,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Switch,
    Drawer,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { transferPost } from '@/services'
import STable from '@/components/JTable/server'
import Icon from '@/components/Icon'
import { getPagePermissions } from '@/utils/usePermission'
import Auth from './components/auth'
const { TextArea } = Input
const PageName = '角色管理'

export function meta() {
    return [
        { title: `${PageName} - ${window.sysTitle}` },
    ];
}

// 1. 页面使用的接口（接口映射）
const URL_M = {
    list: 'setting.roleList',           // 列表接口
    store: 'setting.roleStore',         // 添加/修改接口
    info: 'setting.roleInfo',       // 角色详情接口
    roleAuthInfo: 'setting.roleAuthInfo' // 角色权限信息接口
}

// 2. 导出权限配置（供系统自动收集）
export const handle = {
    // 页面固定标识（不会因路由改变而改变）
    pageKey: 'settings.role',

    // 页面名称
    title: PageName,

    // 是否缓存页面（KeepAlive）- 管理页面通常需要缓存以保持状态
    keepAlive: true,

    // 权限与接口的绑定关系
    permission: {
        list: { apis: [URL_M.list], title: '列表' },                      // 页面访问权限
        store: { apis: [URL_M.store, URL_M.info], title: '添加、修改' },    // 添加/修改功能权限
        auth: { apis: [URL_M.roleAuthInfo], title: '授权' },              // 授权功能权限
    },

    // 菜单配置（用于自动生成导航菜单和面包屑）
    menu: {
        title: PageName,
        icon: 'role',
        order: 1,
        level_2: 'settings.system',
        level_1: 'settings',
        path: '/settings/role',
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
    useImperativeHandle(ref, () => ({
        add,
        edit,
    }))
    const add = (data) => {
        setInitialValues(data)
        setFormState('add')
        setVisible(true)
    }
    const edit = (data) => {
        setInitialValues(data)
        setFormState('update')
        setVisible(true)
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
                label="角色名"
                name="name"
                rules={[{ required: true }]}
            >
                <Input placeholder="请输入" size="large"/>
            </Form.Item>
            <Form.Item
                label="状态"
                name="status"
                valuePropName="checked"
            >
                <Switch checkedChildren="启用" unCheckedChildren="禁用" />
            </Form.Item>

            <Form.Item
                label="描述"
                name="description"
            >
                <TextArea rows={3} placeholder="请输入" />
            </Form.Item>
            <div className='flex justify-center gap-6'>
                <Button className='flex-1' size={'large'}  onClick={onCancel}>取消</Button>
                <Button className='flex-1' type={'primary'} loading={loading} htmlType={'submit'} size={'large'}>确定</Button>
            </div>
        </Form>
    </Modal>
}))
const AuthLayout = memo(forwardRef((props, ref) => {
    const [open, setOpen] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const formRef = useRef(null)
    useImperativeHandle(ref, () => ({
        auth,
    }))
    const auth = async (data) => {
        setOpen(true)
        const res = await transferPost(URL_M['roleAuthInfo'], { role_id: data.role_id })
        if (res.code == 200) {
            setInitialValues(res.data)
        }
    }
    
    const handleSubmit = async (values) => {
        const res = await transferPost(URL_M['store'], {
            role_id: initialValues.role_id,
            interface_list: values.interface_list || []
        })
        if (res.code == 200) {
            setOpen(false)
        }
    }
    
    const handleChange = (values) => {
        console.log(values)
    }
    
    return <Drawer
        closable
        destroyOnHidden
        title={`${initialValues.role_name}-菜单授权`}
        placement="right"
        open={open}
        size={'large'}
        extra={
            <Space>
                <Button onClick={() => setOpen(false)}>取消</Button>
                <Button type="primary" onClick={handleSubmit}>提交</Button>
            </Space>
        }
        onClose={() => setOpen(false)}>
        <Form
            layout="vertical"
            ref={formRef}
            initialValues={initialValues}
            onValuesChange={handleChange}
            onFinish={handleSubmit}
        >
            <Form.Item
                noStyle
                name="interface_list"
            >
                <Auth />
            </Form.Item>
        </Form>
    </Drawer>
}))

const Page = (props) => {
    const authorized = getPagePermissions()
    const tableRef = useRef(null)
    const formRef = useRef(null)
    const authRef = useRef(null)
    const onGridReady = useCallback(params => {
        tableRef.current = params.api
        tableReloader()
    }, [])
    const tableReloader = (vlaues) => {
        const dataSource = {
            getRows: async (params) => {
                const res = await transferPost(URL_M['list'], {
                    ...vlaues,
                    ...params.request,
                })
                if (res.code == 200) {
                    const { data, recurdsTotal, total } = res
                    params.success({
                        rowData: data,
                        rowCount: recurdsTotal,
                    })
                    tableRef.current.setGridOption('pinnedTopRowData', total && [total])
                } else {
                    params.fail()
                }
            }
        }
        tableRef.current.setGridOption('serverSideDatasource', dataSource)
    }

    const handleAdd = () => {
        formRef.current.add({})
    }
    const handleUpdate = async data => {
        const res = await transferPost(URL_M['info'], {})
        if (res.code == 200) {
            formRef.current.edit(res.data)
        }
    }
    const handleCopy = async data => {
        const res = await transferPost(URL_M['info'], {})
        if (res.code == 200) {
            formRef.current.add({ role_id: res.data.role_id })
        }
    }
    const handleAuth = async data => {
        authRef.current.auth(data)
    }
    const actionRenderer = (props) => {
        const {
            data
        } = props
        return <Space separator={<Divider orientation="vertical" />}>
            <a onClick={() => handleUpdate(data)}>修改</a>
            <a onClick={() => handleCopy(data)}>复制</a>
            <a onClick={() => handleAuth(data)}>授权</a>
        </Space >
    }
    const searchBar = useMemo(() => authorized['store'] && <Button onClick={handleAdd} icon={<PlusOutlined />} type="primary"> 新建 </Button>, [authorized])
    const columnCus = useMemo(() => {
        let col = [
            { headerName: '角色名称', suppressHeaderMenuButton: false, field: 'role_name' },
            { headerName: '用户数量', sortable: true, field: 'users', total: true },
        ]
        if (authorized['store']) {
            col.push({
                headerName: '',
                field: 'action',
                // width: 100,
                // pinned: 'right',
                cellStyle: { textAlign: 'center' },
                cellRenderer: actionRenderer,
            })
        }
        return col
    }, [authorized])
    return <>
        <div className='p-8'>
            <STable
                searchBar={searchBar}
                columnCus={columnCus}
                onGridReady={onGridReady}
            // loading={loading[URL_M['list']]}
            />
        </div>
        <FormLayout ref={formRef} {...props} reload={tableReloader} />
        <AuthLayout ref={authRef} {...props} />
    </>
}
export default Page
