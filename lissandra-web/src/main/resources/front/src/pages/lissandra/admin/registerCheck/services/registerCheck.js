import TyAPI from '../../../../../utils/TyAPI'

export default {
    approval({
               userId,
               isApproval
           } = {}) {
        return TyAPI.post('lissandra/admin/registerCheck/approval', {
            userId: userId,
            isApproval: isApproval,
        })
    },
    list({
             userId,
             userName,
             password,
             phone,
             permission,
             isApproval,
             gmtCreate,
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('lissandra/admin/registerCheck/check', {
            userId: userId || '',
            userName: userName || '',
            password: password || '',
            phone: phone || '',
            permission: permission || '',
            isApproval: isApproval || '',
            gmtCreate: gmtCreate || '',
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
        })
    }
}