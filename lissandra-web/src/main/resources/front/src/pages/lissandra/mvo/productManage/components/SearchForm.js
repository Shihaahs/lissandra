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
            <FormItem>
                {getFieldDecorator('isShelf')(<Select
                    showSearch
                    style={{width: 300, marginRight: 10}}
                    placeholder="是否上架"
                >
                    <Option key='1' value='1'>已上架</Option>
                    <Option key='2' value='0'>未上架</Option>
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