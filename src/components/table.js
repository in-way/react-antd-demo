import React,{PropTypes} from 'react'
// import {Table, Icon,Form,Input,Button,Col} from 'antd'
import { Form, Table,Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message } from 'antd'
import $ from 'jquery'
const FormItem = Form.Item
const confirm = Modal.confirm
const RadioGroup = Radio.Group
let _index;
const url ='http://127.0.0.1:8091'
 class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            visible: false,
            visible1: false,
            title:'',
            content:'',
            username:'',
            phone:'',
            sex:'',
            birthday:'',
            remark:'',
            userid:''
        }
    }
    //组件挂在完成
    componentDidMount() {
        const datas = []
        $.ajax({
            url:url+'/air-jygl/test/getTestData.do',
            dataType : 'json',
            type : 'post',
            async:false,
            success:function(data){
                // alert(JSON.stringify(data.data.list))
                let d = data.data.list
                for (let i in d ){
                    datas.push(d[i])
                }
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
    /* showModal  = () => {
         this.setState({ visible: true })
         this.setState({title:e})
         this.setState({content:''})
     }*/
     //查看详情
     showModal(record){
         const cont = <span><h2>姓名 : {record.USERNAME}</h2><h2>生日：{record.BIRTHDAY}</h2><h2>电话：{record.PHONE}</h2><h2>备注：{record.REMARK}</h2></span>
         this.setState({ visible: true })
         this.setState({title:'详细信息'})
         this.setState({content:cont})
     }
     //修改 数据回显示
     changeData(record,index){
         this.setState({
             visible1: true,
             username:record.USERNAME,
             userid:record.USERID,
             phone:record.PHONE,
             remark:record.REMARK,
             sex:record.SEX,
             birthday:record.BIRTHDAY

         })
         _index =index
     }


    //重置
     handleClear(){
         this.props.form.resetFields();
     }
     //用户信息修改的监听事件
     onUserChange(event) {
         this.setState  (
         {username: event.target.value},()=>{this.state.username}
         );
     }
     onPhoneChange(event) {
         this.setState  ({
             phone:event.target.value}
         );
     }
     onSexChange(event) {
         this.setState  (
             { sex:event.target.value},()=>{this.state.sex}
         );
     }
     onRemarkChange(event) {
         this.setState  (
             { remark:event.target.value},()=>{this.state.remark}
         );
     }
    onBirthdayChange(event){
         this.setState(
             {birthday:event.target.value},()=>{this.state.birthday}
         )
    }

     //带确认的删除
    showDeleteConfirm(record,index) {
        const dataSource = [...this.state.tDate];
        const _this = this
     confirm({
         title: '确认删除?',
         content: '删除后不能恢复！',
         okText: '确认',
         okType: 'danger',
         cancelText: '取消',
         onOk() {
             console.log('OK'+index+record.USERID);
             $.ajax({
                 url:url+'/air-jygl/test/deleteTest.do',
                 dataType : 'json',
                 type : 'post',
                 async:false,
                 data:{"userid":record.USERID},
                 success:function(datas){
                     if(datas=="ok"){
                         dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
                         _this.setState({  tDate:dataSource });
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
                         content: '删除失败！',
                     });
                 }
             });
         },
         onCancel() {
             console.log('Cancel');
         },
     });
 }
     // 隐藏弹框
     hideModal = () => {
         this.setState({ visible: false })
         this.setState({ visible1: false })
     }
    // 搜索
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', this.props.form.getFieldsValue())
        const data = this.props.form.getFieldsValue();
        const dd =[];
        $.ajax({
            url:url+'/air-jygl/test/getTestData.do',
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

     // 修改用户信息
     handleChange = () => {
         let dataSources = [...this.state.tDate];
          let _this1 = this;
          let data = [];
          let userid  =_this1.state.userid
          let username  =_this1.state.username
          let sex  =_this1.state.sex
          let phone  =_this1.state.phone
          let remark  =_this1.state.remark
          let birthday  =_this1.state.birthday
         data = {'userid':userid,'username':username,'sex':sex,'phone':phone,'remark':remark,'birthday':birthday}
         console.log('修改用户信息获取的用户信息：', JSON.stringify(data))
         $.ajax({
             url:url+'/air-jygl/test/updateTest.do',
             dataType : 'json',
             type : 'post',
             async:false,
             data:data,
             success:function(datas){
                 if(datas=='ok'){
                     Modal.success ({
                         title: '提示信息',
                         content: '修改成功！',
                     });
                     for (let i =0;i<dataSources.length;i++ ){
                         if(i==_index){
                             dataSources[_index].USERNAME =username
                             dataSources[_index].SEX =sex
                             dataSources[_index].PHONE =phone
                             dataSources[_index].REMARK =remark
                             dataSources[_index].USERID =userid
                             dataSources[_index].BIRTHDAY =birthday
                             break
                         }
                     }
                     _this1.setState({
                         visible1: false,
                         tDate:dataSources
                     })
                 }else{
                     Modal.error({
                         title: '提示信息',
                         content: '修改失败！',
                     });
                 }
             },
             error:function (){
                 Modal.error({
                     title: '提示信息',
                     content: '修改失败！',
                 });
             }
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
        },
            {
                title: '性别',
                width: '20%',
                dataIndex: 'SEX',
               render :(text, record,index)=> {
                   if(record.SEX=='0'){
                       return (<span>男</span>)
                   } else if(record.SEX=='1'){
                       return (<span>女</span>)
                   }
               }
            },  {
            title: '备注',
            width: '10%',
            dataIndex: 'REMARK',

        }, {
            title: '操作',
            width: '10%',
            render: (text, record,index) => (
                <span>
                    <a href="javascript:void(0)" onClick={()=>this.changeData(record,index)}>编辑</a>|
                    <a href="javascript:void(0)"  onClick={()=>{this.showModal(record)}}>查看</a>|
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
           <div>
               <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="姓名"
                    {...formItemLayout}
                    >
                    <Col span="16">
                    <Input id="control-input"   placeholder="Please enter..."   {...getFieldProps('username')}  />
                    </Col>
                    <Col span="2" />
                    <Col span="2">
                         <Button type="primary" htmlType="submit" >搜索</Button>
                    </Col>
                </FormItem>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
                <Modal title={this.state.title} visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
                    {this.state.content}
                </Modal>
            </Form>
               <Modal title='修改信息' visible={this.state.visible1} onOk={this.handleChange} onCancel={this.hideModal}>
                <Form horizontal >
                    <FormItem
                        id="control-input"
                        label="用户id"
                        {...formItemLayout}
                        labelCol={{ span: 3 }}
                        required>
                        <Input id="control-input"  style={{width:200}}  disabled={true} placeholder="Please enter..."
                               {...getFieldProps('userid')} required  value={this.state.userid} />
                    </FormItem>
                    <FormItem
                    id="control-input"
                    label="姓名"
                    {...formItemLayout}
                    required>
                        <Input id="control-input"  style={{width:200}} placeholder="Please enter..."
                        {...getFieldProps('username')}
                               required  value={this.state.username}
                               onChange={this.onUserChange.bind(this)}/>
                    </FormItem>

                    <FormItem
                        label="生日"
                        labelCol={{ span: 3 }}
                        required>
                        <Col span="10">
                            <FormItem>
                                <DatePicker required  onChange={this.onBirthdayChange.bind(this)}  value={this.state.birthday} {...getFieldProps('birthday')} />
                            </FormItem>
                        </Col>
                    </FormItem>

                    <FormItem
                      label="性别"
                      {...formItemLayout} >
                        <RadioGroup  required  onChange={this.onSexChange.bind(this)}{...getFieldProps('sex')} value={this.state.sex}>
                             <Radio value={this.state.sex='0'} onChange={this.onSexChange.bind(this)} >男</Radio>
                             <Radio value={this.state.sex='1'} onChange={this.onSexChange.bind(this)} >女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                    id="control-input"
                    label="电话号码"
                    {...formItemLayout}
                    required>
                        <Input id="control-input" placeholder="Please enter..."
                        {...getFieldProps('phone')}  style={{width:200}}  value={this.state.phone} required onChange={this.onPhoneChange.bind(this)} />
                        {/*<input  {...getFieldProps('gg')} value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value }) } />*/}
                    </FormItem>

                     <FormItem
                    id="control-textarea"
                    label="备注"
                    {...formItemLayout}>
                        <Input type="textarea" id="control-textarea"
                            {...getFieldProps('remark')}  style={{width:200}} onChange={this.onRemarkChange.bind(this)}   value={this.state.remark}/>
                      </FormItem>

                </Form>
               </Modal>
           </div>
                )
    }
}
myTable = Form.create()(myTable)
export default myTable