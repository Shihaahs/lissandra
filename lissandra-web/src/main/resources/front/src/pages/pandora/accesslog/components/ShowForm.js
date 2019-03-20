import React, {PureComponent} from 'react'
import {Form, Input, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class ShowForm extends PureComponent {
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

            <Form
                style={{
                    textAlign: 'center'
                }}
            >
                <FormItem
                    {...this.formItemLayout}
                    label="页面名称"
                >
                    {getFieldDecorator('pageName')(
                        <Input readOnly />)}
                </FormItem>

                <FormItem
                    {...this.formItemLayout}
                    label="上一跳"
                >
                    {getFieldDecorator('refUrl')(
                        <Input readOnly />)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="当前页"
                >
                    {getFieldDecorator('curUrl')(
                        <Input readOnly />)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="访问设备"
                >
                    {getFieldDecorator('deviceId')(
                        <Input readOnly />)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="页面额外信息"
                >
                    {getFieldDecorator('extFieldJson')(
                        <textarea style={{width:316}} readOnly />)}
                </FormItem>

            </Form>
        )
    }

    // 向父组件传递 form 的 ref
    componentDidMount() {
        this.props.transferFormRef(this.props.form)
    }
}

export default Form.create()(ShowForm)