import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './Admin.css'
function Adlayout() {
    const navigate = useNavigate();
    function validate() {
        if (!localStorage.getItem('admin')) {
            navigate('/log');
        }

    }

    useEffect(() => {
        validate();
    }, [])
    return (
        <>
            <div className="row mt-2">
                <div className="col-lg-2 col-sm-12  bg-white h-50 shadow rounded-4 ">
                    {/* <div className="bg-white h-100 shadow  px-3 rounded-4">
             <Link to='' className='btn  btn-secondary btn-sm m-2'>Dashboard</Link>
                 
                    <br />
                      <Link to='viewenq' className='btn  btn-secondary btn-sm m-2'>Enquries</Link>
                    <br />
                     <Link to='Center' className='btn  btn-secondary btn-sm m-2'><i class="fa-regular fa-building"></i>Center</Link>
                     <br />
                      <Link to='visitor' className='btn  btn-secondary btn-sm m-2'>Visitor</Link>
                      <br />
                       <Link to='user' className='btn  btn-secondary btn-sm m-2'>User</Link>
                       <br />
                    <Link to='addenq' className='btn  btn-secondary btn-sm m-2'>Add Enquiries</Link>
                </div> */}

                    <img src="/src/assets/spilogo.png" height={70} alt="" className='ms-5' />
                    <Link to='' className='btn  m-2'> <i class="fa-solid fa-chart-line"></i> Dashboard</Link>
                    <Link to='viewenq' className='btn   m-2'><i class="fa-regular fa-comment-dots"></i> Enquiries</Link>
                    <Link to='Center' className='btn   m-2'><i class="fa-regular fa-building"></i>Center</Link>
                    <Link to='visitor' className='btn  m-2'><i class="fa-solid fa-users"></i> Visitor</Link>
      
                    <Link to='addenq' className='btn  m-2'><i class="fa-solid fa-phone-volume"></i>Add Enquiries</Link>
                     <Link to='user' className='btn  m-2'><i class="fa-regular fa-user"></i> User</Link>


                </div>
                <div className="col-lg-10">
                    <div className="container">
                        <div className="row p-0">
                            <div className="col-lg-12 p-0">
                                <nav className="navbar bg-white rounded-4 shadow ">
                                    <div className="container-fluid">
                                        <div className="d-flex">
                                            {/* <button className="btn d-md-none d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-bars"></i></button> */}
                                            <button class="btn btn-primary d-md-none d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars"></i></button>

                                            <span className='pt-1  '><i className="fa-regular fa-bell pt-2"></i></span>
                                        </div>
                                        <div className="d-flex">
                                            <img src="/src/assets/spilogo.png" alt="" height={50} className=' ' />
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </div>


<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   
<img src="/src/assets/spilogo.png" height={70} alt="" className='ms-5' />
                    <Link to='' className='btn  m-2'> <i class="fa-solid fa-chart-line"></i> Dashboard</Link>
                    <Link to='viewenq' className='btn   m-2'><i class="fa-regular fa-comment-dots"></i> Enquiries</Link>
                    <Link to='Center' className='btn   m-2'><i class="fa-regular fa-building"></i>Center</Link>
                    <Link to='visitor' className='btn  m-2'><i class="fa-solid fa-users"></i> Visitor</Link>
      
                    <Link to='addenq' className='btn  m-2'><i class="fa-solid fa-phone-volume"></i>Add Enquiries</Link>
                     <Link to='user' className='btn  m-2'><i class="fa-regular fa-user"></i> User</Link>




  </div>
</div>



            {/* offcanvas 

            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close" data-bs-dilgiss="offcanvas" aria-label="Close"></button>
                </div>
              
            </div> */}





        </>
    )
}

export default Adlayout
