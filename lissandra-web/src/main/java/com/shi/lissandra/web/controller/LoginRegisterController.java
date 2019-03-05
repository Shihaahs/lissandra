package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.service.core.LoginRegisterService;
import com.shi.lissandra.web.security.token.TokenHelper;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.List;

import static com.shi.lissandra.common.constant.LissandraURL.LISSANDRA_LOGIN;
import static com.shi.lissandra.common.constant.LissandraURL.LISSANDRA_LOGOUT;
import static com.shi.lissandra.common.constant.LissandraURL.LISSANDRA_REGISTRE;
import static com.shi.lissandra.common.enums.GlobalErrorCode.*;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.controller
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:25 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Slf4j
@RestController
public class LoginRegisterController {

    @Autowired
    private TokenHelper tokenHelper;
    @Autowired
    private LoginRegisterService loginRegisterService;
    @Autowired
    private UserManager userManager;


    @ApiOperation(value = "登录", notes = "登录")
    @RequestMapping(value = LISSANDRA_LOGIN, method = RequestMethod.POST)
    public APIResult login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
        user = loginRegisterService.checkLogin(user);
        if (null != user && 0 == user.getIsApproval()) {
            request.getSession().setAttribute("user", user);
            Cookie cookie = new Cookie("x-auth-token",tokenHelper.getToken(user));
            //可在同一应用服务器内共享cookie
            cookie.setPath("/");
            response.addCookie(cookie);
            log.info("login -> " + user.getUserName() + "用户已登录 ");
            return APIResult.ok(SUCCESS.getMessage());
        }
        return APIResult.error(LOGIN_FAILURE.getCode(), LOGIN_FAILURE.getMessage());
    }

    @ApiOperation(value = "登出", notes = "登出")
    @RequestMapping(value = LISSANDRA_LOGOUT, method = RequestMethod.POST)
    public APIResult logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.removeAttribute("user");
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("x-auth-token")) {
                cookie.setValue(null);
            }
        }
        if (null == session.getAttribute("user")) {
            log.info("logout -> 用户已注销 ");
            return APIResult.ok();
        }
        return APIResult.error(LOGOUT_FAILURE.getCode(), LOGOUT_FAILURE.getMessage());
    }


    @ApiOperation(value = "注册", notes = "注册")
    @RequestMapping(value = LISSANDRA_REGISTRE, method = RequestMethod.POST)
    public APIResult register(@RequestBody User user) {
        if (null == user.getPhone() || user.getPhone().isEmpty()) {
            log.info("register -> 用户注册失败，未检测到手机号 ");
            return APIResult.error(REGISTER_FAILURE.getCode(), REGISTER_FAILURE.getMessage());
        }
        //后期需要对手机号进行参数校验

        if (loginRegisterService.checkRegister(user.getPhone())) {
            try {
                return APIResult.ok(loginRegisterService.registerUser(user));
            } catch (Exception e) {
                return APIResult.error(REGISTER_FAILURE.getCode(), REGISTER_FAILURE.getMessage());
            }

        } else {
            log.info("register -> 用户注册失败，手机号" + user.getPhone() + "已存在！");
            return APIResult.error(REGISTER_FAILURE_PHONE_REPEAT.getCode(), REGISTER_FAILURE_PHONE_REPEAT.getMessage());
        }
    }
}
