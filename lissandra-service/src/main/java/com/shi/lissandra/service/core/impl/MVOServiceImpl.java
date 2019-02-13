package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.domain.ProductOrder;
import com.shi.lissandra.dal.manager.ProductManager;
import com.shi.lissandra.dal.manager.ProductOrderManager;
import com.shi.lissandra.service.core.MVOService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import static com.shi.lissandra.service.page.PageQuery.*;

import java.util.List;

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
public class MVOServiceImpl implements MVOService {

    @Autowired
    private ProductManager productManager;
    @Autowired
    private ProductOrderManager productOrderManager;

    @Override
    public PageResult<ProductOrder> findMVOAllOrder(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "分页条件参数不能为空");

        Page<ProductOrder> productOrderPage = productOrderManager.selectPage(
                initPage(pageRequestDTO),
                conditionAdapter(pageRequestDTO));

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) productOrderPage.getTotal(),
                productOrderPage.getRecords());
    }

    @Override
    public PageResult<Product> findMVOAllProduct(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "分页条件参数不能为空");

        Page<Product> productPage = productManager.selectPage(
                initPage(pageRequestDTO),
                conditionAdapter(pageRequestDTO));

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) productPage.getTotal(),
                productPage.getRecords());
    }

    @Override
    public Integer addMVOProduct(Product product) {
        Assert.notNull(product, "商品信息不为空");
        return productManager.insert(product);
    }

    @Override
    public Integer deleteMVOProduct(Product product) {
        Assert.notNull(product, "商品信息不为空");
        return productManager.deleteById(product.getProductId());
    }

    @Override
    public Integer updateMVOProductInfo(Product product) {
        Assert.notNull(product, "商品信息不为空");
        return productManager.updateById(product);
    }

    @Override
    public Integer updateMVOProductIsShelf(Product product) {
        Assert.notNull(product, "商品信息不为空");
        if (null == product.getProductId() || 0L == product.getProductId()) {
            log.error("MVOServiceImpl-updateMVOProductIsShelf -> productId为空，修改操作取消");
            return 0;
        }
        if (null == product.getIsShelf()) {
            log.error("MVOServiceImpl-updateMVOProductIsShelf -> isShelf为空，修改操作取消");
            return 0;
        }

        if (0 == product.getIsShelf()) {
            product.setIsShelf(1);
        }
        if (1 == product.getIsShelf()) {
            product.setIsShelf(0);
        }
        return productManager.updateById(product);
    }
}
