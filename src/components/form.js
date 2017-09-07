import React from 'react'
import { Form, Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message } from 'antd'
import $ from 'jquery'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class myForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    // 选择select
    handleSelectChange = (value) => {
        console.log(`selected ${value}`)
    }

    // 提交表单
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', this.props.form.getFieldsValue())
        const data = this.props.form.getFieldsValue();
        $.ajax({
            url:'http://127.0.0.1:8091/air-jygl/test/addTestData.do',
            dataType : 'json',
            type : 'post',
            async:false,
            data:data,
            success:function(datas){
                // message.success('添加成功!');
                Modal.success({
                    title: '提示信息',
                    content: '添加成功！',
                });
            },
            error:function (){
                // message.error('添加失败!');
                Modal.error({
                    title: '提示信息',
                    content: '添加失败！',
                });
            }
        })
        this.props.form.resetFields()
    }


    // 显示弹框
    showModal = () => {
        this.setState({ visible: true })
    }


    // 隐藏弹框
    hideModal = () => {
        this.setState({ visible: false })
    }

    render() {
        const { getFieldProps } = this.props.form

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 6 }
        }

        const success = function () {
            message.success('操作成功!');
        }
        const error = function () {
            message.error('添加失败！')
        }
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="姓名"
                    {...formItemLayout}
                    required>
                    <Input id="control-input" placeholder="Please enter..."
                    {...getFieldProps('username')} required />
                </FormItem>

                <FormItem
                    label="生日"
                    labelCol={{ span: 3 }}
                    required>
                    <Col span="16">
                        <FormItem>
                            <DatePicker required {...getFieldProps('birthday')} />
                        </FormItem>
                    </Col>
                    {/*<Col span="1">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="2">
                        <FormItem>
                            <DatePicker {...getFieldProps('endDate')} />
                        </FormItem>
                    </Col>*/}
                </FormItem>



             {/*   <FormItem
                    id="select"
                    label="Select 选择器"
                    {...formItemLayout}>
                    <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={this.handleSelectChange}
                        {...getFieldProps('people')}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled" disabled>disabled</Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                </FormItem>*/}

              {/*  <FormItem
                    label="Checkbox 多选框"
                    {...formItemLayout}
                >
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem1')}>选项一</Checkbox>
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem2')}>选项二</Checkbox>
                    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem3')}>选项三</Checkbox>
                </FormItem>*/}

                <FormItem
                    label="性别"
                    {...formItemLayout} required >
                    <RadioGroup   defaultValue="0" {...getFieldProps('sex')}>
                        <Radio value="0">男</Radio>
                        <Radio value="1">女</Radio>
                     {/*   <Radio value="c">C</Radio>
                        <Radio value="d">D</Radio>*/}
                    </RadioGroup>
                </FormItem>
                <FormItem
                    id="control-input"
                    label="电话号码"
                    {...formItemLayout}
                    required>
                    <Input id="control-input" placeholder="Please enter..."
                           {...getFieldProps('phone')} required />
                </FormItem>
               {/* <FormItem {...formItemLayout} label="就读学校" hasFeedback>
                    {getFieldProps('schoolname',{
                        rules:[{required:true,message:'请输入您的就读学校'}]
                    })(
                        <Input placeholder="请输入您的就读学校！"/>
                    )}
                </FormItem>*/}
                <FormItem
                    id="control-textarea"
                    label="备注"
                    {...formItemLayout}>
                    <Input type="textarea" id="control-textarea" rows="3"
                           {...getFieldProps('remark')} />
                </FormItem>
                <FormItem wrapperCol={{ span: 6, offset: 3 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit" >确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    {/*<Button type="ghost" onClick={this.showModal}>弹出框</Button>*/}
                </FormItem>
                <Modal title="登录" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
                    这是一个modal
                </Modal>
            </Form>
        )
    }
}

myForm = Form.create()(myForm)

export default myForm