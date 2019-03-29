/**
 * title: '电子商务借卖交易平台 | 商品管理'
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
        },/* {
            title: '商品图片',
            dataIndex: 'appName',
            render: (text, record) => text || '-'
        },*/ {
            title: '商品名称',
            dataIndex: 'productName',
            render: (text, record) => text || '-'
        }, {
            title: '商品价格',
            dataIndex: 'productPrice',
            render: (text, record) => text || '-'
        }, {
            title: '商品描述',
            dataIndex: 'productDescription',
            render: (text, record) => text || '-'
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
            <Popconfirm
                placement="bottomRight"
                title='确认上架'
                okText='确认'
                cancelText='取消'
                icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                onCancel={null}
                onConfirm={this.isShelf.bind(this, record.productId, record.isShelf)}
            >

              <a>上架</a>
            </Popconfirm>
            <Divider type="vertical"/>
            <a onClick={this.onUpdateModalClicked.bind(this, record)}>编辑</a>
            <Divider type="vertical"/>
            <Popconfirm
                placement="bottomRight"
                title='确认删除'
                okText='确认'
                cancelText='取消'
                icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                onCancel={null}
                onConfirm={this.deleteById.bind(this, record.productId)}
            >
              <a>删除</a>
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
                        <Breadcrumb.Item>电子商务借卖交易平台</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>商品管理</h1>
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
                            <Icon type="folder-add"/>录入商品
                        </Button>

                        <BrLine/>
                        <Table
                            columns={this.tableColumns}
                            dataSource={this.props.tableDataSource}
                            rowKey={record => record.productId}
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
                    title="录入商品"
                    visible={this.props.addModalVisible}
                    okText="录入"
                    onOk={this.onAddModalOk.bind(this)}
                    cancelText="取消"
                    onCancel={this.onAddModalCancel.bind(this)}
                    confirmLoading={this.props.addModalConfirmLoading}
                >
                    <AddForm
                        transferFormRef={this.transferFormRef.bind(this)}
                    />
                </Modal>

                <Modal
                    title="编辑商品"
                    visible={this.props.updateModalVisible}
                    okText="编辑"
                    onOk={this.onUpdateModalOk.bind(this)}
                    cancelText="取消"
                    onCancel={this.onUpdateModalCancel.bind(this)}
                    confirmLoading={this.props.updateModalConfirmLoading}
                >
                    <AddForm
                        transferFormRef={this.transferUpdateFormRef.bind(this)}
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
            type: 'rechargeAndWithdrawCheck/showAddModal'
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
                    type: 'rechargeAndWithdrawCheck/add',
                    payload: values
                })
            }
        })
    }

    // 新增对话框 - 取消
    onAddModalCancel() {
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/hideAddModal'
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
            type: 'rechargeAndWithdrawCheck/showUpdateModal'
        })

    }

    // 修改对话框 - 确认
    onUpdateModalOk() {
        this.updateForm.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                this.props.dispatch({
                    type: 'rechargeAndWithdrawCheck/update',
                    payload: values
                })
            }
        })
    }

    // 修改对话框 - 取消
    onUpdateModalCancel() {
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/hideUpdateModal'
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
    deleteById(id) {
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/deleteById',
            payload: {
                id
            }
        })
    }

    // 上架
    isShelf(productId, isShelf) {
        this.props.dispatch({
            type: 'rechargeAndWithdrawCheck/isShelf',
            payload: {
                productId,
                isShelf
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
