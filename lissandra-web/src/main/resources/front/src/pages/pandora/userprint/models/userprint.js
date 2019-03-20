import service from '../services/userprint'
import {delay, formatISODateTime} from '../../../../utils/TyTools'
import {message as msg} from 'antd'
import router from 'umi/router'
import TyHistory from "../../../../utils/TyHistory"

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
        addition: {
            appId: '',
            userName: '',
            pageNo: '',
            startTime: '',
            endTime: '',
        }
    },
    effects: {

        * findAccessLog(
            {
                payload: {
                    record: record,
                }
            },
            {call, put, select}
        ) {
            TyHistory.transferredData = {
                appId: record.appId,
                userName: record.userName,
                startTime: new Date(record.loginTime).toISOString(),
                endTime: new Date(new Date(record.loginTime).getTime() + 3600000).toISOString()
            }
            router.push({
                pathname: '/pandora/accesslog/search'
            })
        },
        * getTableList({payload: {pageCurrent = 1, pageSize = 10, addition}}, {call, put}) {
            const _addition = Object.assign({
                pageCurrent,
                pageSize,
                startTime: formatISODateTime(addition.startTime),
                endTime: formatISODateTime(addition.endTime)
            }, addition)
            console.log(_addition)

            const {success, data, message} = yield call(service.list, _addition)
            if (success && success.toString() === 'true') {
                console.log(data)
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
                }else {
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
            console.log(page)
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
    }
}