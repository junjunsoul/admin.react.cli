import { useState, useEffect, useRef, forwardRef, useImperativeHandle, memo, useCallback } from 'react'
import { useOutletContext, connect } from '@umijs/max'
import {
    Divider,
    Button,
    Space,
    Modal,
    Form,
    Input,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { asyncPost } from '@/utils'
import STable from '@/components/JTable/server'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
const { TextArea } = Input
const URL_M = {
    list: 'setting/roleList',
    store: 'setting/roleStore',
    getApiInfo: 'setting/roleInfo'
}
const pageName = '角色管理'
const FormLayout = memo(forwardRef((props, ref) => {
    const {
        reload,
        loading = [],
        dispatch,
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
            const res = await asyncPost(URL_M['store'], result, dispatch)
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
                label="接口地址"
                name="route"
                rules={[{ required: true }]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true }]}
            >
                <Input placeholder="请输入" />
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

const Page = (props) => {
    const {
        dispatch,
        loading,
    } = props
    const { authorized } = useOutletContext()
    const tableRef = useRef(null)
    const formRef = useRef(null)
    const onGridReady = useCallback(params => {
        tableRef.current = params.api
        tableReloader()
    }, [])
    const tableReloader = () => {
        const dataSource = {
            getRows: (params) => {
                dispatch({
                    type: URL_M['list'],
                    payload: {
                        ...params.request
                    },
                    callback: response => {
                        if (response.code == 200) {
                            const { data, recurdsTotal, total } = response
                            params.success({
                                rowData: data,
                                rowCount: recurdsTotal,
                            })
                            tableRef.current.setGridOption('pinnedTopRowData', total&&[total])                                
                        }else{
                            params.fail()
                        }
                    }
                })
            }
        }
        tableRef.current.setGridOption('serverSideDatasource', dataSource)
    }

    const handleAdd = () => {
        formRef.current.add({})
    }
    const handleUpdate = async data => {
        const res = await asyncPost(URL_M['getApiInfo'], {}, dispatch)
        if (res.code == 200) {
            formRef.current.edit(res.data)
        }
    }
    const handleCopy = async data => {
        const res = await asyncPost(URL_M['getApiInfo'], {}, dispatch)
        if (res.code == 200) {
            formRef.current.add({ role_ids: res.data.role_ids })
        }
    }
    const actionRenderer = (props) => {
        const {
            data
        } = props
        return <Space split={<Divider type="vertical" />}>
            <a onClick={() => handleUpdate(data)}>修改</a>
            <a onClick={() => handleCopy(data)}>复制</a>
        </Space >
    }
    const searchBar = authorized['store'] && <Button onClick={handleAdd} icon={<PlusOutlined />} type="primary"> 新建 </Button>
    const columnCus = [
        { headerName: '名称',suppressHeaderMenuButton: false, field: 'role_name' },
        { headerName: '用户数量', sortable: true, field: 'users', total: true },
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
    return <PageHeaderWrapper>
        <div className='main-page'>
            <STable
                searchBar={searchBar}
                columnCus={columnCus}
                tbKey="/setting/role_manage"
                onGridReady={onGridReady}
                loading={loading[URL_M['list']]}
            />
        </div>
        <FormLayout ref={formRef} {...props} reload={tableReloader} />
    </PageHeaderWrapper>
}
export default connect(({ loading }) => ({ loading: loading.effects }))(Page)