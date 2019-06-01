package com.shi.lissandra.dal.domain;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.shi.lissandra.common.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("product_order_ref")
public class ProductOrderRef extends BaseModel {

    private static final long serialVersionUID = 1L;
    /**
     * 产品订单id，主键，自增长
     */
    @TableId(value = "product_order_ref_id", type = IdType.AUTO)
    private Long productOrderRefId;
    /**
     * 产品订单集合
     */
    @TableField("product_order_id")
    private Long productOrderId;
    /**
     * 订单编号
     */
    @TableField("product_id")
    private Long productId;

    @TableField("product_quantity")
    private String productQuantity;

    /**
     * 逻辑删除，0-存在，1-已被删除
     */
    @TableField("is_delete")
    @TableLogic
    private Integer isDelete;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @TableField("gmt_create")
    private Date gmtCreate;
    /**
     * 修改时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @TableField("gmt_modified")
    private Date gmtModified;

}
