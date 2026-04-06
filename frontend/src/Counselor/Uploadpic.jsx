import React, { useState } from 'react';
import axios from 'axios';

function Uploadpic() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePic", file);

    await axios.post(`http://localhost:5000/api/adduser/upload/${localStorage.getItem('Counselor')}`, formData);
    alert("Uploaded!");
  };

  return (
    <div>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Uploadpic;