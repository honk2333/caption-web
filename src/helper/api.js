import request from '@/helper/request';

export const captionByURL = (params) => {
    return request({
        url: '/caption/nic/captionByURL',
        method: 'get',
        params: {
            'url':params
        }
    })
  
}

export const captionByFile = (params) => {
    return request({
        url: '/caption/nic/captionByFile',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': localStorage.getItem("authorization")
        },
    })
}

export const captionOfOPPO = (params) => {
    return request({
        url: '/caption/oppo/captionByFile',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': localStorage.getItem("authorization")
        },
    })
}


export const TrSensitive = (params) => {
    return request({
        url: '/tr_run',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}