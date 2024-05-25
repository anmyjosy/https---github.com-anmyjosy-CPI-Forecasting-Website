import React,{useEffect}from 'react'
import axios from 'axios';

const New = () => {
  useEffect(() => {
    axios.get('http://localhost:3001/verify')
      .then(res => {
        if (!res.data.status) {
          navigate('/login');
        }
        else{
          navigate('/cpi');
        }
      })
      .catch(err => {
        console.error("Verification error:", err);
        navigate('/login');
      });
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default New
