/**
 * title: '电子商务借卖交易平台 | 充值/提现审核'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../../components/PageContainer'
import BrLine from '../../../../components/BrLine'
import AddForm from './components/AddForm'
import TyHistory from '../../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class RechargeAndWithdrawCheck extends PureComponent {

    get tableColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record) => text || '-'
        }, {
            title: '操作流水号',
            dataIndex: 'walletOrderNo',
            render: (text, record) => text || '-'
        }, {
            title: '操作方式',
            dataIndex: 'walletOrderWay',
            render: (text, record) => {
                if (record.walletOrderWay === 1) {
                    return '充值';
                } else if (record.walletOrderWay === 2) {
                    return '提现';
                } else {
                    return "-"
                }
            }
        }, {
            title: '操作金额(￥)',
            dataIndex: 'walletOrderMoney',
            render: (text, record) => text || '-'
        }, {
            title: '发起人',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '发起时间',
            dataIndex: 'gmtCreate',
            render: (text, record) => text || '-'
        }, {
            title: '审核情况',
            render: (text, record) =>  {
                if (record.walletOrderState === 0) {
                    return <span style={{color: '#117F22'}}>已审批通过</span>;
                } else if (record.walletOrderState === 1) {
                    return <span style={{color: '#E3071A'}}>审批不通过</span>;
                } else if (record.walletOrderState === 2) {
                    return <span>
                              <Popconfirm
                                  placement="bottomRight"
                                  title='确认通过'
                                  okText='确认'
                                  cancelText='取消'
                                  icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                                  onCancel={null}
                                  onConfirm={this.Approval.bind(this, record.walletOrderId)}
                              >

                                <a>通过</a>
                              </Popconfirm>
                              <Divider type="vertical"/>
                              <Popconfirm
                                  placement="bottomRight"
                                  title='确认不通过'
                                  okText='确认'
                                  cancelText='取消'
                                  icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                                  onCancel={null}
                                  onConfirm={this.NotApproval.bind(this, record.walletOrderId)}
                              >
                                <a>不通过</a>
                              </Popconfirm>
                            </span>;
                } else {
                    return '-';
                }
            }
        }]
    }

    render() {
        return (
            <div>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>电子商务借卖交易平台</Breadcrumb.Item>
                        <Breadcrumb.Item>充值/提现审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>充值/提现审核</h1>
                </div>
                {!this.props.loadingVisible && !this.props.loadingErrorText &&
                <PageContainer
                    content={
                        <Fragment>
                    <SearchForm
                        transferFormRef={this.transferSearchFormRef.bind(this)}
                    />
                            <BrLine height={1}/>
                        <Button type="primary" onClick={this.onSearchSubmit.bind(this)}>查询</Button>&nbsp;
                        <Button onClick={this.onSearchReset.bind(this)}>重置</Button>&nbsp;

                        <BrLine/>
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

    // 审核通过
    Approval(walletOrderId) {
        const walletOrderState = 0;
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/update',
            payload: {
                walletOrderId,
                walletOrderState
            }
        })
    }

    // 审核不通过
    NotApproval(walletOrderId) {
        const walletOrderState = 1;
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/update',
            payload: {
                walletOrderId,
                walletOrderState
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
            type: 'rechargeAndWithdrawCheck/getTableList',
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
            type: 'rechargeAndWithdrawCheck/renderSearchModal'
        })
    }
}

const mapStateToProps = ({rechargeAndWithdrawCheck}) => ({
    loadingVisible: rechargeAndWithdrawCheck.loading.visible,
    loadingExiting: rechargeAndWithdrawCheck.loading.exiting,
    loadingErrorText: rechargeAndWithdrawCheck.loading.errorText,
    tableDataSource: rechargeAndWithdrawCheck.table.dataSource,
    pageCurrent: rechargeAndWithdrawCheck.page.current,
    pageSize: rechargeAndWithdrawCheck.page.size,
    pageTotal: rechargeAndWithdrawCheck.page.total,
    pageCount: rechargeAndWithdrawCheck.page.count,
    addModalVisible: rechargeAndWithdrawCheck.addModal.visible,
    updateModalVisible: rechargeAndWithdrawCheck.updateModal.visible,
    updateModalConfirmLoading: rechargeAndWithdrawCheck.updateModal.confirmLoading,
    addModalConfirmLoading: rechargeAndWithdrawCheck.addModal.confirmLoading,
    addModalDataTypeList: rechargeAndWithdrawCheck.addModal.data.typelist,
    addition: rechargeAndWithdrawCheck.addition
});
export default connect(mapStateToProps)(RechargeAndWithdrawCheck)
