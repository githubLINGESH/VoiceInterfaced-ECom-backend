import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUpPage from "./pages/sign-up-page";
import LoginPage from "./pages/login-page";
import Desktop4 from "./pages/About-page";
import Desktop3 from "./pages/productView-page";
import Desktop2 from "./pages/cart-page";
import Desktop1 from "./pages/home";
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
      case "/about":
        title = "";
        metaDescription = "";
        break;
      case "/product":
        title = "";
        metaDescription = "";
        break;
      case "/cart":
        title = "";
        metaDescription = "";
        break;
      case "/home":
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
      <Route path="/about" element={<Desktop4 />} />
      <Route
          path="/product/:productId"
          element={<Desktop3 />} // No need to pass productId here
        />
      <Route path="/cart" element={<Desktop2 />} />
      <Route path="/home" element={<Desktop1 />} />
    </Routes>
    
  );
}
export default App;


//for production - "start": "serve -s build",