# Mock 数据使用说明

本项目使用 `vite-plugin-mock` 插件来提供 mock 数据服务。

## 目录结构

```
mock/
  ├── user.js          # 用户相关的 mock 接口
  └── README.md        # 使用说明
```

## Mock 文件格式

每个 mock 文件需要导出一个数组，数组中的每个对象代表一个 mock 接口：

```javascript
export default [
  {
    url: '/api/xxx',           // 接口地址
    method: 'get',              // 请求方法：get/post/put/delete 等
    response: () => {           // 响应函数
      return {
        code: 0,
        message: 'success',
        data: {}
      }
    }
  }
]
```

## 使用 mockjs 生成随机数据

如果需要生成随机数据，可以使用 mockjs：

```javascript
import { Random } from 'mockjs'

export default [
  {
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: Random.cname(),      // 随机中文名
          email: Random.email(),     // 随机邮箱
          avatar: Random.image(),    // 随机图片
          id: Random.id()            // 随机ID
        }
      }
    }
  }
]
```

## 接收请求参数

可以通过函数参数接收请求的参数：

```javascript
export default [
  {
    url: '/api/user/:id',
    method: 'get',
    response: ({ query, body, params }) => {
      // query: URL 查询参数
      // body: POST 请求体
      // params: 路径参数
      return {
        code: 0,
        data: {
          id: params.id
        }
      }
    }
  }
]
```

## 延迟响应

模拟网络延迟：

```javascript
export default [
  {
    url: '/api/slow',
    method: 'get',
    timeout: 2000,  // 延迟 2 秒
    response: () => {
      return { code: 0, data: 'slow response' }
    }
  }
]
```

## 更多信息

- [vite-plugin-mock 文档](https://github.com/vbenjs/vite-plugin-mock)
- [mockjs 文档](http://mockjs.com/)
