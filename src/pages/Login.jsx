import { useMutation } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import Button from "../components/Form/Button";
import InputFeald from "../components/Form/InputFeald";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AuthStore from "../store/AuthStore";
import { PAGE_TRANSITION_VARIANT } from "../framerMotion/variants";

const initialValue = { email: "", password: "" };

function signInReq(credentials) {
  return api.post("/auth/login", credentials);
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    mutate: signIn,
    error: signInError,
    reset,
  } = useMutation({
    mutationFn: signInReq,
    onSuccess(res) {
      const data = res.data;
      AuthStore.storeTokens({
        authToken: data.token?.accessToken,
        refreshToken: data.token?.refreshToken,
        userId: data.user?.id,
      });
      navigate(from, { replace: true });
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValue });

  function onSubmit(values) {
    signIn(values);
  }

  useDocumentTitle("Login | React Blogify");
  return (
    <m.main
      variants={PAGE_TRANSITION_VARIANT}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <section className="container">
        {/* <!-- Login Form into a box center of the page --> */}
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Login</h2>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            onChange={() => signInError && reset()}
          >
            {signInError && (
              <div className="p-4 mb-5 font-bold bg-red-300 rounded text-dark">
                {signInError?.response?.data?.error || signInError.message}
              </div>
            )}
            <InputFeald
              label="Email"
              type="email"
              name="email"
              register={register}
              validationSchima={{
                required: "Please provide the email you signed up with",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{1,4}$/,
                  message: "Must be a valid email address",
                },
              }}
              error={errors.email?.message}
            />
            <InputFeald
              label="Password"
              type="password"
              name="password"
              register={register}
              validationSchima={{ required: "Please provide your password" }}
              error={errors.password?.message}
            />
            <CheckBox />
            <div className="mb-6">
              <Button label="Login" type="submit" />
            </div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </m.main>
  );
}

export default Login;

function CheckBox() {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("persistLoging")) || false
  );

  useEffect(() => {
    localStorage.setItem("persistLoging", JSON.stringify(checked));
  }, [checked]);

  return (
    <div className="flex mb-6">
      <div className="flex items-center h-5">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          checked={checked}
          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-600"
          onChange={() => setChecked((c) => !c)}
        />
      </div>
      <div className="text-sm ms-2">
        <label
          htmlFor="helper-checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          Trust this device
        </label>
        <p
          id="helper-checkbox-text"
          className="text-xs font-normal text-gray-500 dark:text-gray-300"
        >
          If this is checked your login will be saved(contain security risks)
        </p>
      </div>
    </div>
  );
}
