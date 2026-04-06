import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
function Mgviewenq() {
  
 
          const [enq, setEnq] = useState([]);
          const [user, setUser] = useState([]);
          const [filteruser, setFilterUser] = useState([]);
          const [uid, setUid] = useState("");
          const [rem, setRem] = useState("");
          const [EditId, setEditId] = useState([])
          const [selectedEnq, setSelectedEnq] = useState(null);
          const [status,setStatus] = useState("");
          const [nextdate,setNextDate] = useState("");
          const [programme,setProgramme] = useState("");
          const [remark,setRemark] = useState("");
          const [filterfollowup,setFilterFollowup] = useState([]);
          const [mydata,setmydata] = useState([]);
        
      
          const getnenq = async () => {
              const response = await axios.get('http://localhost:5000/api/enq')
              const response2 = await axios.get(`http://localhost:5000/api/adduser/${localStorage.getItem('Manager')}`)

              if (response.data.msg == "sucess" && response2.data.msg=="success") {
                setmydata(response2.data.user);
                  console.log(response.data.enq);
                  console.log(response2.data);

                  var enquiries = response.data.enq.filter((a) => {
                      return a.center == response2.data.adduser.center;
                  })
                  console.log(enquiries)
                  setEnq(enquiries);
      
              }
          }
      
      
          useEffect(() => {
              getnenq();
              getuser();
          }, [])
      
          const getuser = async () => {
              const response = await axios.get('http://localhost:5000/api/adduser')
              if (response.data.msg == "success") {
                  setUser(response.data.adduser);
      
              }
          }
      
      
         const assignfun = (e) => {
          // console.log(e);
          setEditId(e._id);
          var fu = user.filter((u) => {
            if (localStorage.getItem("Manager") == u._id) {
              return false;
            } else {
              return u.center == e.center;
            }
          });
          // console.log("Filtered users:", fu);
          setFilterUser(fu);
        };   
      
      
       const updateenq = async (e) => {
          e.preventDefault();
          const d = Date();
          const update = {
            assignto: uid,
            assignby: localStorage.getItem("Manager"),
            assigndate: d,
          };
          const res = await axios.put(
            `http://localhost:5000/api/enq/${EditId}`,
            update,
          );
          const assindata = {
            enqid: EditId,
            assignto: uid,
            assignby: localStorage.getItem("Manager"),
            assignbyModel: "adduser",
            remark: rem,
          };
          console.log(assindata);
          const res2 = await axios.post(
            "http://localhost:5000/api/assign",
            assindata,
          );
          console.log(res2);
          if (res.data.msg == "update" && res2.data.msg === "success") {
            window.alert("data update ");
            setEditId(null);
            setUid("");
            setRem("");
            getnenq();
          } else {
            window.alert("something went wrong");
          }
        };
      
      
      
          const deluser = async (id) => {
              const res = await axios.delete(`http://localhost:5000/api/enq/${id}`)
              console.log(res);
              if (res.data.user == "delete success") {
                  window.alert("enquiry deleted")
                  getnenq();
              }
              else {
                  window.alert("something went wrong")
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
      
            const handleRowClick = (data) => {
          setSelectedEnq(data);
      
          const offcanvas = new window.bootstrap.Offcanvas(
            document.getElementById("enqOffcanvas"),
          );
          getfollowup(data._id);
          offcanvas.show();
        };
      
      
        async function addfollowup(e){
          e.preventDefault();
          const followupdata = {'enqid':selectedEnq._id,'uid':localStorage.getItem('counselor'),status,nextdate,remark,programme};
          const res=await axios.post('http://localhost:5000/api/followup',followupdata);
          if(res.data.msg=="success"){
            window.alert("Follow Up Added Success");
            setStatus("")
            setNextDate("")
            setRemark("")
            setProgramme("")
          }
          else{
            window.alert("Something Went Wrong");
          }
      
        }
      
      
      
      
      
          return (
              <>
                  <div className="container-fluid">
        {/* <div className="row my-4">
          <div className="col-md-12">
            <div
              className="d-flex justify-content-between align-items-center bg-white shadow"
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ cursor: 'pointer', color: '#64748b' }}>
                <i className="fa-regular fa-bell"></i>
              </div>
      
              <div style={{ cursor: 'pointer' }}>
                <i className="fa-regular fa-user"></i>
              </div>
            </div>
          </div>
        </div> */}
      
      
        
        <div className="row shadow p-4 gap-4 rounded-5 mx-0">
      
          <div className="col-md-2 py-4">
            <div className="p-4">
              <h5 className="mb-3">Enquiries</h5>
      
              <div className="btn-group custom-toggle mt-4">
                <button className="btn bg-primary text-white">Table</button>
                <button className="btn">Cards</button>
              </div>
            </div>
          </div>
      
          <div className="col-md-3 py-4 border rounded-3">
            <p>Total Enquiries</p>
            <h3 className="text-muted">7</h3>
          </div>
      
          <div className="col-md-3 py-4 border rounded-3 shadow">
            <p>Assigned</p>
            <h3 style={{ color: 'green' }}>1</h3>
          </div>
      
          <div className="col-md-3 py-4 border rounded-3">
            <p>Not Assigned</p>
            <h3 style={{ color: 'orange' }}>6</h3>
          </div>
      
        </div>
      
      
        {/* ================= FILTER ================= */}
        <div className="filter-container p-3 my-4 shadow rounded-3">
          <div className="row g-3">
      
            <div className="col-md-2">
              <label>Search</label>
              <input type="text" className="form-control" placeholder="Name, mobile..." />
            </div>
      
            <div className="col-md-2">
              <label>Status</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>Assigned To</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>Center</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>Source</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>Session</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>Next Follow-Up</label>
              <select className="form-select"><option>All</option></select>
            </div>
      
            <div className="col-md-2">
              <label>From</label>
              <input type="date" className="form-control" />
            </div>
      
            <div className="col-md-2">
              <label>To</label>
              <input type="date" className="form-control" />
            </div>
      
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-outline-secondary w-100">Reset</button>
            </div>
      
          </div>
        </div>
      
      
        {/* ================= TABLE ================= */}
        <div className="row shadow p-4">
      
          {/* Buttons */}
          <div className="col-md-8 d-flex flex-wrap gap-1 pb-2">
            <button className="btn btn-outline-secondary btn-sm">Copy</button>
            <button className="btn btn-outline-secondary btn-sm">Excel</button>
            <button className="btn btn-outline-secondary btn-sm">PDF</button>
            <button className="btn btn-outline-secondary btn-sm">Column visibility</button>
            <button className="btn btn-outline-secondary btn-sm">Show 10 rows</button>
          </div>
      
          <div className="col-md-4 d-flex justify-content-md-end pb-2">
            <input type="search" className="form-control w-50" placeholder="Search..." />
          </div>
      
          {/* Table */}
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
      
                <thead className="table-light">
                  <tr>
                    <th>S.no</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Source</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Center</th>
                    <th>Program</th>
                    <th>Assigned</th>
                    <th>Status</th>
                    <th>Next Follow</th>
                  </tr>
                </thead>
      
                <tbody>
                  {enq.map((e, i) => (
                    <tr   key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                      <td>{i + 1}</td>
                      <td>{e.createdAt?.split('T')[0]}</td>
      
                      <td>
                        <div className="d-flex gap-2">
                          <a
                            href={`https://api.whatsapp.com/send?phone=${e.contactNumber}`}
                            target="_blank"
                            // className="btn btn-outline-warning btn-sm"
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-outline-warning"
                          >
                            WA
                          </a>
      
                          <br />
                           <a
                          href=""
                          className="btn btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Copy
                        </a>
      
                          {/* <button className="btn btn-primary btn-sm">Copy</button> */}
      
                          <div className="dropdown">
                            <button onClick={(event) => {event.stopPropagation()}} className="btn btn-secondary btn-sm" data-bs-toggle="dropdown">
                              <i className="fa-solid fa-ellipsis"></i>
                            </button>
      
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={(event) => {event.stopPropagation();assignfun(e);}}
                                >
                                  Assign
                                </button>
                              </li>
      
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => deluser(e._id)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
      
                      <td>{e.source}</td>
      
                      <td>
                        <b>{e.fullName}</b><br />
                        {e.contactNumber}<br />
                        {e.email}
                      </td>
      
                      <td>{e.college}</td>
                      <td>{e.center}</td>
                      <td>{e.forprogram || "_"}</td>
                      <td>{e.assignto ? e.assignto.name : "Not Assigned"}</td>
                      <td>{e.status}</td>
                      <td>{e.nextfollowupdate}</td>
      
                    </tr>
                  ))}
                </tbody>
      
              </table>
            </div>
          </div>
      
        </div>
      
      </div>
      
      
      
      
      
                  {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}
      
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <form onSubmit={updateenq}>
                                  <div className="modal-body">
      
                                      <div className="mb-3">
                                          {/* <input type="text" value={EditId}/> */}
                                          <label for="recipient-name" className="col-form-label">Assign / Transfer To:</label>
                                          <input type="text" className="form-control" id="recipient-name" />
                                          <select className="" id="" value={uid} onChange={(e) => setUid(e.target.value)}>
                                              <option value="">--Not Assigned--</option>
                                              {
                                                  filteruser.map((e) => (
                                                      <option key={e._id} value={e._id}>{e.name}</option>
                                                  ))
                                              }
                                          </select>
      
                                      </div>
                                      <div className="mb-3">
                                          <label for="message-text" className="col-form-label">Message:</label>
                                          <textarea value={rem} onChange={(e) => setRem(e.target.value)} className="form-control" id="message-text" ></textarea>
                                      </div>
                                  </div>
                                  <div className="modal-footer">
                                      {/* <button type="button" className="btn btn-secondary" >Close</button> */}
                                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"> Assign</button>
                                  </div>
                              </form>
      
                          </div>
                      </div>
                  </div>
      
      
                  {/* off canvas code by abbas sir */}
                  <div 
        className="offcanvas offcanvas-end" 
        tabIndex="-1" 
        id="enqOffcanvas"
        style={{ width: "420px" }}
      >
        <div className="offcanvas-header border-bottom">
          <div>
            <h5 className="mb-0">Enquiry Details</h5>
            <small className="text-muted">
              {selectedEnq?.course} • {selectedEnq?.center}
            </small>
          </div>
      
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
      
        <div className="offcanvas-body">
      
          {selectedEnq && (
            <>
              {/* USER HEADER */}
              <div className="mb-3">
                <h6 className="mb-0">{selectedEnq.fullName}</h6>
                <small className="text-muted">
                  {selectedEnq.course} • {selectedEnq.center}
                </small>
      
                <span className="badge bg-warning float-end">New</span>
              </div>
      
              <hr />
      
              {/* DETAILS */}
              <div className="mb-3">
                <p className="mb-1"><b>Mobile:</b> {selectedEnq.contactNumber}</p>
                <p className="mb-1"><b>Email:</b> {selectedEnq.email || "-"}</p>
                <p className="mb-1"><b>Course:</b> {selectedEnq.course}</p>
                <p className="mb-1"><b>Center:</b> {selectedEnq.center}</p>
                <p className="mb-1">
                  <b>Assigned:</b> {selectedEnq.assignto?.name || "Not Assigned"}
                </p>
                <p className="mb-1">
                  <b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}
                </p>
              </div>
      
              {/* ACTION BUTTONS */}
              <div className="d-flex gap-2 mb-3">
                <a 
                  href={`tel:${selectedEnq.contactNumber}`} 
                  className="btn btn-outline-primary w-100"
                >
                  Call
                </a>
      
                <a 
                  href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNumber}`} 
                  target="_blank"
                  className="btn btn-outline-success w-100"
                >
                  WhatsApp
                </a>
      
                <button className="btn btn-outline-warning w-100"  
                   data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                onClick={()=>{
                    assignfun(selectedEnq)
                }}>
                  Transfer
                </button>
              </div>
      
              <hr />
      
              {/* FOLLOW-UP SECTION */}
              <h6>Add Follow-Up</h6>
              <form onSubmit={addfollowup}>
              <div className="mb-2">
                <label>Status</label>
                <select value={status} onChange={(e)=>setStatus(e.target.value)} className="form-control">
                  <option>Follow Up</option>
                  <option>Hot Enquiry</option>
                  <option>Warm Enquiry</option>
                  <option>Cold Enquiry</option>
                  <option>Not Intrested</option>
                  <option>Registered</option>
                </select>
              </div>
      
              <div className="mb-2">
                <label>Next Follow-Up Date</label>
                <input type="date"  value={nextdate} onChange={(e)=>setNextDate(e.target.value)} className="form-control" />
              </div>
      
              <div className="mb-2">
                <label>For Programme</label>
                <select   value={programme} onChange={(e)=>setProgramme(e.target.value)} className="form-control">
                  <option>Select Programme</option>
                  <option>Summer Training</option>
                  <option>Vocational Training</option>
                  <option>Industrial Training</option>
                </select>
              </div>
      
              <div className="mb-3">
                <label>Remark</label>
                <textarea value={remark} onChange={(e)=>setRemark(e.target.value)}
                  className="form-control" 
                  placeholder="Write exact conversation notes..."
                ></textarea>
              </div>
      
              <input type="submit" value="Save Follow Up" className='btn btn-warning w-100 mb-3' />
              </form>
              <hr />
      
              {/* TIMELINE */}
              {/* <div className="d-flex justify-content-between align-items-center">
                <h6>Follow-Up Timeline</h6>
                <button className="btn btn-sm btn-outline-secondary">
                  Refresh
                </button>
              </div>
      
              {
                filterfollowup.map((f)=>(
                  <p>
                    {f.status}
                    <br />
                    {f.nextdate}
                    <br />
                    {f.remark}
                  </p>
                ))
              } */}
              <div className="card p-3 shadow-sm">
  {/* Header */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h6 className="mb-0">Follow-Up Timeline</h6>
    <button className="btn btn-sm btn-outline-secondary">
      Refresh
    </button>
  </div>

  {/* Timeline */}
  <div className="timeline">
    {filterfollowup.map((f, index) => (
      <div key={index} className="timeline-item d-flex">
        
        {/* Left Line + Dot */}
        <div className="timeline-left">
          <div className="dot"></div>
          {index !== filterfollowup.length - 1 && <div className="line"></div>}
        </div>

        {/* Content Card */}
        <div className="timeline-content card p-3 mb-3 w-100">
          
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mb-1">{f.status}</h6>
            <small className="text-muted">
              {f.createdAt || f.nextdate}
            </small>
          </div>

          <p className="mb-1 text-muted">
            {f.remark || "No remarks"}
          </p>

          <small className="text-secondary">
            By: {f.createdBy || "Admin"}
          </small>

          {f.nextdate && (
            <div className="mt-1">
              <small className="text-primary">
                Next: {f.nextdate}
              </small>
            </div>
          )}

        </div>
      </div>
    ))}
  </div>
</div>
            </>
          )}
      
        </div>
      </div>
      </>
    
  )
}

export default Mgviewenq
