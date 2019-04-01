import service from '../services/burypoint'
import publicService from '../../../../services/public'
import {delay, formatISODate} from '../../../../utils/TyTools'
import {message as msg} from 'antd'
import router from 'umi/router'
import TyHistory from '../../../../utils/TyHistory'

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
        search: {
            appList: []
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
            productName: '',
            pageNo: '',
            pageName: '',

        }
    },
    effects: {
        * add(
            {
                payload: {
                    appName: appName,
                    appId: appId,
                    pageName: pageName,
                    pageUrl: pageUrl,
                }
            },
            {call, put, select}
        ) {
            yield put({
                type: 'startAddModalConfirmLoading'
            });
            const {success, data, message} = yield call(service.add, {
                appName,
                appId,
                pageName,
                pageUrl,
            })
            if (success && success.toString() === 'true') {
                msg.success('添加成功')
                yield put({
                    type: 'getTableList',
                    payload: {
                        pageCurrent: yield select(state => state.burypoint.page.current),
                        pageSize: yield select(state => state.burypoint.page.size)
                    }
                })
                yield put({
                    type: 'hideAddModal'
                })
            } else {
                msg.error('添加失败，请重试' + (message ? '：' + message : ''))
                yield put({
                    type: 'stopAddModalConfirmLoading'
                })
            }
        },
        * update(
            {
                payload: {
                    pointId: pointId,
                    appName: appName,
                    appId: appId,
                    pageName: pageName,
                    pageUrl: pageUrl,
                    pageNo: pageNo
                }
            },
            {call, put, select}
        ) {
            yield put({
                type: 'startUpdateModalConfirmLoading'
            })
            const {success, data, message} = yield call(service.update, {
                pointId: pointId || '',
                appName: appName || '',
                appId: appId || '',
                pageName: pageName || '',
                pageUrl: pageUrl || '',
                pageNo: pageNo || ''
            })
            if (success && success.toString() === 'true') {
                msg.success('修改成功');
                yield put({
                    type: 'getTableList',
                    payload: {
                        pageCurrent: yield select(state => state.burypoint.page.current),
                        pageSize: yield select(state => state.burypoint.page.size)
                    }
                });
                yield put({
                    type: 'hideUpdateModal'
                });
            } else {
                msg.error('修改失败，请重试' + (message ? '：' + message : ''));
                yield put({
                    type: 'stopUpdateModalConfirmLoading'
                });
            }

        },
        * deleteById({payload: {id: pointId}}, {call, put, select}) {
            const {success, data, message} = yield call(service.delete, {pointId});
            if (success && success.toString() === 'true') {
                msg.success('删除成功')
            } else {
                msg.error('删除失败' + (message ? '：' + message : ''))
            }
            yield put({
                type: 'getTableList',
                payload: {
                    pageCurrent: yield select(state => state.burypoint.page.current),
                    pageSize: yield select(state => state.burypoint.page.size)
                }
            })
        },
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
        setAppList(state, {payload: {search: {appList}}}) {
            return {
                ...state,
                search: {
                    ...state.search,
                    appList
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