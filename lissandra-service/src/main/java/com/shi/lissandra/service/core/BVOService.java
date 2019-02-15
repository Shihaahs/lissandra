package com.shi.lissandra.service.core;

import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.domain.WalletOrder;

import java.math.BigDecimal;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:34 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 借卖方
 */
public interface BVOService {

    /**
     * <p> 借卖方-钱包流水 </p>
     * @param pageRequestDTO 分页参数
     * @return PageResult<WalletOrder>  
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 11:39 AM
     * @since V1.0.0-SNAPSHOT
     *
     */
    PageResult<WalletOrder> findBVOAllWalletOrderByUser(Long userId, PageRequestDTO pageRequestDTO);

    /**
     * <p> 获取当前用户余额 </p>
     * @param wallet 用户id
     * @return Long
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 11:40 AM
     * @since V1.0.0-SNAPSHOT
     *
     */
    BigDecimal getBVOWalletBalanceByUser(Wallet wallet);

    /**
     * <p> 借卖方-钱包充值 </p>
     * @param walletOrder 钱包id，充值金额
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 11:41 AM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer rechargeBVOWalletOrder(WalletOrder walletOrder);

    /**
     * <p> 借卖方-钱包提现 </p>
     * @param walletOrder 钱包id，提现金额
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 11:41 AM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer withdrawBVOWalletOrder(WalletOrder walletOrder);
}
