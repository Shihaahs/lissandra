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

import com.shi.lissandra.common.base.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
@Data
@EqualsAndHashCode(callSuper = true)
public class Wallet extends BaseModel {

    private static final long serialVersionUID = 1L;
    /**
     * 钱包id，主键。自增长
     */
    @TableId(value = "wallet_id", type = IdType.AUTO)
    private Long walletId;
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
     * 余额
     */
    private BigDecimal balance;
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
