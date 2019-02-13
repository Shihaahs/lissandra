package com.shi.lissandra.common.request;

import lombok.Data;

import java.io.Serializable;


@Data
public class PageRequestDTO implements Serializable {


    /**
     * 店铺名称查询
     */
    private String userName;
    /**
     * 商品名称查询
     */
    private String productName;
    /**
     * 开始时间
     */
    private String startTime;
    /**
     * 结束时间
     */
    private String endTime;
    /**
     *当前页码
     */
    private Integer pageCurrent;
    /**
     *当前页上的记录数
     */
    private Integer pageSize;
    /**
     *总记录数
     */
    private Integer pageCount;

}
