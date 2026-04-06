import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Center() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [center, setCenter] = useState([]);
    const addcenter = async (e) => {
        e.preventDefault();

        const center = { name, address, status };
        const res = await axios.post("http://localhost:5000/api/center", center);

        if (res.data.msg === "success") {
            alert("Center Add Submitted Successfully");

            setName("");
            setAddress("");
            setStatus("");
            getcenter();
        }
        else {
            alert("Something went wrong");
        }
    };


    async function changeStatus(id,st){
      const res =   await axios.put(`http://localhost:5000/api/center/${id}/${st}`);
      if(res.data.msg=="success"){
        toast.success("status updated successfully");
                getcenter();

      }
      else{
        toast.error("something went wrong");
      }
    }

    const getcenter = async () => {

        const res = await axios.get('http://localhost:5000/api/center')
        if (res.data.msg == "success") {
            setCenter(res.data.center);
            console.log(res.data.center);
        }
    }

    const delcenter = async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/center/${id}`)
        if (response.data.msg === "success") {
            window.alert("Delete Center")
            getcenter();
        }
        else {
            window.alert("somthing went wrong")
        }
    }


    useEffect(() => {
        getcenter();
    }, [])

    return (
        <>
            <form onSubmit={addcenter} method='post' action="" >
                <div className="row mt-2 pb-3 rounded-3 shadow-lg  bg-white">


                    <div className="col-lg-4">
                        Center Name:
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className='form-control' />
                    </div>
                    <div className="col-lg-4">
                        Enter Address:
                        <input type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} className='form-control' />
                    </div>
                    <div className="col-lg-2">
                        Select Status:
                        <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='form-control'>
                            <option>--Select--</option>
                            <option >Active</option>
                            <option >Deactive</option>
                        </select>
                    </div>
                    <div className="col-lg-2 mt-4">
                        <input type="submit" value="Add Center" className='btn btn-danger form-control' />

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
                        <label htmlFor="" className='ms-auto pt-2 form-label'>Search:</label><input type="search" className='ms-auto px-auto form-control' />
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
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th >
                                        <th scope="col" colSpan={2}>Status</th >
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        center.map((e, i) => (
                                            <tr key={i}>
                                                <th scope='row'>{i + 1}</th>
                                                <td>{e.name}</td>
                                                <td>{e.address}</td>
                                                <td>
                                                    <button  onClick={()=>{
                                                        changeStatus(e._id,e.status)
                                                    }}
                                                        className={`btn btn-sm ${e.status==="Active" ? "btn-danger" : "btn-success"}`}
                                                    >
                                                        {e.status=="Active"?"Deactive":"Active"}
                                                    </button>
                                                    <small style={{color:`${e.status=="Active"?"green":"red"}`}}>{e.status}</small>
                                                </td>                                                <td>
                                                    <button className='btn' onClick={() => {
                                                        delcenter(e._id);
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

export default Center
