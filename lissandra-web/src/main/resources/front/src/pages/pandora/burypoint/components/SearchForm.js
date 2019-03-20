import React, {PureComponent, Fragment} from 'react'
import {Button, Divider, Form, Input, Select} from 'antd'
import BrLine from '../../../../components/BrLine'

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
            <FormItem>{getFieldDecorator('appId')(
                <Select
                    showSearch
                    style={{width: 300, marginRight: 10}}
                    placeholder="全部项目"
                    optionFilterProp="children"
                    initialValue=''
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
                    {
                        [<Option key='all' value=''>全部</Option>].concat(this.props.searchAppList.map(item => {
                            return <Option key={item.appId} value={item.appId}>{item.appName}</Option>
                        }))
                    }
                </Select>
            )}</FormItem>
            <FormItem>{getFieldDecorator('pageNo')(<Input placeholder="页面编码" style={{
                width: 300,
                marginRight: 10
            }}/>)}</FormItem>
            <FormItem>{getFieldDecorator('pageName')(<Input placeholder="页面名称" style={{
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