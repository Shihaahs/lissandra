package com.shi.lissandra.service.core;

import com.shi.lissandra.dal.domain.User;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:36 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */
public interface LoginRegisterService {

    /**
     * <p> 登录校验，根据手机号和密码->检查数据中是否存在该用户 </p>
     * @param user
     * @return User
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/1/31 12:18 PM
     * @since V1.1.0-SNAPSHOT
     *
     */
    User checkLogin(User user);

    /**
     * <p> 注册用户 </p>
     * @param user
     * @return Integer 返回注册结果
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/1/31 12:18 PM
     * @since V1.1.0-SNAPSHOT
     *
     */
    Integer registerUser(User user);

    /**
     * <p> 注册校验，根据手机号去查是否有已经存在的用户 </p>
     * @param phone
     * @return boolean
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/1/31 12:20 PM
     * @since V1.1.0-SNAPSHOT
     *
     */
    boolean checkRegister(String phone);
}
