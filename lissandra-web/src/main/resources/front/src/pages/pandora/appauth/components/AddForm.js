import React, {PureComponent} from 'react'
import {Form, Input, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class AddForm extends PureComponent {
    get formItemLayout() {
        return {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (

            <Form>
                <FormItem
                    {...this.formItemLayout}
                    label="应用名称"
                >       {getFieldDecorator('appId')(<Select
                    showSearch
                    style={{width: '100%'}}
                    placeholder="请选择应用"
                    optionFilterProp="children"
                    onChange={(value, {props: {children:appName}}) => {this.props.form.setFieldsValue(
                        {appName})}}
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
                    {
                        [<Option key='all' value=''>全部</Option>].concat(this.props.searchAppList.map(item => {
                            return <Option key={item.appId} value={item.appId}>{item.appName}</Option>
                        }))
                    }
                </Select>)}
                </FormItem>
                <FormItem style={{display: 'none'}}>
                    {getFieldDecorator('appName')(<Input />)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="用户名称"
                >
                    {getFieldDecorator('userName')(
                        <Input placeholder="请输入用户名称"/>)}
                </FormItem>
            </Form>
        )
    }

    // 向父组件传递 form 的 ref
    componentDidMount() {
        this.props.transferFormRef(this.props.form)
    }
}

export default Form.create()(AddForm)