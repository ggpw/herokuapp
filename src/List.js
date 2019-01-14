
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import Services from "./services.js"

export default class List extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
  }
  componentWillMount(){
    this.getAllList();
  }
  getAllList(){
    const method = "GET";
    const successCallBack=(response)=>{
      console.log("successCallBack getAllList");
      console.log(response);
      this.setState({
        list:response.data
      })
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack getAllList");
      console.log(err);
    }
    Services.open(method, null, successCallBack, errorCallBack);
  }
  handleSubmit(event){
    const method="POST";
    const params = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age:this.state.age,
      photo:this.state.photo
    }
    const successCallBack=(response)=>{
      console.log("successCallBack handleSubmit");
      this.getAllList();
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack handleSubmit");
      console.log(err);
    }
    Services.open(method, params, successCallBack, errorCallBack);
    event.preventDefault();
  }
  handleChange(name, event){
    this.setState({[name]: event.target.value});
  }
  handleView(id){
    const method="GET";
    const successCallBack=(response)=>{
      console.log("successCallBack handleView");
      this.getAllList();
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack handleView");
      console.log(err);
    }
    Services.open(method, id, successCallBack, errorCallBack);

  }
  handleEdit(item){
    alert(JSON.stringify(item))
  }
  handleDelete(id){
    const method="DELETE";
    const successCallBack=(response)=>{
      console.log("successCallBack handleDelete");
      this.getAllList();
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack handleDelete");
      console.log(err);
    }
    Services.open(method, id, successCallBack, errorCallBack);

  }
  render(){
    const {list} = this.state;
    return(
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Photo</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item,idx)=>
              <tr key={item.id}>
                <th scope="row">{idx+1}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td><img src={item.photo} alt="not found"/></td>
                <td>
                  <button onClick={()=>this.handleView(item.id)}>
                    View
                  </button>&nbsp;
                  <button onClick={()=>this.handleEdit(item)}>
                    Edit
                  </button>&nbsp;
                  <button onClick={()=>this.handleDelete(item.id)}>
                    delete
                  </button>
              </td>
              </tr>
              )
            }
            <tr>
              <th scope="row">{list.length+1}</th>
              <td>
                <label>
                  First Name:
                  <input type="text" name="firstName" value={this.state.firstName}
                    onChange={(event)=>this.handleChange("firstName", event)}/>
                </label>
              </td>
              <td>
                <label>
                  Last Name:
                  <input type="text" name="lastName" value={this.state.lastName}
                    onChange={(event)=>this.handleChange("lastName", event)}/>
                </label>
              </td>
              <td>
                <label>
                  Age:
                  <input type="text" name="age" value={this.state.age}
                    onChange={(event)=>this.handleChange("age", event)}/>
                </label>
              </td>
              <td>
                <label>
                  Image Url:
                  <input type="text" name="photo" value={this.state.photo}
                    onChange={(event)=>this.handleChange("photo", event)}/>
                </label>
              </td>
              <td><Button onClick={(event)=>this.handleSubmit(event)} color="primary">Add (+)</Button></td>
            </tr>
          </tbody>
        </Table>
    )
  }
}