import React from 'react'

function Asidebar(p) {
  return (
   <>
    
<div className="add mt-4">
  <h5 className=" px-1 pt-4 officename" style={{fontWeight:"700"}}><i className="fa-solid fa-location-dot" style={{color:"#ff6a00"}}></i>{p.officename}</h5>
  <hr style={{margin:"7px"}}/>
  <p className="officeadd px-2" style={{color:"#787878"}}>{p.officeadd}</p>

<p className="mobile px-2" style={{ fontWeight:"800",color: "#666666"}}>Mobile Number: <span style={{fontWeight:"400"}}>{p.mobile}</span></p>
</div>
   </>
  )
}

export default Asidebar
