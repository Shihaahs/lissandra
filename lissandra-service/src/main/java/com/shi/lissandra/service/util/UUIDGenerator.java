package com.shi.lissandra.service.util;

import java.util.UUID;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.mhc.pandora.core.biz.util
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2018/12/26 2:41 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 随机生成8位
 */
public class UUIDGenerator {

    private static final int UUID_LENGTH = 8;
    public static String getUUID(){
        return uuidplus().replace("-","").toUpperCase().substring(0,UUID_LENGTH);
    }

    public static String getUUID(int length) {
        return uuidplus().replace("-","").toUpperCase().substring(0,length);
    }
    private static String uuidplus(){
        return UUID.randomUUID().toString()+UUID.randomUUID().toString();
    }

    public static void main(String[] args) {
        System.out.println(getUUID(4));
    }
}
