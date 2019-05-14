import TyAPI from '../../../../../utils/TyAPI'

export default {

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
        return TyAPI.post('lissandra/bvo/productSearch/list', {
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