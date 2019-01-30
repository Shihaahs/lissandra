package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.dao.WalletDao;
import com.shi.lissandra.dal.manager.WalletManager;
import com.mhc.framework.common.base.dal.BaseManagerImpl;
import org.springframework.stereotype.Component;

@Component
public class WalletManagerImpl extends BaseManagerImpl<WalletDao, Wallet> implements WalletManager{

}
