package com.shi.lissandra.dal.domain;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.enums.IdType;

import java.math.BigDecimal;
import java.util.Date;

import com.shi.lissandra.common.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseModel {

    private static final long serialVersionUID = 1L;
    /**
     * 商品id，主键，自增长
     */
    @TableId(value = "product_id", type = IdType.AUTO)
    private Long productId;
    /**
     * 商品名称
     */
    @TableField("product_name")
    private String productName;
    /**
     * 商品价格
     */
    @TableField("product_price")
    private BigDecimal productPrice;
    /**
     * 商品图片
     */
    @TableField("product_image")
    private String productImage;
    /**
     * 商品描述
     */
    @TableField("product_description")
    private String productDescription;
    /**
     * 生产商id
     */
    @TableField("product_manufacture_id")
    private Long productManufactureId;
    /**
     * 生产商名称
     */
    @TableField("product_manufacture_name")
    private String productManufactureName;
    /**
     * 上架，0-已上架，1-未上架
     */
    @TableField("is_shelf")
    private Integer isShelf;
    /**
     * 逻辑删除，0-存在，1-已被删除
     */
    @TableField("is_delete")
    @TableLogic
    private Integer isDelete;
    /**
     * 创建时间
     */
    @TableField("gmt_create")
    private Date gmtCreate;
    /**
     * 修改时间
     */
    @TableField("gmt_modified")
    private Date gmtModified;

}
