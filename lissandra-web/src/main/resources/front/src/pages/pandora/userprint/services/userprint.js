import TyAPI from '../../../../utils/TyAPI'

export default {

    list({
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
             appId,             //Long,
             startTime,
             endTime,
             userId,
             userName,
             appName,
             loginTime,
             printId,
         } = {}) {
        return TyAPI.post('pandora/userprint/list', {
            pageCurrent: pageCurrent || '',        // int,    当前页, 从 1 开始
            pageSize: pageSize || '',           // int,    页容量
            appId: appId || '',
            appName:appName || '',
            loginTime:loginTime || '',
            printId:printId || '',             //主键，自增长
            userId: userId || '',
            userName: userName || '',
            startTime: startTime || '',
            endTime: endTime || '',

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