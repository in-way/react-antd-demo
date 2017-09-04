import React from 'react'
// import {Table, Icon,Form,Input,Button,Col} from 'antd'
import { Form, Table,Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message } from 'antd'
import $ from 'jquery'
const FormItem = Form.Item
const confirm = Modal.confirm
 class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            visible: false
        }
    }
    /*componentWillMount (){
        const datas = []
        $.ajax({
            // url:'http://127.0.0.1:8091/air-jygl/admin/receiver/getReceiverList.do',
            url:'http://127.0.0.1:8091/air-jygl/test/getTestData.do',
            dataType : 'json',
            type : 'post',
            async:false,
            success:function(data){
                // alert(JSON.stringify(data.data.list))
                let d = data.data.list
                for (let i in d ){
                    datas.push(d[i])
                }
                // datas=data.data.list;
                // datas.push(data.data.list)
                // alert(JSON.stringify(datas))
            }
        })
        this.setState({
            tDate: datas
        })
    }*/
    componentDidMount() {

        const datas = []
       /* for (let i = 0; i < 46; i++) {
            datas.push({
                key: i,
                name: `测试数据${i}`,
                age: 18,
                address: `${i}号`,
                remark: 'http://www.cnblogs.com/luozhihao/',
                operate: '暂无'
            })
        }
        alert(JSON.stringify(datas))*/
        $.ajax({
            // url:'http://127.0.0.1:8091/air-jygl/admin/receiver/getReceiverList.do',
            url:'http://127.0.0.1:8091/air-jygl/test/getTestData.do',
            dataType : 'json',
            type : 'post',
            async:false,
            success:function(data){
                // alert(JSON.stringify(data.data.list))
                let d = data.data.list
                for (let i in d ){
                    datas.push(d[i])
                }
                // datas=data.data.list;
                // datas.push(data.data.list)
                // alert(JSON.stringify(datas))
            }
        })
        this.setState({
            tDate: datas
        })
    }


    //删除提示框
   showConfirm(){
     confirm({
         title: '您是否确认要删除这项内容',
         content: '点确认 1 秒后关闭',
         onOk: function() {
             return new Promise(function(resolve) {
                 setTimeout(resolve, 1000);
             });
         },
         onCancel: function() {}
     });
 }
     // 显示弹框
     showModal = () => {
         this.setState({ visible: true })
     }


     // 隐藏弹框
     hideModal = () => {
         this.setState({ visible: false })
     }
    // 提交表单
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', this.props.form.getFieldsValue())
        const data = this.props.form.getFieldsValue();
        const dd =[];
        $.ajax({
            url:'http://127.0.0.1:8091/air-jygl/test/getTestData.do',
            dataType : 'json',
            type : 'post',
            async:false,
            data:data,
            success:function(datas){

                let d = datas.data.list
                for (let i in d ){
                    dd.push(d[i])
                }
            },
            error:function (){
                message.error('获取失败!');
            }
        })
        this.setState({
            tDate: dd
        })
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const { getFieldProps } = this.props.form
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 6 }
        }
        const columns = [{
            title: '姓名',
            width: '20%',
            dataIndex: 'USERNAME'
        }, {
            title: '电话',
            width: '20%',
            dataIndex: 'PHONE',
        }, {
            title: '生日',
            width: '20%',
            dataIndex: 'BIRTHDAY'
        }, {
            title: '备注',
            width: '20%',
            dataIndex: 'REMARK',

        }, {
            title: '操作',
            width: '20%',
            render: (text, record,index) => (
                <span>

                    <a href="javascript:void(0)" onClick={this.showModal}>编辑</a>|
                    <a href="javascript:void(0)" onClick={this.showModal}>查看</a>|
                    <a href="javascript:void(0)" onClick={this.showConfirm}>删除</a>

                </span>
            ),
        }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="姓名"
                    {...formItemLayout}
                    required>
                    <Col span="16">
                    <Input id="control-input"   placeholder="Please enter..."   {...getFieldProps('username')}  />
                    </Col>
                    <Col span="2" />
                    <Col span="2">
                    <Button type="primary" htmlType="submit" >搜索</Button>
                    </Col>
                </FormItem>
                {/*<Input id="control-input" placeholder="Please enter..."/>*/}
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
                <Modal title="登录" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
                    这是一个modal
                </Modal>
            </Form>

                )
    }
}
myTable = Form.create()(myTable)
export default myTable