'use client'
import { Formik } from "formik";
import { useContext } from "react";
import Button from "../../../components/button/Button";
import { signupSchema } from "../../../schema/authSchema";
import AuthOverlay from "../../../components/authOverlay/authOverlay";
import { AuthContext } from "@/contexts/AuthContext";
import { EnvelopeIcon, LockIcon, SpinnerIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Input from "@/components/input/input";

export default function Signup() {
  const { signUp, loading } = useContext(AuthContext);
  
  return (
    <div className="h-screen flex justify-between  2xl:text-[16px] md:text-[14px]">
        
      <AuthOverlay />

      <div className="scroll flex items-center justify-center 2xl:w-[65%] xl:w-[70%] md:w-[65%] h-screen overflow-y-auto w-full md:px-0 px-6">
        <div className="flex flex-col justify-center 2xl:w-[600px] sm:w-[460px] md:mx-0 mx-auto h-full w-full">
          <div className="relative flex flex-col justify-center 2xl:gap-12 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-[24px] text-center">Create an account</h1>
              <p className="text-[#7C7E7E] font-medium text-center">Please enter your details</p>
            </div>

            <div className="flex items-center p-1 bg-gray-500/[0.05] rounded-[16px]">
              {
                ["Sign in", "Sign up"].map((item, index) => (
                  <Link 
                    key={index}
                    href={item === "Sign in" ? "/auth/login" : "/auth/signup"}
                    className={`w-full text-center py-[12px] rounded-[12px] font-medium 
                      ${item === "Sign up" ? "bg-white dark:bg-primary shadow-sm" : "text-gray-400" }`}
                  >
                    { item }
                  </Link>
                    ))
              }
            </div>

            <Formik
              initialValues={{ fullname: "", email: "", password: "" }}
              validationSchema={signupSchema}
              onSubmit={(values, { setSubmitting }) => {
                signUp({fullname: values.fullname, email: values.email, password: values.password});
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                  <Input
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    type="text"
                    leftIcon={<UserIcon weight="bold" size={20} color="currentColor" />}
                    error={touched.fullname ? errors.fullname : ""}
                    label="Full Name"
                  />
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    leftIcon={<EnvelopeIcon weight="bold" size={20} color="currentColor" />}
                    error={touched.email ? errors.email : ""}
                    label="Email Address"
                  />
                  <Input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    leftIcon={<LockIcon weight="bold" size={20} color="currentColor" />}
                    error={touched.password ? errors.password : ""}
                    label="Password"
                  />
                  <Button type="submit" className="w-full mt-4">
                    {isSubmitting || loading ? <SpinnerIcon color="white" className="animate-spin w-[20px]" /> : "Sign Up"}
                  </Button>
                </form>

              )}
            </Formik>

            <div className="flex justify-center gap-4 items-center">
              <Link href="/termsofuse" className="text-gray-200 hover:underline">
                Terms of Use
              </Link>
              <Link href="/privacypolicy" className="text-gray-200 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/privacysettings" className="text-gray-200 hover:underline">
                Privacy Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
