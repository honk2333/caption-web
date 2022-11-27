import request from '@/helper/request';

export const captionByURL = (params) => {
    return request({
        url: '/caption/captionByURL',
        method: 'get',
        params: params
    })
  
}

export const captionByFile = (params) => {
    return request({
        url: '/caption/captionByFile',
        method: 'post',
        params: params
    })
}