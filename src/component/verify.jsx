import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalState, setGlobalState, setMsgLoading, setAlert } from '../store';
import axios from 'axios';
import { verifyUser } from '../services/Blockchain';

const VerifyUser = () => {

  const [verifyModal] = useGlobalState('verifyModal');


  const [nationalId, setNationalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    if (!nationalId) {
      setError('Please enter your National ID.');
      return;
    }


    
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(`https://dummyjson.com/users/${nationalId}`);
      const data = response.data;
      function formatPhoneNumber(phoneNumber) {
        // Remove all non-digit characters using a regular expression
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        return formattedNumber;
      }
      if (data) {
      const newData = { _age: data.age, _nationalId: Number(formatPhoneNumber(data.ssn)),
         _phonenumber:formatPhoneNumber(data.phone),
          _firstName: data.firstName };
      
      console.log("..............",newData);
      verifyUser(newData);
        verify(data);
      } else {
        setError('User details not found.');
      }
    } catch (error) {
      setError('Error fetching user details.');
    } finally {
      setLoading(false);
    }
  };

  const verify = (userData) => {
    // Your verification logic here
    console.log('User Verified:', userData);
  };

  const closeToggle = () => {
    setGlobalState('verifyModal', 'scale-0');
    // resetForm();
  };

  return (

    // <div>
    // {/* <div className="bg-white p-4 rounded shadow-md">
    //   <h2 className="text-2xl font-bold mb-4">Verify User</h2>
    //   <div className="flex items-center mb-4">
    //     <input
    //       type="text"
    //       placeholder="Enter National ID"
    //       className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
    //       value={nationalId}
    //       onChange={(e) => setNationalId(e.target.value)}
    //     />
    //     <button
    //       className="bg-blue-500 text-white px-4 py-2 rounded-r"
    //       onClick={handleVerify}
    //       disabled={loading}
    //     >
    //       {loading ? 'Verifying...' : 'Verify'}
    //     </button>
    //   </div>
    //   {error && <p className="text-red-500 mb-4">{error}</p>}
    //   {userDetails && (
    //     <div>
    //       <p>
    //         <span className="font-semibold">Age:</span> {userDetails.age}
    //       </p>
    //       <p>
    //         <span className="font-semibold">First Name:</span> {userDetails.firstName}
    //       </p>
    //       <p>
    //         <span className="font-semibold">Phone Number:</span> {userDetails.phone}
    //       </p>
    //       <p>
    //         <span className="font-semibold">National ID:</span> {userDetails.ssn}
    //       </p>
    //     </div>
    //   )}
    // </div> */}

   
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-black bg-opacity-50 transform 
        transition-transform duration-300 ${verifyModal}`}
    >
         <div
        className="bg-white shadow-xl shadow-black w-11/12 md:w-2/5
            h-7/12 p-6 rounded-xl"
      >
        
        <div className="flex flex-col "> 
         <div className="flex justify-between items-center">
            <p className="font-semibold uppercase">Verify</p>
            <button
              type="button"
              onClick={closeToggle}
              className="border-0 bg-transparent 
                        focus:outline-none "
            >
              <FaTimes />
            </button>
          </div>
          <div
            className="flex justify-between items-center bg-gray-200 p-2 
                    rounded-xl mt-5"
          >
        <input
         type='number'
         placeholder='Enter National ID'
         className="block w-full bg-transparent border-0 text-sm
                        text-slate-800 focus:outline-none focus:ring-0 text-center"
         value={nationalId}
         onChange={(e) => setNationalId(e.target.value)}
         required
         />
         </div>
        <button className='flex justify-center items-center
                                shadow-lg shadow-black text-white bg-yellow-500
                                hover:bg-yellow-800 rounded-full mt-5 p-2 uppercase '
                                onClick={handleVerify}>
          Verify
        </button>
    </div>
    </div>
    </div>
    
  );
};

export default VerifyUser;
