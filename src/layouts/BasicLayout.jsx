import { useEffect } from 'react';
import { connect } from '@umijs/max';
import {
    Spin,
    ConfigProvider
} from 'antd'
import { isEmpty } from 'lodash'
import PcLayout from './PcLayout'
const URL_M = {
    fetchCurrent: 'user/fetchCurrent',
}
function Page(props) {
    const {
        dispatch,
        currentUser,
    } = props
    useEffect(() => {
        dispatch({ type: URL_M['fetchCurrent'] })
    }, [])
    if (isEmpty(currentUser)) {
        return <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
        </div>
    }
    return <PcLayout {...props} />
}
export default connect(({ user: { currentUser, authority }, global:{documentTitle} }) => ({ currentUser, authority, documentTitle }))(Page)