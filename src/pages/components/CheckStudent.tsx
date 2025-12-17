'use client'
import React,{useState} from 'react'
import { GET_STUDENT } from '@/utils/gql/GQL_QUERIES'
import {useQuery} from "@apollo/client";

import Script from 'next/script';
import PaymentPage from './payments';





function CheckStudent ({studentid})
{
    const [formData, setFormData] = useState({

    studentid:studentid,
    date:new Date(),
    amount : 0.00,
    reference : '',
    email_id : '',

  });
  var [mflag, SetFlag] = useState(false)
  const { data,loading,error } = useQuery(GET_STUDENT, {
        variables: { search : studentid }
      });

if(loading){
          return <div>Verifying..Please Wait</div>
      }
    
if (error) return <div>{error.message}</div>;

const handleChange = (e) => 
{
 setFormData({ ...formData, [e.target.name]: e.target.value });
}


const handleSubmit = (e) => {
 SetFlag(true)
  
}

if(mflag)
{
  return <PaymentPage formdata={formData}/>
}

 if(!data.onestudent.edges[0])   return <div>Student ID Not Found</div>
console.log(data)
 
  return (
    <div>
    
 
        {data ? 
        <div className="pt-20">
        <h2>First Name :{data.onestudent.edges[0].node.firstName}</h2>
        <h2>Last Name  : {data.onestudent.edges[0].node.lastName}</h2>
        <h2>Student ID : {data.onestudent.edges[0].node.student_id}</h2>
       
           <form onSubmit={(e)=>{e.preventDefault();handleSubmit(e);}}>
         <div className="-mx-4 flex flex-wrap">
                  <div >
                    <p>Payment Details</p>
                     <div className="mb-8" contentEditable="false">
                      <label htmlFor="studentid" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Student ID</label>
                      <input type="text" id="studentid" name="reference" value={formData.studentid} onChange={handleChange} placeholder="Enter Student ID " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference"  />
                     
                    </div>
                    <div className="mb-8" contentEditable="false">
                      <label htmlFor="date" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Payment Date</label>
                      <input type="text" id="date" name="date" value={formData.date.toString()} onChange={handleChange} placeholder="Enter Payment Date " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference" required />
                     
                    </div>
                    <div className="mb-8">
                      <label htmlFor="reference" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Payment Reference</label>
                      <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} placeholder="Enter Payment Reference " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference" required />
                     
                    </div>

                     <div className="mb-8">
                      <label htmlFor="email_id" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Email ID</label>
                      <input type="email" id="email_id" name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Enter your email ID" className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="email_id" required />
                     
                    </div>

                      <div className="mb-8">
                      <label htmlFor="amount" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter The Amount</label>
                      <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter amount in Rupees" className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="amount" required />
                     
                    </div>

                     <div className="w-full px-4">
                    <button type="submit" className="rounded-sm bg-black px-9  py-4 text-base font-medium text-white  hover:bg-[#701a75] dark:shadow-submit-dark">MAKE PAYMENT</button>
                  </div>
                  </div>
                  
            </div>
           </form>
        </div>
        :''}

    </div>
    
  )
}

export default CheckStudent;

