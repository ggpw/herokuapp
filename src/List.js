
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
    const url = "https://simple-contact-crud.herokuapp.com/contact"
    const successCallBack=(response)=>{
      console.log("successCallBack");
      console.log(response);
      this.setState({
        list:response.data
      })
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack");
      console.log(err);
    }
    Services.open(method, url, null, successCallBack, errorCallBack);
  }
  handleSubmit(){
    alert("todo handleSubmit")
  }
  render(){
    const {list} = this.state;
    return(
      <form onSubmit={this.handleSubmit}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Photo</th>
              <th>edit/delete</th>
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
              </tr>
              )
            }
            <tr>
              <th scope="row">{list.length+1}</th>
              <td>
                <label>
                  First Name:
                  <input type="text" name="firstName" value={this.state.firstName}
                    onChange={(value)=>this.setState({firstName:value})} />
                </label>
              </td>
              <td>
                <label>
                  Last Name:
                  <input type="text" name="lastName" value={this.state.lastName}
                    onChange={(value)=>this.setState({lastName:value})} />
                </label>
              </td>
              <td>
                <label>
                  Age:
                  <input type="text" name="age" value={this.state.age}
                    onChange={(value)=>this.setState({age:value})} />
                </label>
              </td>
              <td>
                <label>
                  Name:
                  <input type="text" name="firstName" value={this.state.firstName}
                    onChange={(value)=>this.setState({firstName:value})} />
                </label>
              </td>
              <td><Button color="primary">Add (+)</Button></td>
            </tr>
          </tbody>
        </Table>
      </form>
    )
  }
}