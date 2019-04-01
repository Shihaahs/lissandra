import React, {PureComponent} from 'react'
import {InputNumber,Form, Input, Select} from 'antd'

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
                    label="操作方式"
                >
                    {getFieldDecorator('walletOrderWay')(<Select
                        showSearch
                        style={{width: '100%'}}
                        placeholder="请选择操作方式"
                    >
                            <Option key='1' value='1'>充值</Option>
                            <Option key='2' value='2'>提现</Option>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="操作金额"
                >
                    {getFieldDecorator('walletOrderMoney')(<InputNumber min={0} max={10000}
                    defaultValue={0} placeholder="请输入操作金额, 单笔上限为10000元" style={{width:314}} />)}
                </FormItem>
                <FormItem style={{display:'none'}}>
                    {getFieldDecorator('walletId')(<Input />)}
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