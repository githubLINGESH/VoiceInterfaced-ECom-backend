import React from 'react';
import { FunctionComponent ,useState, useEffect} from "react";
import Navbar from "../components/navbar";
import SideNavbar from "../components/sidenavbar";
import { useNavigate } from "react-router-dom";

const SignUpPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  const [isVoiceOption, setIsVoiceOption] = useState(false);
  // Add a useEffect hook to run code after component rendering
  useEffect(() => {
    // Select the signup button by its id
    const signupButton = document.getElementById("signupButton") as HTMLButtonElement;

    // Add an event listener to the button
    signupButton.addEventListener("click", () => {
      // Prevent multiple clicks by disabling the button
      signupButton.disabled = true;

      // Fetch input details
      const nameInput = document.getElementById("name") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwordInput = document.getElementById("pass") as HTMLInputElement;

      // Get input values using non-null assertion
      const name = nameInput.value!;
      const email = emailInput.value!;
      const password = passwordInput.value!;

      // Prepare the data to send to the server
      const data = {
        name,
        email,
        password,
      };

      // Make a POST request to your server to register the user
      fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Registration successful, handle accordingly
            alert("Registration successful!");
            navigate('login-page');
          } else {
            // Registration failed, handle accordingly
            alert("Registration failed. Please try again.");
          }

          // Re-enable the signup button
          signupButton.disabled = false;
        })
        .catch((error) => {
          console.error("Error:", error);

          // Re-enable the signup button
          signupButton.disabled = false;
        });
    });
  }, []);

  const handleSelectOption = (selectedOption: string | null) => {
    setSelectedOption(selectedOption);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
};

  const handleVoiceOption = () => {
    setIsVoiceOption(!isVoiceOption);
  }


  return (
    <div className="bg-gray-100 w-full h-full overflow-hidden text-left">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption}/>
        {/* form div */}
        {isSidebarVisible && (
          <div className="grid col-span-1 bg-whitesmoke-100">
            <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-2/4 h-3/4 bg-popup bg-gray-100 flex shadow-lg rounded-3xl">
            <div className="grid grid-cols-1 gap-4 m-4 p-4">
              <div className="col-span-1">
                <b className="text-21xl inline-block text-black w-[181px] h-[49px]">
                  SIGNUP
                </b>
              </div>

              <div className="col-span-1 px-6 py-4 relative">
                <input
                  className="ml-6 rounded-sm bg-white backdrop-filter-blur-md box-border w-full h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora pl-12"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                />
              </div>

              <div className="col-span-1 px-6 py-4 relative">
                <input
                  className="ml-6 rounded-sm bg-white backdrop-filter-blur-md box-border w-full h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora pl-12"
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Enter your Password"
                />
                <img
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  alt=""
                  src="/vector5.svg"
                />
              </div>

              <div className="col-span-1 px-6 py-4 relative">
                <input
                  className="ml-6 rounded-sm bg-white backdrop-filter-blur-md box-border w-full h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora pl-12"
                  type="password"
                  id="confirm-pass"
                  name="confirm-pass"
                  placeholder="Confirm Password"
                />
                <img
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  alt=""
                  src="/vector5.svg"
                />
              </div>

              <div className="col-span-1 px-6 py-4 relative">
                <input
                  className="ml-6 rounded-sm bg-white backdrop-filter-blur-md box-border w-full h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora pl-12"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name"
                />
              </div>

              <div className="col-span-1 px-6 py-4">
                <button
                  className="ml-6 rounded-11xl bg-darkslategray-100 w-[181px] h-[73px]"
                  id="signupButton"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white text-11xl font-sora">
                    Sign up
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};



export default SignUpPage;
