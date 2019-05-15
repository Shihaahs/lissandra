package com.shi.lissandra.service.core.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.service.core.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core.impl
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 2:11 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private UserManager userManager;


    @Override
    public String getUser() {

        return userManager.selectList(new EntityWrapper<>()).get(0).toString();
    }
}
