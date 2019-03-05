package com.shi.lissandra.web.security.token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.shi.lissandra.dal.domain.User;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.security.token
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/2/20 11:32 AM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Service
public class TokenHelper {

    //生成Token
    public String getToken(User user) {
        String token = "";
        token = JWT.create().withAudience(user.getUserId().toString())
                //过期时间1小时
                .withExpiresAt(new Date(System.currentTimeMillis() + 6000))
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }
}
