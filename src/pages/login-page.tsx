import React from 'react';
import { FunctionComponent ,useEffect, useState} from "react";
import Navbar from "../components/navbar";
import SideNavbar from "../components/sidenavbar";
import { useNavigate } from "react-router-dom";

const LoginPage: FunctionComponent = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  const [isVoiceOption, setIsVoiceOption] = useState(false);
  const navigate = useNavigate();

  const handleSelectOption = (selectedOption: string | null) => {
    setSelectedOption(selectedOption);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    // Select the signup button by its id
    const loginButton = document.getElementById("loginButton") as HTMLButtonElement;

    // Add an event listener to the button
loginButton.addEventListener("click", () => {
      // Prevent multiple clicks by disabling the button
      loginButton.disabled = true;

      // Fetch input details
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwordInput = document.getElementById("pass") as HTMLInputElement;

      // Get input values using non-null assertion
      const email = emailInput.value!;
      const password = passwordInput.value!;

      // Prepare the data to send to the server
      const data = {
        email,
        password,
      };

      // Make a POST request to your server to register the user
      fetch("http://localhost:3001/user/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Registration successful, handle accordingly
            alert("Login successful!");
            navigate('/home');
          } else {
            // Registration failed, handle accordingly
            alert("Login failed. Please try again.");
          }
          // Re-enable the signup button
          loginButton.disabled = false;
        })
        .catch((error) => {
          console.error("Error:", error);

          // Re-enable the signup button
          loginButton.disabled = false;
        });
    });
  }, []);

  const handleVoiceOption = () =>{
    setIsVoiceOption(!isVoiceOption);
  }

  return (
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-xl text-white font-inter">
        <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption}/>
        {/* form div */}
        {isSidebarVisible && (
          <div className="grid col-span-1 bg-whitesmoke-100">
            <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
          </div>
        )}
      <div className="absolute top-[155px] left-[169px] w-[1309px] h-[628px] text-9xl text-darkslategray-100 font-sora">
        <b className="absolute top-[163px] left-[0px] text-21xl inline-block text-black w-[146px] h-[49px]">
          LOGIN
        </b>
        
        <input className="absolute top-[371px] left-[0px] rounded-sm bg-white [backdrop-filter:blur(8px)] box-border w-[592px] h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora"
        type="password"
        id="pass"
        name="pass"
        placeholder="Enter your Password">

        </input>

        <button className="absolute top-[514px] left-[0px] rounded-11xl bg-darkslategray-100 w-[181px] h-[73px]"
        id="loginButton"
        style={{
          textDecoration: "none", // Remove underline
          color: "inherit",
          cursor: "pointer", // Change cursor on hover
        }}>
        <div className="absolute top-[17px] left-[44px] text-white text-11xl font-sora">
          Login
        </div>
        </button>

        <img
          className="absolute h-[5.41%] w-[3.51%] top-[61.94%] right-[56.15%] bottom-[32.64%] left-[40.34%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/vector5.svg"
        />

        <input className="absolute top-[263px] left-[0px] rounded-sm bg-white [backdrop-filter:blur(8px)] box-border w-[592px] h-[70px] border-[1px] border-solid border-silver text-9xl text-darkslategray-100 font-sora"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email Id">
        </input>
      </div>
    </div>
  );
};

export default LoginPage;
