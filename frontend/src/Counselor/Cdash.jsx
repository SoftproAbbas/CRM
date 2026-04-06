import React, { useState } from 'react'
import Carddash from '../Component/Carddash'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
function Cdash() {
   
     const navigate =  useNavigate();
 
     function logout(){
         localStorage.removeItem('counselor')
         navigate('/log')
     }
 
    //  function validate(){
    //      if(!localStorage.getItem('counselor')){
    //          navigate('/log');
    //      }
 
    //  }

    //  useEffect(()=>{
    //      validate();
    //  },[])
  
  
  return (

    <>
            <div className="row mt-3 shadow   rounded-4 bg-white">
                <div className="col-lg-4">
                    <h5>Complete Report</h5>
                    <p>Quick snapshot of  procees -what you did & whats next</p>
                </div>
                <div className="col-lg-2 mt-3">
                    <select className="form-select" aria-label="Default select example">
                        <option     >2026</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                </div>
                <div className="col-lg-2 mt-3">
                    <input type="date" name="" id="" className='form-control' />
                </div>

                <div className="col-lg-2 mt-3">
                    <input type="date" name="" id="" className='form-control' />
                </div>
                <div className="col-lg-1 mt-3">
                    <button type="button" className="btn text-white" style={{background:'#ff6d04'}}>Apply</button>
                </div>
                <div className="col-lg-1 mt-3 mb-2">
                    <button type="submit" className="btn btn-primary pe-1 ps-1"  onClick={logout} >Logout</button>
                </div>
            </div>

    <div>
       <div className="row mt-3   ">
                <div className="col-lg-7  shadow    rounded-4 bg-white">
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-between">
                            <div>
                                Welcome,<span className=' fw-5'>User</span>
                                <p>Overview</p>
                                <h6><span className='fw-bold'>enquries</span></h6>
                            </div>



                            <div className='d-flex justify-content-between'>
                               <div>
                                 <p className='pt-4 pe-2'>Assigned</p>
                                <h5>3</h5>
                               </div>

                                <div>
                                    
                                <label htmlFor=""> Progress</label>
                                <br />
                                <input type="range" name="" id="" />
                                <p className="text-end">12% Assigned</p>
                                </div>
                            </div>


                           

                        </div>
                        <div className="row">
                            <div className="col-lg-4"> <Carddash
                            title="Today follow-ups"
                            overdue="Overdue"
                            num="0"
                            duenum=": 2"
                            />
                          </div>
                            <div className="col-lg-4"><Carddash
                            title="Workshop students"
                            overdue="Recent"
                            num="0"
                            duenum=": 0"
                            /></div>
                            <div className="col-lg-4"><Carddash
                             title="Registered"
                            overdue="Total conversions"
                            num="2"
                            
                            /></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                               <Carddash
                                 title="Centers"
                            overdue="Active centers"
                            num="4"
                        
                               />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4  ms-2  shadow   rounded-4 bg-white">
                    <p className="fw-bold">Actions Items</p>
                        
               
                </div>
            </div>

            <div className="row ">
                <div className="col-lg-12">
                      
                </div>
            </div>

    </div>
     </>
  )
 
}


export default Cdash
