import api from './api'
import comm from './comm'
import setting from './setting'
import { post } from '@/utils/request';
const urlObj = {
    api,
    comm,
    setting
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

export function getPath(url){
    let arr = url.split('.')
    let tag = arr[0]
    let path = arr[1]
    if(!tag||!path){
        throw new Error(`${url}->url格式错误,正确格式 api.xxx 或者 setting.xxx`)
    }
    let obj = urlObj[tag]||{}
    return obj[path]?.url
}