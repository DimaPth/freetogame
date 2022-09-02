import React, { FC, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();
  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            username: user.displayName,
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <SignUpForm type="login" handleClick={handleLogin} error={error} />
    </div>
  );
};

export default Login;
