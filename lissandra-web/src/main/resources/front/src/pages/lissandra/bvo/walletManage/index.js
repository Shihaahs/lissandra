/**
 * title: '电子商务借卖交易平台 | 钱包管理'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../../components/PageContainer'
import BrLine from '../../../../components/BrLine'
import AddForm from './components/AddForm'
import TyHistory from '../../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class WalletManage extends PureComponent {

    get tableColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record) => text || '-'
        }, {
            title: '流水号',
            dataIndex: 'walletOrderNo',
            render: (text, record) => text || '-'
        }, {
            title: '充值/提现',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '发起时间',
            dataIndex: 'gmtModified',
            render: (text, record) => text || '-'
        },{
            title: '审核情况',
            dataIndex: 'walletOrderState',
            render: (text, record) => text || '-'
        }]
    }

    render() {
        return (
            <div>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>电子商务借卖交易平台</Breadcrumb.Item>
                        <Breadcrumb.Item>钱包管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>钱包管理</h1>
                </div>
                {!this.props.loadingVisible && !this.props.loadingErrorText &&
                <PageContainer
                    content={
                        <Fragment>

                        <Button type="primary" style={{float: 'right', marginBottom: '10px'}} onClick={this.onAddModalClicked.bind(this)}>
                            <Icon type="folder-add"/>充值/提现
                        </Button>
                        <BrLine height={4} />
                        <Table
                            columns={this.tableColumns}
                            dataSource={this.props.tableDataSource}
                            rowKey={record => record.walletOrderId}
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
                    title="充值/提现"
                    visible={this.props.addModalVisible}
                    okText="确定"
                    onOk={this.onAddModalOk.bind(this)}
                    cancelText="取消"
                    onCancel={this.onAddModalCancel.bind(this)}
                    confirmLoading={this.props.addModalConfirmLoading}
                >
                    <AddForm
                        transferFormRef={this.transferFormRef.bind(this)}
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
            type: 'walletManage/showAddModal'
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
                    type: 'walletManage/add',
                    payload: values
                })
            }
        })
    }

    // 新增对话框 - 取消
    onAddModalCancel() {
        this.props.dispatch({
            type: 'walletManage/hideAddModal'
        })
    }

    // 获得修改搜索 form 的 ref
    transferUpdateFormRef(form) {
        this.updateForm = form
    }

    // 弹出 修改对话框
    onUpdateModalClicked(record) {
        if (this.updateForm) {
            this.updateForm.resetFields()
            this.updateForm.setFieldsValue(record)
            console.log(record)
        } else {
            setTimeout(() =>{
                this.updateForm.resetFields()
                this.updateForm.setFieldsValue(record)
                console.log(record)
            }, 0)
        }

        this.props.dispatch({
            type: 'walletManage/showUpdateModal'
        })

    }

    // 修改对话框 - 确认
    onUpdateModalOk() {
        this.updateForm.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                this.props.dispatch({
                    type: 'walletManage/update',
                    payload: values
                })
            }
        })
    }

    // 修改对话框 - 取消
    onUpdateModalCancel() {
        this.props.dispatch({
            type: 'walletManage/hideUpdateModal'
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


    // 载入数据
    loadTableDataSource({
                            pageCurrent = this.props.pageCurrent,
                            pageSize = this.props.pageSize,
                            addition = this.props.addition
                        } = {}) {
        this.props.dispatch({
            type: 'walletManage/getTableList',
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
            type: 'walletManage/renderSearchModal'
        })
    }
}

const mapStateToProps = ({walletManage}) => ({
    loadingVisible: walletManage.loading.visible,
    loadingExiting: walletManage.loading.exiting,
    loadingErrorText: walletManage.loading.errorText,
    tableDataSource: walletManage.table.dataSource,
    pageCurrent: walletManage.page.current,
    pageSize: walletManage.page.size,
    pageTotal: walletManage.page.total,
    pageCount: walletManage.page.count,
    addModalVisible: walletManage.addModal.visible,
    addModalConfirmLoading: walletManage.addModal.confirmLoading,
    addModalDataTypeList: walletManage.addModal.data.typelist,
    addition: walletManage.addition
});
export default connect(mapStateToProps)(WalletManage)
