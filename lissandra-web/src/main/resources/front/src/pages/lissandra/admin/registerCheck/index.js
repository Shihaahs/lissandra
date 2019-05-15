/**
 * title: '电子商务借卖交易平台 | 注册审核'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../../components/PageContainer'
import BrLine from '../../../../components/BrLine'
import AddForm from './components/AddForm'
import TyHistory from '../../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class RegisterCheck extends PureComponent {

    get tableColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record) => text || '-'
        }, {
            title: '注册名称',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '注册密码',
            dataIndex: 'password',
            render: (text, record) => text || '-'
        }, {
            title: '注册手机',
            dataIndex: 'phone',
            render: (text, record) => text || '-'
        }, {
            title: '注册角色',
            dataIndex: 'permission',
            render: (text, record) =>  {
                if (record.permission === 0) {
                    return '管理员';
                } else if (record.permission === 1) {
                    return '品牌商';
                } else if (record.permission === 2) {
                    return '借卖方';
                } else {
                    return "-"
                }
            }
        }, {
            title: '注册时间',
            dataIndex: 'gmtCreate',
            render: (text, record) => text || '-'
        }, {
            title: '操作',
            render: (text, record) => {
                if (record.isApproval === 0) {
                    return <span style={{color: '#117F22'}}>已审批通过</span>;
                } else if (record.isApproval === 1) {
                    return <span style={{color: '#E3071A'}}>审批不通过</span>;
                } else if (record.isApproval === 2) {
                    return <span>
                              <Popconfirm
                                  placement="bottomRight"
                                  title='确认通过'
                                  okText='确认'
                                  cancelText='取消'
                                  icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                                  onCancel={null}
                                  onConfirm={this.Approval.bind(this, record.userId)}
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
                                  onConfirm={this.NotApproval.bind(this, record.userId)}
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
                        <Breadcrumb.Item>注册审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>注册审核</h1>
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
                            rowKey={record => record.userId}
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
        this.loadTableDataSource({
            pageCurrent, pageSize
        })
    }

    // 审核通过
    Approval(userId) {
        const isApproval = 0;
        this.props.dispatch({
            type: 'registerCheck/approval',
            payload: {
                userId,
                isApproval
            }
        })
    }

    // 审核不通过
    NotApproval(userId) {
        const isApproval = 1;
        this.props.dispatch({
            type: 'registerCheck/approval',
            payload: {
                userId,
                isApproval
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
            type: 'registerCheck/getTableList',
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
            type: 'registerCheck/renderSearchModal'
        })
    }
}

const mapStateToProps = ({registerCheck}) => ({
    loadingVisible: registerCheck.loading.visible,
    loadingExiting: registerCheck.loading.exiting,
    loadingErrorText: registerCheck.loading.errorText,
    tableDataSource: registerCheck.table.dataSource,
    pageCurrent: registerCheck.page.current,
    pageSize: registerCheck.page.size,
    pageTotal: registerCheck.page.total,
    pageCount: registerCheck.page.count,
    addition: registerCheck.addition
});
export default connect(mapStateToProps)(RegisterCheck)
