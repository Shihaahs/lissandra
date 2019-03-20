import TyAPI from '../../../../utils/TyAPI'

export default {
    add({
            appId,
            appName,
            pageName,
            pageUrl,
        } = {}) {
        return TyAPI.post('pandora/burypoint/add', {
            appId: appId || '',
            appName: appName || '',
            pageName: pageName || '',
            pageUrl: pageUrl || '',
        })
    },
    delete({
               pointId    // int, 主键 ID
           }) {
        return TyAPI.post('pandora/burypoint/delete', {
            pointId
        })
    },


    update({
               pointId,
               pageNo,
               appId,
               appName,
               pageName,
               pageUrl,
           } = {}) {
        return TyAPI.post('pandora/burypoint/update', {
            pointId: pointId || '',
            appId: appId || '',
            appName: appName || '',
            pageNo: pageNo || '',
            pageName: pageName || '',
            pageUrl: pageUrl || '',
        })
    },
    list({
             appId,
             appName,
             pageNo,
             pageName,
             pageUrl,
             pointId,              //主键，自增长
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('pandora/burypoint/list', {
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
            appId: appId || '',
            appName: appName || '',
            pageNo: pageNo || '',
            pageName: pageName || '',
            pageUrl: pageUrl || '',
            pointId: pointId || '',
        })
    },
    applist({
                   appId,
                   appName,
               } = {}) {
        return TyAPI.get('public/find/myapp', {
            appId: appId || '',
            appName: appName || '',

        })
    }
}