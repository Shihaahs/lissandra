package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.common.base.BaseManagerImpl;
import com.shi.lissandra.dal.dao.ProductOrderDao;
import com.shi.lissandra.dal.dao.ProductOrderRefDao;
import com.shi.lissandra.dal.domain.ProductOrder;
import com.shi.lissandra.dal.domain.ProductOrderRef;
import com.shi.lissandra.dal.manager.ProductOrderManager;
import com.shi.lissandra.dal.manager.ProductOrderRefManager;
import org.springframework.stereotype.Component;

@Component
public class ProductOrderManagerRefImpl extends BaseManagerImpl<ProductOrderRefDao, ProductOrderRef> implements ProductOrderRefManager {

}
