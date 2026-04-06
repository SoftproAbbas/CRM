import React, { useEffect, useState } from 'react'
import Navbaar from '../Component/Navbaar';
import Asidebar from '../Component/Asidebar';
import Footer from '../Component/Footer';
import axios from 'axios';
import Carddash from '../Component/Carddash';


function Home() {
  const [centers, setCenters] = useState([]);
  const [fullName, setFullName] = useState("");
  const[name,setName]= useState("");
  const[contact,setContact]=  useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
   const [contactNumber, setContactNumber] = useState("");
    const [purpose, setPurpose] = useState("");
        const [purposeO, setPurposeO] = useState("");
     const [role, setRole] = useState("Student");
      const [center, setCenter] = useState("");
      const [address, setAddress]=useState("");
      const[remark, setRemark]=  useState("");
       const [status, setStatus] = useState("");


           const getcenter = async () => {
        const res = await axios.get("http://localhost:5000/api/center");
        if (res.data.msg == "success") {
            var x = res.data.center
            // console.log(x);
            x = x.filter((e) => e.status == 'Active');
            setCenters(x);
        }
    }

const addenq = async (e) => {
  e.preventDefault();

  let enq = {};
  let visitor ={};

  if (role === "Student") {
    enq = {
      fullName,
      college,
      course,
      branch,
      email,
      year,
      contactNumber,
      purpose,
      role,
      center
    
    };
      try {
    console.log(enq);

    const response = await axios.post("http://localhost:5000/api/enq", enq);

    if (response.data.msg === "succes") {
      alert("Enquiry Submitted Successfully");

      setFullName("");
      setCollege("");
      setCourse("");
      setBranch("");
      setEmail("");
      setYear("");
      setContactNumber("");
      setPurpose("");
      setRole("Student");
      setCenter("");
    } 
    else {
      alert("Something went wrong");
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
  }

  else if (role === "visitorO") {
    visitor = {
      name,
      email,
      contact,
      role,
      purposeO,
      center,
      remark,
    
    };
      try {
    console.log(visitor);

    const response = await axios.post("http://localhost:5000/api/visitor", visitor);

    if (response.data.msg === "success") {
      alert("Visitor Enq Submitted Successfully");

      setName("");
      setEmail("");
      setYear("");
      setContact("");
      setPurposeO("");
      setRole("Student");
      setCenter("");
    } 
    else {
      alert("Something went wrong");
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
  }
  

  else if (role === "visitorP") {
   visitor = {
      name,
      email,
      contact,
      role,
      center,
      address
    };
      try {
    console.log(visitor);

    const response = await axios.post("http://localhost:5000/api/visitor", visitor);

    if (response.data.msg === "success") {
      alert("Visitor Enq Submitted Successfully");

      setName("");
      setEmail("");
      setContact("");
      setRole("Student");
      setCenter("");
      setAddress("")
    } 
    else {
      alert("Something went wrong");
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
  }




};
   useEffect(() => {
        getcenter();
    }, [])
           
let infoTitle;

if(role === "Student"){
  infoTitle = "Student Information";
}
else if(role === "visitorO"){
  infoTitle = "Visitor Information";
}
else if(role === "visitorP"){
  infoTitle = "Visitor Information";
}

        let formSection;
        if (role === "Student") {
         formSection = (
<>

      <div className="row">
                  <div className="col-sm-5 mt-3">
                    <p className='stu ps-3 py-2'><i className="fa-solid fa-graduation-cap"></i>{infoTitle}</p>

                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 ">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Full Name</label>

                    <div className="input-box">
                      <i className="fa fa-user"></i>
                      <input type="text" placeholder="e.g., Aman Verma" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>College</label>

                    <div className="input-box">
                      <i className="fa fa-building"></i>
                      <input type="text" placeholder="Your college name" value={college} onChange={(e)=>{setCollege(e.target.value)}}/>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Course</label>

                    <div className="input-box">
                  <i className="fa-solid fa-graduation-cap"></i>
                      <input type="text" placeholder="e.g., B.Tech / BCA / MCA" value={course} onChange={(e)=>{setCourse(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Branch</label>

                    <div className="input-box">
                    <i className="fa-solid fa-code-fork "></i>
                      <input type="text" placeholder="e.g., CSE / IT / ECE" value={branch} onChange={(e)=>{setBranch(e.target.value)}}/>
                    </div>
                  </div>

                </div>


                <div className="row">
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Year</label>

                    <div className="input-box">
                    <i className="fa-regular fa-calendar-days"></i>
                      <input type="text" placeholder="e.g., 2nd Year" value={year} onChange={(e)=>{setYear(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Contact Number</label>

                    <div className="input-box">
                <i className="fa-solid fa-phone"></i>
                      <input type="text" placeholder="10- digit mobile" value={contactNumber} onChange={(e)=>{setContactNumber(e.target.value)}}/>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Email</label>

                    <div className="input-box">
                     <i className="fa-solid fa-envelope"></i>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Purpose</label>


                    <div className="custom-select-box mb-3">
                       <i className="fa-solid fa-border-all"></i>

                      <select value={purpose} onChange={(e)=>{setPurpose(e.target.value)}}>
                        <option>-- Select Purpose --</option>
                        <option>
                          Enquiry</option>
                        <option>
                          Registration  </option>
                        <option >
                          Reporting</option>

                        <option >
                          Certificate Work
                        </option>
                      </select>
                    </div>
                  </div>

                </div>

</>
         )
        
        }
          
         else if (role === "visitorO") {
         formSection = (
<>

      <div className="row">
                  <div className="col-sm-5 mt-3">
                    <p className='stu ps-3 py-2'><i className="fa-solid fa-graduation-cap"></i> {infoTitle}</p>

                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 ">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Name</label>

                    <div className="input-box">
                      <i className="fa fa-user"></i>
                      <input type="text" placeholder="e.g., Aman Verma" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Contact</label>

                    <div className="input-box">
                      <i className="fa fa-building"></i>
                      <input type="text" placeholder="Your college name" value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
                    </div>
                  </div>

                </div>

                <div className="row">
                 <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Email</label>

                    <div className="input-box">
                     <i className="fa-solid fa-envelope"></i>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Purpose</label>

                    <div className="input-box">
                    <i className="fa-solid fa-code-fork "></i>
                      <input type="text" placeholder="e.g., CSE / IT / ECE" value={purposeO} onChange={(e)=>{setPurposeO(e.target.value)}}/>
                    </div>
                  </div>

                </div>


                <div className="row">
                  <div className="col-sm-12 mt-3 mb-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Remark</label>

                    <div className="input-box">
                    <i className="fa-regular fa-calendar-days"></i>
                      <input type="text" placeholder="e.g., 2nd Year" value={remark} onChange={(e)=>{setRemark(e.target.value)}}/>
                    </div>
                  </div>
                 

                </div>


</>
         )
        }
         else if (role === "visitorP") {
         formSection = (
<>

      <div className="row">
                  <div className="col-sm-5 mt-3">
                    <p className='stu ps-3 py-2'><i className="fa-solid fa-graduation-cap"></i>{infoTitle}</p>

                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 ">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Name</label>

                    <div className="input-box">
                      <i className="fa fa-user"></i>
                      <input type="text" placeholder="e.g., Aman Verma" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Contact</label>

                    <div className="input-box">
                      <i className="fa fa-building"></i>
                      <input type="text" placeholder="Your college name" value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-6 mt-3 mb-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Address</label>

                    <div className="input-box">
                  <i className="fa-solid fa-graduation-cap"></i>
                      <input type="text" placeholder="e.g., B.Tech / BCA / MCA" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                  </div>
                   <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Email</label>

                    <div className="input-box">
                     <i className="fa-solid fa-envelope"></i>
                      <input type="email" placeholder="name@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                  </div>
                 

                </div>

{/* 
                <div className="row">
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Year</label>

                    <div className="input-box">
                    <i className="fa-regular fa-calendar-days"></i>
                      <input type="text" placeholder="e.g., 2nd Year" value={year} onChange={(e)=>{setYear(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <label className="form-label" style={{ fontWeight: "700", color: "#666666" }}>Contact Number</label>

                    <div className="input-box">
                <i className="fa-solid fa-phone"></i>
                      <input type="text" placeholder="10- digit mobile" value={contactNumber} onChange={(e)=>{setContactNumber(e.target.value)}}/>
                    </div>
                  </div>

                </div> */}

             

</>
         )
        }
  return (

    <>
      {/* <form action="">
        <label htmlFor="">Enter Name </label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </form> */}

      <Navbaar />
      <div className="row  justify-content-center mt-5">
        <div className="col-sm-10">
          <div className="row form-deg">
            <div className="col-sm-4 mq-1 ms-4 mq-card mb-4 mt-4">
              <h5 className=' ' style={{ fontWeight: "700" }}>Contact Us</h5>
              <p className=""><i className="fa-solid fa-phone fa-shake" style={{ color: "#ff6a00" }}></i>Call: +91 7080102006, 7080462022 <br /> <i className=" fa-solid fa-envelope fa-bounce" style={{ color: "#ff6a00" }}></i> Email: hr@softproindia.in</p>

              <Asidebar
                mobile="+91 7080102007"
                officename="Softpro Head Office"
                officeadd={
                  <>
                    Softpro Tower, Near New Hanuman <br /> Temple, Kapoorthala, Aliganj,<br />
                    Lucknow - 226006.
                  </>
                }
              />
              <Asidebar
                mobile="+91 7080102007"
                officename="Softpro House Lucknow"
                officeadd={
                  <>
                    3/213, Sector J, Jankipuram, Kursi Rd <br />
                    Near Gudamba Thana, Lucknow <br />
                    Uttar Pradesh-226026.
                  </>
                }
              />
              <Asidebar
                mobile="+91 7080102007"
                officename="Softpro Full Stack Academy"
                officeadd={
                  <>
                    1/6, Vastu Khand, Gomtinagar, <br />
                    Lucknow -226010.
                  </>
                }
              />
              <Asidebar
                mobile="+91 7080102007"
                officename="Softpro Noida Office"
                officeadd={
                  <>
                    Creatons Business Park, <br />
                    Ground Floor, H - 35, Sec 63, <br />
                    Noida Gautam Buddha Nagar, UP -<br />  201301.
                  </>
                }
              />

            </div>
            <div className="col-sm-7 mq-2  mt-4 ms-5">
                      <div className="card px-4" style={{ border: '1px dotted #ff6a00', borderRadius: '7px' }}>

      <form  onSubmit={addenq} method='post'>
                <div className="row justify-content-center ">
                  <div className="col-sm-12  border-bottom border-1 ps-3" style={{ backgroundColor: '#f8f8f8' }}>
                    <p className='pt-4' style={{ fontWeight: '700', fontSize: '25px', color: '#ff6a00' }}><i className="fa-brands fa-rocketchat"></i>Enquiry Form</p>
                    <hr style={{ margin: "7px" }} />
                    <label className="form-label mt-3" style={{ fontWeight: "700", color: "#666666" }}>You are a ?</label>

                    <div className="custom-select-box">
                      <i className="fa-solid fa-border-all"></i>

                      <select value={role} onChange={(e)=>{setRole(e.target.value)}} className='form-control'>
                        <option value="Student">Student</option>
                        <option value="visitorO">Visitor (Official)</option>
                        <option value="visitorP">Visitor (Personal)</option>
                      </select>
                    </div>

                    <label className="form-label mt-3" style={{ fontWeight: "700", color: "#666666" }}>You are at ?</label>

                    <div className="custom-select-box mb-3">
                    <i className="fa-solid fa-border-all"></i>

                      <select value={center} onChange={(e)=>{setCenter(e.target.value)}}>
                        <option value={""} >-- Select Center --</option>
                        {
                          centers.map((c)=>(
                            <option value={c.name}>{c.name}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                </div>
{formSection}
          
                <div className="row d-flex justify-content-end mb-4">
                  <div className="col-sm-5"><button type="submit" className="btn sub-btn ms-5 px-3 py-2"><i className="fa-regular fa-paper-plane"></i> Submit Details</button></div>
                </div>
       
       </form>
              </div>


            </div>
          </div>
        </div>
      </div>

      <Footer />


    </>
  )
}

export default Home
