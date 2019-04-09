import service from '../services/rechargeAndWithdrawCheck'
import {delay, formatISODate} from '../../../../../utils/TyTools'
import {message as msg} from 'antd'
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
        addModal: {
            visible: false,
            confirmLoading: false,
            data: {
                typelist: []
            }
        },
        updateModal: {
            visible: false,
            confirmLoading: false,
            data: {
                typelist: []
            }
        },
        addition: {
            userName: '',
            walletOrderNo: '',
            walletOrderWay: '',
        }
    },
    effects: {
        * update({payload: {
            walletOrderId: walletOrderId,
            walletOrderState: walletOrderState,
        }}, {call, put, select}) {
            console.log(walletOrderState);
            const {success, data, message} = yield call(service.update, {walletOrderId,walletOrderState});
            if (success && success.toString() === 'true' && data != null) {
                msg.success('审批成功')
            } else {
                msg.error('审批失败' + (message ? '：' + message : ''))
            }
            yield put({
                type: 'getTableList',
                payload: {
                    pageCurrent: yield select(state => state.productManage.page.current),
                    pageSize: yield select(state => state.productManage.page.size)
                }
            })
        },
        * getTableList({payload: {pageCurrent = 1, pageSize = 10, addition = {}}}, {call, put}) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
        hideAddModal(state) {
            return {
                ...state,
                addModal: {
                    ...state.addModal,
                    visible: false
                }
            }
        },
        startAddModalConfirmLoading(state) {
            return {
                ...state,
                addModal: {
                    ...state.addModal,
                    confirmLoading: true
                }
            }
        },
        showAddModal(state) {
            return {
                ...state,
                addModal: {
                    ...state.addModal,
                    visible: true,
                    confirmLoading: false,
                }

            }
        },
        hideUpdateModal(state) {
            return {
                ...state,
                updateModal: {
                    ...state.updateModal,
                    visible: false
                }
            }
        },
        startUpdateModalConfirmLoading(state) {
            return {
                ...state,
                updateModal: {
                    ...state.updateModal,
                    confirmLoading: true
                }
            }
        },
        stopUpdateModalConfirmLoading(state) {
            return {
                ...state,
                updateModal: {
                    ...state.updateModal,
                    confirmLoading: false
                }
            }
        },
        showUpdateModal(state) {
            return {
                ...state,
                updateModal: {
                    ...state.updateModal,
                    visible: true,
                    confirmLoading: false,
                }

            }
        },
        showSearchLists(state, {payload: {typelist, deptlist, borrowerlist}}) {
            return {
                ...state,
                search: {
                    ...state.search,
                    typelist,
                    deptlist,
                    borrowerlist
                }
            }
        }

    }
}