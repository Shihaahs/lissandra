package com.shi.lissandra.dal.domain;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.Version;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shi.lissandra.common.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("product_order")
public class ProductOrder extends BaseModel {

    private static final long serialVersionUID = 1L;
    /**
     * 产品订单id，主键，自增长
     */
    @TableId(value = "product_order_id", type = IdType.AUTO)
    private Long productOrderId;
    /**
     * 产品id集合
     */
    @TableField("product_id")
    private Long productId;
    /**
     * 订单编号
     */
    @TableField("product_order_no")
    private String productOrderNo;
    /**
     * 下单人id
     */
    @TableField("user_id")
    private Long userId;
    /**
     * 接单人id
     */
    @TableField("own_id")
    private Long ownId;
    /**
     * 下单人姓名
     */
    @TableField("user_name")
    private String userName;
    /**
     * 寄送信息
     */
    @TableField("send_information")
    private String sendInformation;
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
