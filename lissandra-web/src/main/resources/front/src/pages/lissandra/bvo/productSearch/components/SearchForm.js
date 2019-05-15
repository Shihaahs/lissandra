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
            <FormItem>{getFieldDecorator('productName')(<Input placeholder="商品名称" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('productManufactureName')(<Input placeholder="店铺名称" style={{
                width: 300,
                marginRight: 10
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