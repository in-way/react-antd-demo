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
            visible: false,
            title:'',
            content:''
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
     showModal  = () => {
         this.setState({ visible: true })
         this.setState({title:e})
         this.setState({content:''})
     }
    //删除
     onDelete(index){
         console.log(index)
         const dataSource = [...this.state.tDate];
         dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
         this.setState({ dataSource });
     }

    showDeleteConfirm(record,index) {
     confirm({
         title: '确认删除?',
         content: '删除后不能恢复！',
         okText: '确认',
         okType: 'danger',
         cancelText: '取消',
         onOk() {
             console.log('OK'+index+record.USERID);
             $.ajax({
                 url:'http://127.0.0.1:8091/air-jygl/test/deleteTest.do',
                 dataType : 'json',
                 type : 'post',
                 async:false,
                 data:{"userid":record.USERID},
                 success:function(datas){
                     if(datas=="ok"){
                         // const dataSource = [...this.state.tDate];
                         // dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
                         // this.setState({ dataSource });
                         Modal.success({
                             title: '提示信息',
                             content: '删除成功！',
                         });
                     }else {
                         Modal.error({
                             title: '提示信息',
                             content: '删除失败！',
                         });
                     }

                 },
                 error:function (){
                     Modal.error({
                         title: '提示信息',
                         content: '删除失败,xit！',
                     });
                 }
             });
         },
         onCancel() {
             console.log('Cancel');
         },
     });
 }
     //展示当前行信息
     showCurRowMessage  (record) {
         Modal.info({
             title: '详细信息',
             content:"USERID:"+record.USERID + " USERNAME:"+record.USERNAME + " PHONE:" + record.PHONE + " BIRTHDAY:" + record.BIRTHDAY + " REMARK:" + record.REMARK
         });
         // alert("USERID:"+record.USERID + " USERNAME:"+record.USERNAME + " PHONE:" + record.PHONE + " BIRTHDAY:" + record.BIRTHDAY + " REMARK:" + record.REMARK);
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
        const columns = [
            {
                title: '编号',
                width: '20%',
                dataIndex: 'USERID',
                // className:'display:none'
            },
            {
            title: '姓名',
            width: '20%',
            dataIndex: 'USERNAME'
        }, {
            title: '电话',
            width: '20%',
            dataIndex: 'PHONE',
        }, {
            title: '生日',
            width: '10%',
            dataIndex: 'BIRTHDAY'
        }, {
            title: '备注',
            width: '10%',
            dataIndex: 'REMARK',

        }, {
            title: '操作',
            width: '20%',
            render: (text, record,index) => (
                <span>

                    <a href="javascript:void(0)" onClick={this.showModal}>编辑</a>|
                    <a href="javascript:void(0)"  onClick={()=>{this.showCurRowMessage(record)}}>查看</a>|
                    <a href="javascript:void(0)" onClick={()=>{this.showDeleteConfirm(record,index)}}>删除</a>

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
                <Modal title={this.state.title} visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
                    这是一个modal
                </Modal>
            </Form>

                )
    }
}
myTable = Form.create()(myTable)
export default myTable