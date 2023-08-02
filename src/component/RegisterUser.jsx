import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalState, setGlobalState, setMsgLoading, setAlert } from '../store';
import {  registerUser, verifyUser } from '../services/Blockchain';

const RegisterUser = () => {
  const [registerModal] = useGlobalState('registerModal');



  const [phonenumber, setPhonenumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !nationalId || !phonenumber || !firstName) return;
    setGlobalState('registerModal', 'scale-0');
    setMsgLoading('registration in progress...');

    try {
      setMsgLoading(`Adding ${firstName} in progress...`);
     

      const newData = { _age: age, _nationalId: nationalId, _phonenumber: phonenumber, _firstName: firstName };

      const result = await registerUser(newData);
    //   const 
      console.log(newData);
      if (result === true) {
        setAlert(`registeration Successfully ${firstName} ...`);
      } else {
        setAlert('registration Failed', 'red');
      }

      //   navigateTo('/CandidatePage')
      closeToggle();
    } catch (error) {
      console.log('Error Minting Asset: ', error);
      setAlert(error.message, 'red');
    }
  };

  const closeToggle = () => {
    setGlobalState('registerModal', 'scale-0');
    resetForm();
  };



  const resetForm = () => {
   
    setAge('');
    setPhonenumber('');
    setFirstName('');
    setNationalId('');
  };


  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-black bg-opacity-50 transform 
        transition-transform duration-300 ${registerModal}`}
    >
      <div
        className="bg-white shadow-md shadow-slate w-11/12 md:w-2/5
            h-7/12 p-6 rounded-md"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold uppercase">Register</p>
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
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-md mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-500 focus:outline-none focus:ring-0 text-center"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-md mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-500 focus:outline-none focus:ring-0 text-center"
              type="number"
              placeholder="Enter your age"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-md mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-500 focus:outline-none focus:ring-0 text-center"
              type="text"
              placeholder="Enter your National Identity Number"
              name="nationalId"
              onChange={(e) => setNationalId(e.target.value)}
              value={nationalId}
              min={0.01}
              step={0.01}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300 p-2 
                    rounded-md mt-5"
          >
            <input
              className="block w-full bg-transparent border-0 text-sm
                        text-slate-500 focus:outline-none focus:ring-0
                        text-center"
              type="number"
              placeholder="Enter your Phone Number"
              name="nationalId"
              onChange={(e) => setPhonenumber(e.target.value)}
              value={phonenumber}
              step={1}
              required
            />
          </div>
          <button
            className="
            flex justify-center items-center
            shadow-md shadow-slate-500 text-white bg-yellow-500
            transition ease-in duration-200
            hover:bg-yellow-800 rounded-md text-bold mt-5 p-2 uppercase"
          >
            {' '}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
