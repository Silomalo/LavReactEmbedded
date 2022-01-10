import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class Student extends Component {
    state= {
        students:[],
        loading:true,
    }
    async componentDidMount(){
        const res = await axios.get('/api/get-students');
        if(res.data.status === 200){
            console.log(res.data.students);
            this.setState({
                students:res.data.students,
                loading:false,
            });
        }
    }
    deleteStudent = async (e, id) => {
        e.preventDefault();
        const onclicker=e.currentTarget;
        onclicker.innerText="Deleting...";

        const res = await axios.delete(`/api/delete-student/${id}`);
        if(res.data.status === 200){
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.setState({
                students:this.state.students.filter(student => student.id !== id),
            });
        }
    }

    render(){
        var student_HTMLTABLE="";
        if(this.state.loading){
            student_HTMLTABLE= <tr><td colSpan="7"><h3>Loading...</h3></td></tr>
        }
        else{
            student_HTMLTABLE=
            this.state.students.map((student)=>{
                return(
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.course}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td><Link to={`edit-student/${student.id}`} className="btn btn-success">Edit</Link></td>
                        <td><button type="button" onClick={(e)=>this.deleteStudent(e, student.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                );
            });
        }
        return (
            <div >
                <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark">
                <div className="container-fluid d-flex align-items-center">
                    <Link to={'get-in'} className="ms-auto link-light" hreflang="ar">Login</Link>
                    <Link to={'myalbum'} className="ms-auto link-light" hreflang="ar">My Album</Link>
                    <Link to={'add-student'} className="ms-auto link-light" hreflang="ar">Add Student</Link>
                </div>
                </header>

                <div className="bd-cheatsheet container-fluid bg-body">
                <section id="content">
                    <article className="my-3" id="tables">


                        <div className="bd-example">
                        <table className="table table-hover table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Email</th>
                            <th scope="col">phone</th>
                            <th scope="col" >Edit</th>
                            <th scope="col" >Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student_HTMLTABLE}
                        </tbody>
                        </table>
                    </div>
                    </article>
                </section>
                    </div>
                    </div>

        );
        }
}
export default Student;
