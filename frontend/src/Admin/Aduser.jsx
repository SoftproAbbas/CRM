import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Aduser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [role, setRole] = useState("");
    const [center, setCenter] = useState("")
    const [centers, setCenters] = useState([]);
    const [adduser, setAdduser] = useState([]);


    const addUsercode = async (e) => {
        e.preventDefault();

        const adduser = { name, email, mobile, role, center };
        const res = await axios.post("http://localhost:5000/api/adduser", adduser);

        if (res.data.msg === "success") {
            alert("user Add Submitted Successfully");
            setName("");
            setEmail("");
            setRole("");
            setCenter("");
            setMobile("");
            getuser();
        }
        else {
            alert("Something went wrong");
            setRole("");
            setCenter("");
        }
    };


    const getuser = async () => {
        const res = await axios.get(`http://localhost:5000/api/adduser`);
        if (res.data.msg == "success") {
            setAdduser(res.data.adduser);
            // console.log(res.data.adduser);
        }
    }
    useEffect(() => {
        getuser();
    }, [])

    const getcenter = async () => {
        const res = await axios.get("http://localhost:5000/api/center");
        if (res.data.msg == "success") {
            var x = res.data.center
            // console.log(x);
            x = x.filter((e) => e.status == 'Active');
            setCenters(x);
        }
    }

    const deluser = async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/adduser/${id}`)
        if (response.data.msg === "success") {
            window.alert("Delete user")
            getuser();
        }
        else {
            window.alert("somthing went wrong")
        }
    }

    useEffect(() => {
        getcenter();
    }, [])

    async function changeStatus(id,st){
        const res = await axios.put(`http://localhost:5000/api/adduser/${id}/${st}`);
        if(res.data.msg=="success"){
            toast.success("status updated successfull");
            getuser();
        }
        else{
            toast.error('something went wrong');
        }
    }
    return (
        <>
        
            <form method='post' onSubmit={addUsercode} className='p-2 mx-auto row mt-3 rounded-3 shadow-lg  bg-white'>
                <div className="row">
                    <div className="col-lg-3">
                        Enter a name:
                        <input type="text" className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="col-lg-3">
                        Enter a Email:
                        <input type="email" className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className="col-lg-2">
                        Enter a mobile:
                        <input type="text" className='form-control' value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                    </div>

 <div className="col-lg-2">
                        Password:
                        {/* <select name="" id="" className='form-control' value={center} onChange={(e) => { setCenter(e.target.value) }}>
                            <option value="">--select Center--</option>
                            {
                                centers.map((c) => (
                                    <option key={c._id} value={c.name}> {c.name}</option>
                                ))
                            }
                        </select> */}
                        <input type="password"  className='form-control' />

                    </div>
                    <div className="col-lg-2">
                        Role :
                        <select name="" id="" className='form-control' value={role} onChange={(e) => { setRole(e.target.value) }} >
                            <option value="">
                                --select Role--
                            </option>
                            <option >Manager</option>
                            <option >Counselor</option>
                        </select>
                    </div>
                </div>


<div className="row mt-2">
            <p className="fw-bold">Assign Centers</p>
  <div className="col-lg-12 bg-light p-2">
    <div>
      {
        centers.map((e) => (
          <div className="form-radio form-check-inline" key={e._id}>
            <input 
              type="checkbox"
                // name="center"  agar radio button lagana ho
              value={e.name}
              onChange={(e) => setCenter(e.target.value)}
            />
                 <label htmlFor="" className='ps-1'> {e.name}</label>
            
          </div>
        ))
      }
    </div>

  </div>
</div>

<div className="row mt-1 ">
    <div className="col-lg-2 ">
    <button type="submit"  className='btn btn-danger btn-sm form-control mt-2 ' >
        Create User
    </button>

    </div>
</div>







     </form>


<div className="row shadow m-0 bg-white mt-3 " >
    <p className="fw-semibold fs-5">Existing Users</p>
    <div className="col-lg-12 d-flex gap-2 flex-wrap">
        <button className='rounded-1  t-btn'>Copy</button>
        <button className='rounded-1 t-btn'>Excel</button>
        <button className='rounded-1 t-btn'>PDF</button>
        <button className='rounded-1 t-btn'>Column visibility</button>
          <button className='rounded-1 t-btn'>Show 10 rows </button>
          <div className="d-flex ms-md-auto">
                       <label htmlFor="" className='ms-auto pt-2 form-label'>Search:</label><input type="search" className='ms-auto form-control'  />
          </div>
    </div>
  
<div className="row mt-2">
    <div className="col-lg-12">


   <div className="table-responsive">
                <table className='table'>
            <thead>
                <tr className='table-light'>
                    <th scope="col">
                        Sr no
                    </th>
                    <th scope="col" className=''>Name</th>
                    <th scope="col">Email</th >
                      <th scope="col">Number</th >
                   
                       <th scope="col">Role</th >
                    <th scope="col">Center</th >
                     <th scope="col" colSpan={2}>Status</th >
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                   {
                    adduser.map((e,i)=>(
                         <tr key={i}>
                            <th scope='row'>{i+1}</th>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                         <td>{e.mobile}</td>
                          <td> <button className='btn btn-sm btn-info text-white'>{e.role}</button></td>
                           <td>{e.center}</td>
                           <td><small>{e.status}</small></td>
                        <td><button onClick={()=>{changeStatus(e._id,e.status)}} className={`btn btn-sm ${e.status==="u" ? "btn-danger" : "btn-success"}`}>{e.status=="u" ? "Deactive" : "Active"}</button></td>
                          
                           <td>
                             <button className='btn' onClick={()=>{
                        deluser(e._id);
                    }}>  <i className="fa fa-trash pe-3 text-danger"></i></button>
                     <Link to={`/edit/${e._id}`}> <i className="fa fa-edit ps-3" ></i></Link>
                       
                      
                          </td>
                    </tr>
                    ))
                   }
            </tbody>
        </table>
        </div>
        


    </div>
</div>

</div>

         




        </>
    )
}

export default Aduser
