import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function View() {
const [user, setUser]=useState([]);
const navigate = useNavigate();
    const getAllUser = async()=>{
        const response = await axios.get("http://localhost:5000");
        // console.log(response);
        if(response.data.msg==="sucess"){
            setUser(response.data.user);
        }
        const enquiryCount = response.data.user.filter(u => u.purpose === "Enquiry");
       
      
        


    }

    function validate(){
        if(!localStorage.getItem('admin')){
            navigate('/dash/log');
        }
    }

    useEffect(()=>{
        validate();
    },[]);

const delUser =async(id)=>{
    const response = await axios.delete(`http://localhost:5000/${id}`)
    if(response.data.msg==="success"){
        window.alert("Delete success")
        getAllUser();
    }
    else{
        window.alert("somthing went wrong")
    }
}
    useEffect(()=>{
        getAllUser()
    },[])
  return (
    <>
    <h4>View Table</h4>
    <br />
    

    <table class="table table-striped-columns">
  <thead>
    <tr>
      <th scope="col" >Sr.no</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col"> Number</th>
      <th scope="col"> Action</th>
    </tr>
  </thead>
  <tbody>
       {
        user.map((u,i)=>(
              <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{u.fullName}</td>
      <td>{u.email}</td>
      <td>{u.contactNumber}</td>
        <td>
                    <button className='btn btn-danger' onClick={()=>{
                        delUser(u._id);
                    }}>Delete</button>
                    
                    
                      <Link className='btn btn-warning ms-1' to={`/edit/${u._id}`}> Edit</Link>
                </td>
    </tr>
        ))
       }
  
 
  </tbody>
</table>
    </>
  )
}
