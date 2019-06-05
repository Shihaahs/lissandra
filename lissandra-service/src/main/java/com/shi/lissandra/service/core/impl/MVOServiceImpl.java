package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.google.common.collect.Lists;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.common.vo.ProductOrderVO;
import com.shi.lissandra.common.vo.ProductVO;
import com.shi.lissandra.dal.domain.*;
import com.shi.lissandra.dal.manager.ProductManager;
import com.shi.lissandra.dal.manager.ProductOrderManager;
import com.shi.lissandra.dal.manager.ProductOrderRefManager;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.service.core.MVOService;
import com.shi.lissandra.service.util.DateUtil;
import com.shi.lissandra.service.util.UUIDGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import static com.shi.lissandra.service.page.PageQuery.*;
import static com.shi.lissandra.service.util.DateUtil.NORMAL_DATE;
import static java.util.stream.Collectors.toList;

import java.util.*;
import java.util.stream.Collectors;

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
    private UserManager userManager;
    @Autowired
    private ProductOrderManager orderManager;
    @Autowired
    private ProductOrderRefManager productOrderRefManager;


    @Override
    public PageResult<ProductOrderVO> findMVOAllOrder(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "MVOServiceImpl-findMVOAllOrder -> 分页条件参数为空");

        //这里多对多的逻辑做了省略
        List<Long> orderIds = orderManager.selectList(
                new EntityWrapper<ProductOrder>()
                        .eq("own_id", pageRequestDTO.getUserId()))
                .stream().map(ProductOrder::getProductOrderId).collect(toList());

        if (CollectionUtils.isEmpty(orderIds)) {
            return new PageResult<>(pageRequestDTO.getPageSize(),
                    pageRequestDTO.getPageCurrent(),
                    0,
                    Collections.emptyList());
        }

        //品牌商只能看到自己的订单
        Wrapper<ProductOrder> wrapper = conditionAdapter(pageRequestDTO);
        wrapper.in("product_order_id", orderIds);
        Page<ProductOrder> productOrderPage = orderManager.selectPage(
                initPage(pageRequestDTO),
                wrapper);

        List<Long> productOrderIds = Lists.transform(productOrderPage.getRecords(), ProductOrder::getProductOrderId);
        List<ProductOrderVO> productOrderVOList = new ArrayList<>();
        List<ProductOrderRef> productOrderRefList = productOrderRefManager.selectList(new EntityWrapper<ProductOrderRef>()
                .in("product_order_id", productOrderIds));
        Map<Long, List<ProductOrderRef>> productOrderMap = productOrderRefList
                .stream()
                .collect(Collectors.groupingBy(ProductOrderRef::getProductOrderId));

        List<Long> productIds = Lists.transform(productOrderRefList, ProductOrderRef::getProductId);
        Map<Long, Product> productMap = productManager.selectList(new EntityWrapper<Product>().in("product_id", productIds))
                .stream().collect(Collectors.toMap(Product::getProductId, x -> x));
        productOrderPage.getRecords().forEach( productOrder -> {
            List<ProductVO> productVOList = new ArrayList<>();
            List<ProductOrderRef> productOrderRefs = productOrderMap.get(productOrder.getProductOrderId());

            ProductOrderVO productOrderVO = new ProductOrderVO();
            productOrderVO.setUserName(productOrder.getUserName());
            productOrderVO.setGmtModified(productOrder.getGmtModified());
            productOrderVO.setProductOrderId(productOrder.getProductOrderId());
            productOrderVO.setProductOrderNo(productOrder.getProductOrderNo());
            productOrderVO.setSendInformation(productOrder.getSendInformation());
            productOrderVO.setProductCount(Integer.valueOf(productOrderRefs.size()).toString());

            productOrderRefs.forEach(productOrderRef -> {
                ProductVO productVO = new ProductVO();
                Product product = productMap.get(productOrderRef.getProductId());
                productVO.setProductId(product.getProductId());
                productVO.setProductName(product.getProductName());
                productVO.setProductPrice(product.getProductPrice().toString());
                productVO.setProductQuantity(productOrderRef.getProductQuantity());
                productVOList.add(productVO);
            });
            productOrderVO.setProductList(productVOList);
            productOrderVOList.add(productOrderVO);
        });


        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                productOrderVOList.size(),
                productOrderVOList);
    }

    @Override
    public PageResult<Product> findMVOAllProduct(PageRequestDTO pageRequestDTO) {
        Assert.notNull(pageRequestDTO, "MVOServiceImpl-findMVOAllProduct -> 分页条件参数为空");

        //品牌商只能看到自己的货物
        Wrapper<Product> wrapper = conditionAdapter(pageRequestDTO);
        wrapper.eq("product_manufacture_id", pageRequestDTO.getUserId());
        Page<Product> productPage = productManager.selectPage(
                initPage(pageRequestDTO),
                wrapper);

        return new PageResult<>(pageRequestDTO.getPageSize(),
                pageRequestDTO.getPageCurrent(),
                (int) productPage.getTotal(),
                productPage.getRecords());
    }

    @Override
    public Integer addMVOProduct(Product product) {
        Assert.notNull(product, "MVOServiceImpl-addMVOProduct -> 商品信息为空");
        return productManager.insert(product);
    }

    @Override
    public Integer deleteMVOProduct(Product product) {
        Assert.notNull(product, "MVOServiceImpl-deleteMVOProduct -> 商品信息为空");
        return productManager.deleteById(product.getProductId());
    }

    @Override
    public Integer updateMVOProductInfo(Product product) {
        Assert.notNull(product, "MVOServiceImpl-updateMVOProductInfo -> 商品信息为空");
        return productManager.updateById(product);
    }

    @Override
    public Integer updateMVOProductIsShelf(Product product) {
        Assert.notNull(product, "MVOServiceImpl-updateMVOProductIsShelf -> 商品信息为空");
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
        } else if (1 == product.getIsShelf()) {
            product.setIsShelf(0);
        }
        return productManager.updateById(product);
    }

    @Override
    public Integer getMVOOrder(Long userId) {
        if (Objects.isNull(userId)) {
            return 2;
        }
        List<Product> productList = productManager.selectList(
                new EntityWrapper<Product>().eq("product_manufacture_id", userId));
        List<User> userList = userManager.selectList(new EntityWrapper<User>().eq("permission", 2));
        int userSize = userList.size();

        List<Long> productIds = Lists.transform(productList, Product::getProductId);

        int userRandom = new Random().nextInt(userSize);

        User user = userList.get(userRandom);

        ProductOrder productOrder = new ProductOrder();
        productOrder.setOwnId(userId);
        productOrder.setUserId(user.getUserId());
        productOrder.setUserName(user.getUserName());
        productOrder.setSendInformation("默认快递");
        productOrder.setProductOrderNo(getOrderNo(userId));
        orderManager.insert(productOrder);

        productIds.forEach(productId -> {
            ProductOrderRef productOrderRef = new ProductOrderRef();
            productOrderRef.setProductId(productId);
            Integer quantity = (new Random().nextInt(10) + 1);
            productOrderRef.setProductQuantity(quantity.toString());
            productOrderRef.setProductOrderId(productOrder.getProductOrderId());
            productOrderRefManager.insert(productOrderRef);
        });

        return 1;
    }

    public String getOrderNo(Long id) {
        return "PO-" + id.toString() + "-" +
                DateUtil.parseToString(new Date(), "yyyyMMdd") + "-" +
                UUIDGenerator.getUUID(4);
    }
}
