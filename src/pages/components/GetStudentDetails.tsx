
'use client'
import {useQuery} from "@apollo/client";
import { useState } from 'react';
import CheckStudent from './CheckStudent';


export default function GetStudentDetails()
 {
   
   
    const [formData, setFormData] = useState({
    student_id:'',
  });
  
   const handleChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

var [flag,SetFlag] = useState(false)

function handleSubmit(e) {
  
 SetFlag(true)
  

}

if (flag){
  return <CheckStudent studentid={formData.student_id}/>
}

  return (
    <div>
       
       
       <form onSubmit={(e)=>{e.preventDefault();handleSubmit(e);}}>
         <div className="-mx-4 flex flex-wrap ">
                  <div className="w-full px-10 md:w-1/2  pt-20">
                    <div className="mb-8">
                      <label htmlFor="student_id" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Student ID</label>
                      <input type="text" id="student_id" name="student_id" value={formData.student_id} onChange={handleChange} placeholder="Enter your ID" className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="studentID" required />
                      <label>Enter the student ID shared in the admissions email</label>
                    </div>
                     <div className="w-full px-4">
                    <button type="submit" className="rounded-sm bg-black px-9  py-4 text-base font-medium text-white  hover:bg-[#701a75] dark:shadow-submit-dark">VERIFY</button>
                  </div>
                  </div>
                  
            </div>
      </form>
     
    
    </div>
  )
 }






