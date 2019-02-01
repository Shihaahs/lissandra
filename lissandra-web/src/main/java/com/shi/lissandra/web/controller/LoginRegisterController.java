package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.manager.UserManager;
import com.shi.lissandra.service.core.LoginRegisterService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
    private LoginRegisterService loginRegisterService;
    @Autowired
    private UserManager userManager;


    @ApiOperation(value = "登录", notes = "登录")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public APIResult login(@RequestBody User user, HttpServletRequest request) {
        user = loginRegisterService.checkLogin(user);
        if (null != user){
            request.getSession().setAttribute("user",user);
            log.info("login -> " + user.getUserName() + "用户已登录 ");
            return APIResult.ok(SUCCESS.getMessage());
        }
        return APIResult.error(LOGIN_FAILURE.getCode(),LOGIN_FAILURE.getMessage());
    }

    @ApiOperation(value = "登出", notes = "登出")
    @RequestMapping(value = "/logout",method = RequestMethod.POST)
    public APIResult logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("user");
        if (null == session.getAttribute("user")) {
            log.info("logout -> 用户已注销 ");
            return APIResult.ok();
        }
        return APIResult.error(LOGOUT_FAILURE.getCode(),LOGOUT_FAILURE.getMessage());
    }


    @ApiOperation(value = "注册", notes = "注册")
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public APIResult register(@RequestBody User user){
        if (null == user.getPhone() || user.getPhone().isEmpty()) {
            log.info("register -> 用户注册失败，未检测到手机号 ");
            return APIResult.error(REGISTER_FAILURE.getCode(), REGISTER_FAILURE.getMessage());
        }
        //后期需要对手机号进行参数校验

        if (loginRegisterService.checkRegister(user.getPhone())) {
            return APIResult.ok(loginRegisterService.registerUser(user));
        }
        return APIResult.error(REGISTER_FAILURE.getCode(), REGISTER_FAILURE.getMessage());
    }
}
