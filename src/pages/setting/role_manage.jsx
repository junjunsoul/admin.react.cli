import { useState, useRef, forwardRef, useImperativeHandle, memo, useCallback, useMemo } from 'react'
import { useOutletContext } from '@umijs/max'
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
import { transferPost } from '@/authority/services'
import STable from '@/components/JTable/server'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Auth from './components/auth'
const { TextArea } = Input
const URL_M = {
    list: 'setting.roleList',
    store: 'setting.roleStore',
    roleInfo: 'setting.roleInfo',
    roleAuthInfo: 'setting.roleAuthInfo'
}
const pageName = '角色信息'
const FormLayout = memo(forwardRef((props, ref) => {
    const {
        reload,
        loading = [],
    } = props
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
    const okHandle = useCallback(() => {
        formRef.current.validateFields().then(async (fieldsValue) => {
            let result = { ...fieldsValue };
            const res = await transferPost(URL_M['store'], result)
            if (res.code == 200) {
                reload()
                onCancel()
            }
        })
    })
    const onCancel = useCallback(() => {
        setVisible(false)
    }, [])
    const dist = {
        add: '添加',
        update: '更新',
    }
    return <Modal
        destroyOnClose
        maskClosable={false}
        title={`${dist[formState]}${pageName}`}
        width={600}
        size="small"
        open={visible}
        onCancel={onCancel}
        footer={[
            <Button key="back" onClick={onCancel}>
                取消
            </Button>,
            <Button
                key="submit"
                type="primary"
                loading={loading[URL_M[formState]]}
                onClick={okHandle}
            >
                提交
            </Button>,
        ]}
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
                <Input placeholder="请输入" />
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
                <TextArea rows={2} placeholder="请输入" />
            </Form.Item>
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
    const auth = async (role_id) => {
        setOpen(true)
        const res = await transferPost(URL_M['roleAuthInfo'], { role_id })
        if (res.code == 200) {
            setInitialValues(res.data)
        }
    }
    return <Drawer
        closable
        destroyOnClose
        title={`${initialValues.role_name}-菜单授权`}
        placement="right"
        open={open}
        size={'large'}
        extra={
            <Space>
                <Button>取消</Button>
                <Button type="primary">提交</Button>
            </Space>
        }
        onClose={() => setOpen(false)}>
        <Form
            layout="vertical"
            ref={formRef}
            initialValues={initialValues}
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
    const { authorized } = useOutletContext()
    const tableRef = useRef(null)
    const formRef = useRef(null)
    const authRef = useRef(null)
    const onGridReady = useCallback(params => {
        tableRef.current = params.api
        tableReloader()
    }, [])
    const tableReloader = (vlaues) => {
        const dataSource = {
            getRows:async (params) => {
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
        const res = await transferPost(URL_M['roleInfo'], {})
        if (res.code == 200) {
            formRef.current.edit(res.data)
        }
    }
    const handleCopy = async data => {
        const res = await transferPost(URL_M['roleInfo'], {})
        if (res.code == 200) {
            formRef.current.add({ role_id: res.data.role_id })
        }
    }
    const handleAuth = async data => {
        authRef.current.auth({ role_id: data.role_id })
    }
    const actionRenderer = (props) => {
        const {
            data
        } = props
        return <Space split={<Divider type="vertical" />}>
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
    },[authorized])
    return <PageHeaderWrapper>
        <div className='main-page'>
            <STable
                searchBar={searchBar}
                columnCus={columnCus}
                onGridReady={onGridReady}
                // loading={loading[URL_M['list']]}
            />
        </div>
        <FormLayout ref={formRef} {...props} reload={tableReloader} />
        <AuthLayout ref={authRef} {...props} />
    </PageHeaderWrapper>
}
export default Page