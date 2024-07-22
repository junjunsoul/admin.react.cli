import { useState, useEffect,useRef } from 'react'
import { useOutletContext, connect } from '@umijs/max';
import {
    Card,
    Button,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import JTable from '@/components/JTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
const URL_M = {
    list: 'setting/getApiList',
}
function Page(props) {
    const name = '接口清单'
    const {
        dispatch,
        loading,
    } = props
    const { authorized } = useOutletContext();
    const [tableList, setList] = useState([])
    const tableRef = useRef(null)
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
    const searchBar = authorized['add'] && <Button icon={<PlusOutlined />} type="primary"> 新建 </Button>
    const columnCus = [
        { headerName: '接口地址',suppressHeaderMenuButton:false, field: 'route' },
        { headerName: '名称', field: 'name' },
        { headerName: '接口描述', field: 'description' },
    ]
    return <PageHeaderWrapper>
        <Card bordered={false} size="small">
            <JTable
                ref={tableRef}
                searchBar={searchBar}
                name={name}
                columnCus={columnCus}
                rowData={tableList}
                loading={loading[URL_M['list']]}
            />
        </Card>
    </PageHeaderWrapper>
}
export default connect(({ loading }) => ({ loading: loading.effects }))(Page)