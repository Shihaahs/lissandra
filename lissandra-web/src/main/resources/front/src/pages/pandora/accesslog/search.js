/**
 * title: '统一埋点平台 | 日志明细'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, DatePicker,TimePicker, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../components/PageContainer'
import BrLine from '../../../components/BrLine'
import TyHistory from '../../../utils/TyHistory'
import SearchForm from "./components/SearchForm"
import ShowForm from "../accesslog/components/ShowForm";

class AccessLogWithSearch extends PureComponent {
    get tableColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record) => text || '-'
        }, {
            title: '应用名称',
            dataIndex: 'appName',
            render: (text, record) => text || '-'
        }, {
            title: '访问者',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '页面名称',
            dataIndex: 'pageName',
            render: (text, record) => text || '-'
        }, {
            title: '页面编码',
            dataIndex: 'pageNo',
            render: (text, record) => text || '-'
        }, {
            title: '访问时间',
            dataIndex: 'visitTime',
            render: (text, record) => text || '-'
        }, {
            title: 'ip来源',
            dataIndex: 'sourceIp',
            render: (text, record) => text || '-'
        },{
            title: '操作',
            render: (text, record) => (
                <span>
            <a onClick={this.onShowModalClicked.bind(this, record.logId)}>查看更多</a>
          </span>
            )
        }]
    }

    render() {

        return (
            <div>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>统一埋点平台</Breadcrumb.Item>
                        <Breadcrumb.Item>日志明细</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>日志明细</h1>
                </div>
                {!this.props.loadingVisible && !this.props.loadingErrorText &&
                <PageContainer
                    content={<Fragment>
                        <SearchForm
                            transferFormRef={this.transferSearchFormRef.bind(this)}
                            searchAppList={this.props.searchAppList}
                        />
                        <BrLine height={1}/>
                        <Button type="primary" onClick={this.onSearchSubmit.bind(this)}>查询</Button>&nbsp;
                        <Button onClick={this.onSearchReset.bind(this)}>重置</Button>&nbsp;
                        <BrLine/>


                        <Table
                            columns={this.tableColumns}
                            dataSource={this.props.tableDataSource}
                            rowKey={record => record.accesslogId}
                            pagination={{
                                defaultCurrent: this.props.pageCurrent,
                                current: this.props.pageCurrent,
                                defaultPageSize: this.props.pageSize,
                                pageSize: this.props.pageSize,
                                total: this.props.pageTotal,
                                showTotal: (total, range) => `共 ${total} 条 | 第 ${range[0]} 条 - 第 ${range[1]} 条`,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                onShowSizeChange: this.onTablePageSizeChange.bind(this),
                                onChange: this.onTablePageNumChange.bind(this)
                            }}
                        />
                    </Fragment>}
                />}
                <Modal
                    title="日志额外信息"
                    visible={this.props.showModalVisible}
                    footer={null}
                    cancelText="退出"
                    onCancel={this.onShowModalCancel.bind(this)}
                >
                    <ShowForm
                        transferFormRef={this.transferShowFormRef.bind(this)}
                    />
                </Modal>
            </div>
        )
    }

    transferShowFormRef(form) {
        this.showForm = form
    }

    onShowModalClicked(logId) {
        this.props.dispatch({
            type: 'accesslog/getExtFieldJsonByLogId',
            payload: {
                logId,
                callback: this.setShowForm.bind(this)
            }
        })
    }

    setShowForm(data) {
        this.showForm.setFieldsValue(data)
    }

// 展示对话框 - 取消
    onShowModalCancel() {
        this.props.dispatch({
            type: 'accesslog/hideShowModal'
        })
    }

    // 获得条件搜索 form 的 ref
    transferSearchFormRef(form) {
        this.searchForm = form
    }

    // 搜索提交
    onSearchSubmit() {
        this.searchForm.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                this.loadTableDataSource({
                    pageCurrent: 1,
                    addition: values
                })
            }
        })
    }

    // 搜索重置
    onSearchReset() {
        this.searchForm.resetFields()
    }

    // 获得 form 的 ref
    transferFormRef(form) {
        this.form = form
    }


    // 分页量变化
    onTablePageSizeChange(pageCurrent, pageSize) {
        this.loadTableDataSource({
            pageCurrent: Math.ceil(((pageCurrent - 1) * this.props.pageSize + 1) / pageSize),
            pageSize
        })
    }

    // 分页跳转
    onTablePageNumChange(pageCurrent, pageSize) {
        this.loadTableDataSource({
            pageCurrent, pageSize
        })
    }

    // 载入数据
    loadTableDataSource({
                            pageCurrent = this.props.pageCurrent,
                            pageSize = this.props.pageSize,
                            addition = this.props.addition
                        } = {}) {
        this.props.dispatch({
            type: 'accesslog/getTableList',
            payload: {
                pageCurrent, pageSize, addition
            }
        })
    }

    componentDidMount() {
        if (TyHistory.transferredData) {
            this.loadLoginTimeRangeDataSource({addition: TyHistory.transferredData})
            return
        }
        TyHistory.auto()
        TyHistory.notSame(() => {
            setTimeout(() => {
                this.loadLoginTimeRangeDataSource({pageCurrent: 1, pageSize: 10, addition: {}})
            }, 100)
        })
        TyHistory.ifSame(
            storage => {
                if (!storage) {
                    this.loadLoginTimeRangeDataSource()
                    return
                } else {
                    this.loadLoginTimeRangeDataSource({addition: storage.addition})
                }
            })
        this.props.dispatch({
            type: 'accesslog/renderSearchModal'
        })
    }

    loadLoginTimeRangeDataSource({
                            pageCurrent = this.props.pageCurrent,
                            pageSize = this.props.pageSize,
                            addition = this.props.addition
                        } = {}) {
        this.props.dispatch({
            type: 'accesslog/getLoginTableList',
            payload: {
                pageCurrent, pageSize, addition
            }
        })
    }
}

const mapStateToProps = ({accesslog}) => ({
    loadingVisible: accesslog.loading.visible,
    loadingExiting: accesslog.loading.exiting,
    loadingErrorText: accesslog.loading.errorText,
    tableDataSource: accesslog.table.dataSource,
    pageCurrent: accesslog.page.current,
    pageSize: accesslog.page.size,
    pageTotal: accesslog.page.total,
    pageCount: accesslog.page.count,
    searchAppList: accesslog.search.appList,
    showModalVisible: accesslog.showModal.visible,
    pageName: accesslog.showModal.data.pageName,
    extFieldJson: accesslog.showModal.data.extFieldJson,
    addition: accesslog.addition
})

export default connect(mapStateToProps)(AccessLogWithSearch)
