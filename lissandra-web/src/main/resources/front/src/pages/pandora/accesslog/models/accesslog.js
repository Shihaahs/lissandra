import service from '../services/accesslog'
import {delay} from '../../../../utils/TyTools'
import TyHistory from '../../../../utils/TyHistory'
import {message as msg} from "antd";

export default {
    state: {
        loading: {
            visible: true,
            exiting: false,
            errorText: ''
        },
        table: {
            dataSource: []
        },
        page: {
            current: 1,
            size: 10,
            total: 0,
            count: 0
        },
        addModal: {
            visible: false,
            confirmLoading: false,
            data: {
                typelist: []
            }
        },
        search: {
            appList: []
        },
        showModal: {
            visible: false,
            confirmLoading: false,
            data: {
                logExtId: '',
                logId: '',
                appId: '',
                userId: '',
                pageNo: '',
                pageName: '',
                extFieldJson: '',
            }
        },
        addition: {
            appId: '',
            userId: '',
            pageNo: '',
            startTime: '',
            endTime: '',
        }
    },
    effects: {
        * getExtFieldJsonByLogId(
            {
                payload: {
                    logId: logId,
                    record: record,
                    callback: callback
                }
            },
            {call, put, select}
        ) {
            const {success, data, message} = yield call(service.get, {
                logId: logId || '',
            });
            console.log("logId:" + logId);
            if (success && success.toString() === 'true') {
                yield put({
                    type: 'showExtFieldJsonModal'
                });
                data.pageName = record.pageName;
                data.deviceId = record.deviceId;
                data.refUrl = record.refUrl;
                data.curUrl = record.curUrl;
                if (data.extFieldJson === null) {
                    data.extFieldJson = '暂无额外信息';
                }
                callback(data);
            } else {
                let data;
                data.pageName = record.pageName;
                data.deviceId = record.deviceId;
                data.refUrl = record.refUrl;
                data.curUrl = record.curUrl;
                data.extFieldJson = '暂无额外信息';
                callback(data)
            }
        },
        * getTableList({payload: {pageCurrent = 1, pageSize = 10, addition}}, {call, put}) {
            TyHistory.set({addition})
            const {success, data, message} = yield call(service.list, Object.assign({
                pageCurrent,
                pageSize
            }, addition))
            if (success && success.toString() === 'true') {
                yield put({
                    type: 'showTable',
                    payload: {
                        table: {
                            dataSource: data.pageData.map((record, index) => {
                                return Object
                                    .assign({
                                        index: ((pageCurrent - 1) * pageSize + index + 1)
                                            .toString()
                                            .padStart(2, '0')
                                    }, record)
                            })
                        },
                        page: {
                            current: Number.parseInt(data.pageCurrent),
                            size: Number.parseInt(data.pageSize),
                            total: Number.parseInt(data.totalCount),
                            count: Number.parseInt(data.totalPage)
                        },
                        addition
                    }
                })
            } else {
                yield put({
                    type: 'showTable',
                    payload: {
                        table: {
                            dataSource: []
                        },
                        page: {
                            current: pageCurrent,
                            size: pageSize,
                            total: 0,
                            count: 0
                        },
                        addition
                    }
                })
                yield put({
                    type: 'showErrorText',
                    payload: {
                        loading: {
                            errorText: message
                        }
                    }
                })
            }
            {
                const {success, data, message} = yield call(service.applist);
                if (success && success.toString() === 'true') {
                    yield put({
                        type: 'setAppList',
                        payload: {
                            search: {
                                appList: data
                            }
                        }
                    })
                } else {
                    msg.warn("当前登录用户没有权限查看任何App，请联系管理员配置")
                }
            }
            yield put({
                type: 'changeTableSelectedRows',
                payload: {
                    table: {
                        selectedRows: TyHistory.get('selectedRows') || []
                    }
                }
            });
            yield put({
                type: 'stopLoading'
            })
        },
        * getLoginTableList({payload: {pageCurrent = 1, pageSize = 10, addition}}, {call, put}) {
            {
                const {success, data, message} = yield call(service.applist);
                if (success && success.toString() === 'true') {
                    yield put({
                        type: 'setAppList',
                        payload: {
                            search: {
                                appList: data
                            }
                        }
                    })
                }
            }
            TyHistory.set({addition})
            const {success, data, message} = yield call(service.list_login, Object.assign({
                pageCurrent,
                pageSize
            }, addition))
            if (success && success.toString() === 'true') {
                yield put({
                    type: 'showTable',
                    payload: {
                        table: {
                            dataSource: data.pageData.map((record, index) => {
                                return Object
                                    .assign({
                                        index: ((pageCurrent - 1) * pageSize + index + 1)
                                            .toString()
                                            .padStart(2, '0')
                                    }, record)
                            })
                        },
                        page: {
                            current: Number.parseInt(data.pageCurrent),
                            size: Number.parseInt(data.pageSize),
                            total: Number.parseInt(data.totalCount),
                            count: Number.parseInt(data.totalPage)
                        },
                        addition
                    }
                })
            } else {
                yield put({
                    type: 'showTable',
                    payload: {
                        table: {
                            dataSource: []
                        },
                        page: {
                            current: pageCurrent,
                            size: pageSize,
                            total: 0,
                            count: 0
                        },
                        addition
                    }
                })
                yield put({
                    type: 'showErrorText',
                    payload: {
                        loading: {
                            errorText: message
                        }
                    }
                })
            }
            yield put({
                type: 'stopLoading'
            })
        },
        * stopLoading(action, {call, put}) {
            yield put({
                type: 'exitLoading'
            })
            yield call(delay, 250)
            yield put({
                type: 'hideLoading'
            })
        }
    },
    reducers: {
        startLoading(state) {
            return {
                ...state,
                loading: {
                    ...state.loading,
                    visible: true,
                    exiting: false,
                    errorText: ''
                }
            }
        },
        exitLoading(state) {
            return {
                ...state,
                loading: {
                    ...state.loading,
                    exiting: true
                }
            }
        },
        hideLoading(state) {
            return {
                ...state,
                loading: {
                    ...state.loading,
                    visible: false
                }
            }
        },
        showErrorText(state, {payload: {loading: {errorText}}}) {
            return {
                ...state,
                loading: {
                    ...state.loading,
                    errorText
                }
            }
        },
        showTable(state, {payload: {table, page, addition}}) {
            return {
                ...state,
                table: {
                    ...state.table,
                    dataSource: table.dataSource
                },
                page: {
                    ...state.page,
                    current: page.current,
                    size: page.size,
                    total: page.total,
                    count: page.count
                },
                addition: {
                    ...addition
                }
            }
        },

        setAppList(state, {payload: {search: {appList}}}) {
            return {
                ...state,
                search: {
                    ...state.search,
                    appList
                }
            }
        },

        hideShowModal(state) {
            return {
                ...state,
                showModal: {
                    ...state.showModal,
                    visible: false
                }
            }
        },
        showExtFieldJsonModal(state) {
            return {
                ...state,
                showModal: {
                    ...state.showModal,
                    visible: true,
                    confirmLoading: false,
                }
            }
        },
    }
}