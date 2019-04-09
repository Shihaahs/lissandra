import React, {PureComponent, Fragment} from 'react'
import {Button, Divider, Form, Input, Select} from 'antd'

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
            <FormItem>{getFieldDecorator('walletOrderNo')(<Input placeholder="订单流水号" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>

            <FormItem>{getFieldDecorator('userName')(<Input placeholder="发起人" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>
                {getFieldDecorator('walletOrderWay')(<Select
                    showSearch
                    style={{width: 300, marginRight: 10}}
                    placeholder="操作方式"
                >
                    <Option key='1' value='2'>充值</Option>
                    <Option key='2' value='1'>提现</Option>
                </Select>)}
            </FormItem>
        </Form>
    )
  }
  
  // 向父组件传递 form 的 ref
  componentDidMount() {
    this.props.transferFormRef(this.props.form)
  }
}

export default Form.create()(SearchForm)