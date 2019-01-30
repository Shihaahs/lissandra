package com.shi.lissandra.test.base;


import com.shi.lissandra.web.LissandraWebApplication;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {LissandraWebApplication.class})
@PropertySource("classpath:application-local.yml")
public abstract class BaseTest {

}