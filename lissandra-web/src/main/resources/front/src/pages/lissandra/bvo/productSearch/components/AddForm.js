import React, {PureComponent} from 'react'
import {Radio, Form, Input, Select} from 'antd'

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddForm extends PureComponent {
    get formItemLayout() {
        return {
            labelCol: {
                xs: {span: 12},
                sm: {span: 5}
            },
            wrapperCol: {
                xs: {span: 18},
                sm: {span: 12}
            }
        }
    }
    state = {
        value: 1,
    };
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const radioStyle = {
            marginLeft: '30px',
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (

            <Form style={{ width:'400px'}} >
                <FormItem
                >
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio style={radioStyle} value={1}>Ebay</Radio>
                        <Radio style={radioStyle} value={2}>Amazon</Radio>
                    </RadioGroup>
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