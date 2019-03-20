/**
 * title: '统一埋点平台 | 用户登录'
 */
import React, {Fragment, PureComponent} from 'react'
import {connect} from 'dva'
import {Alert, Breadcrumb, Button, DatePicker, Divider, Form, Icon, Input, Modal, Popconfirm, Select, Table} from 'antd'
import PageContainer from '../../../components/PageContainer'
import BrLine from '../../../components/BrLine'
import SearchForm from "./components/SearchForm"


class UserPrint extends PureComponent {

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
            title: '登录时间',
            dataIndex: 'loginTime',
            render: (text, record) => text || '-'
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
            <a onClick={this.onFindAccessLog.bind(this,record)}>查看登录时段的日志明细</a>
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
                        <Breadcrumb.Item>应用管理</Breadcrumb.Item>
                        <Breadcrumb.Item>登录记录</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>登录记录</h1>
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
                            rowKey={record => record.printId}
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
    onFindAccessLog(record){
        this.props.dispatch({
            type: 'userprint/findAccessLog',
            payload: {
                record
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
            type: 'userprint/getTableList',
            payload: {
                pageCurrent, pageSize, addition
            }
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadTableDataSource({pageCurrent: 1, pageSize: 10, addition: {}})
        }, 100)
        this.props.dispatch({
            type: 'userprint/renderSearchModal'
        })
    }
}


const mapStateToProps = ({userprint}) => ({
    loadingVisible: userprint.loading.visible,
    loadingExiting: userprint.loading.exiting,
    loadingErrorText: userprint.loading.errorText,
    tableDataSource: userprint.table.dataSource,
    pageCurrent: userprint.page.current,
    pageSize: userprint.page.size,
    pageTotal: userprint.page.total,
    pageCount: userprint.page.count,
    searchAppList: userprint.search.appList,
    addition: userprint.addition
})

export default connect(mapStateToProps)(UserPrint)

