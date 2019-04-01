package com.shi.lissandra.service.core;

import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.domain.WalletOrder;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.service.core
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:34 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description:
 */
public interface AdminService {

    /**
     * <p> 管理员-注册审核 </p>
     * @param pageRequestDTO isApproval == 2 -是否被审批
     * @return PageResult<User>
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 4:06 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    PageResult<User> findAdminAllRegisterCheck(PageRequestDTO pageRequestDTO);

    /**
     * <p> 审核注册 </p>
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 4:08 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer isApprovalRegisterCheck(User user);

    /**
     * <p> 管理员-钱包流水 </p>
     * @param pageRequestDTO walletOrderState == 2 -是否被审批
     * @return PageResult<WalletOrder>
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 4:09 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    PageResult<WalletOrder> findAdminAllWalletOrder(PageRequestDTO pageRequestDTO);

    /**
     * <p> 审核流水 </p>
     * @return Integer
     * @author Wuer (wuer@maihaoche.com)
     * @date 2019/2/14 4:13 PM
     * @since V1.0.0-SNAPSHOT
     *
     */
    Integer updateAdminWalletOrderState(WalletOrder walletOrder);




}
