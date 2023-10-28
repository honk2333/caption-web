import request from '@/helper/request';

export const captionByURL = (params) => {
    return request({
        url: '/caption/nic/captionByURL', method: 'get', params: {
            'url': params
        }
    })

}

export const captionByFile = (params) => {
    return request({
        url: '/caption/nic/captionByFile', method: 'post', data: params, headers: {
            'Content-Type': 'multipart/form-data', // 'Authorization': localStorage.getItem("authorization")
        },
    })
}

export const captionOfOPPO = (params) => {
    return request({
        url: '/caption/oppo/captionByFile', method: 'post', data: params, headers: {
            'Content-Type': 'multipart/form-data', // 'Authorization': localStorage.getItem("authorization")
        },
    })
}


export const TrSensitive = (params) => {
    return request({
        url: '/tr_run', method: 'post', data: params, headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const FindById = (param) => {
    return request({
        url: '/more/FindById', method: 'get', params: {
            'img_id': param
        }
    })
}

export const FindByLine = (param) => {
    return request({
        url: '/more/FindByLine', method: 'get', params: {
            'line_id': param
        }
    })
}

export const ReportLine = (param) => {
    return request({
        url: '/more/ReportLine', method: 'get', params: {
            'line_id': param
        }
    })
}