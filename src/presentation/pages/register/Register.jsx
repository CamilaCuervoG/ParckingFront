// src/pages/Register/Register.jsx
import React from "react";
import SidebarStart from "../../components/layout/sidebar/sidebarStart/SidebarStart";
import RegisterForm from "../../components/ui/form/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <>
      <SidebarStart />
      <div className="register-container">
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
