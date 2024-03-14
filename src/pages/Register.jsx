import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import InputFeald from "../components/Form/InputFeald";
import Button from "../components/Form/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { PAGE_TRANSITION_VARIANT } from "../framerMotion/variants";

const initialValue = { firstName: "", lastName: "", email: "", password: "" };

async function sendRegReq(newUserData) {
  return api.post("/auth/register", newUserData);
}

function Register() {
  const navigate = useNavigate();
  const {
    error: signUpError,
    mutate: signUp,
    isPending,
    reset,
  } = useMutation({
    mutationFn: sendRegReq,
    onSuccess() {
      navigate("/login");
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValue });

  function onSubmit(data) {
    signUp(data);
  }

  useDocumentTitle("Register | React Blogify");
  return (
    <m.main
      variants={PAGE_TRANSITION_VARIANT}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Register</h2>
          <form
            action=""
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => signUpError && reset()}
            noValidate
          >
            {signUpError && (
              <div className="p-4 mb-5 font-bold bg-red-300 rounded text-dark">
                {signUpError?.response?.data?.error || signUpError.message}
              </div>
            )}
            <InputFeald
              label="First Name"
              type="text"
              name="firstName"
              register={register}
              validationSchima={{
                required: "Must provide your firstname",
                maxLength: {
                  value: 20,
                  message: "Isn't it too big for a name?",
                },
              }}
              error={errors.firstName?.message}
            />
            <InputFeald
              label="Last Name"
              type="text"
              name="lastName"
              register={register}
              validationSchima={{
                required: "Must provide your lastname",
                maxLength: {
                  value: 20,
                  message: "This can't be that big!!!!",
                },
              }}
              error={errors.lastName?.message}
            />
            <InputFeald
              label="Email"
              type="email"
              name="email"
              register={register}
              validationSchima={{
                required: "Email is required",
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
              validationSchima={{
                required: "Must provide a secure password",
                minLength: {
                  value: 6,
                  message: "Password must be at last 6 cherecter long",
                },
              }}
              error={errors.password?.message}
            />
            <div className="mb-6">
              <Button
                isLoading={isPending}
                type="submit"
                label="Create Account"
              />
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </m.main>
  );
}

export default Register;
