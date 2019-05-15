import service from '../services/orderManage'
import {delay, formatISODate} from '../../../../../utils/TyTools'
import TyHistory from '../../../../../utils/TyHistory'


export default {
    state: {
        loading: {
            visible: true,
            exiting: false,
            errorText: ''
        },
        table: {
            dataSource: [],
            selectedRows: []
        },
        page: {
            current: 1,
            size: 10,
            total: 0,
            count: 0
        },
        addition: {
            startTime: '',
            endTime: '',
            productName: '',
        }
    },
    effects: {

        * getTableList({payload: {pageCurrent = 1, pageSize = 10, addition = {}}}, {call, put}) {
            const {success, data, message} = yield call(service.list, Object.assign({
                pageCurrent, pageSize
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
                type: 'changeTableSelectedRows',
                payload: {
                    table: {
                        selectedRows: TyHistory.get('selectedRows') || []
                    }
                }
            })
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
        changeTableSelectedRows(state, {payload: {table: {selectedRows}}}) {
            return {
                ...state,
                table: {
                    ...state.table,
                    selectedRows
                }
            }
        },
    }
}