import React, { useState } from 'react';
import axios from 'axios';

const VerifyUser = () => {
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

      if (data) {
        setUserDetails(data);
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

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify User</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter National ID"
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {userDetails && (
        <div>
          <p>
            <span className="font-semibold">Age:</span> {userDetails.age}
          </p>
          <p>
            <span className="font-semibold">First Name:</span> {userDetails.firstName}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span> {userDetails.phone}
          </p>
          <p>
            <span className="font-semibold">National ID:</span> {userDetails.ssn}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
