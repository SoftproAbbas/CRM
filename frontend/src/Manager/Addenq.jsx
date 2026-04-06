import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Addenq() {
      const [centers, setCenters] = useState([]);
        const [center, setCenter] = useState("");

        
    const getcenter = async () => {
        const res = await axios.get("http://localhost:5000/api/center");
        if (res.data.msg == "success") {
            var x = res.data.center
            // console.log(x);
            x = x.filter((e) => e.status == 'Active');
            setCenters(x);
        }
    }

     useEffect(() => {
            getcenter();
        }, [])
  return (
   <>
   <div className="row  d-flex justify-content-center mx-5 px-5 mt-3">
    <div className="col-lg-8 bg-white mx-5 px-4 p-3 shadow rounded-4 ">
        <h5 className='text-center'>Students Enquiry</h5 >
        {/* Form Start */}
 <form >

<div className="row  d-flex justify-content-center">
    <div className="col-lg-5 form-floating">
      
       <select name="" id="" className='form-control' value={center} onChange={(e) => { setCenter(e.target.value) }}>
                            <option value="">--select Center--</option>
                            {
                                centers.map((c) => (
                                    <option key={c._id} value={c.name}> {c.name}</option>
                                ))
                            }
                        </select>
                         <label for="floatingInputValue" className='ps-4'>  Select Center </label>
    </div>
    <div className="col-lg-5 form-floating  mt-2 mt-sm-0">
       
        <select className='form-control ' >
            <option >Walk-in</option>
            <option >Call</option>
        </select>
         <label for="floatingInputValue" className='ps-4'>Source</label>
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Full name'  />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
    
        <input type="text" className='form-control h-100' placeholder='    College' />
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Course' />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
     
        <input type="text" className='form-control h-100' placeholder='   Branch' />
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
       
        <input type="text" className='form-control h-100' placeholder=' Year' />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0">
     
        <input type="text" className='form-control h-100'  placeholder='   Contact number'/>
    </div>
</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5">
     
        <input type="text" className='form-control h-100' placeholder='   Email' />
    </div>
    <div className="col-lg-5 mt-2 mt-sm-0 form-floating">
    
        <select className='form-control h-25' >
            <option >Select Program</option>
            <option >Full stack</option>
        </select>
         <label for="floatingInputValue" className='ps-4'>Program </label>
    </div>

</div>
<div className="row  d-flex justify-content-center mt-3">
    <div className="col-lg-5 ms-5">
       <button type='submit' className=' btn btn-primary rounded-pill w-75'>Save Enquiry</button>
    </div>
 
    
</div>
   </form>
    </div>
   </div>
   </>
  )
}

export default Addenq
