'use client'
import React,{useState} from 'react'
import { GET_STUDENT } from '@/utils/gql/GQL_QUERIES'
import {useQuery} from "@apollo/client";

import Script from 'next/script';
import PaymentPage from './payments';
import emailjs from 'emailjs-com';





function RegistrationPage ()
{
    const [formData, setFormData] = useState({

    studentid:'',
    date:new Date(),
    amount : 0.00,
    reference : '',
    email_id : '',

  });
  var [mflag, SetFlag] = useState(false)


const handleChange = (e) => 
{
 setFormData({ ...formData, [e.target.name]: e.target.value });
}

const SendRegistrationMessage = () => {
    var templateParams = {
      from_name: 'Onati Global Institue of Fashion Technology (OGIFT)',
      to_name: "Mickee",
      to_email:"mickee@rakhisfashions.com",
      message:" This is to let you know that "+formData.studentid+" is registering today. "
    }

    emailjs.send('service_08elaj3', 'template_phdbp4n', templateParams,'user_QBs08JbvqdXivIagZeWFH')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });


      return
  }
  
const handleSubmit = (e) => {
 SetFlag(true)
 SendRegistrationMessage()
}

if(mflag)
{
  return <PaymentPage formdata={formData}/>
}


 
  return (
    <div>
    
 
        
        <div>
        
           <form onSubmit={(e)=>{e.preventDefault();handleSubmit(e);}}>
           <div >
                  <div className="mx-auto w-full max-w-lg p-16 pt-60">
                    <p>Payment Details</p>
                     <div className="mb-8">
                      <label htmlFor="studentid" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Name</label>
                      <input type="text" id="studentid" name="studentid" value={formData.studentid} onChange={handleChange} placeholder="Enter your name " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference" required />
                     
                    </div>
                    <div className="mb-8" contentEditable="false">
                      <label htmlFor="date" className="mb-3 block text-sm font-medium text-dark dark:text-white">Payment Date</label>
                      <input type="text" id="date" name="date" value={formData.date.toString()} onChange={handleChange} placeholder="Enter Payment Date " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference" required />
                     
                    </div>
                    <div className="mb-8">
                      <label htmlFor="reference" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Payment Reference</label>
                      <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} placeholder="Enter Payment Reference " className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="reference" required />
                     
                    </div>

                     <div className="mb-8">
                      <label htmlFor="email_id" className="mb-3 block text-sm font-medium text-dark dark:text-white">Enter Phone Number</label>
                      <input type="text" id="email_id" name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Enter your phone number" className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none" autoComplete="email_id" required />
                     
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
        

    </div>
    
  )
}

export default RegistrationPage;

