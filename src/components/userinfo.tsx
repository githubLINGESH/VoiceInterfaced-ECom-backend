import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const Userinfo: FunctionComponent<{ onClose: () => void;}> = ({ onClose}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getUserInfo`,
          {
            method:"GET",
            credentials: 'include',
          })

        const data = await response.json();
        setUser(data);
        setIsAdmin(data.email === 'lingesh2522004@gmail.com'); // Check for admin email
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const NavigateAdmin = () => {
    navigate("/admin/");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-[400px] relative">
        <button className="absolute top-4 right-4 text-darkslategray-100 cursor-pointer" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col items-center mb-8">
          <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-600 mb-4" />
          <h1 className="text-3xl font-semibold text-darkslategray-100">User Info</h1>
        </div>
        {user && (
          <>
            <div className="mb-6">
              <label className="block text-lg font-light text-gray-700 mb-2">User Name</label>
              <div className="flex items-center rounded-lg bg-whitesmoke-100 border border-darkslategray-300 p-2">
                <FontAwesomeIcon icon={faUser} className="text-xl text-gray-500 mr-2" />
                <span className="text-xl font-light text-darkslategray-100">{user.name}</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-light text-gray-700 mb-2">Email</label>
              <div className="flex items-center rounded-lg bg-whitesmoke-100 border border-darkslategray-300 p-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl text-gray-500 mr-2" />
                <span className="text-xl font-light text-darkslategray-100">{user.email}</span>
              </div>
            </div>
            {isAdmin && (
              <div className="mb-6">
                <button className="w-full py-3 bg-blue-500 text-white rounded-lg" onClick={NavigateAdmin}>
                  Admin Dashboard
                </button>
              </div>
            )}
          </>
        )}
        <div className="flex justify-center">
          <button className="flex items-center justify-center rounded-lg bg-darkslategray-200 text-white w-full py-3 text-xl font-light">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
