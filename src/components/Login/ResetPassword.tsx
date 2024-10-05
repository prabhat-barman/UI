import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// Define the types for form values
interface ResetPasswordValues {
  email: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPassword: React.FC = () => {
  const initialValues: ResetPasswordValues = {
    email: "",
  };

  return (
    <div className="w-full h-full max-w-5xl flex flex-col justify-center items-center rounded-lg">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md border-2 border-[#45D2F5] flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Your Password!
        </h2>
        <p className="text-start mb-6">
          Enter your email address to receive a link to confirm your account
        </p>

        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: ResetPasswordValues,
            { setSubmitting }: FormikHelpers<ResetPasswordValues>
          ) => {
            console.log("Form data", values);
            // Here you would typically handle the form submission, e.g., send a reset link to the email
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
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              {/* Terms of Service */}
              <p className="text-center text-sm text-gray-500 mt-4">
                By proceeding, you agree to the{" "}
                <button
                  onClick={() => {
                    /* Handle terms of service click */
                  }}
                  className="text-blue-500 underline cursor-pointer"
                >
                  terms of service
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
