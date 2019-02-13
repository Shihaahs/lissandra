package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.common.base.BaseManagerImpl;
import com.shi.lissandra.dal.domain.ProductOrder;
import com.shi.lissandra.dal.dao.ProductOrderDao;
import com.shi.lissandra.dal.manager.ProductOrderManager;
import org.springframework.stereotype.Component;

@Component
public class ProductOrderManagerImpl extends BaseManagerImpl<ProductOrderDao, ProductOrder> implements ProductOrderManager{

}
