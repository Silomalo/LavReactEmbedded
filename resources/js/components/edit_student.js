import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';


function Editstudent() {

            const [state, setState] = React.useState('');

            const params = useParams();

            let handleInput = (e) => {
                setState({
                    ...state,
                    [e.target.name]: e.target.value
                });
            }

            useEffect(() => {
              axios.get(`/api/edit-student/${params.id}`)
              .then(res => {
                setState(res.data.student);
              })
              .catch(err => {
                console.log(err);
              })
            }, [params.id])

            const updateStudent = async (e) => {
              e.preventDefault();
              const res = await axios.put(`/api/update-student/${params.id}`, state);
              if(res.data.status === 200){
                swal({
                  title: "Updated!",
                  text: res.data.message,
                  icon: "success",
                  button: "OK!",
                });
                setState({
                  name:'',
                  course:'',
                  email:'',
                  phone:'',
                });
              }else{
                setState({
                  error_list:res.data.validate_err,
                });
              }
            }



        return (
            <div>
              <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark">
                <div className="container-fluid d-flex align-items-center">
                <Link to={'/'} className="ms-auto link-light" hreflang="ar">Back Home</Link>
                </div>
              </header>
            <div className="bd-cheatsheet container-fluid bg-body">
            <section id="forms">
            <article className="my-3" id="sizing">

              <div className="bd-example">
              <form onSubmit={updateStudent}>
              <div className="mb-sm-2">
                <input className="form-control" name="name" onChange={(e)=>handleInput(e)} value={state.name} type="text" placeholder="Name" />
              </div>
              <div className="mb-3">
                <input className="form-control" name="course" onChange={(e)=>handleInput(e)}  value={state.course} type="text" placeholder="Course" />
              </div>
              <div className="mb-3">
                <input className="form-control" name="email" onChange={(e)=>handleInput(e)}  value={state.email} type="email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input className="form-control" name="phone" onChange={(e)=>handleInput(e)}  value={state.phone} type="number" placeholder="Phone No." />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Update Student</button>
              </div>
              </form>
            </div>
          </article>
        </section>
        </div>
        </div>
        );
}

export default Editstudent;
