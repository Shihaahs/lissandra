/**
 * title: '电子商务借卖交易平台 | 商品浏览'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../../components/PageContainer'
import BrLine from '../../../../components/BrLine'
import AddForm from './components/AddForm'
import TyHistory from '../../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class ProductSearch extends PureComponent {

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
            title: '商品厂商',
            dataIndex: 'productManufactureName',
            render: (text, record) => text || '-'
        }, {
            title: '商品描述',
            dataIndex: 'productDescription',
            render: (text, record) => text || '-'
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
            <a onClick={this.onAddModalClicked.bind(this, record)}>推送至</a>
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
                        <Breadcrumb.Item>商品浏览</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>商品浏览</h1>
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
                    title="推送至"
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
            type: 'productSearch/showAddModal'
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
                    type: 'productSearch/add',
                    payload: values
                })
            }
        })
    }

    // 新增对话框 - 取消
    onAddModalCancel() {
        this.props.dispatch({
            type: 'productSearch/hideAddModal'
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
            type: 'productSearch/getTableList',
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
            type: 'productSearch/renderSearchModal'
        })
    }
}

const mapStateToProps = ({productSearch}) => ({
    loadingVisible: productSearch.loading.visible,
    loadingExiting: productSearch.loading.exiting,
    loadingErrorText: productSearch.loading.errorText,
    tableDataSource: productSearch.table.dataSource,
    pageCurrent: productSearch.page.current,
    pageSize: productSearch.page.size,
    pageTotal: productSearch.page.total,
    pageCount: productSearch.page.count,
    addModalVisible: productSearch.addModal.visible,
    addModalConfirmLoading: productSearch.addModal.confirmLoading,
    addition: productSearch.addition
});
export default connect(mapStateToProps)(ProductSearch)
