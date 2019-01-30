package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.dal.domain.WalletOrder;
import com.shi.lissandra.dal.dao.WalletOrderDao;
import com.shi.lissandra.dal.manager.WalletOrderManager;
import com.mhc.framework.common.base.dal.BaseManagerImpl;
import org.springframework.stereotype.Component;

@Component
public class WalletOrderManagerImpl extends BaseManagerImpl<WalletOrderDao, WalletOrder> implements WalletOrderManager{

}
