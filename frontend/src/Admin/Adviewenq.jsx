import axios from 'axios';
// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'

import Carddash from '../Component/Carddash';

function Adviewenq() {
    const [selectedEnq, setSelectedEnq] = useState(null);
    const [enq, setEnq] = useState([]);
    const [allassign, setAllassign] = useState([]);
    const [assign, setAssign] = useState([]);
    const [user, setUser] = useState([]);
    const [filteruser, setFilterUser] = useState([]);
    const [editId, setEditId] = useState(null);
    const [uid, setUid] = useState("");
    const [rem, setRem] = useState("");
    const [filterFollowup, setFilterFollowup] = useState([]);

    const getenq = async () => {

        const res = await axios.get('http://localhost:5000/api/enq')
        if (res.data.msg == "sucess") {
            setEnq(res.data.enq);
            console.log(res.data.enq);
        }
    }

    const getAssign = async()=>{
        const res = await axios.get('http://localhost:5000/api/assign');
        if(res.data.msg=="success"){
            setAllassign(res.data.assign);
            console.log(res.data.assign);
        }
    };

        const handleRowClick = (data) => {
    setSelectedEnq(data);
    setEditId(data._id);
    getfollowup(data._id);
     const fa=allassign.filter((a)=>{
            return a.enqid && a.enqid._id == data._id
        });
        setAssign(fa);
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal1'));
    modal.show();
};

    const delenq = async (id) => {

        const res = await axios.delete(`http://localhost:5000/api/enq/${id}`)
        if (res.data.msg == "Delete") {
            alert("Delete Enq")
            setEnq(res.data.enq);
            // getenq()
            // console.log(res.data.enq);
        }
    }

    const assignfun=(e)=>{
        setEditId(e._id);
        var fu = user.filter((u)=>{
            if(e.assignto && e.assignto._id== u._id){
                return false
            }
            else{
                return u.center == e.center && u.status=="u";
            }
        });
       
        setFilterUser(fu);
    }

    const updateenq = async (e) => {
        e.preventDefault();
        const d = Date()
        const data = { 'assignto': uid, 'assignby': localStorage.getItem('admin'), assigndate: d };
        const res = await axios.put(`http://localhost:5000/api/enq/${editId}`, data);
        const assigndata = {'enqid':editId,'assignto':uid,'assignby':localStorage.getItem('admin'),'assignbyModel':'admin','remark':rem};
        const res2 = await axios.post('http://localhost:5000/api/assign/',assigndata);
       
        // console.log(res);
        if (res.data.msg == "Update" && res2.data.msg=="success") {
            alert("Update successfully")
            setUid("")
            setEditId(null)
            // setEnq("");
            setRem("");
            getenq()
        }
    }

     const getfollowup = async(id)=>{
        const res =await axios.get('http://localhost:5000/api/followup');
        if(res.data.msg=="success"){
          const followupdata = res.data.followup;
          // console.log(followupdata);
          const fd = followupdata.filter((f)=>{
            return f.enqid?._id == id;
            
          })
          setFilterFollowup(fd);
        } 
      }

    const getuser = async () => {

        const res = await axios.get('http://localhost:5000/api/adduser')
        if (res.data.msg == "success") {
            setUser(res.data.adduser);
            // console.log(res.data.adduser);
        }
    }
    useEffect(() => {
        getenq();
        getuser();
        getAssign();
    }, [])




    const groupedData = Object.values(
  allassign.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();

    const assignedBy =
      item.assignbyModel === "admin"
        ? "Admin"
        : item.assignby?.name || "N/A";

    const assignedTo =
      item.assignto?.name || "Not Assigned";

    const key = `${date}-${assignedBy}-${assignedTo}`;

    if (!acc[key]) {
      acc[key] = {
        date,
        assignedBy,
        assignedTo,
        total: 0,
      };
    }

    acc[key].total += 1;

    return acc;
  }, {})
);





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

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
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

                    <select className='form-control'  >
                        <option>All</option>
                        <option>1</option>
                    </select>
                </div>
                <div className="col-lg-2 mt-4">
                    Assigned To <br />
                    <select className='form-control' >
                        <option>All</option>
                        <option>1</option>
                    </select>
                </div>
                <div className="col-lg-2 mt-4">
                    Center <br />
                    <select className='form-control' >
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
                    <select className='form-control'  >
                        <option>All</option>
                        <option>1</option>
                    </select>
                </div>
                <div className="row mb-4 mt-2 ">

                    <div className="col-lg-2">
                        Next-follow-up
                        <br />
                        <select className='form-control'  >
                            <option>All</option>
                            <option>1</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                        Form <br />
                        <input type="date" className='form-control' />
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
                        <table className='table  my-5 '>
                            <thead>
                                <tr className='table-light'>
                                    <th scope="col">Sr no</th>
                                    <th>Date</th>
                                    <th scope='col'>Action</th>
                                    <th>Source</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>college</th>

                                    <th scope="col">Center</th>
                                    <th scope="col">for-Programme</th>
                                    <th scope="col">Assigned</th>
                                    <th > Status</th>
                                    <th>Next Follow-up</th>

                                    {/* <th scope="col">Role</th> */}

                                </tr>

                            </thead>
                            <tbody>
                                {
                                    enq.map((e, i) => (
                                        <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                                            <th scope='row'>{i + 1}</th>
                                            <td>{e.createdAt.split("T")[0]}</td>
                                            <td className=''>

                                                <a href={`https://api.whatsapp.com/send/?phone=${e.contactNumber}`} target='_blank' className='btn btn-outline-success d-inline'  onClick={e=>e.stopPropagation()} >WA</a>
                                                <a href="" className='btn btn-primary d-inline ms-1'>Copy</a>

                                                <div class="dropdown d-inline ms-1">
                                                    <button class="btn btn-secondary " onClick={e=>e.stopPropagation()} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" href="#" onClick={() => delenq(e._id)}> <i className="fa fa-trash ps-3 text-danger"></i></a></li>
                                                      {e.status=="u" && <li><button type="button" class="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={(event)=>{assignfun(e);
                                                            (event.stopPropagation())
                                                        }} >Assign</button>
                                                        </li>}
                                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                {e.source}
                                            </td>
                                            <td >
                                                <b> {e.fullName}</b>
                                                <br />
                                                {e.contactNumber}
                                                <br />
                                                {e.course}

                                            </td>
                                            <td>{e.college}</td>
                                            <td>{e.center}</td>
                                            <td>{e.forprogram || "-"}</td>
                                            <td>{e.assignto? e.assignto.name :"Not Assigned"}</td>
                                            <td>{e.status=="u"?"Active":"Deactive"}</td>
                                            <td>{e.nextfollowupadte || "-"}</td>
                                            {/* <td>
                                                <i className="fa fa-edit pe-3"></i>
                                                <i className="fa fa-trash ps-3 text-danger"></i>
                                            </td> */}

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button> */}
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Assign Enquriy</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={updateenq}>
                            <div class="modal-body">

                                <div class="mb-3">
                                    {/* <input type="text"  value={editId}/> dekhne ke liye   */}

                                    <label for="recipient-name" class="col-form-label text-muted">Assign/Transfer to</label>
                                    <select className="form-control" value={uid} onChange={(e) => setUid(e.target.value)}>
                                        <option value="">--Not Assigned--</option>
                                        {
                                            filteruser.map((e) => (
                                                <option key={e._id} value={e._id} >
                                                    {e.role=="Manager"?"{m}" :"{c}"}
                                                    {e.name} </option>
                                            ))
                                        }


                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Note (Optional)</label>
                                    <textarea value={rem} onChange={(e) => setRem(e.target.value)} class="form-control" id="message-text" placeholder="Eg: transferred to manager for closure"></textarea>
                                </div>

                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary w-50" data-bs-dismiss="modal">Assign</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>



             <div className="modal fade" id="exampleModal1" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-centered">
    <div className="modal-content">

      {/* HEADER */}
      <div className="modal-header">
        <div>
          <h5 className="modal-title">
            Enquiry #{selectedEnq?._id?.slice(-4)} - {selectedEnq?.fullName}
          </h5>
          <small className="text-muted">
            {selectedEnq?.course} • {selectedEnq?.center}
          </small>
        </div>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* FILTER SECTION */}
      <div className="px-3 pt-2 d-flex gap-2">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <button className="btn btn-warning">Apply Date Filter</button>
        <button className="btn btn-outline-secondary">Reset</button>
      </div>

      {/* STATUS CARDS */}
      <div className="row px-3 mt-3">
        <div className="col-md-3">
          <div className="card p-2">
            <small>Assigned To</small>
            <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Status</small>
            <b>{selectedEnq?.status || "New"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Next Follow-up</small>
            <b>{selectedEnq?.nextfollowupdate || "-"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Total Followups</small>
            <b>0</b>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="row p-3">

        {/* LEFT SIDE - USER INFO */}
        <div className="col-md-5">
          <div className="card p-3">
            <h5>
              {selectedEnq?.fullName}
              <span className="badge bg-warning ms-2">New</span>
            </h5>

            <hr />

            <p><b>Mobile:</b> {selectedEnq?.contactNumber}</p>
            <p><b>Email:</b> {selectedEnq?.email}</p>
            <p><b>Course:</b> {selectedEnq?.course}</p>
            <p><b>Center:</b> {selectedEnq?.center}</p>
            <p><b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}</p>

            <div className="d-flex gap-2 mt-3">
              <a
                href={`tel:${selectedEnq?.contactNumber}`}
                className="btn btn-outline-primary w-50"
              >
                Call
              </a>

              <a
                href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                target="_blank"
                className="btn btn-outline-success w-50"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - TIMELINE */}
  <div className="col-md-7">
  <div className="card p-3 shadow-sm">
    
    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="mb-0">Follow-up Timeline</h6>
      <button className="btn btn-sm btn-outline-secondary">Refresh</button>
    </div>

    {
      filterFollowup.length > 0 ? (
        filterFollowup.map((f, i) => {

          // status color
          const statusClass =
            f.status === "Hot Enquiry"
              ? "badge bg-danger"
              : f.status === "Warm Enquiry"
              ? "badge bg-warning text-dark"
              : "badge bg-secondary";

          return (
            <div key={i} className="timeline-card mb-3 p-3">

              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className={statusClass}>{f.status}</span>

                <small className="text-muted">
                  {new Date(f.createdAt).toLocaleString()}
                </small>
              </div>

              {/* Created By */}
              <p className="mb-1 text-muted">
                By:{" "}
                <b>
                  {f.assignbyModel === "admin" ? "Admin" : "Counselor"}
                </b>
              </p>

              {/* Remark */}
              <p className="mb-2">{f.remark}</p>

              {/* Next Date */}
              {f.nextdate && (
                <p className="mb-0 text-muted">
                  Next:{" "}
                  <b>{new Date(f.nextdate).toLocaleString()}</b>
                </p>
              )}

            </div>
          );
        })
      ) : (
        <p className="text-muted mt-3">No follow-up records found.</p>
      )
    }

  </div>
</div>

      </div>

<div className="row">
  <div className="col-md-5 ps-4">
    <div className="card p-3 shadow-sm">

      <h5 className="mb-3">Assignment History</h5>

      <table className="table custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Assigned By</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {assign.length > 0 ? (
            assign.map((a, i) => (
              <tr key={i}>
                
                {/* Date */}
                <td>
                  {new Date(a.createdAt).toLocaleDateString()}
                  <br />
                  <small className="text-muted">
                    {new Date(a.createdAt).toLocaleTimeString()}
                  </small>
                </td>

                {/* Assigned By */}
                <td>
                  {a.assignbyModel === "admin"
                    ? "Admin"
                    : a.assignby?.name || "N/A"}
                </td>

                {/* Assigned To */}
                <td>
                  {a.assignto?.name || (
                    <span className="text-muted">Not Assigned</span>
                  )}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No assignment history found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  </div>
  <div className="col-md-7 ps-4">
  <div className="card p-3 shadow-sm">

    <h5 className="mb-3">Admin Assignment Report</h5>

    <table className="table custom-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Assigned By</th>
          <th>Assigned To</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {groupedData.length > 0 ? (
          groupedData.map((g, i) => (
            <tr key={i}>

              <td>{g.date}</td>

              <td>{g.assignedBy}</td>

              <td>
                {g.assignedTo === "Not Assigned" ? (
                  <span className="text-muted">Not Assigned</span>
                ) : (
                  g.assignedTo
                )}
              </td>

              <td>
                <b>{g.total}</b>
              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-muted">
              No report data found
            </td>
          </tr>
        )}
      </tbody>
    </table>

  </div>
</div>
</div>


      {/* ASSIGN SECTION */}
      <form onSubmit={updateenq}>
        <div className="p-3 border-top">

          <div className="row">
            <div className="col-md-6">
              <label>Assign To</label>
              <select
                className="form-control"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              >
                <option value="">-- Not Assigned --</option>
                {user.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label>Note</label>
              <textarea
                className="form-control"
                value={rem}
                onChange={(e) => setRem(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Assign Enquiry
            </button>
          </div>

        </div>
      </form>

    </div>
  </div>
</div>


        </>
    )
}

export default Adviewenq
