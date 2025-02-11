import api from './api'
import setting from './setting'
import { post } from '@/utils/request';
const urlObj = {
    api,
    setting,
}
export function transferPost(url,params){
    let arr = url.split('.')
    let tag = arr[0]
    let path = arr[1]
    if(!tag||!path){
        throw new Error(`${url}->url格式错误,正确格式 api.xxx 或者 setting.xxx`)
    }
    let obj = urlObj[tag]||{}
    let curUrl = obj[path]?.url
    if(!curUrl){
        throw new Error(`${url}->url不存在`)
    }
    return post(curUrl,params)
}