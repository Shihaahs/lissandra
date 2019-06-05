package com.shi.lissandra.service.core;

import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.common.vo.ProductOrderVO;
import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.domain.ProductOrder;


public interface MVOService {

    /**
     * <p> 获取品牌商-订单信息 </p>
     * @param pageRequestDTO 分页条件参数
     * @return PageResult<Product>
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:32 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    PageResult<ProductOrderVO> findMVOAllOrder(PageRequestDTO pageRequestDTO);

    /**
     * <p> 获取品牌商-商品信息 </p>
     * @param pageRequestDTO 分页条件参数
     * @return PageResult<Product>
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:32 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    PageResult<Product> findMVOAllProduct(PageRequestDTO pageRequestDTO);

    /**
     * <p> 录入商品 </p>
     * @param product 商品数据，默认未上架
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:33 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer addMVOProduct(Product product);

    /**
     * <p> 逻辑删除商品 </p>
     * @param product 传入商品id
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:34 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer deleteMVOProduct(Product product);

    /**
     * <p> 修改商品信息 </p>
     * @param product 修改后的商品数据
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:34 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer updateMVOProductInfo(Product product);

    /**
     * <p> 更改商品上架状态 </p>
     * @param product 默认不上架，状态置反
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/13 3:34 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer updateMVOProductIsShelf(Product product);


    Integer getMVOOrder(Long userId);




}
