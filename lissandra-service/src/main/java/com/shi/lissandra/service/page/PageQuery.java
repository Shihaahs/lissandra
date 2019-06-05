package com.shi.lissandra.service.page;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.service.util.DateUtil;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.Date;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.page
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/2/3 10:08 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Slf4j
public class PageQuery {
    /**
     * 默认所在页码
     */
    public static final Integer DEFAULT_PAGE_CURRENT = 1;
    /**
     * 默认每页条数
     */
    public static final Integer DEFAULT_PAGE_SIZE = 5;

    /**
     * <p> 初始化分页信息 </p>
     *
     * @param pageRequestDTO 传入分页参数
     * @return Page<T>
     * @author Wuer (wuer@maihaoche.com)
     * @since V1.1.0-SNAPSHOT
     */
    public static <T> Page<T> initPage(PageRequestDTO pageRequestDTO) {
        if (null == pageRequestDTO.getPageSize()) {
            pageRequestDTO.setPageSize(DEFAULT_PAGE_SIZE);
        }
        if (null == pageRequestDTO.getPageCurrent()) {
            pageRequestDTO.setPageCurrent(DEFAULT_PAGE_CURRENT);
        }
        return new Page<>(pageRequestDTO.getPageCurrent(), pageRequestDTO.getPageSize());
    }

    /**
     * <p> 进行查询的条件筛选 </p>
     *
     * @param pageRequestDTO
     * @return EntityWrapper<T>
     * @author Wuer (wuer@maihaoche.com)
     * @since V1.1.0-SNAPSHOT
     */
    public static <T> Wrapper<T> conditionAdapter(PageRequestDTO pageRequestDTO) {

        Wrapper wrapper = new EntityWrapper<T>();
        //按照时间进行排序显示
        wrapper.orderDesc(Collections.singleton("gmt_modified"));

        if (null != pageRequestDTO.getProductName() && !pageRequestDTO.getProductName().isEmpty()) {
            wrapper.like("product_name", pageRequestDTO.getProductName());
        }
        if (null != pageRequestDTO.getProductOrderNo() && !pageRequestDTO.getProductOrderNo().isEmpty()) {
            wrapper.like("product_order_no", pageRequestDTO.getProductOrderNo());
        }
        if (null != pageRequestDTO.getUserName() && !pageRequestDTO.getUserName().isEmpty()) {
            wrapper.like("user_name", pageRequestDTO.getUserName().trim());
        }
        if (null != pageRequestDTO.getProductManufactureName() && !pageRequestDTO.getProductManufactureName().isEmpty()) {
            wrapper.like("product_manufacture_name", pageRequestDTO.getProductManufactureName());
        }
        if (null != pageRequestDTO.getWalletOrderNo() && !pageRequestDTO.getWalletOrderNo().isEmpty()) {
            wrapper.like("wallet_order_no", pageRequestDTO.getWalletOrderNo());
        }
        if (null != pageRequestDTO.getWalletOrderWay()) {
            wrapper.eq("wallet_order_way", pageRequestDTO.getWalletOrderWay());
        }
        if (null != pageRequestDTO.getPhone() && !pageRequestDTO.getPhone().isEmpty()) {
            wrapper.like("phone", pageRequestDTO.getPhone());
        }
        if (null != pageRequestDTO.getPermission()) {
            wrapper.eq("permission", pageRequestDTO.getPermission());
        }
        if (null != pageRequestDTO.getIsApproval()) {
            wrapper.eq("is_approval", pageRequestDTO.getIsApproval().toString());
        }

        if (null != pageRequestDTO.getIsShelf()) {
            wrapper.eq("is_shelf", pageRequestDTO.getIsShelf().toString());
        }

        if (null != pageRequestDTO.getWalletOrderState()) {
            wrapper.eq("wallet_order_state", pageRequestDTO.getWalletOrderState().toString());
        }

        if (null != pageRequestDTO.getStartTime() && pageRequestDTO.getStartTime().length() != 0) {
            //这里只转换"yyyy-MM-dd"格式的string
            Date starTime = DateUtil.convertToDate(pageRequestDTO.getStartTime(), DateUtil.ZONE_PATTERN);
            if (null != starTime) {
                wrapper.gt("gmt_modified", starTime);
            } else {
                log.error(pageRequestDTO.getStartTime() + "转换成" + DateUtil.ZONE_PATTERN + "时出错，不被加入查询条件");
            }
        }
        if (null != pageRequestDTO.getEndTime() && pageRequestDTO.getEndTime().length() != 0) {
            Date endTime = DateUtil.convertToDate(pageRequestDTO.getEndTime(), DateUtil.ZONE_PATTERN);
            if (null != endTime) {
                wrapper.lt("gmt_modified", endTime);
            } else {
                log.error(pageRequestDTO.getEndTime() + "转换成" + DateUtil.ZONE_PATTERN + "时出错，不被加入查询条件");
            }
        }

        return wrapper;
    }
}
