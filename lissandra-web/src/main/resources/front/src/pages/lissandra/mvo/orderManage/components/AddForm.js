import React, {PureComponent} from 'react'
import {Table, Divider, Tag,Form} from 'antd'


class AddForm extends PureComponent {

    get tableColumns() {
        return [
        {
            title: '商品名称',
            dataIndex: 'productName',
            render: text => text || '',
        },
        {
            title: '商品价格',
            dataIndex: 'productPrice',
            render: text => text || '',
        },
        {
            title: '商品数量',
            dataIndex: 'productQuantity',
            render: text => text || '',
        },
    ]}

    render() {
        console.log("data  begin");
        console.log(this.props.tableDataSource);

        return (
            <Table
                columns={this.tableColumns}
                dataSource={this.props.showDataSource}
                rowKey={record => record.productOrderId}
            />
        )
    }

    // 向父组件传递 form 的 ref
    componentDidMount() {
        this.props.transferFormRef(this.props.form)
    }
}

export default Form.create()(AddForm)
