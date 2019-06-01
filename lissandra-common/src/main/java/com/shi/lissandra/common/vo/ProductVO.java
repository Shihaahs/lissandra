package com.shi.lissandra.common.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @Package com.shi.lissandra.common.vo
 * @Author: Shihaahs
 * @Date: 2019/6/1 10:52
 * @Copyright: 2018-2099  Shihaahs - For Java.
 * @Description:
 */

@Data
public class ProductVO implements Serializable {


    /**
     * 产品订单
     */
    private Long productId;

    /**
     * 产品名称
     */
    private String productName;

    /**
     * 产品数量
     */
    private String productQuantity;
    /**
     * 产量价格
     */
    private String productPrice;


}
