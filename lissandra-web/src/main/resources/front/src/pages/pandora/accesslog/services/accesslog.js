import TyAPI from '../../../../utils/TyAPI'

export default {
    get({
            logExtId,
            logId,
            appId,
            userId,
            pageNo,
            pageName,
            extFieldJson,
        } = {}) {
        return TyAPI.post('pandora/accesslog/get', {
            logExtId: '',
            logId: logId || '',
            appId: '',
            userId: '',
            pageNo: '',
            pageName: '',
            extFieldJson: '',
        })
    },
    list_login({
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
        return TyAPI.post('pandora/accesslog/list_login', {
            pageCurrent: pageCurrent || '',        // int,    当前页, 从 1 开始
            pageSize: pageSize || '',           // int,    页容量
            appId: appId || '',
            appName: appName || '',
            loginTime: loginTime || '',
            printId: printId || '',             //主键，自增长
            userId: userId || '',
            userName: userName || '',
            startTime: startTime || '',
            endTime: endTime || '',

        })
    },
    list({
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
             appId,
             appName,
             curUrl,            //当前页
             deviceId,
             logId,             //主键，自增长
             pageNo,             //页面编号
             pageName,             //页面编号
             refUrl,            //上一跳
             sourceIp,	        //string     来源ip
             spmId,	            //int
             userId,	        //int
             userName,
             visitTime,	         //string
             startTime,	         //string
             endTime,	         //string

         } = {}) {
        return TyAPI.post('pandora/accesslog/list', {
            pageCurrent: pageCurrent || '',        // int,    当前页, 从 1 开始
            pageSize: pageSize || '',           // int,    页容量
            logId: logId || '',
            appId: appId || '',
            appName: appName || '',
            curUrl: curUrl || '',
            deviceId: deviceId || '',
            pageNo: pageNo || '',
            pageName: pageName || "",
            refUrl: refUrl || '',
            sourceIp: sourceIp || '',	        //string
            spmId: spmId || '',	            //integer($int64)
            userId: userId || '',	        //integer($int64)
            userName: userName || '',	        //integer($int64)
            visitTime: visitTime || '',	         //string
            startTime: startTime || '',	         //string
            endTime: endTime || '',	         //string

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