
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import Modal from 'react-modal';
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
    Services.open(method, null, null, successCallBack, errorCallBack);
  }
  handleSubmit(event){
    const method="POST";
    const body = {
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
    Services.open(method, null, body, successCallBack, errorCallBack);
    event.preventDefault();
  }
  handleChange(name, event){
    this.setState({[name]: event.target.value});
  }
  handleViewEdit(id, isEdit){
    const method="GET";
    const successCallBack=(response)=>{
      console.log("successCallBack handleViewEdit");
      console.log(response);
      this.setState({
        isEdit:isEdit,
        modalIsOpen:true,
        idE: response.data.idE,
        firstNameE: response.data.firstName,
        lastNameE: response.data.lastName,
        ageE:response.data.age,
        photoE:response.data.photo
      })
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack handleViewEdit");
      console.log(err);
    }
    Services.open(method, id, null, successCallBack, errorCallBack);

  }
  handleSubmitEdit(){
    const method="PUT";
    const body = {
      firstName: this.state.firstNameE,
      lastName: this.state.lastNameE,
      age:this.state.ageE,
      photo:this.state.photoE
    }
    const successCallBack=(response)=>{
      console.log("successCallBack handleSubmit");
      this.getAllList();
      this.setState({
        modalIsOpen:false
      })
    };
    const errorCallBack=(err)=>{
      console.log("errorCallBack handleSubmit");
      console.log(err);
      this.getAllList();
      this.setState({
        modalIsOpen:false
      })
    }
    Services.open(method, this.state.idE, body, successCallBack, errorCallBack);
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
    Services.open(method, id, null, successCallBack, errorCallBack);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render(){
    const {list} = this.state;
    return(
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          contentLabel="Detail"
        >
          <Table>
            <tbody>
              <tr><td>
                <label>
                  First Name:
                  <input type="text" name="firstNameE" value={this.state.firstNameE}
                    onChange={(event)=>this.handleChange("firstNameE", event)}/>
                </label>
              </td></tr>
              <tr><td>
                <label>
                  Last Name:
                  <input type="text" name="lastNameE" value={this.state.lastNameE}
                    onChange={(event)=>this.handleChange("lastNameE", event)}/>
                </label>
              </td></tr>
              <tr><td>
                <label>
                  Age:
                  <input type="text" name="ageE" value={this.state.ageE}
                    onChange={(event)=>this.handleChange("ageE", event)}/>
                </label>
              </td></tr>
              <tr><td>
                <label>
                  Image Url:
                  <input type="text" name="photoE" value={this.state.photoE}
                    onChange={(event)=>this.handleChange("photoE", event)}/>
                </label>
                </td>
                <td>
                  <img src={this.state.photoE} alt="not found"/>
              </td></tr>
              {
                this.state.isEdit?
                <tr><td><Button onClick={(event)=>this.handleSubmitEdit(this.state.idE)} color="primary">Edit</Button></td></tr>
                :null
              }
            </tbody>
          </Table>
        </Modal>
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
                  <button onClick={()=>this.handleViewEdit(item.id, false)}>
                    View
                  </button>&nbsp;
                  <button onClick={()=>this.handleViewEdit(item.id, true)}>
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
      </div>
    )
  }
}