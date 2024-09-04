

import React, { useState } from "react";
import {
  Reviews,
  GetReviews,
} from "./sections/index.js";

import Nav from "./components/Nav.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnalyticsDashboard from "./sections/Analytics.jsx";
import EditReviews from "./sections/EditReviews.jsx";
import GetReviewsEmail from "./sections/getReviewEmail.jsx";
import SynXPlusReviewRequest from "./sections/getReviewWattsapp.jsx";
import Integrations from "./sections/Integrations.jsx";
import Signup from "./sections/auth/Signup.jsx";
import EnhancedLogin from "./sections/auth/Login.jsx";
import ForgotPasswordPage from "./sections/auth/ForgotPassword.jsx";
import OTPVerificationPage from "./sections/auth/Otp.jsx";


const App = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  return (
    <main className="relative">
      <Router>
        <Routes>
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/GetReviews" element={<GetReviews />} />
          <Route path="/GetReviews/email" element={<GetReviewsEmail />} />
          <Route
            path="/GetReviews/whatsapp"
            element={<SynXPlusReviewRequest />}
          />
          <Route path="/EditReviews" element={<EditReviews />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<EnhancedLogin />} />
          <Route path="/forgorPassword" element={<ForgotPasswordPage />} />
          <Route path="/OTPVerificationPage" element={<OTPVerificationPage />} />
          {/* Add routes for SignIn/SignUp or display based on condition */}

        </Routes>
      </Router>

      {/* Commented sections for future use */}
      {/* 
      <section className="xl:padding-1 wide:padding-r padding-b"><Hero /></section>
      <section className="padding"><PopularProducts /></section>
      <section className="padding"><SuperQuality /></section>
      <section className="padding"><Services /></section>
      <section className="padding"><SpecialOffer /></section>
      <section className="bg-pale-blue padding"><CustomerReview /></section>
      <section className="padding-x sm:py-32 py-16 w-full"><Subscribe /></section>
      <section className="bg-black padding-x padding-y"><Footer /></section> 
      */}
    </main>
  );
};

export default App;

