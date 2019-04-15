import React, { Component } from 'react'
import { Table, Button, Modal, Input } from 'antd'
import axios from 'axios'

class CateList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      visible: false,
      inputValue: ''
    }
    this.columns = [{
      title: '分类id',
      dataIndex: '_id',
      key: '_id'
    }, {
      title: '分类名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '操作',
      key: 'control',
      dataIndex: 'control',
      render: (text, record) => {
        return (
          <Button onClick={() => {this.deleteCate(record._id)}} type="danger">删除</Button>
        )
      }
    }]
  }
  componentDidMount () {
    this.getUserList()
  }
  getUserList = () => {
    axios.get("http://localhost:4000/blog/api/category/list").then(res => {
      this.setState({
        data: res.data.result
      })
    })
  }
  deleteCate = (id) => {
    axios.post('http://localhost:4000/blog/api/category/delete', { id }).then(res => {
    })
  }
  handleOk = (category) => {
    axios.post('http://localhost:4000/blog/api/category/create', { category }).then(res => {
    })
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  updateInputData = (e) => {
    this.setState({
      inputValue: e.currentTarget.value
    })
  }
  render () {
    return (
      <div>
        <Button type="primary" style={{marginBottom: "10px"}} onClick={() => this.setState({visible: true})}>添加分类</Button>
        <Table rowKey="_id" columns={this.columns} dataSource={this.state.data}></Table>
        <Modal
          title="添加分类"
          visible={this.state.visible}
          onOk={() => this.handleOk(this.state.inputValue)}
          onCancel={() => this.handleCancel()}
        >
          <Input placeholder="请输入需要新增的分类" onChange={this.updateInputData}/>
        </Modal>
      </div>
    )
  }
}

export default CateList