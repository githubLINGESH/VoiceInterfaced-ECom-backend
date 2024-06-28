import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUpPage from "./pages/sign-up-page";
import LoginPage from "./pages/login-page";
import Userinfo from "./pages/userinfo";
import Desktop4 from "./pages/desktop4";
import Desktop3 from "./pages/desktop3";
import Desktop2 from "./pages/desktop2";
import Desktop1 from "./pages/desktop1";
import { useEffect } from "react";

import React from "react";
import ReactDOM from "react-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
        {/* Other routes */}
        <Route
          path="/desktop-3/:productId"
          element={<Desktop3 />} // No need to pass productId here
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login-page":
        title = "";
        metaDescription = "";
        break;
      case "/userinfo":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-4":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-3":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-2":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-1":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/userinfo" element={<Userinfo />} />
      <Route path="/desktop-4" element={<Desktop4 />} />
      <Route
          path="/desktop-3/:productId"
          element={<Desktop3 />} // No need to pass productId here
        />
      <Route path="/cart" element={<Desktop2 />} />
      <Route path="/desktop-1" element={<Desktop1 />} />
    </Routes>
    
  );
}
export default App;
