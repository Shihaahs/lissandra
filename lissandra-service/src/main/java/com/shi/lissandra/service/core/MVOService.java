package com.shi.lissandra.service.core;

import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.Product;

import java.util.List;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:34 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 品牌商
 */
public interface MVOService {

    List<Product> findMVOAllProduct(PageRequestDTO pageRequestDTO);

}