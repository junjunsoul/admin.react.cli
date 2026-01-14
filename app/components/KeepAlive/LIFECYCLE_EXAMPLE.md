# KeepAlive 生命周期监听

## 📖 功能说明

KeepAlive 提供了类似 Vue 的 `activated` / `deactivated` 生命周期钩子，让你能够监听页面从缓存恢复或被隐藏。

## 🎯 使用场景

### 场景 1：页面恢复时刷新数据
```jsx
import { useActivated } from '@/components/KeepAlive';

function UserList() {
  const [users, setUsers] = useState([]);
  
  // 首次进入时加载数据
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  // 每次从缓存恢复时重新加载数据
  useActivated(() => {
    console.log('页面从缓存恢复，刷新数据');
    fetchUsers().then(setUsers);
  }, []);
  
  return <div>{/* 渲染用户列表 */}</div>;
}
```

### 场景 2：暂停/恢复定时器
```jsx
import { useKeepAliveEffect } from '@/components/KeepAlive';

function Dashboard() {
  const timerRef = useRef(null);
  
  // 启动定时器
  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('定时刷新数据');
      fetchData();
    }, 5000);
    
    return () => clearInterval(timerRef.current);
  }, []);
  
  // 监听激活/失活
  useKeepAliveEffect(
    () => {
      // 页面恢复时重启定时器
      console.log('页面激活，重启定时器');
      timerRef.current = setInterval(() => {
        fetchData();
      }, 5000);
    },
    () => {
      // 页面隐藏时清除定时器
      console.log('页面失活，清除定时器');
      clearInterval(timerRef.current);
    }
  );
  
  return <div>{/* 渲染仪表盘 */}</div>;
}
```

### 场景 3：保存草稿
```jsx
import { useDeactivated } from '@/components/KeepAlive';

function ArticleEditor() {
  const [content, setContent] = useState('');
  
  // 页面被隐藏时自动保存草稿
  useDeactivated(() => {
    console.log('页面失活，保存草稿');
    saveDraft(content);
  }, [content]);
  
  return (
    <textarea 
      value={content} 
      onChange={e => setContent(e.target.value)} 
    />
  );
}
```

### 场景 4：条件渲染
```jsx
import { useIsActivated } from '@/components/KeepAlive';

function VideoPlayer() {
  const isActive = useIsActivated();
  
  return (
    <div>
      {isActive ? (
        <video autoPlay>视频播放</video>
      ) : (
        <div>视频已暂停（页面在缓存中）</div>
      )}
    </div>
  );
}
```

## 🔧 API 参考

### 1. useKeepAliveEffect
监听页面激活和失活事件。

```typescript
useKeepAliveEffect(
  onActivated?: () => void,   // 页面从缓存恢复时调用
  onDeactivated?: () => void  // 页面被隐藏到缓存时调用
): void
```

**示例：**
```jsx
useKeepAliveEffect(
  () => {
    console.log('页面激活');
    // 重新请求数据、重启定时器等
  },
  () => {
    console.log('页面失活');
    // 暂停定时器、保存状态等
  }
);
```

### 2. useActivated
仅监听页面激活事件。

```typescript
useActivated(
  callback: () => void,
  deps?: any[]
): void
```

**示例：**
```jsx
useActivated(() => {
  // 页面从缓存恢复时执行
  fetchLatestData();
}, []);

// 带依赖
useActivated(() => {
  fetchData(userId);
}, [userId]);
```

### 3. useDeactivated
仅监听页面失活事件。

```typescript
useDeactivated(
  callback: () => void,
  deps?: any[]
): void
```

**示例：**
```jsx
useDeactivated(() => {
  // 页面被隐藏到缓存时执行
  saveFormData();
}, [formData]);
```

### 4. useIsActivated
获取当前页面是否激活。

```typescript
useIsActivated(): boolean
```

**示例：**
```jsx
const isActive = useIsActivated();

// 根据状态显示不同内容
if (isActive) {
  return <ActiveContent />;
} else {
  return <InactiveContent />;
}
```

## 📊 生命周期对比

| React 生命周期 | KeepAlive 生命周期 | 触发时机 |
|---------------|-------------------|---------|
| useEffect mount | useEffect | 首次挂载 |
| - | useActivated | 从缓存恢复 |
| - | useDeactivated | 隐藏到缓存 |
| useEffect cleanup | useEffect cleanup | 组件卸载（非缓存页） |

## 🎨 完整示例

### 示例 1：列表页 + 详情页

```jsx
// pages/UserList.jsx
import { useActivated } from '@/components/KeepAlive';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 首次加载
  useEffect(() => {
    loadUsers();
  }, []);
  
  // 从详情页返回时刷新列表
  useActivated(() => {
    console.log('返回列表页，刷新数据');
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };
  
  return (
    <div>
      {loading && <Spin />}
      {users.map(user => (
        <Link key={user.id} to={`/users/${user.id}`}>
          {user.name}
        </Link>
      ))}
    </div>
  );
}

// pages/UserDetail.jsx
import { useDeactivated } from '@/components/KeepAlive';

function UserDetail() {
  const [formData, setFormData] = useState({});
  
  // 离开详情页时保存草稿
  useDeactivated(() => {
    console.log('离开详情页，保存草稿');
    saveDraft(formData);
  }, [formData]);
  
  return (
    <Form
      value={formData}
      onChange={setFormData}
    />
  );
}
```

### 示例 2：实时监控页

```jsx
import { useKeepAliveEffect, useIsActivated } from '@/components/KeepAlive';

function MonitoringDashboard() {
  const [data, setData] = useState([]);
  const wsRef = useRef(null);
  const isActive = useIsActivated();
  
  // WebSocket 连接管理
  useKeepAliveEffect(
    () => {
      // 页面激活时建立连接
      console.log('建立 WebSocket 连接');
      wsRef.current = new WebSocket('ws://example.com');
      wsRef.current.onmessage = (e) => {
        setData(JSON.parse(e.data));
      };
    },
    () => {
      // 页面失活时断开连接
      console.log('断开 WebSocket 连接');
      wsRef.current?.close();
    }
  );
  
  return (
    <div>
      <Badge status={isActive ? 'processing' : 'default'}>
        {isActive ? '实时监控中' : '已暂停'}
      </Badge>
      <Chart data={data} />
    </div>
  );
}
```

### 示例 3：表单自动保存

```jsx
import { useDeactivated } from '@/components/KeepAlive';

function ArticleEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [autoSaved, setAutoSaved] = useState(false);
  
  // 自动保存（每 30 秒）
  useEffect(() => {
    const timer = setInterval(() => {
      saveDraft({ title, content });
      setAutoSaved(true);
    }, 30000);
    
    return () => clearInterval(timer);
  }, [title, content]);
  
  // 离开页面时保存
  useDeactivated(() => {
    saveDraft({ title, content });
    message.success('草稿已保存');
  }, [title, content]);
  
  return (
    <div>
      <Input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="标题"
      />
      <TextArea 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="内容"
        rows={20}
      />
      {autoSaved && <Text type="secondary">已自动保存</Text>}
    </div>
  );
}
```

## ⚠️ 注意事项

### 1. 依赖数组
`useActivated` 和 `useDeactivated` 支持依赖数组，行为类似 `useEffect`：

```jsx
// ✅ 推荐：明确指定依赖
useActivated(() => {
  fetchData(userId);
}, [userId]);

// ⚠️ 注意：空依赖数组表示只在激活时执行一次
useActivated(() => {
  fetchData();
}, []);
```

### 2. 首次挂载
`useKeepAliveEffect` / `useActivated` **不会在首次挂载时触发**，只在从缓存恢复时触发。

如果需要首次挂载时也执行，结合 `useEffect`：

```jsx
// 首次挂载 + 缓存恢复都执行
const loadData = () => fetchData();

useEffect(() => {
  loadData(); // 首次挂载
}, []);

useActivated(() => {
  loadData(); // 缓存恢复
}, []);
```

### 3. 清理工作
在 `useDeactivated` 中进行清理时，确保资源正确释放：

```jsx
useKeepAliveEffect(
  () => {
    // 创建资源
    const timer = setInterval(fetchData, 1000);
    timerRef.current = timer;
  },
  () => {
    // 清理资源
    clearInterval(timerRef.current);
  }
);
```

## 💡 最佳实践

### ✅ 推荐做法

1. **数据刷新**
```jsx
// 从详情页返回列表时刷新
useActivated(() => {
  fetchList();
}, []);
```

2. **暂停动画/视频**
```jsx
useKeepAliveEffect(
  () => videoRef.current?.play(),
  () => videoRef.current?.pause()
);
```

3. **保存表单状态**
```jsx
useDeactivated(() => {
  localStorage.setItem('draft', JSON.stringify(formData));
}, [formData]);
```

### ❌ 避免的做法

1. **在激活时做过重的操作**
```jsx
// ❌ 不好：每次激活都重新初始化
useActivated(() => {
  initializeApp(); // 很重的操作
}, []);

// ✅ 好：只在必要时刷新
useActivated(() => {
  refreshData(); // 轻量级操作
}, []);
```

2. **忘记清理副作用**
```jsx
// ❌ 不好：定时器没有清理
useActivated(() => {
  setInterval(() => {}, 1000);
}, []);

// ✅ 好：正确清理
useKeepAliveEffect(
  () => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer);
  },
  null
);
```

## 🎉 总结

KeepAlive 生命周期 Hooks 提供了：
- ✅ 监听页面激活/失活状态
- ✅ 在合适的时机刷新数据
- ✅ 优化性能（暂停不必要的操作）
- ✅ 改善用户体验（自动保存等）

结合缓存功能，让你的应用更加智能和高效！🚀
