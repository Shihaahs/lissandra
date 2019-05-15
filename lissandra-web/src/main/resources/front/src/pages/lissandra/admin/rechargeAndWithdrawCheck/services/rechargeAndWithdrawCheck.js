import TyAPI from '../../../../../utils/TyAPI'

export default {
    update({
              walletOrderId,
              walletOrderState,
           } = {}) {
        return TyAPI.post('lissandra/admin/rechargeAndWithdrawCheck/update', {
            walletOrderId: walletOrderId || '',
            walletOrderState: walletOrderState,
        })
    },
    list({
             walletOrderId,
             walletId,
             walletOrderNo,
             walletOrderState,
             walletOrderWay,
             recharge,
             withdraw,
             gmtModified,
             userName,
             userId,
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('lissandra/admin/rechargeAndWithdrawCheck/check', {
            walletOrderId: walletOrderId || '',
            walletOrderNo: walletOrderNo || '',
            walletOrderState: walletOrderState || '',
            walletOrderWay: walletOrderWay || '',
            recharge: recharge || '',
            withdraw: withdraw || '',
            gmtModified: gmtModified || '',
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
            userId: userId || '',
            userName: userName || '',
        })
    }
}