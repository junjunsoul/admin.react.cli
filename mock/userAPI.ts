export default {
  'POST /api/login': (req: any, res: any) => {
    const { username,password } = req.body
    if(username!='admin'||password!='admin'){
      res.json({
        code:-1,
        error_description:'用户名或者密码错误！'
      })
    }else{
      res.json({
        code:200,
        data:{
          token:'d5e22e7eceb1f160e88a709012c4ca120fe765ff',
        }
      });      
    }

  },
  'POST /api/logout': (req: any, res: any) => {
    res.json({
      code:200,
    });
  },
  'POST /api/getUserInfo': (req: any, res: any) => {
    const { token } = req.body
    if(token){
      res.json({
        code:200,
        data:{
          user_info:{
            realname:'测试用户',
            username:'test',
          },
          auth_api_list:[
            '/api/getApiList',
            '/api/addApi',
            '/api/editApi',
            '/api/getApiMenuInfo'
          ]
        }
      });      
    }else{
      res.json({
        code:401,
      })
    }
  },
  'POST /api/getApiList':(req:any,res:any)=>{
    res.json({
      code:200,
      data:[
        { route:'/api/getApiList',name:'接口清单',description:''},
        { route:'/api/addApi',name:'接口清单',description:''},
        { route:'/api/editApi',name:'接口清单',description:''},
        { route:'/api/getApiMenuInfo',name:'接口清单',description:''},
      ]
    })
  }
};
