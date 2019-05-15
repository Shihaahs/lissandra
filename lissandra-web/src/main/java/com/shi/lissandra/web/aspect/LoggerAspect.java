package com.shi.lissandra.web.aspect;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.aspect
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/2/18 4:10 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 切面日志 -> 打印请求参数和响应参数
 */

@Slf4j
@Component
@Aspect
public class LoggerAspect {

    private final String POINT_CUT = "execution(public * com.shi.lissandra.web.controller.*.*(..))";

    @Pointcut(POINT_CUT)
    public void pointCut() {
    }

    @Before(value = "pointCut()")
    public void before(JoinPoint joinPoint) {
        Object args[] = joinPoint.getArgs();
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        log.info("请求接口:{}, 处理类方法:{}.{}, 请求参数-> {}",
                request.getRequestURL().toString(),
                method.getDeclaringClass().getName().substring(method.getDeclaringClass().getName().lastIndexOf(".") + 1),
                method.getName() + "()",
                StringUtils.join(args, "; "));
    }

    @AfterReturning(value = "pointCut()", returning = "rvt")
    public void after(JoinPoint joinPoint, Object rvt){
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        log.info("处理类方法:{}.{}, 响应参数-> {}",
                method.getDeclaringClass().getName().substring(method.getDeclaringClass().getName().lastIndexOf(".") + 1),
                method.getName() + "()",
                new Gson().toJson(rvt));
    }
}
