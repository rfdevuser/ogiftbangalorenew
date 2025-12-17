'use client'
import React,{use, useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_STUDENT_PAYMENT_MUTATION} from '@/utils/gql/GQL_MUTATIONS';
import Script from 'next/script';
import { RazorpayCheckout } from '@/components/RazorpayCheckout';


declare global {
  interface window{
    Razorpay:any;
    
  }
 
}





const PaymentPage = (formdata:any) => {
  const [submitForm, { loading, error }] = useMutation(ADD_STUDENT_PAYMENT_MUTATION);

   const [insertform, setFormData] = useState({
    student_id:'',
    payment_amount:'',
    payment_date:'',
    email_id: ''
    
  });

  const handleInsert = async () => {
  
   
    try {
      
      const { data } = await submitForm({ variables: insertform });
      
      console.log('Form submitted successfully:', data.submitForm);
      
      alert('Payment Details Captured!');
      setFormData({
       student_id:'', 
       payment_amount:'',
       payment_date:'',
       email_id: ''
     
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Error submitting form. Please try again later.');
    }
  };
  insertform.student_id = formdata.formdata.studentid;
  insertform.payment_amount = formdata.formdata.amount
  insertform.payment_date = formdata.formdata.date
  insertform.email_id = formdata.formdata.email_id

  // console.log(formdata.formdata.amount)
  const AMOUNT = formdata.formdata.amount
  const [isProcessing, setIsProcessing] = useState(false)

  
  
  const handleCancel = () => {
    window.history.back()
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const data = await fetch("/api/create-order",{method: "POST"})
      // const data = await response.json();

      const options = {
        key : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name:"Rakhis Fashions",
        description:formdata.formdata.reference,
        
        handler : function (response:any){
          console.log("payment successfull",response)
          handleInsert()
        },
        prefill:{
          name:"john Doe",
          email:formdata.formdata.email_id,
          contact:"999999999",
        },
        theme:{
          color:"#3399cc",
        }
      };
      const rzp1 = new (window as any).Razorpay(options)
      rzp1.open()
    }catch(error){
      console.error("payment failed",error)
      
    } finally {
      setIsProcessing(false)
      
      window.history.back()
    }
  }

  return (
    <div className = "flex items-center justify-center  bg-gray-100 ">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <div className="p-10 bg-white rounder-lg shadow-md" style={{width:300}}>
        <h1 className="text 2xl font-bold mb-4">Payments Page</h1>
        <p className="mb-4">Amount to pay :{AMOUNT} INR</p>
        {/* <button 
        onClick={handlePayment}
        disabled={isProcessing}
        className="px-4 py-2 bg-blue-500 text-white rounded bover:bg-blue-600 disabled:bg-gray-400">
        {isProcessing ? "processing..." : "Pay Now"}
        </button> */}
        <RazorpayCheckout
                amount={AMOUNT}
                name={formdata.student_id}
                description="Course Payment"
                buttonText="Make Payment"
                onSuccess={(res) => {console.log("Payment success:", res);handleInsert()}}
                onFailure={(err) => console.error("Payment failed:", err)}
                className="h-11"
              />
         <button 
        onClick={handleCancel}
       
        className="h-11">
        CANCEL
        </button>
      </div> 
       
      
    </div>

  )
}

export default PaymentPage
