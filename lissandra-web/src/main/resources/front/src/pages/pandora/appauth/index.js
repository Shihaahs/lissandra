/**
 * title: '统一埋点平台 | 项目管理'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../components/PageContainer'
import BrLine from '../../../components/BrLine'
import AddForm from './components/AddForm'
import TyHistory from '../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class AppAuth extends PureComponent {

    get tableColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record) => text || '-'
        }, {
            title: '用户名称',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '应用名称',
            dataIndex: 'appName',
            render: (text, record) => text || '-'
        },{
            title: '操作',
            render: (text, record) => (
                <span>
            <Popconfirm
                placement="bottomRight"
                title='确认移除'
                okText='确认'
                cancelText='取消'
                icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                onCancel={null}
                onConfirm={this.deleteById.bind(this, record.appAuthId)}
            >
              <a>移除</a>
            </Popconfirm>
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
                        <Breadcrumb.Item>项目管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>项目管理</h1>
                </div>
                {!this.props.loadingVisible && !this.props.loadingErrorText &&
                <PageContainer
                    content={
                        <Fragment>
                    <SearchForm
                        transferFormRef={this.transferSearchFormRef.bind(this)}
                        searchAppList={this.props.searchAppList}
                    />
                            <BrLine height={1}/>
                        <Button type="primary" onClick={this.onSearchSubmit.bind(this)}>查询</Button>&nbsp;
                        <Button onClick={this.onSearchReset.bind(this)}>重置</Button>&nbsp;
                        <Button type="primary" style={{float: 'right'}} onClick={this.onAddModalClicked.bind(this)}>
                            <Icon type="folder-add"/>新增项目
                        </Button>

                        <BrLine/>
                        <Table
                            columns={this.tableColumns}
                            dataSource={this.props.tableDataSource}
                            rowKey={record => record.appauthId}
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
                    title="新增项目"
                    visible={this.props.addModalVisible}
                    okText="新增"
                    onOk={this.onAddModalOk.bind(this)}
                    cancelText="取消"
                    onCancel={this.onAddModalCancel.bind(this)}
                    confirmLoading={this.props.addModalConfirmLoading}
                >
                    <AddForm
                        transferFormRef={this.transferFormRef.bind(this)}
                        searchAppList={this.props.searchAppList}
                    />
                </Modal>
            </div>
        )
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

    // 新增对话框
    onAddModalClicked() {
        this.props.dispatch({
            type: 'appauth/showAddModal'
        })
        if (this.form) {
            this.form.resetFields()
        }
    }

    // 新增对话框 - 确认
    onAddModalOk() {
        this.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'appauth/add',
                    payload: values
                })
            }
        })
    }

    // 新增对话框 - 取消
    onAddModalCancel() {
        this.props.dispatch({
            type: 'appauth/hideAddModal'
        })
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
        console.log("pageCurrent" + pageCurrent)
        this.loadTableDataSource({
            pageCurrent, pageSize
        })
    }

    // 删除
    deleteById(appAuthId) {
        this.props.dispatch({
            type: 'appauth/deleteById',
            payload: {
                appAuthId
            }
        })
    }

    // 载入数据
    loadTableDataSource({
                            pageCurrent = this.props.pageCurrent,
                            pageSize = this.props.pageSize,
                            addition = this.props.addition
                        } = {}) {
        this.props.dispatch({
            type: 'appauth/getTableList',
            payload: {
                pageCurrent, pageSize, addition
            }
        })
    }

    componentDidMount() {
        TyHistory.auto()
        TyHistory.notSame(() => {
            setTimeout(() => {
                this.loadTableDataSource({pageCurrent: 1, pageSize: 10, addition: {}})
            }, 0)
        })
        TyHistory.ifSame(
            storage => {
                if (!storage) {
                    this.loadTableDataSource()
                    return
                } else {
                    this.loadTableDataSource({addition: storage.addition})
                }
            })
        this.props.dispatch({
            type: 'appauth/renderSearchModal'
        })
    }
}

const mapStateToProps = ({appauth}) => ({
    loadingVisible: appauth.loading.visible,
    loadingExiting: appauth.loading.exiting,
    loadingErrorText: appauth.loading.errorText,
    tableDataSource: appauth.table.dataSource,
    pageCurrent: appauth.page.current,
    pageSize: appauth.page.size,
    pageTotal: appauth.page.total,
    pageCount: appauth.page.count,
    searchAppList: appauth.search.appList,
    addModalVisible: appauth.addModal.visible,
    addModalConfirmLoading: appauth.addModal.confirmLoading,
    addModalDataTypeList: appauth.addModal.data.typelist,
    addition: appauth.addition
});
export default connect(mapStateToProps)(AppAuth)
