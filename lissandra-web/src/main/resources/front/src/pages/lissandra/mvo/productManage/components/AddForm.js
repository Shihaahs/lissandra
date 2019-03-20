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
        const {getFieldDecorator} = this.props.form;
        return (

            <Form>
                <FormItem
                    {...this.formItemLayout}
                    label="商品名称"
                >
                    {getFieldDecorator('productName')(
                        <Input placeholder="请输入商品名称"/>)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="商品价格"
                >
                    {getFieldDecorator('productPrice')(<Input placeholder="请输入商品价格"/>)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="商品描述"
                >
                    {getFieldDecorator('productDescription')(<textarea style={{width:316}} placeholder="请输入商品描述" />)}
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