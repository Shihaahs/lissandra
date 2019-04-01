import TyAPI from '../../../../../utils/TyAPI'

export default {

    recharge({
            walletOrderId,
            walletId,
            walletOrderNo,
            walletOrderState,
            walletOrderWay,
            walletOrderMoney,
            recharge,
            gmtModified,
            userName,
            userId,
        } = {}) {
        return TyAPI.post('lissandra/bvo/walletManage/recharge', {
            walletOrderId: walletOrderId || '',
            walletOrderNo: walletOrderNo || '',
            walletOrderState: walletOrderState || '',
            walletOrderWay: walletOrderWay || '',
            walletOrderMoney: walletOrderMoney || '',
            recharge: recharge || '',
            gmtModified: gmtModified || '',
            userId: userId || '',
            userName: userName || '',
        })
    },
    withdraw({
                  walletOrderId,
                  walletId,
                  walletOrderNo,
                  walletOrderState,
                  walletOrderWay,
                 walletOrderMoney,
                  withdraw,
                  gmtModified,
                  userName,
                  userId,
              } = {}) {
        return TyAPI.post('lissandra/bvo/walletManage/withdraw', {
            walletOrderId: walletOrderId || '',
            walletOrderNo: walletOrderNo || '',
            walletOrderState: walletOrderState || '',
            walletOrderWay: walletOrderWay || '',
            walletOrderMoney: walletOrderMoney || '',
            withdraw: withdraw || '',
            gmtModified: gmtModified || '',
            userId: userId || '',
            userName: userName || '',
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
        return TyAPI.post('lissandra/bvo/walletManage/list', {
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
    },
    balance({
                userId,
                walletId,
                balance
                } = {}) {
        return TyAPI.post('lissandra/bvo/walletManage/balance', {
            userId: userId || '',
            walletId: walletId || '',
            balance: balance || '',
        })
    }
}