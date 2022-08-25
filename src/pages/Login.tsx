import React, { FC } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const Login: FC = () => {
  return (
    <div className="container">
      <SignUpForm type="login" />
    </div>
  );
};

export default Login;
