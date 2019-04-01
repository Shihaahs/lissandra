package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.common.enums.GlobalErrorCode;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.domain.WalletOrder;
import com.shi.lissandra.service.core.BVOService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

import static com.shi.lissandra.common.constant.LissandraURL.*;
import static com.shi.lissandra.common.enums.GlobalErrorCode.*;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.controller
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:30 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 借卖方
 */

@Slf4j
@RestController
public class BVOController {

    @Autowired
    private BVOService bvoService;

    @ApiOperation(value = "借卖方-商品列表", notes = "根据条件分页参数查询")
    @RequestMapping(value = BVO_LIST_PRODUCT_BY_PAGE, method = RequestMethod.POST)
    public APIResult<PageResult<Product>> getAllBVOProductByPage(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(bvoService.findBVOAllProductByPage(pageRequestDTO));
        } catch (Exception e) {
            log.error("BVOController-getAllBVOProductByPage -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(FAILURE.getCode(), FAILURE.getMessage());
    }


    @ApiOperation(value = "借卖方-钱包管理", notes = "根据条件分页参数查询")
    @RequestMapping(value = BVO_LIST_WALLET_ORDER_BY_USER, method = RequestMethod.POST)
    public APIResult<PageResult<WalletOrder>> getAllBVOWalletOrderByUser(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(bvoService.findBVOAllWalletOrderByUser(pageRequestDTO));
        } catch (Exception e) {
            log.error("BVOController-getAllBVOWalletOrderByUser -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(FAILURE.getCode(), FAILURE.getMessage());
    }

    @ApiOperation(value = "借卖方-获取钱包余额", notes = "根据当前登录用户id查询")
    @RequestMapping(value = BVO_GET_WALLET_BALANCE_BY_USER, method = RequestMethod.POST)
    public APIResult<Wallet> getBVOWalletBalanceByUser(@RequestBody Wallet wallet) {
        try {
            return APIResult.ok(bvoService.getBVOWalletBalanceByUser(wallet));
        } catch (Exception e) {
            log.error("BVOController-getBVOWalletBalanceByUser -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(FAILURE.getCode(), FAILURE.getMessage());
    }

    @ApiOperation(value = "借卖方-钱包充值", notes = "根据当前登录用户id进行操作")
    @RequestMapping(value = BVO_WALLET_ORDER_RECHARGE, method = RequestMethod.POST)
    public APIResult rechargeBVOWalletOrder(@RequestBody WalletOrder walletOrder) {
        try {
            return APIResult.ok(bvoService.rechargeBVOWalletOrder(walletOrder));
        } catch (Exception e) {
            log.error("BVOController-rechargeBVOWalletOrder -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(FAILURE.getCode(), FAILURE.getMessage());
    }

    @ApiOperation(value = "借卖方-钱包提现", notes = "根据当前登录用户id进行操作")
    @RequestMapping(value = BVO_WALLET_ORDER_WITHDRAW, method = RequestMethod.POST)
    public APIResult withdrawBVOWalletOrder(@RequestBody WalletOrder walletOrder) {
        try {
            int row = bvoService.withdrawBVOWalletOrder(walletOrder);
            if (99 == row) {
                return APIResult.error(WITHDRAW_ERROR.getCode(), WITHDRAW_ERROR.getMessage());
            }
            if (1 == row) {
                return APIResult.ok(SUCCESS.getMessage());
            }
        } catch (Exception e) {
            log.error("BVOController-withdrawBVOWalletOrder -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(FAILURE.getCode(), FAILURE.getMessage());
    }

}
