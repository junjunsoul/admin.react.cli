import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
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
import JTable from '@/components/JTable'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
const { TextArea } = Input
const URL_M = {
    list: 'setting/getApiList',
    store: 'setting/storeApi'
}
const pageName = '接口清单'
const FormLayout = forwardRef((props, ref) => {
    const { 
        reload, 
        loading=[],
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
    const add = () => {
        setInitialValues({})
        setFormState('add')
        setVisible(true)
    }
    const edit = (data) => {
        setInitialValues(data)
        setFormState('update')
        setVisible(true)
    }
    const okHandle = () => {
        formRef.current.validateFields().then(async (fieldsValue) => {
            let result = { ...fieldsValue };
            const res = await asyncPost(URL_M['store'],result,dispatch)
            if(res.code==200){
                reload()
                onCancel()
            }
        })
    }
    const onCancel = () => {
        setVisible(false)
    }
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
})

const Page = (props) => {
    const {
        dispatch,
        loading,
    } = props
    const { authorized } = useOutletContext();
    const [tableList, setList] = useState([])
    const tableRef = useRef(null)
    const formRef = useRef(null)
    useEffect(() => {
        tableReloader()
    }, [])
    const tableReloader = () => {
        dispatch({
            type: URL_M['list'],
            callback: response => {
                if (response.code == 200) {
                    setList(response.data)
                }
            }
        })
    }

    const handleAdd = () => {
        formRef.current.add()
    }
    const handleUpdate = data => {
        formRef.current.edit(data)
    }
    const handleAuth = data => {

    }
    const handleCopy = data => {

    }
    const actionRenderer = (props) => {
        const {
            data
        } = props
        return <Space split={<Divider type="vertical" />}>
            <a onClick={() => handleUpdate(data)}>修改</a>
            <a onClick={() => handleAuth(data)}>授权</a>
            <a onClick={() => handleCopy(data)}>复制</a>
        </Space >
    }
    const searchBar = authorized['add'] && <Button onClick={handleAdd} icon={<PlusOutlined />} type="primary"> 新建 </Button>
    const columnCus = [
        { headerName: '接口地址', suppressHeaderMenuButton: false, field: 'route' },
        { headerName: '名称', field: 'name' },
        { headerName: '接口描述', field: 'description' },
    ]
    if (authorized['edit']) {
        columnCus.push({
            headerName: '',
            field: 'action',
            width: 100,
            // pinned: 'right',
            cellStyle: { textAlign: 'center' },
            cellRenderer: actionRenderer,
        })
    }
    return <PageHeaderWrapper>
        <div className='main-page'>
            <JTable
                ref={tableRef}
                searchBar={searchBar}
                name={pageName}
                columnCus={columnCus}
                rowData={tableList}
                loading={loading[URL_M['list']]}
            />
        </div>
        <FormLayout ref={formRef} {...props} reload={tableReloader} />
    </PageHeaderWrapper>
}
export default connect(({ loading }) => ({ loading: loading.effects }))(Page)