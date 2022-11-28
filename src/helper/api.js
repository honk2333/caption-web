import request from '@/helper/request';

export const captionByURL = (params) => {
    return request({
        url: '/caption/captionByURL',
        method: 'get',
        params: {
            'url':params
        }
    })
  
}

export const captionByFile = (params) => {
    return request({
        url: '/caption/captionByFile',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': localStorage.getItem("authorization")
        },
    })
}