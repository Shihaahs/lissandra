package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;

import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.domain.ProductOrder;
import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.domain.WalletOrder;
import com.shi.lissandra.dal.manager.ProductManager;
import com.shi.lissandra.dal.manager.WalletManager;
import com.shi.lissandra.dal.manager.WalletOrderManager;
import com.shi.lissandra.service.core.BVOService;
import com.shi.lissandra.service.core.MVOService;
import com.shi.lissandra.service.util.DateUtil;
import com.shi.lissandra.service.util.UUIDGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;


import java.math.BigDecimal;
import java.util.Collections;
import java.util.Date;

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
public class BVOServiceImpl implements BVOService {

    @Autowired
    private ProductManager productManager;
    @Autowired
    private WalletManager walletManager;
    @Autowired
    private WalletOrderManager walletOrderManager;


    @Override
    public PageResult<Product> findBVOAllProductByPage(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "BVOServiceImpl-findBVOAllProductByPage -> 分页条件参数为空");

        Wrapper<Product> wrapper = conditionAdapter(pageRequestDTO);
        wrapper.eq("is_shelf", 1);

        Page<Product> productPage = productManager.selectPage(
                initPage(pageRequestDTO),
                wrapper);

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) productPage.getTotal(),
                productPage.getRecords());
    }

    @Override
    public PageResult<WalletOrder> findBVOAllWalletOrderByUser(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "分页条件参数不能为空");
        if (null == pageRequestDTO.getUserId() || 0L == pageRequestDTO.getUserId()) {
            log.error("BVOServiceImpl-findBVOAllWalletOrderByUser -> 未找到userId，请确认登录用户信息");
            return null;
        }
        Wrapper<WalletOrder> wrapper = conditionAdapter(pageRequestDTO);
        wrapper.orderDesc(Collections.singleton("gmt_create"));
        wrapper.eq("user_id", pageRequestDTO.getUserId());

        Page<WalletOrder> walletOrderPage = walletOrderManager.selectPage(
                initPage(pageRequestDTO), wrapper);

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) walletOrderPage.getTotal(),
                walletOrderPage.getRecords());
    }

    @Override
    public Wallet getBVOWalletBalanceByUser(Wallet wallet) {
        Assert.notNull(wallet, "BVOServiceImpl-getBVOWalletBalanceByUser -> wallet对象为空");
        if (null == wallet.getUserId() || 0L == wallet.getUserId()) {
            log.error("BVOServiceImpl-getBVOWalletBalanceByUser -> wallet.getUserId为空");
            return null;
        }
        return walletManager.selectOne(new EntityWrapper<Wallet>().eq("user_id", wallet.getUserId()));
    }

    @Override
    public Integer rechargeBVOWalletOrder(WalletOrder walletOrder) {
        Assert.notNull(walletOrder, "BVOServiceImpl-rechargeBVOWalletOrder -> wallet对象为空");
        if (null == walletOrder.getUserId() || 0L == walletOrder.getUserId() ||
                null == walletOrder.getRecharge() || new BigDecimal(0).equals(walletOrder.getRecharge())) {
            log.error("BVOServiceImpl-rechargeBVOWalletOrder -> wallet.getUserId或者getRecharge为空");
            return null;
        }
        //获取当前用户所应对的钱包信息
        Wallet wallet =  walletManager.selectOne(new EntityWrapper<Wallet>().eq("user_id", walletOrder.getUserId()));
        walletOrder.setWalletId(wallet.getWalletId());
        //未处理
        walletOrder.setWalletOrderState(2);
        walletOrder.setWithdraw(new BigDecimal(0));
        walletOrder.setUserName(wallet.getUserName());


        //生成钱包流水单号(WO-userID-time-4位随机数)
        StringBuilder walletOrderNo = new StringBuilder("WO-");
        walletOrderNo.append(walletOrder.getUserId()).append("-");
        walletOrderNo.append(DateUtil.parseToString(new Date(), "yyyyMMdd")).append("-");
        walletOrderNo.append(UUIDGenerator.getUUID(4));

        //数据库查重，保证单号的唯一性
        int count;
        do {
            count = walletOrderManager.selectCount(new EntityWrapper<WalletOrder>()
                                    .eq("wallet_order_no", walletOrderNo.toString()));
        } while (count != 0);
        walletOrder.setWalletOrderNo(walletOrderNo.toString());
        return walletOrderManager.insert(walletOrder);
    }

    @Override
    public Integer withdrawBVOWalletOrder(WalletOrder walletOrder) {
        Assert.notNull(walletOrder, "BVOServiceImpl-rechargeBVOWalletOrder -> wallet对象为空");
        if (null == walletOrder.getUserId() || 0L == walletOrder.getUserId() ||
                null == walletOrder.getWithdraw() || new BigDecimal(0).equals(walletOrder.getWithdraw())) {
            log.error("BVOServiceImpl-withdrawBVOWalletOrder -> wallet.getUserId或者getWithdraw为空");
            return null;
        }

        //获取当前用户所应对的钱包信息
        Wallet wallet =  walletManager.selectOne(new EntityWrapper<Wallet>().eq("user_id", walletOrder.getUserId()));
        walletOrder.setWalletId(wallet.getWalletId());
        walletOrder.setUserName(wallet.getUserName());
        walletOrder.setWalletOrderState(2);
        walletOrder.setRecharge(new BigDecimal(0));

        if (walletOrder.getWithdraw().compareTo(wallet.getBalance()) > 0) {
            return 99;
        }

        //生成钱包流水单号(WO-userID-time-4位随机数)
        StringBuilder walletOrderNo = new StringBuilder("WO-");
        walletOrderNo.append(walletOrder.getUserId()).append("-");
        walletOrderNo.append(DateUtil.parseToString(new Date(), "yyyyMMdd")).append("-");
        walletOrderNo.append(UUIDGenerator.getUUID(4));

        //数据库查重，保证单号的唯一性
        int count;
        do {
            count = walletOrderManager
                    .selectCount(
                            new EntityWrapper<WalletOrder>()
                                    .eq("wallet_order_no", walletOrderNo.toString()));
        } while (count != 0);
        walletOrder.setWalletOrderNo(walletOrderNo.toString());

        return walletOrderManager.insert(walletOrder);
    }
}
