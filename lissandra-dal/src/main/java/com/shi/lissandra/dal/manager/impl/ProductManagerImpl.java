package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.common.base.BaseManagerImpl;
import com.shi.lissandra.dal.domain.Product;
import com.shi.lissandra.dal.dao.ProductDao;
import com.shi.lissandra.dal.manager.ProductManager;
import org.springframework.stereotype.Component;

@Component
public class ProductManagerImpl extends BaseManagerImpl<ProductDao, Product> implements ProductManager{

}
