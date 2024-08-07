import { count } from "console";
import interface_list from "../src/pages/setting/interface_list";

export default {
  'POST /api/login': (req: any, res: any) => {
    const { username, password } = req.body
    if (username != 'admin' || password != 'admin') {
      res.json({
        code: -1,
        error_description: '用户名或者密码错误！'
      })
    } else {
      res.json({
        code: 200,
        data: {
          token: 'd5e22e7eceb1f160e88a709012c4ca120fe765ff',
        }
      });
    }

  },
  'POST /api/logout': (req: any, res: any) => {
    res.json({
      code: 200,
    });
  },
  'POST /api/getUserInfo': (req: any, res: any) => {
    const { token } = req.body
    if (token) {
      res.json({
        code: 200,
        data: {
          user_info: {
            realname: '测试用户',
            username: 'test',
          },
          auth_api_list: [
            '/api/getApiList',
            '/api/storeApi',
            '/api/roleSelect',
            '/api/getApiInfo',
          ]
        }
      });
    } else {
      res.json({
        code: 401,
      })
    }
  },
  'POST /api/getApiList': (req: any, res: any) => {
    res.json({
      code: 200,
      data: [
        { route: '/api/getApiList', name: '接口清单', description: '这是个接口', count: 20 },
        { route: '/api/addApi', name: '接口清单', description: '这是个接口', count: 30 },
        { route: '/api/editApi', name: '接口清单', description: '这是个接口', count: 30 },
        { route: '/api/getApiMenuInfo', name: '接口清单', description: '这是个接口', count: 30 },
      ]
    })
  },
  'POST /api/storeApi': (req: any, res: any) => {
    res.json({
      code: 200,
      data: {}
    })
  },
  'POST /api/getApiInfo': (req: any, res: any) => {
    res.json({
      code: 200,
      data: {
        route: '/api/getApiList',
        name: '接口清单',
        description: '这是个接口',
        role_ids: [1, 25, 66]
      }
    })
  },
  'POST /api/roleSelect': (req: any, res: any) => {
    res.json({
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
    })
  },
  'POST /api/roleList': (req: any, res: any)=>{
    res.json({
      code: 200,
      data: [
        { role_id: 1, role_name: "超级管理员", status: 1, users: 10 },
        { role_id: 25, role_name: "测试", status: 1, users: 10 },
        { role_id: 50, role_name: "设计师", status: 1, users: 10 },
        { role_id: 51, role_name: "优化师", status: 0, users: 10 },
        { role_id: 69, role_name: "渠道运营", status: 0, users: 10 },
      ]
    })
  },
  'POST /api/roleStore': (req: any, res: any)=>{
    res.json({
      code: 200
    })
  },
  'POST /api/roleInfo':(req:any,res:any)=>{
    res.json({
      code:200,
      data:{
        role_id:1,
        role_name: "超级管理员", 
        status: 1,
        interface_list:[
          '/api/getApiList',
          '/api/storeApi',
          '/api/roleSelect',
          '/api/getApiInfo',
        ]
      }
    })
  }
};
