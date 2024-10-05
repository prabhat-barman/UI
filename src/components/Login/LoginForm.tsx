import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Define the types for form values
interface LoginFormValues {
  email: string;
  password: string;
  captcha: string; // Add captcha field
}

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  captcha: Yup.string().required("Please enter the CAPTCHA"),
});

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const LoginForm: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    captcha: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaError, setCaptchaError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaError(""); // Reset CAPTCHA error when refreshing
  };

  return (
    <div className="w-full h-full max-w-5xl flex flex-col justify-center items-center rounded-lg">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md border-2 border-[#45D2F5] flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back!</h2>
        <p className="text-start mb-6">
          Sign in with your email address and password.
        </p>

        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: LoginFormValues,
            { setSubmitting }: FormikHelpers<LoginFormValues>
          ) => {
            if (values.captcha !== captcha) {
              setCaptchaError("Incorrect CAPTCHA. Please try again.");
              setSubmitting(false);
              return;
            }
            console.log("Form data", values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="w-full">
              {/* Email Field */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* CAPTCHA Field */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-center text-xl">
                  {captcha}
                </label>
                <Field
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder="Enter CAPTCHA"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="captcha"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {captchaError && (
                  <div className="text-red-500 text-sm mt-1">
                    {captchaError}
                  </div>
                )}
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-blue-600 underline mt-1"
                >
                  Refresh CAPTCHA
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end mb-4">
                <a href="/reset-password" className="text-sm text-blue-600">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className={`w-full text-white font-bold py-2 px-4 rounded-lg ${
                  isSubmitting || !isValid || !dirty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Terms of Service */}
              <p className="text-center text-sm text-gray-500 mt-4">
                By logging in you agree to the{" "}
                <a href="#" className="text-blue-500">
                  terms of service
                </a>
                .
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
