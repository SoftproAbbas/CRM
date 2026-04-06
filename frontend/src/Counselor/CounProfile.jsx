import React from 'react'
import images from '../assets/images.jpg';
import ava from '../assets/ava.png';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function CounProfile() {

    const[user,setUser]=useState({});
    const[pic,setPic]=useState('');
    const[check,setCheck]=useState(false);
    const[qua,setQua]=useState('');
    const[skills,setSkills]=useState('');
    const[exp,setExp]=useState('');
    const[address,setAddress]=useState('');

    const getuser = async()=>{
        const res = await axios.get(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`)
        if(res.data.msg=="success"){
            console.log(res.data.adduser);
            setQua(res.data.qua.adduser || "");
            setSkills(res.data.skills.adduser || "");
            setExp(res.data.exp.adduser || "");
            setAddress(res.data.address.adduser || "");
            setPic(res.data.adduser.profilePic || "");
            setUser(res.data.adduser);
        }
    }
    useEffect(()=>{
        getuser()
    },[])

    async function updateprofile(p){
        if(check){
            const datauser = {qua,skills,exp,address};
            const res = await axios.put(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`,datauser);
            console.log(res);
            if(res.data.msg=="success"){
               toast.success("Profile updated");
               getuser();
            }
            else{
            toast.error("something went wrong")
        }
        
        }
        console.log(p);
    }

    async function uploadPic(p){
        console.log(p);
        if(p){
            const formData = new FormData();
        formData.append("profilePic", p);
           const res = await axios.patch(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`,formData);  
           console.log(res);
           if(res.data.msg=="success"){
            toast.success("Profile picture updated");
           }
           else{
            toast.error("something went wrong")
           }
           
        }
        else{
            toast.error("Please select a picture")
           }
       

    }
    
  return (
   
    <>
    
    <div className='row py-4' style={{backgroundImage:`url(${images})`,height:"85vh",backgroundSize:"Cover",overflow:'auto'}}>
    <div className="col-md-5 p-2  mx-auto rounded-4 shadow lg" style={{backgroundColor:"white"}}>
        <div className="position-relative">
              <img src={pic ? `http://localhost:5000/uploads/${pic}`: ava} className='mx-auto d-block mt-4 rounded-5 h-25 w-25 py-3 shadow'/>
              <p>{pic}</p>
              <label htmlFor="profilePic">
                  <i className='fa-solid fa-pen fa-shake position-absolute  py-2 rounded-circle text-white bg-dark' style={{left:'55%',bottom:'15%',width:'30px'}} ></i>
              </label>
              <input type="file"  onChange={(e)=>{uploadPic(e.target.files[0])}} style={{display:'none'}} id='profilePic'/>
     
        </div>
      
        <br />
        <div className='ms-3'>
        <div className="row">
            <h6 className='col-md-12'>Name: {user.name} </h6>
            <h6 className='col-md-12'>Email: {user.email}</h6>
        {/* </div> */}
        {/* <div className="row"> */}
            <h6 className='col-md-12'>Phone: {user.mobile}</h6>
            <h6 className='col-md-12'>Role: {user.role}</h6>
        {/* </div> */}
        {/* <div className="row"> */}
            <h6 className='col-md-12'><mark>Center: {user.center}</mark></h6> 
        <div className="col-md-12">
            <h6>Qualification {check? <input className='w-100 form-control' type='text' value={qua} onChange={(e)=>setQua(e.target.value)}/>:user.qua || "---"}</h6>
        </div>
        <div className="col-md-12">
            <h6>Skills:{check? <input className='w-100 form-control' type='text' value={skills} onChange={(e)=>setSkills(e.target.value)}/>:user.skills || "---"}</h6>
        </div>
        <div className="col-md-12">
            <h6>Experience:{check? <input className='w-100 form-control' type='text' value={exp} onChange={(e)=>setExp(e.target.value)}/>:user.exp || "---"}</h6>
        </div>
        <div className="col-md-12">
            <h6>Address:{check? <textarea className='w-100 form-control' type='text' value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>:user.address || "---"}</h6>
        </div>
        <div className="col-md-12     ">
             <button className='btn form-control bg-success' onClick={()=>{setCheck(!check);updateprofile()}}>Update</button>
        </div>
        </div>
        </div>
    </div>
    <div className="col-md-6 mx-auto">
        <div className="row h-50 pb-2">
            <div className="col-md-12 p-3 rounded-3 shadow-lg" style={{backgroundColor:"white"}}></div>
        </div>
        <div className="row h-50 pt-2">
            <div className="col-md-12 p-3 rounded-3 shadow-lg" style={{backgroundColor:"white"}}></div>
        </div>
    </div>
    </div>
    </>
  )
}

export default CounProfile