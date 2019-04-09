package com.shi.lissandra.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.config
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/4/3 11:50
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

@Configuration
public class WebMVCConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //将 /front/src/login/** 的请求 映射到 /front/src/login/下
        registry.addResourceHandler("/front/src/login/**")
                .addResourceLocations("classpath:/front/src/login/");

        super.addResourceHandlers(registry);
    }
}
