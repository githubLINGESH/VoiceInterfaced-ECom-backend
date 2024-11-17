import React from 'react';
import { FunctionComponent ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();


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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
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
            response.json().then((data) => {
              console.log(data.userId);console.log("Login button clicked");
              navigate('/home', { state: { userId: data.userId } }); // Pass userId in state
            });
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

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 w-full h-full overflow-hidden xt-left">
    <div className="py-4 bg-darkslategray-100 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
      <div className="flex items-center justify-center">
      <img src="plugin-icon--1-1-1@2x.png">
      </img>
      </div>
    </div>
    <div className="md:w-7/12 w-full flex items-center justify-center py-6 min-h-screen">
      <div className="w-full md:w-3/4 bg-gray-100 flex shadow-lg rounded-3xl">
        <div className="grid grid-cols-1 gap-4 p-4 w-full">
          <div className="col-span-1 text-center">
            <b className="text-5xl inline-block text-black font-sora">LOGIN WITH YOUR ACCOUNT</b>
          </div>

          <div className="col-span-1 px-6 py-4 relative">
            <input
              className="rounded-sm bg-white w-full h-16 border border-solid border-silver text-lg text-darkslategray-100 font-sora pl-4"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
          </div>

          <div className="col-span-1 px-6 py-4 relative">
            <input
              className="rounded-sm bg-white w-full h-16 border border-solid border-silver text-lg text-darkslategray-100 font-sora pl-4"
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


          <div className="col-span-1 px-6 py-4 text-center">
            <button
              className="rounded-2xl bg-darkslategray-100 h-16 w-full"
              id="loginButton"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <div className="text-white text-xl font-sora">Login</div>
            </button>

            <div className="px-2 py-4 text-black font-sora text-xl">
                <p>Don't have an Account <a style={{color:"darkslategray"}}
                className="px-2" href="/"> Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-5/12 w-full hidden md:flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: 'url("NewAI.jpg")',
      }}/>
  </div>
  );
};

export default LoginPage;
