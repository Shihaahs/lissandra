package com.shi.lissandra.dal.manager.impl;

import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.dao.UserDao;
import com.shi.lissandra.dal.manager.UserManager;
import com.mhc.framework.common.base.dal.BaseManagerImpl;
import org.springframework.stereotype.Component;

@Component
public class UserManagerImpl extends BaseManagerImpl<UserDao, User> implements UserManager{

}
