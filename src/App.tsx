import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUpPage from "./pages/sign-up-page";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home";
import AboutPage from "pages/About-page";
import ProductView from "pages/productView-page";
import Cart from "pages/cart-page";
import AddProducts from "pages/AddProducts";
import VoicePage from "pages/voiceInterface/voiceinterface";
import SearchPage from "pages/searchResults";
import AdminDashboard from "pages/AdminDashboard";
import { AuthProvider } from "context/AuthContext";
import PrivateRoute from "components/privateRoute";
import { useEffect } from "react";

import React from "react";


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
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Private Routes (Protected) */}
        <Route path="/product/:productId" element={
          <PrivateRoute>
            <ProductView />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/addProducts" element={
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        } />
        <Route path="/voice-com" element={
          <PrivateRoute>
            <VoicePage />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;


//for production - "start": "serve -s build",