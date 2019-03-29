package com.shi.lissandra.web.session;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.web.security.token.TokenHelper;
import com.shi.lissandra.web.util.NetWorkUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.session
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/3/28 14:29
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Slf4j
@Component
public class SessionUser {

    //当前登录用户
    private User currentUser;
    @Autowired
    private TokenHelper tokenHelper;

    public void setCurrentUser(User user) {
        this.currentUser = user;

        NetWorkUtil.getRequest().getSession().setAttribute("user", user);
        Cookie cookie = new Cookie("x-auth-token",tokenHelper.getToken(user));
        //可在同一应用服务器内共享cookie
        cookie.setPath("/");
        NetWorkUtil.getResonse().addCookie(cookie);
    }

    public User getCurrentUser(){
        if (ObjectUtils.isEmpty(currentUser)) {
            //本地开发，和前台联调用户
            User shi = new User();
            shi.setUserName("石傻傻");
            shi.setUserId(3L);
            shi.setPhone("123");
            return shi;
        } else {
            log.info("当前登录用户: " + currentUser.toString());
            return this.currentUser;
        }
    }

    public void deleteSession(){
        HttpSession session = NetWorkUtil.getSession();
        session.removeAttribute("user");
        currentUser = null;
        for (Cookie cookie : NetWorkUtil.getRequest().getCookies()) {
            if (cookie.getName().equals("x-auth-token")) {
                cookie.setValue(null);
            }
        }
        if (null == session.getAttribute("user")) {
            log.info("logout -> 用户已注销 ");
        }
    }
}
