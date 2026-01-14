export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: any) => {
      const { account, password } = body
      if (account != 'admin' || password != 'admin') {
        return {
          code: -1,
          error_description: '用户名或者密码错误！'
        }
      } else {
        return {
          code: 200,
          data: {
            token: 'd5e22e7eceb1f160e88a709012c4ca120fe765ff',
          }
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
      }
    }
  },
  {
    url: '/api/user/info',
    method: 'post',
    response: ({ body }: any) => {
      const { token } = body
      if (token) {
        return {
          code: 200,
          data: {
            user:{
              "account": "ljx@eyugame.com",
              "nick_name": "木梨",
              "real_name": "林",
              "avatar_url": "https://vo-manju-cdn.9yuconnect.com/playlet_test/image/019aa42e40ce7027ac31bfbeb56995f2.webp",
            },
            permissions: [
              '/api/getApiList',
              '/api/storeApi',
              '/api/roleSelect',
              '/api/getApiInfo',
              '/api/roleList',
              '/api/roleStore',
              '/api/roleInfo',
              '/api/roleAuthInfo',
            ]
          }
        }
      } else {
        return {
          code: 401,
        }
      }
    }
  },
  {
    url: '/api/getApiList',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: [
          { route: '/api/getApiList', name: '接口清单', description: '这是个接口', count: 20 },
          { route: '/api/addApi', name: '接口清单', description: '这是个接口', count: 30 },
          { route: '/api/editApi', name: '接口清单', description: '这是个接口', count: 30 },
          { route: '/api/getApiMenuInfo', name: '接口清单', description: '这是个接口', count: 30 },
        ]
      }
    }
  },
  {
    url: '/api/storeApi',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {}
      }
    }
  },
  {
    url: '/api/getApiInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          route: '/api/getApiList',
          name: '接口清单',
          description: '这是个接口',
          role_ids: [1, 25, 66]
        }
      }
    }
  },
  {
    url: '/api/roleSelect',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: [
          { role_id: 1, role_name: "超级管理员" },
          { role_id: 25, role_name: "测试" },
          { role_id: 50, role_name: "设计师" },
          { role_id: 51, role_name: "优化师", },
          { role_id: 52, role_name: "推广技术部" },
          { role_id: 64, role_name: "新人组长" },
          { role_id: 65, role_name: "渠道采购" },
          { role_id: 66, role_name: "数据专员" },
          { role_id: 67, role_name: "SDK开发" },
          { role_id: 68, role_name: "素材管理1" },
          { role_id: 69, role_name: "渠道运营" },
        ]
      }
    }
  },
  {
    url: '/api/roleList',
    method: 'post',
    response: ({ body }: any) => {
      const { startRow = 0, endRow = 100 } = body || {}
      
      // 生成1000条角色数据
      const roleNames = [
        "超级管理员", "测试", "设计师", "优化师", "渠道运营",
        "推广技术部", "新人组长", "渠道采购", "数据专员", "SDK开发",
        "素材管理", "产品经理", "运维工程师", "前端开发", "后端开发",
        "UI设计师", "测试工程师", "项目经理", "商务专员", "客服专员"
      ]
      
      const allData: Array<{ role_id: number; role_name: string; status: number; users: number }> = []
      for (let i = 1; i <= 1000; i++) {
        const roleNameTemplate = roleNames[i % roleNames.length]
        allData.push({
          role_id: i,
          role_name: i <= roleNames.length ? roleNameTemplate : `${roleNameTemplate}${Math.floor(i / roleNames.length)}`,
          status: Math.random() > 0.3 ? 1 : 0, // 70% 启用状态
          users: Math.floor(Math.random() * 50) + 1 // 1-50个用户
        })
      }
      
      // 分页数据
      const pageData = allData.slice(startRow, endRow)
      
      // 计算总用户数
      const totalUsers = allData.reduce((sum, item) => sum + item.users, 0)
      
      return {
        code: 200,
        recurdsTotal: 1000,
        data: pageData,
        total: { role_name: '汇总', users: totalUsers },
      }
    }
  },
  {
    url: '/api/roleStore',
    method: 'post',
    response: () => {
      return {
        code: 200
      }
    }
  },
  {
    url: '/api/roleInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          role_id: 1,
          role_name: "超级管理员",
          status: 1
        }
      }
    }
  },
  {
    url: '/api/roleAuthInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          role_id: 1,
          role_name: "超级管理员",
          permissions: [
            '/api/getApiList',
            '/api/storeApi',
            '/api/roleList',
            '/api/roleSelect',
            '/api/getApiInfo',
            '/api/roleAuthInfo'
          ]
        }
      }
    }
  },
];
