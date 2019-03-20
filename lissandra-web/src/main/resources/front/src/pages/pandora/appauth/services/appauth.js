import TyAPI from '../../../../utils/TyAPI'

export default {
    add({
            appId,
            appName,
            userId,
            userName,
        } = {}) {
        return TyAPI.post('pandora/appauth/add', {
            appId: appId || '',
            appName: appName || '',
            userId: userId || '',
            userName: userName || '',
        })
    },
    delete({
               appAuthId
           }) {
        return TyAPI.post('pandora/appauth/delete', {
            appAuthId: appAuthId
        })
    },
    list({
             appId,
             appName,
             userId,
             userName,
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('pandora/appauth/list', {
            appId: appId || '',
            appName: appName || '',
            userId: userId || '',
            userName: userName || '',
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
        })
    },
    applist({
                appId,
                appName,
            } = {}) {
        return TyAPI.get('pandora/appauth/allapp', {})
    },
}