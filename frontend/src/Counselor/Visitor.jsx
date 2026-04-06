import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Visitor() {
    const [visitor, setVisitor] = useState([]);
    const [role, setRole] = useState("");
    const getvisitor = async () => {

        const res = await axios.get('http://localhost:5000/api/visitor')
        if (res.data.msg == "success") {
            setVisitor(res.data.visitor);
            console.log(res.data.visitor);
        }
    }


    const delvisitor = async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/visitor/${id}`)
        if (response.data.msg === "success") {
            window.alert("Delete success")
            getvisitor();
        }
        else {
            window.alert("somthing went wrong")
        }
    }


    useEffect(() => {
        getvisitor();
    }, [])


    const filteredVisitor = role
        ? visitor.filter((v) => v.role === role)
        : visitor;

    //   console.log(visitor);
    return (
        <>
            <div className="row mt-3">
                <div className="col-sm-3 ">
                    <h5 className="">Visitor Enquiries</h5>
                    <select className='form-control mb-3' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">-- Select Visitor--</option>
                        <option value="visitorO">Visitor Official</option>
                        <option value="visitorP" >Visitor Personal</option>
                    </select>
                </div>
                
            </div>
                <div className="row">
                    <div className="col-lg-12 shadow rounded-4 bg-white">
                        <div className="table-responsive m-2">

                            <table className='table  table-bordered '>
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            S.no
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Contact</th >
                                        <th scope="col">Email</th >
                                        {role !== "visitorP" && <th>Purpose</th>}
                                        {role !== "visitorP" && <th>Remark</th>}
                                        <th scope="col">Center</th>
                                        <th scope="col">Role</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredVisitor.map((e, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{e.name}</td>
                                                <td>{e.contact}</td>
                                                <td>{e.email}</td>
                                                {role !== "visitorP" && <td>{e.purposeO}</td>}
                                                {role !== "visitorP" && <td>{e.remark}</td>}
                                                <td>{e.center}</td>
                                                <td>{e.role}</td>
                                                <td>
                                                    <button className='btn' onClick={() => {
                                                        delvisitor(e._id);
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


        </>
    )
}

export default Visitor
