import axios from 'axios';
// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'

import Carddash from '../Component/Carddash';

function Adviewenq() {
    const [enq, setEnq] = useState([]);
    const [selectedEnq, setSelectedEnq] = useState(null);

    const handleRowClick = (data) => {
    setSelectedEnq(data);

    const offcanvas = new window.bootstrap.Offcanvas(
        document.getElementById("enqOffcanvas")
    );
    offcanvas.show();
};

    const getenq = async () => {

        const res = await axios.get('http://localhost:5000/api/enq')
        if (res.data.msg == "sucess") {
            setEnq(res.data.enq);
            // console.log(res.data.enq);
        }
    }
    useEffect(() => {
        getenq()
    }, [])
    return (
        <>

<div className="row bg-white mt-2 shadow rounded-3">
   <div className="col-lg-12 shadow rounded-3">
    <div className="row">
         <div className="col-lg-3 mt-5 ">
        <h3 className=''>Enquiries</h3>
        
        <div className="btn-group mt-4" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
  <label className="btn btn-outline-primary" for="btnradio1">Table</label>

  <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
  <label className="btn btn-outline-primary" for="btnradio2">Cards</label>



</div>
    </div>
    <div className="col-lg-3 mt-4 mb-5">
     <div className="card">
        <p className='ps-4 pt-4'>Total Enquiries</p>
        <h2 className='ps-4'>27 </h2>
     </div>

    </div>
     <div className="col-lg-3 mt-4 mb-5">
     <div className="card">
        <p className='ps-4 pt-4'>Assigned</p>
        <h2 className='ps-4 text-danger'>3 </h2>
     </div>

    </div>
     <div className="col-lg-3 mt-4 mb-5">
     <div className="card">
        <p className='ps-4 pt-4'>Not Assigned</p>
        <h2 className='ps-4 text-success'>24</h2>
     </div>

    </div>
    </div>
   </div>
</div>

<div className="row bg-white mt-3 shadow rounded-3 mb-2 px-2">
    <div className="col-lg-2  mt-4">
        Search <br />
        <input type="search" placeholder='Name, mobile ,course' className='form-control' />
    </div>
    <div className="col-lg-2 mt-4"> 
        Status <br />

        <select  className='form-control'  > 
            <option>All</option>
            <option>1</option>
        </select>
    </div>
    <div className="col-lg-2 mt-4">
        Assigned To <br />
          <select  className='form-control' > 
            <option>All</option>
            <option>1</option>
        </select>
    </div>
    <div className="col-lg-2 mt-4">
           Center <br />
          <select  className='form-control' > 
            <option>All</option>

            <option>1</option>
        </select>
    </div>
    <div className="col-lg-2 mt-4">
        Source <br />
          <select className='form-control'  > 
            <option>All</option>
              <option>1</option>
        </select>
    </div>
    <div className="col-lg-2 mt-4">
        Session <br />
          <select  className='form-control'  > 
            <option>All</option>
            <option>1</option>
        </select>
    </div>
    <div className="row mb-4 mt-2 ">
       
        <div className="col-lg-2">
            Next-follow-up
            <br />
               <select  className='form-control'  > 
            <option>All</option>
            <option>1</option>
        </select>
        </div>
        <div className="col-lg-2">
            Form <br />
             <input type="date" className='form-control'  />
        </div>
        <div className="col-lg-2">
            To <br />
            <input type="date" className='form-control' />
        </div>
         <div className="col-lg-2 mt-4">
            <button className='btn btn-outline-dark ps-2 pe-2 w-100'>RESET</button>
        </div>
    </div>
</div>








<div className="row shadow bg-white rounded-3">
    <div className="col-lg-12 mt-3">
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
                   <div className="table-responsive">
                     <table className='table  mt-2'>
                        <thead>
                            <tr className='table-light'>
                                <th scope="col">Sr no</th>
                                <th scope='col'>Date</th>
                                 <th scope='col'>Action</th>
                                  <th scope='col'>Source</th>
                                <th scope="col">Name</th>
                                <th scope="col">college</th>
                                <th scope="col">Center</th>
                                      <th scope='col'>Action</th>
                                <th scope="col">For Programme</th>
                                {/* <th scope="col">Role</th> */}
                               
                            </tr>

                        </thead>
                        <tbody>
                            {
                                enq.map((e, i) => (
                                    <tr   key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                                        <th scope='row'>{i+1}</th>
                                        <td>{e.createdAt.split("T")[0]}</td>
                                        <td>{e.email}</td>
                                        <td>{e.contactNumber}</td>
                                        <td>{e.course}</td>
                                        <td>{e.role}</td>
                                        <td>
                                            <i className="fa fa-edit pe-3"   onClick={(event) => event.stopPropagation()}></i>
                                            <i className="fa fa-trash ps-3 text-danger" onClick={(event) => event.stopPropagation()} ></i>
                                        </td>
                                     
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
    </div>
</div>
                  
                
        </>
    )
}

export default Adviewenq
