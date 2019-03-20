import service from '../services/appauth'
import {delay, formatISODate} from '../../../../utils/TyTools'
import {message as msg} from 'antd'
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
            appId: '',
            appName: '',
            userName: '',
        }
    },
    effects: {
        * add(
            {
                payload: {
                    appName: appName,
                    appId: appId,
                    userId: userId,
                    userName: userName,
                }
            },
            {
                call, put, select
            }
        ) {
            yield put({
                type: 'startAddModalConfirmLoading'
            });
            const {success, data, message} = yield call(service.add, {
                appName,
                appId,
                userId,
                userName,
            });
            if (success && success.toString() === 'true' && data === 1) {
                console.log(data);
                msg.success('添加成功')
                yield put({
                    type: 'getTableList',
                    payload: {
                        pageCurrent: yield select(state => state.appauth.page.current),
                        pageSize: yield select(state => state.appauth.page.size)
                    }
                })
                yield put({
                    type: 'hideAddModal'
                })
            } else if (success && success.toString() === 'true' && data === 0) {
                msg.error('未找到该用户，请确认用户名称是否输入有误!')
            } else if (success && success.toString() === 'true' && data === 2) {
                msg.error('该用户没有访问该应用的权限，请联系相应的应用Owner开通权限')
            } else {
                msg.error('添加失败，请重试' + (message ? '：' + message : ''))
                yield put({
                    type: 'stopAddModalConfirmLoading'
                })
            }
        },
        * deleteById({payload: {appAuthId: appAuthId}}, {call, put, select}) {
            console.log("deleteById - appAuthId:" + appAuthId);
            const {success, data, message} = yield call(service.delete, {
                appAuthId: appAuthId
            });
            if (success && success.toString() === 'true') {
                msg.success('删除成功')
            } else {
                msg.error('删除失败' + (message ? '：' + message : ''))
            }
            yield put({
                type: 'getTableList',
                payload: {
                    pageCurrent: yield select(state => state.appauth.page.current),
                    pageSize: yield select(state => state.appauth.page.size)
                }
            })
        },
        * getTableList({payload: {pageCurrent = 1, pageSize = 10, addition = {}}}, {call, put}) {
            const {success, data, message} = yield call(service.list, Object.assign({
                pageCurrent, pageSize
            }, addition));
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
                });
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
                    });
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
        }
        ,
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
        setAppList(state, {payload: {search: {appList}}}) {
            return {
                ...state,
                search: {
                    ...state.search,
                    appList
                }
            }
        }
    }
}