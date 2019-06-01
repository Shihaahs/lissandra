package com.shi.lissandra.web.controller;

import com.shi.lissandra.common.entity.APIResult;
import com.shi.lissandra.common.enums.GlobalErrorCode;
import com.shi.lissandra.common.page.PageResult;
import com.shi.lissandra.common.request.PageRequestDTO;
import com.shi.lissandra.dal.domain.User;
import com.shi.lissandra.dal.domain.WalletOrder;
import com.shi.lissandra.service.core.AdminService;
import com.shi.lissandra.service.util.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Date;
import java.util.Objects;

import static com.shi.lissandra.common.constant.LissandraURL.*;

/**
 * All rights Reserved, Designed By www.maihaoche.com
 *
 * @Package com.shi.lissandra.web.controller
 * @Author: Wuer（wuer@maihaoche.com）
 * @Date: 2019/1/30 5:30 PM
 * @Copyright: 2017-2020 www.maihaoche.com Inc. All rights reserved.
 * 注意：本内容仅限于卖好车内部传阅，禁止外泄以及用于其他的商业目
 * @Description: 管理员
 */

@Slf4j
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;


    @RequestMapping(value = ADMIN_LIST_CHECK_REGISTER, method = RequestMethod.POST)
    public APIResult<PageResult<User>> findAdminAllRegisterCheck(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(adminService.findAdminAllRegisterCheck(pageRequestDTO));
        } catch (Exception e) {
            log.error("AdminController-findAdminAllRegisterCheck -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }


    @RequestMapping(value = ADMIN_LIST_CHECK_WALLET_ORDER, method = RequestMethod.POST)
    public APIResult<PageResult<WalletOrder>> findAdminAllWalletOrder(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            return APIResult.ok(adminService.findAdminAllWalletOrder(pageRequestDTO));
        } catch (Exception e) {
            log.error("AdminController-findAdminAllWalletOrder -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }

    @RequestMapping(value = ADMIN_IS_APPROVAL_REGISTER, method = RequestMethod.POST)
    public APIResult isApprovalRegisterCheck(@RequestBody User user) {
        try {
            return APIResult.ok(adminService.isApprovalRegisterCheck(user));
        } catch (Exception e) {
            log.error("AdminController-isApprovalRegisterCheck -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }


    @RequestMapping(value = ADMIN_UPDATE_WALLET_ORDER_STATE, method = RequestMethod.POST)
    public APIResult updateAdminWalletOrderState(@RequestBody WalletOrder walletOrder) {
        try {
            return APIResult.ok(adminService.updateAdminWalletOrderState(walletOrder));
        } catch (Exception e) {
            log.error("AdminController-updateAdminWalletOrderState -> 出现异常:" + e.getMessage());
        }
        return APIResult.error(GlobalErrorCode.FAILURE.getCode(),GlobalErrorCode.FAILURE.getMessage());
    }

    @RequestMapping(value = ADMIN_GET_BUSINESS_REPORT, method = RequestMethod.GET)
    public APIResult<Boolean> getBusinessReport(HttpServletResponse response) throws Exception{
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        pageRequestDTO.setPageSize(100);
        pageRequestDTO.setPageCurrent(1);
        XSSFWorkbook workbook = adminService.getBusinessReport(pageRequestDTO);
        if (Objects.isNull(workbook)) {
            APIResult.error(GlobalErrorCode.SYSTEM_EXCEPTION.getCode(), "excel 导出失败");
        }
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-disposition", "attachment;filename=" + new String("钱包流水明细".getBytes("UTF-8"),"iso-8859-1")
                + DateUtil.parseToString(new Date(),DateUtil.NORMAL_PATTERN) + ".xls");
        OutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        outputStream.flush();
        outputStream.close();
        return null;
    }

}
