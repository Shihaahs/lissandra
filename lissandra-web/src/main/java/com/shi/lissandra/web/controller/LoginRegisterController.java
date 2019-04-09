package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.service.core.LoginRegisterService;
import com.shi.lissandra.web.security.token.TokenHelper;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static com.shi.lissandra.common.constant.LissandraURL.*;
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
@Controller
public class LoginRegisterController {

    @Autowired
    private TokenHelper tokenHelper;
    @Autowired
    private LoginRegisterService loginRegisterService;
    @Autowired
    private UserManager userManager;


    @ApiOperation(value = "登录", notes = "登录")
    @ResponseBody
    @RequestMapping(value = LISSANDRA_LOGIN, method = RequestMethod.POST)
    public APIResult login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
        user = loginRegisterService.checkLogin(user);
        if (null != user) {
            if (2 != user.getIsApproval()) {
                request.getSession().setAttribute("user", user);
                Cookie cookie = new Cookie("x-auth-token", tokenHelper.getToken(user));
                //可在同一应用服务器内共享cookie
                cookie.setPath("/");
                response.addCookie(cookie);
                log.info("login -> " + user.getUserName() + "用户已登录 ");
                return APIResult.ok(SUCCESS.getMessage());
            } else {
                log.info("login -> " + user.getUserName() + " - 用户信息等待管理员审核 ");
                return APIResult.error(LOGIN_WAITTING_CHECK.getCode(), LOGIN_WAITTING_CHECK.getMessage());
            }

        }
        return APIResult.error(LOGIN_FAILURE.getCode(), LOGIN_FAILURE.getMessage());
    }

    @ApiOperation(value = "登出", notes = "登出")
    @ResponseBody
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
    @ResponseBody
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


    @ApiOperation(value = "获取登录人", notes = "获取登录人")
    @ResponseBody
    @RequestMapping(value = PUBLIC_FIND_USER, method = RequestMethod.POST)
    public APIResult<User> getCurrentLoginUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        if (null != user) {
            log.info("当前登录用户 -> " + user.toString());
            return APIResult.ok(user);
        }
        return APIResult.error(NO_LOGIN_USER.getCode(), NO_LOGIN_USER.getMessage());
    }

    @RequestMapping(value = TO_LOGIN, method = RequestMethod.GET)
    public String toLogin() {
        return "login";
    }

    @RequestMapping(value = TO_INDEX, method = RequestMethod.GET)
    public ModelAndView toIndex() {
        return new ModelAndView(new RedirectView("http://127.0.0.1:8000"));
    }



}
