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
            <FormItem>{getFieldDecorator('userName')(<Input placeholder="注册名称" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('phone')(<Input placeholder="手机号" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>
                {getFieldDecorator('permission')(<Select
                    showSearch
                    style={{width: 300, marginRight: 10}}
                    placeholder="注册角色"
                >
                    <Option key='1' value='0'>管理员</Option>
                    <Option key='2' value='1'>品牌商</Option>
                    <Option key='3' value='2'>借卖方</Option>
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