package com.shi.lissandra.web;

import com.spring4all.swagger.EnableSwagger2Doc;
import net.bytebuddy.build.ToStringPlugin;
import org.mybatis.spring.annotation.MapperScan;
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

    public static void main(String[] args) {
        SpringApplication.run(LissandraWebApplication.class, args);
    }

}

