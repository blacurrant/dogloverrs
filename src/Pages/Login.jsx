import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userNew = result.user;
      console.log(userNew);
      setUserData(userNew);
      userNew && navigate('/Home');
      return userNew;
    } catch (error) {
      console.error(error.message);
      throw error;
    }

  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center drop-shadow-lg bg-yellow-200">
      <div className="h-fit w-fit text-2xl px-10 py-10 flex flex-col items-center justify-center gap-24 border border-gray-900  rounded-md drop-shadow-sm">
        <div className="space-y-5">
            <div className="w-full h-fit flex items-end justify-end">
                <Link to="/">
                    <ImCross />
                </Link>
            </div>
            <p className="text-5xl font-light">doglovers.</p>
            <h2 className="text-5xl font-semibold">Sign in with google</h2>
        </div>
        <div className="w-full flex flex-col gap-1">
          <button
            className="flex gap-2 font-light
                 items-center justify-center py-2 appearance-none border border-gray-900 w-full rounded-md bg-black text-yellow-200 hover:bg-yellow-200 hover:text-black
                 "
            onClick={handleAuth}
          >
            Login <BiLogInCircle />
          </button>
          <Link className="text-left w-full text-lg font-light hover:underline">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
