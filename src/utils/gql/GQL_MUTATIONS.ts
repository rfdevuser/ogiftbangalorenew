// // mutations.js

 import { gql } from '@apollo/client';

// export const ADD_ADMISSION_MUTATION = gql`
// mutation MyMutation($input: formData!)  {
 
//   addadmissionmutation(
//     input: {
//       firstName: "John",
//       lastName: "Doe",
//       phoneNumber: "1234567890",
//       email: "john.doe@example.com",
//       courseInterest: "Computer Science",
//       startDate: "2024-06-01",
//       state: "California",
//       currentStatus: "Pending"
//     }
//   ) {
//     testoutput
//   }
// }

// `;
// mutations.js
export const ADD_ADMISSION_MUTATION = gql`
  mutation AddAdmission(
    $firstName: String!,
    $lastName: String!,
    $phoneNumber: String!,
    $email: String!,
    $courseInterest: String!,
    $startDate: String!,
    $state: String!,
    $currentStatus: String!,
    $fathers_name:String!,
    $mothers_name:String!,
    $current_address:String!,
    $aadhar_number:String!,
    $religion:String!,
    $gender:String!,
    $mother_tongue:String!,
    $payment_status:String!,
    $course_type:String!,
    $student_id:String!
  ) {
    addadmissionmutation(
      input: {
        firstName: $firstName,
        lastName: $lastName,
        phoneNumber: $phoneNumber,
        email: $email,
        courseInterest: $courseInterest,
        startDate: $startDate,
        state: $state,
        currentStatus: $currentStatus,
        fathers_name:$fathers_name,
        mothers_name:$mothers_name,
        current_address:$current_address,
        aadhar_number:$aadhar_number,
        religion:$religion,
        gender:$gender,
        mother_tongue:$mother_tongue,
        payment_status:$payment_status,
        course_type:$course_type,
        student_id:$student_id
      }
    ) {
      testoutput
    }
  }
`;

export const ADD_STUDENT_PAYMENT_MUTATION = gql`
  mutation AddStudentPayment(
    $student_id: String!,
    $payment_amount: String!,
    $payment_date: String!,
    $email_id: String!,
  
  ) {
    addstudentpaymentmutation(
      input: {
        student_id: $student_id,
        payment_amount: $payment_amount,
        payment_date: $payment_date,
        email_id: $email_id,
    
      }
    ) {
      testoutput
    }
  }
`;

export const ADD_OGIFT_APP_DOWNLOAD_MUTATION = gql`
  mutation addogiftappdownloadmutation(
    $name: String!,
    $email: String!,
    $phone: String!,
    
  
  ) {
    addogiftappdownloadmutation(
      input: {
        name: $name,
        email: $email,
        phone: $phone,
        
    
      }
    ) {
      testoutput
    }
  }
`;


export const ADD_STUDENT_CONTACT_MUTATION = gql`
  mutation AddStudentContact(
    $name: String!,
    $email: String!,
    $contact: String!
  ) {
    addstudentcontactmutation(input: {
      name: $name,
      email: $email,
      contact: $contact
    }) {
      testoutput
    }
  }
`;
