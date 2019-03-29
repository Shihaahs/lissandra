import TyAPI from '../../../../../utils/TyAPI'

export default {
    add({
            isShelf,
            productDescription,
            productId,
            productImage,
            productManufactureId,
            productManufactureName,
            productName,
            productPrice
        } = {}) {
        return TyAPI.post('lissandra/mvo/productManage/add', {
            isShelf: isShelf || '',
            productDescription: productDescription || '',
            productId: productId || '',
            productManufactureId: productManufactureId || '',
            productManufactureName: productManufactureName || '',
            productName: productName || '',
            productPrice: productPrice || '',
        })
    },
    list({
             walletOrderId,
             walletId,
             walletOrderNo,
             walletOrderState,
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