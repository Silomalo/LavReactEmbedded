import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

function ImageGallary() {
  const [selectedFile, setSelectedFile] = useState();
  const [loadimage, setLoadImage] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get('/api/list');
    setLoadImage(result.data.reverse);
  };


  const handleSubmission = async (e) => {
    //alert('Error in the Code');
    const formData = new FormData();
    formData.append("pic", selectedFile);
    formData.append("myname", name);
    formData.append("desc", desc);
    /* await fetch('/api/uploadimg', {
      method: "POST",
      body: formData,
    })
    .then(res =>{
      loadList();
    })
    .catch(()=>{
      alert('Error in the Code');
    }); */
    console.log(name);
    e.preventDefault();
    const res = await axios.post('/api/uploadimg', formData);
    if(res.data.status === 200){
      swal({
        title: "Saved!",
        text: res.data.message,
        icon: "success",
        button: "OK!",
      });
      /* setDesc("");
      setName("");
      setLoadImage(); */
      loadList();


      /* setState({
        formData:'',
      }); */
    }
  };

  const deleteImage = async (productId) =>
  {
    const res =await axios.get('/api/deleteimg/'+productId)
    if(res.data.status === 200){
        console.log(res.data.message);
      loadList();
      swal({
        title: "Deleted!",
        text: "Image Deleted Successfully",
        icon: "success",
        button: "OK!",
      });
    }else{
      swal({
        title: "Error!",
        text: "Error in Deleting Image",
        icon: "error",
        button: "OK!",
      });
    }
  };

  return (
    <div className="container">
      <h4 className="text-center text-success  ml-4 mb-4 mt-4">Image Gallary in ReactJS</h4>
      <div className="row">
        <div className="col-sm-3 p-2 bg-gray">
         <div className="box mr-4" style={{border:"1px solid #b7b7b7",backgroundColor:"#rgb(253 253 253)"}}>
         <h5 className="text-center  ml-4 mb-3 mt-3">Add Image</h5>
          <table className="">
            <tbody>
           <tr>
            <td>
              <div className="form-group ml-3">
                <input type="text" name="name" className="mb-4"onChange={(e) => setName(e.target.value)} placeholder="Country Name"/>
              </div>
            </td>
           </tr>

           <tr>
            <td>
             <div className="form-group">
              <textarea type="text" name="desc" className="mb-4"  rows="3" cols="23" onChange={(e) => setDesc(e.target.value)} placeholder="Write Description" />
             </div>
            </td>
           </tr>

           <tr>
            <td>
             <div className="form-group">
              <input type="file" name="file" className="mb-4" onChange={(e) => setSelectedFile(e.target.files[0])} />
             </div>
            </td>
           </tr>

           <tr>
            <td>
             <div className="form-group">
               <button type="submit" onClick={handleSubmission}className="btn btn-success mb-3" name="submit">
                 Add Gallary
              </button>
             </div>
            </td>
           </tr>
           </tbody>
          </table>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="row">
            {loadimage.map((name) => (
              <div className="col-sm-3">
                <div className="card mb-3" style={{width:"12rem"}}>
                    <h5><a  href="#" onClick={() => deleteImage(name.id)} style={{textDecoration:"none",marginLeft:"162px"}}>
                      <span aria-hidden="true" className="text-danger">&times;</span>
                    </a></h5>
                    <img className="card-img-top hover-shadow" src={'../../..' + name.file} alt={name.file} style={{height:"110px"}}/>

                    <div className="card-body">
                    <h6>{name.name}</h6>
                      <span className="card-text">{name.description}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
export default ImageGallary;
