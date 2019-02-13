package com.shi.lissandra.dal.manager;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.shi.lissandra.test.base.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class UserManagerTest extends BaseTest {

    @Autowired
    private UserManager userManager;

    @Test
    public void testUserManager(){
        userManager.selectList(new EntityWrapper<>()).forEach(System.out::println);
    }
}
