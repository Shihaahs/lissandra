package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.common.enums.GlobalErrorCode;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.domain.ProductOrder;
import com.shi.lissandra.service.core.MVOService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static com.shi.lissandra.common.constant.LissandraURL.*;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.controller
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:30 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 品牌商
 */

@Slf4j
@RestController
public class MVOController {


    @Autowired
    private MVOService mvoService;

    @ApiOperation(value = "品牌商-订单列表", notes = "根据条件分页参数查询")
    @RequestMapping(value = MVO_LIST_ORDER_BY_PAGE, method = RequestMethod.POST)
    public APIResult<PageResult<ProductOrder>> getAllMVOOrderByPage(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(mvoService.findMVOAllOrder(pageRequestDTO));
        } catch (Exception e) {
            log.error("MVOController-getAllMVOProductByPage -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());

    }

    @ApiOperation(value = "品牌商-商品列表", notes = "根据条件分页参数查询")
    @RequestMapping(value = MVO_LIST_PRODUCT_BY_PAGE, method = RequestMethod.POST)
    public APIResult<PageResult<Product>> getAllMVOProductByPage(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(mvoService.findMVOAllProduct(pageRequestDTO));
        } catch (Exception e) {
            log.error("MVOController-getAllMVOProductByPage -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());

    }

    @ApiOperation(value = "品牌商-录入商品", notes = "录入商品信息")
    @RequestMapping(value = MVO_ADD_PRODUCT, method = RequestMethod.POST)
    public APIResult addMVOProduct(@RequestBody Product product) {
        try {
            return APIResult.ok(mvoService.addMVOProduct(product));
        } catch (Exception e) {
            log.error("MVOController-addMVOProduct -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }
    @ApiOperation(value = "品牌商-删除商品", notes = "根据商品id进行逻辑删除")
    @RequestMapping(value = MVO_DELETE_PRODUCT_BY_ID, method = RequestMethod.POST)
    public APIResult deleteMVOProductById(@RequestBody Product product) {
        try {
            return APIResult.ok(mvoService.deleteMVOProduct(product));
        } catch (Exception e) {
            log.error("MVOController-deleteMVOProductById -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }
    @ApiOperation(value = "品牌商-修改商品信息", notes = "根据id修改商品信息")
    @RequestMapping(value = MVO_UPDATE_PRODUCT_INFO_BY_ID, method = RequestMethod.POST)
    public APIResult updateMVOProductInfoById(@RequestBody Product product) {
        try {
            return APIResult.ok(mvoService.updateMVOProductInfo(product));
        } catch (Exception e) {
            log.error("MVOController-updateMVOProductInfoById -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }
    @ApiOperation(value = "品牌商-修改商品是否上架", notes = "修改商品是否上架，0-未上架，1-已上架")
    @RequestMapping(value = MVO_UPDATE_PRODUCT_IS_SHELF_BY_ID, method = RequestMethod.POST)
    public APIResult updateMVOProductIsShelfById(@RequestBody Product product) {
        try {
            return APIResult.ok(mvoService.updateMVOProductIsShelf(product));
        } catch (Exception e) {
            log.error("MVOController-updateMVOProductIsShelfById -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }


}
