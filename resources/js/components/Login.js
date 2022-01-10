import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';


function Login() {

            const [state, setState] = React.useState('');

            const params = useParams();

            let handleInput = (e) => {
                setState({
                    ...state,
                    [e.target.name]: e.target.value
                });
            }

            /* useEffect(() => {
              axios.get(`/api/edit-student/${params.id}`)
              .then(res => {
                setState(res.data.student);
              })
              .catch(err => {
                console.log(err);
              })
            }, [params.id]) */

            const authUser =  (e) => {
              e.preventDefault();
              console.log("am in");
              axios.defaults.withCredentials = true;
              axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post("/login", state).then(response => {
                    if(response.status === 204){
                        swal({
                            title: "Success!",
                            text: "Log-in successful",
                            icon: "success",
                            button: "OK!",
                          });
                        window.location.href = "/";
                    }else if(response.status === 200){
                        swal({
                            title: "Success!",
                            text: "You are already logged in!",
                            icon: "success",
                            button: "OK!",
                          });
                    }
                    else{
                        swal({
                            title: "Error!",
                            text: "Check your log-in Credentials",
                            icon: "error",
                            button: "OK!",
                            });
                    }
                    console.log(response);
                });
              });
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
              <form onSubmit={authUser}>
              <div className="mb-sm-2">
                <input className="form-control" name="email" onChange={(e)=>handleInput(e)}  type="email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input className="form-control" name="password" onChange={(e)=>handleInput(e)}   type="password" placeholder="Password" />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
              </form>
            </div>
          </article>
        </section>
        </div>
        </div>
        );
}

export default Login;
