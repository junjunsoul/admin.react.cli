import { memo, forwardRef, useImperativeHandle, useState,useRef } from 'react'
import { Modal, Input, Form, message,Button } from 'antd'
import { transferPost } from '@/services'
import { useUserStore } from '@/store/userStore'
const UploadFile = memo(props => {
    const { value } = props
    return <>
        <div className=' shrink-0 w-[100px] h-[100px] flex justify-center items-center cursor-pointer hover:border-orange-500 border border-transparent rounded-full overflow-hidden'>
            {value ? <img src={`${value}?x-tos-process=image/resize,w_100`} className='w-full h-full object-cover' alt="" /> : <Icon name="user" width={40} height={46} />}
        </div>
    </>
})
export const EditPassword = memo(forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true)
        }
    }))
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoading(true)
        const res = await transferPost('api.userEditPwd', { ...values })
        if (res.code == 200) {
            message.success('修改成功!');
            setOpen(false)
        }
        setLoading(false)
    };
    return <Modal
        width={478}
        open={open}
        title={'修改密码'}
        onCancel={() => setOpen(false)}
        destroyOnHidden
        footer={null}
        modalRender={dom => (
            <Form
                initialValues={{

                }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                {dom}
            </Form>
        )}
    >
        <div className={'flex flex-col'}>
            <Form.Item
                name="old_pwd"
                label="原密码"
                rules={[{ required: true }]}
            >
                <Input.Password className='p-3!' size={'large'} variant="filled" placeholder="请输入原密码" />
            </Form.Item>
            <Form.Item
                name="new_pwd"
                label="新密码"
                rules={[{ required: true }]}
            >
                <Input.Password className='p-3!' size={'large'} variant="filled" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                name="confirm_pwd"
                rules={[
                    {
                        required: true,
                        message: '请输入密码！'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('new_pwd') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('您输入的新密码不匹配!'));
                        },
                    }),
                ]}
            >
                <Input.Password className='p-3!' size={'large'} variant="filled" placeholder="请输入密码" />
            </Form.Item>
            <div className='flex justify-center gap-6'>
                <Button className='flex-1' size={'large'}  onClick={() => setOpen(false)}>取消</Button>
                <Button className='flex-1' type={'primary'} loading={loading} htmlType={'submit'} size={'large'}>确定</Button>
            </div>
        </div>
    </Modal>
}))
export const EditUserInfo = memo(forwardRef((props, ref) => {
    const { fetchCurrent, user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true)
            form.setFieldsValue({...user})
        }
    }))
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoading(true)
        const res = await transferPost('api.userEditInfo', { ...values })
        if (res.code == 200) {
            message.success('修改成功!');
            fetchCurrent && fetchCurrent()
            setOpen(false)
        }
        setLoading(false)
    };
    return <Modal
        width={478}
        open={open}
        title="账号设置"
        destroyOnHidden
        onCancel={()=>setOpen(false)}
        footer={null}
        modalRender={dom => (
            <Form
                initialValues={{ ...user }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                {dom}
            </Form>
        )}
    >
        <div className={'flex flex-col'}>
            <div className='flex justify-center'>
                <Form.Item
                    name="avatar_url"
                    noStyle
                >
                    <UploadFile />
                </Form.Item>
            </div>
            <Form.Item
                name="account"
                label="账号"
            >
                <Input className='p-3!' size={'large'} readOnly variant="filled" />
            </Form.Item>
            <Form.Item
                name="nick_name"
                label="昵称"
                rules={[{ required: true }]}
            >
                <Input className='p-3!' size={'large'} placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item
                name="real_name"
                label="姓名"
                rules={[{ required: true }]}
            >
                <Input className='p-3!' size={'large'} placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
                name="job_name"
                label="岗位"
            >
                <Input className='p-3!' size={'large'} placeholder="请输入岗位" />
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
            >
                <Input className='p-3!' size={'large'} placeholder="请输入邮箱" />
            </Form.Item>
            <div className='flex justify-center gap-6'>
                <Button className='flex-1' size={'large'}  onClick={() => setOpen(false)}>取消</Button>
                <Button className='flex-1' type={'primary'} loading={loading} htmlType={'submit'} size={'large'}>确定</Button>
            </div>
        </div>
    </Modal>
}))