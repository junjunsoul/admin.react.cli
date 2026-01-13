import { memo } from 'react';
import { Space } from 'antd'
import Avatar from './AvatarDropdown';
export default memo(props => {
  const mode = import.meta.env.MODE
  return <div className={`flex shrink-0 items-center gap-3`}>
    <Space separator={<span className='text-gray-500'>|</span>}>
        {mode != 'production' && <div className='p-1 px-4 rounded-full bg-yy-900 border border-yy-600 text-orange-500'>
          {mode == 'staging' ? '内测服' : '开发模式'}
        </div>}
        <Avatar {...props} />      
    </Space>
  </div>
})
