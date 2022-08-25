import React, { FC } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const Register: FC = () => {
  return (
    <div className="container">
      <SignUpForm type="register" />
    </div>
  );
};

export default Register;
