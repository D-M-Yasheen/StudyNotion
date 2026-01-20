import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginHandler = (event) => {
    setLoginInfo((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const loading = useSelector((state) => state.auth.loading);

  const submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = loginInfo;
    dispatch(login(email, password, navigate));
  };

  return (
    <div>
      <form className="w-full flex flex-col gap-5" onSubmit={submitHandler}>
        {/* Email */}
        <div>
          <label className="flex flex-col gap-1">
            <p className="text-sm font-normal text-richblack-5">
              Email Address
              <sup className="mx-[2px] text-pink-200 text-xs"> * </sup>
            </p>

            <input
              type="email"
              value={loginInfo.email}
              name="email"
              placeholder="Enter email address"
              onChange={(event) => loginHandler(event)}
              className="text-richblack-5 text-base p-3 border-b-2 border-richblack-400 bg-richblack-700 rounded-lg"
            />
          </label>
        </div>

        {/* Password */}
        <div>
          <label className="flex flex-col gap-1">
            <p className="text-sm font-normal text-richblack-5">
              Password
              <sup className="mx-[2px] text-pink-200 text-xs"> * </sup>
            </p>

            <div className="w-full flex relative ">
              <input
                type={showPassword ? "text" : "password"}
                value={loginInfo.password}
                name="password"
                placeholder="Enter Password"
                onChange={(event) => loginHandler(event)}
                className="w-full text-richblack-5 text-base p-3 border-b-2 border-richblack-400 bg-richblack-700 rounded-lg"
              />

              <div
                className="text-richblack-300 absolute right-3 top-[50%] -translate-y-[50%] bg-richblack-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}{" "}
              </div>

              {/* <div
                className="text-richblack-300 absolute bg-richblack-700
                                        right-3 top-[50%] -translate-y-[50%]"
                onClick={() => setShowPassword(true)}
              ></div> */}
            </div>
          </label>

          <div className="w-full flex justify-end mt-1">
            <NavLink to="/reset-password">
              <div className="w-fit flex justify-end selection:font-normal text-xs text-blue-100">
                Forgot password
              </div>
            </NavLink>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="text-richblack-900 w-full select-none mt-5
          rounded-lg bg-yellow-50 px-3 py-2 self-stretch
          text-center text-base font-medium shadow-inner
          transition-all duration-200
          hover:scale-95
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:bg-pure-greys-500
          disabled:hover:scale-100"
        >
          {"Sign in"}
        </button>
      </form>
    </div>
  );
};
