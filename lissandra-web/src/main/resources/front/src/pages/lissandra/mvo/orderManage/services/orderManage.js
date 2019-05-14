import TyAPI from '../../../../../utils/TyAPI'

export default {
    list({
             productOrderId,
             productId,
             productOrderNo,
             userId,
             userName,
             sendInformation,
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('lissandra/mvo/orderManage/list', {
            productOrderId: productOrderId || '',
            productId: productId || '',
            productOrderNo: productOrderNo || '',
            userId: userId || '',
            userName: userName || '',
            sendInformation: sendInformation || '',
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
        })
    }
}