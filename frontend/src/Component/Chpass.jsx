import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg1 from '../assets/images.jpg';

function Chpass(p) {
const[cpass,setCpass]=useState("");
const[npass,setNpass]=useState("");
const[conpass,setConpass]=useState("");
const[user,setUser]=useState({});
// const[navigate,setNavigate]=useState();

const navigate = useNavigate();
const chcode = async(e)=>{
    e.preventDefault();
    console.log(p);
    if(p.role!=="admin"){
        const res = await axios.get(`http://localhost:5000/api/adduser/${p.id}`);
        if(res.data.msg=="success"){
           setUser(res.data.adduser);
           var opass = res.data.adduser.password;
        }
        console.log(opass);
        console.log(cpass);
        if(opass && opass!==cpass){
          toast.error("wrong password");
          setCpass('');
          setNpass('');
          setConpass('');
        }
        else if(opass == npass){
            toast.error("New password cannot be same as current password");
            setNpass('');
            setConpass('');
        }
           
        else if(npass != conpass){
            toast.error("New password and confirm password do not match");
            setNpass('');
            setConpass('');
        }
        else{
            if(p.role!="admin"){
                const data = {password:npass};
                const res2 = await axios.put(`http://localhost:5000/api/adduser/${p.id}`,data);
                if(res2.data.msg=="success"){
                    toast.success("Password changed sucessfully");
                    setConpass('');
                    setNpass('');
                    setCpass('');
                   navigate('/log');
                }
                else{
                    toast.error("Something went wrong");
                    setConpass('');
                    setNpass('');
                    setCpass('');
                }

            }
        }

    }
}


  return (
    <>
    <form action="" className='w-50 p-4 rounded-4 mx-auto my-4 shadow-lg ' style={{background:`linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.4)),url(${bg1})`,backgroundSize:"cover"}}  onSubmit={chcode}>
        <h2 className='text-light text-center'>Change Password</h2>
        <input type="password" name='' id=''  className='form-control' placeholder='Current Password' value={cpass} onChange={(e)=>{
            setCpass(e.target.value)
        }}/>
        <br />
        <input type="password" name=''  id='' className='form-control' placeholder='New Password' value={npass} onChange={(e)=>{
            setNpass(e.target.value)
        }}/>
        <br />
        <input type="password" name=''  id='' className='form-control' placeholder='Confirm-New-Password' value={conpass} onChange={(e)=>{
            setConpass(e.target.value)
        }}/>
        <br />
        <input type="submit" value="Change Password" className='form-control bg-info text-light fw-bold'/>
    </form>
    </>
  )
}

export default Chpass