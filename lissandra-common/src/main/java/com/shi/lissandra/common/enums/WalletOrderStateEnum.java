package com.shi.lissandra.common.enums;

import lombok.Getter;

import java.util.Arrays;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.common.enums
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/4/1 16:41
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */

public enum WalletOrderStateEnum {

    APPROVAL(0, "审核通过"),
    NOT_APPROVAL(1, "审核不通过"),
    WAIT_APPROVAL(2, "待审核");

    @Getter
    private Integer code;
    @Getter
    private String desc;

    WalletOrderStateEnum(Integer code, String desc){
        this.code = code;
        this.desc = desc;
    }

    public static String getDesc(Integer code){
        return Arrays.stream(values())
                .filter(e -> e.getCode().equals(code))
                .map(WalletOrderStateEnum::getDesc)
                .findFirst()
                .orElse("");
    }

}
