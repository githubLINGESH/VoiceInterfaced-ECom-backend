import React from 'react';
import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const Userinfo: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-[400px] relative">
        <button
          className="absolute top-4 right-4 text-darkslategray-100 cursor-pointer"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col items-center mb-8">
          <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-600 mb-4" />
          <h1 className="text-3xl font-semibold text-darkslategray-100">User Info</h1>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-light text-gray-700 mb-2">User Name</label>
          <div className="flex items-center rounded-lg bg-whitesmoke-100 border border-darkslategray-300 p-2">
            <FontAwesomeIcon icon={faUser} className="text-xl text-gray-500 mr-2" />
            <span className="text-xl font-light text-darkslategray-100">userrr</span>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-light text-gray-700 mb-2">Email</label>
          <div className="flex items-center rounded-lg bg-whitesmoke-100 border border-darkslategray-300 p-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl text-gray-500 mr-2" />
            <span className="text-xl font-light text-darkslategray-100">Emailll@123</span>
          </div>
        </div>
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
