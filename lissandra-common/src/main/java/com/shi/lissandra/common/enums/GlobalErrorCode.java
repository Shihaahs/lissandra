package com.shi.lissandra.common.enums;

/**
 * @author Shihaahs
 */

@SuppressWarnings("ALL")
public enum GlobalErrorCode implements ErrorCode{

    SUCCESS("200", "OK"),
    FAILURE("-1", "Failure"),
    BAD_REQUEST("400", "Bad Request"),
    UNAUTHORIZED("401", "Unauthorized"),
    FORBIDDEN("403", "Forbidden"),
    NOT_FOUND("404", "Not Found"),
    METHOD_NOT_ALLOWED("405", "Method Not Allowed"),
    INTERNAL_SERVER_ERROR("500", "Internal Server Error"),
    INVALID_PARAM("100", "Parameter Error");

    private final String code;
    private final String message;

    private GlobalErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public String getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}

