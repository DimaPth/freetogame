import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { setUser } from "../redux/slices/userSlice";

const Register: FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  const handleRegister = (
    email: string,
    password: string,
    username?: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            username: user.displayName,
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        updateProfile(user, {
          displayName: username,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <SignUpForm type="register" handleClick={handleRegister} error={error} />
    </div>
  );
};

export default Register;
