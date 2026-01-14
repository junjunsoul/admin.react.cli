import { 
  Button, 
  Space, 
  Card, 
  Input, 
  Select, 
  DatePicker, 
  Switch,
  Radio,
  Checkbox,
  Slider,
  InputNumber,
  message,
  notification,
  Modal,
  Form,
  Table,
  Tag,
  Badge,
  Avatar,
  Divider,
  Alert,
  Steps,
  Progress,
  Spin,
  Tooltip,
  Popconfirm,
} from "antd";
import { 
  UserOutlined, 
  HomeOutlined, 
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;
const PageName = 'Antd 组件示例'
export function meta() {
  return [
    { title: `${PageName} - ${window.sysTitle}` },
  ];
}
// 2. 导出权限配置（供系统自动收集）
export const handle = {
  // 页面固定标识（不会因路由改变而改变）
  pageKey: 'other.antd-demo',

  // 页面名称
  title: PageName,
  
  // 是否缓存页面（KeepAlive）- 演示页面需要缓存以保持用户输入状态
  keepAlive: true,
  
  // 菜单配置（用于自动生成导航菜单和面包屑）
  menu: {
      title: PageName,
      order: 1,
      level_1:'other',
      path: '/antd-demo',
  },
};
export default function AntdDemo() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [modalOpen, setModalOpen] = useState(false);

  const showMessage = (type) => {
    messageApi[type]('这是一条消息提示');
  };

  const showNotification = () => {
    notificationApi.success({
      message: '通知标题',
      description: '这是通知的详细内容，可以包含更多信息。',
      placement: 'topRight',
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      tags: ['开发', 'React'],
    },
    {
      key: '2',
      name: '李四',
      age: 28,
      address: '上海市浦东新区',
      tags: ['设计', 'UI'],
    },
    {
      key: '3',
      name: '王五',
      age: 35,
      address: '广州市天河区',
      tags: ['产品', '管理'],
    },
  ];

  const onFinish = (values) => {
    console.log('表单值:', values);
    messageApi.success('提交成功！');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {contextHolder}
      {notificationContextHolder}
      
      <h1 className="text-4xl font-bold mb-2 text-yy-900">
        Ant Design 组件示例
      </h1>
      <p className="text-lg text-yy-600 mb-10">
        最新版 Ant Design 6.1.3 - 企业级 UI 设计语言和 React 组件库
      </p>

      {/* 按钮示例 */}
      <Card title="按钮 Button" style={{ marginBottom: '24px' }}>
        <Space wrap>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
          <Button type="primary" danger>Danger Button</Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Download
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" disabled>
            Disabled
          </Button>
        </Space>
      </Card>

      {/* 图标示例 */}
      <Card title="图标 Icon" style={{ marginBottom: '24px' }}>
        <Space size="large">
          <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <UserOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
          <SettingOutlined style={{ fontSize: '24px', color: '#faad14' }} />
          <HeartOutlined style={{ fontSize: '24px', color: '#f5222d' }} />
          <StarOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
          <SearchOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />
        </Space>
      </Card>

      {/* 输入框示例 */}
      <Card title="输入框 Input" style={{ marginBottom: '24px' }}>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <Input placeholder="基础输入框" />
          <Input placeholder="带图标的输入框" prefix={<UserOutlined />} />
          <Input.Search placeholder="搜索输入框" onSearch={(value) => console.log(value)} />
          <Input.Password placeholder="密码输入框" />
          <TextArea rows={4} placeholder="文本域" />
        </Space>
      </Card>

      {/* 选择器示例 */}
      <Card title="选择器 Select" style={{ marginBottom: '24px' }}>
        <Space wrap>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'tom', label: 'Tom' },
            ]}
          />
          <Select
            mode="multiple"
            style={{ width: 300 }}
            placeholder="多选"
            options={[
              { value: 'red', label: '红色' },
              { value: 'green', label: '绿色' },
              { value: 'blue', label: '蓝色' },
            ]}
          />
          <DatePicker placeholder="选择日期" />
        </Space>
      </Card>

      {/* 开关和单选框 */}
      <Card title="开关和单选" style={{ marginBottom: '24px' }}>
        <Space orientation="vertical" size="middle">
          <Space>
            <span>开关：</span>
            <Switch defaultChecked />
            <Switch />
          </Space>
          <Space>
            <span>单选：</span>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">选项A</Radio.Button>
              <Radio.Button value="b">选项B</Radio.Button>
              <Radio.Button value="c">选项C</Radio.Button>
            </Radio.Group>
          </Space>
          <Space>
            <span>复选框：</span>
            <Checkbox>复选框A</Checkbox>
            <Checkbox>复选框B</Checkbox>
            <Checkbox>复选框C</Checkbox>
          </Space>
        </Space>
      </Card>

      {/* 滑块和数字输入 */}
      <Card title="滑块和数字输入" style={{ marginBottom: '24px' }}>
        <Space orientation="vertical" style={{ width: '100%' }} size="middle">
          <div>
            <div style={{ marginBottom: '8px' }}>滑块：</div>
            <Slider defaultValue={30} />
          </div>
          <div>
            <div style={{ marginBottom: '8px' }}>数字输入：</div>
            <InputNumber min={1} max={10} defaultValue={3} />
          </div>
          <div>
            <div style={{ marginBottom: '8px' }}>进度条：</div>
            <Progress percent={70} />
            <Progress percent={100} status="success" />
            <Progress percent={50} status="exception" />
          </div>
        </Space>
      </Card>

      {/* 消息和通知 */}
      <Card title="消息和通知" style={{ marginBottom: '24px' }}>
        <Space wrap>
          <Button onClick={() => showMessage('success')}>成功消息</Button>
          <Button onClick={() => showMessage('error')}>错误消息</Button>
          <Button onClick={() => showMessage('warning')}>警告消息</Button>
          <Button onClick={() => showMessage('info')}>信息消息</Button>
          <Button onClick={showNotification}>显示通知</Button>
          <Button onClick={() => setModalOpen(true)}>显示对话框</Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这条记录吗？"
            onConfirm={() => messageApi.success('已删除')}
          >
            <Button danger>删除确认</Button>
          </Popconfirm>
        </Space>
      </Card>

      {/* 标签和徽章 */}
      <Card title="标签和徽章" style={{ marginBottom: '24px' }}>
        <Space orientation="vertical" size="middle">
          <Space wrap>
            <Tag>默认标签</Tag>
            <Tag color="blue">蓝色标签</Tag>
            <Tag color="green">绿色标签</Tag>
            <Tag color="red">红色标签</Tag>
            <Tag color="orange">橙色标签</Tag>
            <Tag color="purple">紫色标签</Tag>
          </Space>
          <Space wrap>
            <Badge count={5}>
              <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={99}>
              <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={999} overflowCount={99}>
              <Avatar shape="square" size="large" />
            </Badge>
            <Badge dot>
              <Avatar shape="square" size="large" />
            </Badge>
          </Space>
        </Space>
      </Card>

      {/* 提示 */}
      <Card title="提示 Alert" style={{ marginBottom: '24px' }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Alert title="成功提示" type="success" showIcon />
          <Alert title="信息提示" type="info" showIcon />
          <Alert title="警告提示" type="warning" showIcon />
          <Alert title="错误提示" type="error" showIcon />
        </Space>
      </Card>

      {/* 步骤条 */}
      <Card title="步骤条 Steps" style={{ marginBottom: '24px' }}>
        <Steps
          current={1}
          items={[
            {
              title: '完成',
            },
            {
              title: '进行中',
            },
            {
              title: '等待',
            },
          ]}
        />
      </Card>

      {/* 表单 */}
      <Card title="表单 Form" style={{ marginBottom: '24px' }}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, type: 'email', message: '请输入正确的邮箱!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
          >
            <InputNumber min={1} max={120} />
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
          >
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="reset">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 表格 */}
      <Card title="表格 Table" style={{ marginBottom: '24px' }}>
        <Table columns={columns} dataSource={dataSource} />
      </Card>

      {/* 对话框 */}
      <Modal
        title="示例对话框"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>这是一个对话框的内容</p>
        <p>可以在这里放置任何内容</p>
      </Modal>
    </div>
  );
}
