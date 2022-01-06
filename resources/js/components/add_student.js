import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Addstudent extends Component {


  state = {
    name:'',
    course:'',
    email:'',
    phone:'',
    error_list:[],
  }
  handleInput = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      });
  }
  saveStudent = async (e )=> {
    e.preventDefault();
    const res = await axios.post('/api/add-student', this.state); //this.state is the data we want to send to the server
    if(res.data.status === 200){
      swal({
        title: "Saved!",
        text: res.data.message,
        icon: "success",
        button: "OK!",
      });
      this.props.history.push('/'); 
      this.setState({
        name:'',
        course:'',
        email:'',
        phone:'',
      });
    }else{
      this.setState({
        error_list:res.data.validate_err,
      });
    }
  }

    render(){
        return (
            <div>
              <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark">
                <div className="container-fluid d-flex align-items-center">
                <Link to={'/'} className="ms-auto link-light" hreflang="ar">Back</Link>
                </div>
              </header>
            <div className="bd-cheatsheet container-fluid bg-body">
            <section id="forms">
            <article className="my-3" id="sizing">


              <div className="bd-example">
              <form onSubmit={this.saveStudent}>

              <div className="mb-sm-2">
                <input className="form-control" name="name" onChange={this.handleInput} value={this.state.name} type="text" placeholder="Name" />
                <span className="text-danger"> {this.state.error_list.name}</span>
              </div>
              <div className="mb-3">
                <input className="form-control" name="course" onChange={this.handleInput} value={this.state.course} type="text" placeholder="Course" />
                <span className="text-danger"> {this.state.error_list.course}</span>
              </div>
              <div className="mb-3">
                <input className="form-control" name="email" onChange={this.handleInput} value={this.state.email} type="email" placeholder="Email" />
                <span className="text-danger"> {this.state.error_list.email}</span>
              </div>
              <div className="mb-3">
                <input className="form-control" name="phone" onChange={this.handleInput} value={this.state.phone} type="number" placeholder="Phone No." />
                <span className="text-danger"> {this.state.error_list.phone}</span>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
              </form>
            </div>
          </article>
        </section>
        </div>
        </div>
        );
}
}
export default Addstudent;
