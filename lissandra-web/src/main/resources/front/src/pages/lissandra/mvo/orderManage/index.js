/**
 * title: '电子商务借卖交易平台 | 订单管理'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../../components/PageContainer'
import BrLine from '../../../../components/BrLine'
import TyHistory from '../../../../utils/TyHistory'
import SearchForm from "./components/SearchForm";


class OrderManage extends PureComponent {

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
            title: '订单编号',
            dataIndex: 'productOrderNo',
            render: (text, record) => text || '-'
        }, {
            title: '订单人',
            dataIndex: 'userName',
            render: (text, record) => text || '-'
        }, {
            title: '订单商品',
            dataIndex: 'productId',
            render: (text, record) => text || '-'
        }, {
            title: '订单时间',
            dataIndex: 'gmtModified',
            render: (text, record) => text || '-'
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
            <Popconfirm
                placement="bottomRight"
                title='确认发货'
                okText='确认'
                cancelText='取消'
                icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                onCancel={null}
                onConfirm={this.isGo.bind(this, record.productOrderId)}
            >

              <a>发货</a>
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
                        <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>订单管理</h1>
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
                            rowKey={record => record.productOrderId}
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

    // 删除
    isGo(id) {
        this.props.dispatch({
            type: 'orderManage/deleteById',
            payload: {
                id
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
            type: 'orderManage/getTableList',
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
                    this.loadTableDataSource();
                    return
                } else {
                    this.loadTableDataSource({addition: storage.addition})
                }
            })
        this.props.dispatch({
            type: 'orderManage/renderSearchModal'
        })
    }
}

const mapStateToProps = ({orderManage}) => ({
    loadingVisible: orderManage.loading.visible,
    loadingExiting: orderManage.loading.exiting,
    loadingErrorText: orderManage.loading.errorText,
    tableDataSource: orderManage.table.dataSource,
    pageCurrent: orderManage.page.current,
    pageSize: orderManage.page.size,
    pageTotal: orderManage.page.total,
    pageCount: orderManage.page.count,
    addition: orderManage.addition
});
export default connect(mapStateToProps)(OrderManage)
