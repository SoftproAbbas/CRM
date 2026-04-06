import React from 'react'
import { Link } from 'react-router-dom'
function Navbaar() {
  return (
    <>
    <div className="row nav-deg ">
        <div className="col-sm-6 padd mq-padd ">
            <div className="im d-flex ms-4">
            <img src="/src/assets/spilogo.png" alt="" height={50} className='spi-img ms-5 mq-logo' />
            <p className='text-nav ms-3 pt-2 mq-logo-text'>Softpro India Computer Technologies (P) Ltd.</p>

            </div>
        </div>
        {/* <div className="col-sm-4">
        </div> */}
        <div className="col-sm-4 padd mq-padd d-flex justify-content-start ">
            <div className="me-4">
            <p className='nav-text mq-text  px-1 py-2'>A Company Founded by Technocrats from IIT & IET</p>

            </div>
        </div>
<div className="col-sm-1 padd mq-pad ">
    <div className="me-5">
    <Link className="btn btn-primary rounded-pill px-4 py-1 mt-1 mq-login" to={'/log'}>Login</Link>

    </div>
</div>


    </div>
    </>
  )
}

export default Navbaar
