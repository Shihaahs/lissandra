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
    delete({
               productId    // int, 主键 ID
           }) {
        return TyAPI.post('lissandra/mvo/productManage/delete', {
            productId
        })
    },
    update({
               isShelf,
               productDescription,
               productId,
               productImage,
               productName,
               productPrice
           } = {}) {
        return TyAPI.post('lissandra/mvo/productManage/update', {
            isShelf: isShelf || '',
            productDescription: productDescription || '',
            productId: productId || '',
            productName: productName || '',
            productPrice: productPrice || '',
        })
    },
    shelf({
              productId,
              isShelf
           } = {}) {
        return TyAPI.post('lissandra/mvo/productManage/shelf', {
            productId: productId,
            isShelf: isShelf,
        })
    },
    list({
             isShelf,
             productDescription,
             productId,
             productImage,
             productManufactureId,
             productManufactureName,
             productName,
             productPrice,
             userId,
             pageCurrent,        // int,    当前页, 从 1 开始
             pageSize,           // int,    页容量
         } = {}) {
        return TyAPI.post('lissandra/mvo/productManage/list', {
            isShelf: isShelf || '',
            productDescription: productDescription || '',
            productId: productId || '',
            productManufactureId: productManufactureId || '',
            productManufactureName: productManufactureName || '',
            productName: productName || '',
            productPrice: productPrice || '',
            pageCurrent: pageCurrent || '',
            pageSize: pageSize || '',
            userId: userId || '',
        })
    }
}