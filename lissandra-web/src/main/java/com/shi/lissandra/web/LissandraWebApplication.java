package com.shi.lissandra.web;

import com.spring4all.swagger.EnableSwagger2Doc;
import net.bytebuddy.build.ToStringPlugin;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;



@EnableTransactionManagement
@ComponentScan(basePackages = { "com.shi.lissandra.dal", "com.shi.lissandra.service","com.shi.lissandra.common","com.shi.lissandra.web"})
@EnableSwagger2Doc
@SpringBootApplication(exclude = {HibernateJpaAutoConfiguration.class })
public class LissandraWebApplication {
    private final static Logger logger = LoggerFactory.getLogger(LissandraWebApplication.class);


    public static void main(String[] args) {
        SpringApplication.run(LissandraWebApplication.class, args);
        logger.info("--- Lissandra started ---> http://localhost:8099/");
        logger.info("--- Swagger is online ---> http://localhost:8099/swagger-ui.html");
    }

}

