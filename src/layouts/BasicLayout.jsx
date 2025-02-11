import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import {
    Spin,
} from 'antd'
import { isEmpty } from 'lodash'
import PcLayout from './PcLayout'
function Page(props) {
    const { setTheme } = useModel('global')
    const { currentUser, fetchCurrent } = useModel('user')
    let PRO_THEME = localStorage.getItem('PRO_THEME')
    if (PRO_THEME) {
        setTheme(PRO_THEME)
    }
    useEffect(() => {
        fetchCurrent()
    }, [])
    if (isEmpty(currentUser)) {
        return <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
        </div>
    }
    return <PcLayout {...props} />
}
export default Page