package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.domain.WalletOrder;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.dal.manager.WalletManager;
import com.shi.lissandra.dal.manager.WalletOrderManager;
import com.shi.lissandra.service.core.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.math.BigDecimal;

import static com.shi.lissandra.service.page.PageQuery.conditionAdapter;
import static com.shi.lissandra.service.page.PageQuery.initPage;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core.impl
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:36 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private WalletOrderManager walletOrderManager;
    @Autowired
    private WalletManager walletManager;
    @Autowired
    private UserManager userManager;

    @Override
    public PageResult<User> findAdminAllRegisterCheck(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "AdminServiceImpl-findAdminAllRegisterCheck -> 分页条件参数为空");
        if (null == pageRequestDTO.getIsApproval()) {
            log.error("AdminServiceImpl-findAdminAllRegisterCheck -> pageRequestDTO.getIsApproval为空");
            return null;
        }
        Wrapper<User> wrapper = conditionAdapter(pageRequestDTO);
        if (2 == pageRequestDTO.getIsApproval()) {
            wrapper.eq("is_approval", 2);
        } else {
            wrapper.in("is_approval", new Integer[]{0, 1});
        }

        Page<User> userPage = userManager.selectPage(
                initPage(pageRequestDTO), wrapper);

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) userPage.getTotal(),
                userPage.getRecords());
    }

    @Override
    public Integer isApprovalRegisterCheck(String isApproval, User user) {
        if (null == isApproval || isApproval.isEmpty()) {
            log.error("AdminServiceImpl-isApprovalRegisterCheck -> isApproval为空");
            return null;
        }
        if ("0".equals(isApproval)) {
            //注册审批通过
            user.setIsApproval(0);
        }
        if ("1".equals(isApproval)) {
            //注册审批不通过
            user.setIsApproval(1);
        }
        return userManager.updateById(user);
    }

    @Override
    public PageResult<WalletOrder> findAdminAllWalletOrder(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "AdminServiceImpl-findAdminAllWalletOrder -> 分页条件参数为空");
        if (null == pageRequestDTO.getWalletOrderState()) {
            log.error("AdminServiceImpl-findAdminAllWalletOrder -> pageRequestDTO.getWalletOrderState为空");
            return null;
        }
        Wrapper<WalletOrder> wrapper = conditionAdapter(pageRequestDTO);
        if (2 == pageRequestDTO.getWalletOrderState()) {
            wrapper.eq("wallet_order_state", 2);
        } else {
            wrapper.in("wallet_order_state", new Integer[]{0, 1});
        }

        Page<WalletOrder> walletOrderPage = walletOrderManager.selectPage(
                initPage(pageRequestDTO), wrapper);

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) walletOrderPage.getTotal(),
                walletOrderPage.getRecords());
    }

    @Override
    public Integer updateAdminWalletOrderState(String walletOrderState, WalletOrder walletOrder) {
        if (null == walletOrderState || walletOrderState.isEmpty()
                || null == walletOrder.getWalletOrderId() || 0L == walletOrder.getWalletOrderId()) {
            log.error("AdminServiceImpl-updateAdminWalletOrderState -> walletOrderState或walletOrder.getWalletOrderId()为空");
            return null;
        }
        if ("0".equals(walletOrderState)) {
            walletOrder = walletOrderManager.selectOne(new EntityWrapper<WalletOrder>().eq("wallet_order_id", walletOrder.getWalletOrderId()));
            //钱包流水审批通过
            walletOrder.setWalletOrderState(0);
            //相应的用户钱包余额变动
            if (walletOrder.getRecharge().compareTo(new BigDecimal(0)) > 0) {
                //这是一个充值审批
                Wallet wallet = walletManager.selectById(walletOrder.getWalletId());
                BigDecimal oldBalance = wallet.getBalance();
                BigDecimal newBalance = wallet.getBalance().add(walletOrder.getRecharge());
                wallet.setBalance(newBalance);
                int row = walletManager.updateById(wallet);
                if (row > 0) {
                    log.info("Admin已通过钱包流水号:" + walletOrder.getWalletOrderNo()
                            + "; 钱包用户:" + walletOrder.getUserName()
                            + "; 原有余额:" + oldBalance
                            + "; 充值金额:" + walletOrder.getRecharge()
                            + "; 现在余额:" + wallet.getBalance());
                } else {
                    log.error("Admin已通过钱包流水号: " + walletOrder.getWalletOrderNo()
                    + "---充值金额调度失败");
                }
            }
            if (walletOrder.getWithdraw().compareTo(new BigDecimal(0)) > 0) {
                //这是一个提现审批
                Wallet wallet = walletManager.selectById(walletOrder.getWalletId());
                BigDecimal oldBalance = wallet.getBalance();
                BigDecimal newBalance = wallet.getBalance().subtract(walletOrder.getWithdraw());
                wallet.setBalance(newBalance);
                int row = walletManager.updateById(wallet);
                if (row > 0) {
                    log.info("Admin已通过钱包流水号:" + walletOrder.getWalletOrderNo()
                            + "; 钱包用户:" + walletOrder.getUserName()
                            + "; 原有余额:" + oldBalance
                            + "; 提现金额:" + walletOrder.getWithdraw()
                            + "; 现在余额:" + wallet.getBalance());
                } else {
                    log.error("Admin已通过钱包流水号: " + walletOrder.getWalletOrderNo()
                            + "---充值金额调度失败");
                }
            }

        }
        if ("1".equals(walletOrderState)) {
            //钱包流水审批不通过
            walletOrder.setWalletOrderState(1);
            log.info("Admin不通过钱包流水号: " + walletOrder.getWalletOrderNo());
        }
        return walletOrderManager.updateById(walletOrder);
    }
}
