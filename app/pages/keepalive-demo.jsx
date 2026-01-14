import { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Space, Badge, Typography, Divider } from 'antd';
import { 
  useKeepAliveEffect, 
  useActivated, 
  useDeactivated, 
  useIsActivated 
} from '@/components/KeepAlive';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PageName = 'KeepAlive 生命周期演示';

export function meta() {
  return [
    { title: `${PageName} - ${window.sysTitle}` },
  ];
}

export const handle = {
  pageKey: 'other.keepalive-demo',
  title: PageName,
  menu: {
    title: PageName,
    order: 2,
    level_1: 'other',
    path: '/keepalive-demo',
  },
};

export default function KeepAliveDemo() {
  const [logs, setLogs] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef(null);
  const isActive = useIsActivated();

  // 添加日志
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, message, type }]);
  };

  // 组件首次挂载
  useEffect(() => {
    addLog('✅ 组件首次挂载（useEffect）', 'success');
    
    return () => {
      addLog('❌ 组件卸载（useEffect cleanup）', 'error');
    };
  }, []);

  // 监听激活/失活
  useKeepAliveEffect(
    () => {
      addLog('🔥 页面从缓存中恢复（activated）', 'success');
    },
    () => {
      addLog('💤 页面被隐藏到缓存（deactivated）', 'warning');
    }
  );

  // 仅监听激活
  useActivated(() => {
    addLog('🎯 useActivated 触发', 'success');
  }, []);

  // 仅监听失活
  useDeactivated(() => {
    addLog('⏸️ useDeactivated 触发（保存输入内容）', 'warning');
    if (inputValue) {
      localStorage.setItem('keepalive-demo-draft', inputValue);
      addLog(`💾 已保存草稿: "${inputValue.substring(0, 20)}..."`, 'info');
    }
  }, [inputValue]);

  // 定时器示例
  useEffect(() => {
    if (isActive) {
      // 页面激活时启动定时器
      timerRef.current = setInterval(() => {
        setCounter(prev => prev + 1);
      }, 1000);
      
      addLog('⏰ 定时器已启动', 'info');
      
      return () => {
        clearInterval(timerRef.current);
        addLog('⏰ 定时器已停止', 'info');
      };
    } else {
      // 页面失活时清理定时器
      if (timerRef.current) {
        clearInterval(timerRef.current);
        addLog('⏰ 定时器已停止（页面失活）', 'warning');
      }
    }
  }, [isActive]);

  // 恢复草稿
  useEffect(() => {
    const draft = localStorage.getItem('keepalive-demo-draft');
    if (draft) {
      setInputValue(draft);
      addLog(`📝 已恢复草稿: "${draft.substring(0, 20)}..."`, 'info');
    }
  }, []);

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
    addLog('🗑️ 日志已清空', 'info');
  };

  // 日志颜色
  const getLogColor = (type) => {
    switch (type) {
      case 'success': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#f5222d';
      default: return '#1890ff';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Title level={2}>KeepAlive 生命周期演示</Title>
      <Paragraph>
        这个页面演示了 KeepAlive 的生命周期监听功能。
        切换到其他路由再返回，观察生命周期的变化。
      </Paragraph>

      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {/* 页面状态 */}
        <Card title="页面状态">
          <Space size="large">
            <div>
              <Text strong>当前状态：</Text>
              <Badge 
                status={isActive ? 'processing' : 'default'} 
                text={isActive ? '激活中' : '在缓存中'} 
              />
            </div>
            <div>
              <Text strong>计数器：</Text>
              <Text 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: isActive ? '#52c41a' : '#999'
                }}
              >
                {counter}s
              </Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>
                {isActive ? '(运行中)' : '(已暂停)'}
              </Text>
            </div>
          </Space>
        </Card>

        {/* 自动保存演示 */}
        <Card title="自动保存演示">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text type="secondary">
              在下方输入内容，切换到其他路由时会自动保存，返回时会自动恢复。
            </Text>
            <TextArea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="输入一些文字，然后切换路由试试..."
              rows={4}
            />
            <Button 
              onClick={() => {
                setInputValue('');
                localStorage.removeItem('keepalive-demo-draft');
                addLog('🗑️ 已清空内容和草稿', 'info');
              }}
            >
              清空内容
            </Button>
          </Space>
        </Card>

        {/* 生命周期日志 */}
        <Card 
          title="生命周期日志" 
          extra={<Button size="small" onClick={clearLogs}>清空日志</Button>}
        >
          <div 
            style={{ 
              maxHeight: '400px', 
              overflow: 'auto',
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px'
            }}
          >
            {logs.length === 0 ? (
              <Text type="secondary">暂无日志</Text>
            ) : (
              logs.map((log, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '4px',
                    color: getLogColor(log.type)
                  }}
                >
                  <Text type="secondary">[{log.time}]</Text> {log.message}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* 使用说明 */}
        <Card title="使用说明">
          <Space direction="vertical" size="small">
            <Text>1. 观察页面首次加载时的生命周期日志</Text>
            <Text>2. 在文本框中输入一些内容</Text>
            <Text>3. 点击菜单切换到其他路由（如：用户管理）</Text>
            <Text>4. 观察"deactivated"生命周期触发，内容自动保存</Text>
            <Text>5. 再切换回当前页面</Text>
            <Text>6. 观察"activated"生命周期触发，内容自动恢复</Text>
            <Text>7. 注意计数器在页面失活时暂停，激活时继续</Text>
          </Space>
          
          <Divider />
          
          <Title level={5}>代码示例</Title>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`import { 
  useKeepAliveEffect, 
  useActivated, 
  useDeactivated,
  useIsActivated 
} from '@/components/KeepAlive';

// 监听激活和失活
useKeepAliveEffect(
  () => console.log('页面激活'),
  () => console.log('页面失活')
);

// 仅监听激活
useActivated(() => {
  console.log('页面从缓存恢复');
}, []);

// 仅监听失活（自动保存）
useDeactivated(() => {
  saveDraft(content);
}, [content]);

// 获取激活状态
const isActive = useIsActivated();`}
          </pre>
        </Card>
      </Space>
    </div>
  );
}
