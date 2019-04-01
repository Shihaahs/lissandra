import React, {PureComponent, Fragment} from 'react'
import {Button, Divider, Form, Input, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class SearchForm extends PureComponent {
  constructor() {
    super()
  }
  
  render() {
    return (
        <Form layout="inline">
            <FormItem
                {...this.formItemLayout}
                label="当前余额(￥)" style={{
            }}>
                {(<Input readOnly style={{
                    width: 200,
                    marginRight: 10,
                    border: 0,
                    outline: 0,
                    background: 0,
                    fontSize:30
            }} value={this.props.setBalance}/>)}</FormItem>
        </Form>
    )
  }
  
  // 向父组件传递 form 的 ref
  componentDidMount() {
    this.props.transferFormRef(this.props.form)
  }
}

export default Form.create()(SearchForm)