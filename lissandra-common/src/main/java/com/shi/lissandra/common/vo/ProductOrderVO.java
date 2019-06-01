package com.shi.lissandra.common.vo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @Package com.shi.lissandra.common.vo
 * @Author: Shihaahs
 * @Date: 2019/6/1 10:52
 * @Copyright: 2018-2099  Shihaahs - For Java.
 * @Description:
 */

@Data
public class ProductOrderVO implements Serializable {


    /**
     * 产品订单id，
     */
    private Long productOrderId;

    /**
     * 订单编号
     */
    private String productOrderNo;

    /**
     * 下单人姓名
     */
    private String userName;
    /**
     * 寄送信息
     */
    private String sendInformation;
    /**
     * h
     */
    private String productCount;

    /**
     * 产品列表
     */
    private List<ProductVO> productList;

    /**
     * 修改时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date gmtModified;

}
