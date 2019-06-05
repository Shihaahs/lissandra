import React, {PureComponent, Fragment} from 'react'
import {Button, DatePicker, Divider, Form, Input, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class SearchForm extends PureComponent {
  constructor() {
    super()
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
        <Form layout="inline">
            <FormItem>{getFieldDecorator('productOrderNo')(<Input placeholder="订单编号" style={{
                width: 200,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('userName')(<Input placeholder="订单人" style={{
                width: 200,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('startTime')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="起始时间"
                            style={{
                                width: 200,
                                marginRight: 8
                            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('endTime')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间"
                            style={{
                                width: 200,
                                marginRight: 8
                            }}/>)}</FormItem>
        </Form>
    )
  }

  // 向父组件传递 form 的 ref
  componentDidMount() {
    this.props.transferFormRef(this.props.form)
  }
}

export default Form.create()(SearchForm)
