package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.domain.Wallet;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.dal.manager.WalletManager;
import com.shi.lissandra.service.core.LoginRegisterService;
import com.shi.lissandra.service.core.MVOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

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

@Service
public class LoginRegisterServiceImpl implements LoginRegisterService {

    @Autowired
    private UserManager userManager;
    @Autowired
    private WalletManager walletManager;

    @Override
    public User checkLogin(User user) {
        if (null == user.getPhone() || user.getPhone().isEmpty()
                || null == user.getPassword() || user.getPassword().isEmpty()) {
            return null;
        }
        return userManager.selectOne(user);
    }

    @Override
    public Integer registerUser(User user) {

        int row = userManager.insert(user);
        if (user.getPermission().equals(2)) {
            Wallet wallet = new Wallet();
            wallet.setBalance(new BigDecimal(0));
            wallet.setUserId(user.getUserId());
            wallet.setUserName(user.getUserName());
            row = walletManager.insert(wallet);
        }

        return row;
    }

    @Override
    public boolean checkRegister(String phone) {
        return null == userManager.selectOne(new EntityWrapper<User>().eq("phone", phone));
    }

}
