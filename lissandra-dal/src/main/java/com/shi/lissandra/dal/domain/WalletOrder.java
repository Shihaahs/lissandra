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
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("wallet_order")
public class WalletOrder extends BaseModel {

    private static final long serialVersionUID = 1L;
    /**
     * 钱包流水id，主键，自增长
     */
    @TableId(value = "wallet_order_id", type = IdType.AUTO)
    private Long walletOrderId;
    /**
     * 钱包id
     */
    @TableField("wallet_id")
    private Long walletId;
    /**
     * 钱包流水号
     */
    @TableField("wallet_order_no")
    private String walletOrderNo;
    /**
     * 流水是否被审批，0-审批不通过，1-审批通过，2-未处理，
     */
    @TableField("wallet_order_state")
    private Integer walletOrderState;
    /**
     * 操作类型，0-不操作，1-充值，2-提现
     */
    @TableField("wallet_order_way")
    private Integer walletOrderWay;
    /**
     * 操作金额
     */
    private BigDecimal walletOrderMoney;

    /**
     * 余额充值
     */
    private BigDecimal recharge;
    /**
     * 余额提现
     */
    private BigDecimal withdraw;
    /**
     * 用户id
     */
    @TableField("user_id")
    private Long userId;
    /**
     * 用户名称
     */
    @TableField("user_name")
    private String userName;
    /**
     * 逻辑删除，0-存在，1-已被删除
     */
    @TableField("is_delete")
    @TableLogic
    private Integer isDelete;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField("gmt_create")
    private Date gmtCreate;
    /**
     * 修改时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField("gmt_modified")
    private Date gmtModified;

}
