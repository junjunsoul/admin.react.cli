import { notification,message } from 'antd';
import { history } from '@umijs/max';
import { deepCopy } from '@/utils';
import Qs from 'qs';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}`,
    duration:null,
    description: errortext,
  });
  return response
};

export default function request(url, option) {
  const defaultOptions = {
    credentials: 'include',
    withCredentials: true,
    expirys: false,
  };
  const newOptions = { ...defaultOptions, ...option };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      const result = response.json();
      deepCopy(result).then(res => {
        if (res.code!==200) {
          //token丢失
          if (res.code === 10000 || res.code == 401) {
            message.error('登录信息已过期，请重新登录！')
            const { search, pathname } = window.location;
            const urlParams = new URL(window.location.href).searchParams;
            const redirect = urlParams.get('redirect');
            if (window.location.pathname !== '/user/login' && !redirect) {
              history.replace({
                pathname: '/user/login',
                search: Qs.stringify({
                  redirect: pathname + search,
                }),
              })
            }
          } else {
            notification.error({
              message: `错误码 ${res.code}`,
              duration:null,
              description: res.error_description,
            });
          }
        }
      });
      return result;
    }).catch((error) => {
      console.log(error);
    });
}
export const post = (url, params) => {
  const token = localStorage.getItem('token')
  if (params instanceof FormData) {
    params.append('token', token)
  } else {
    params = {
      token,
      ...params,
    };
  }
  return request(url, {
    method: 'POST',
    body: params
  })
}