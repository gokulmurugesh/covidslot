"use client";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Signup = ({ setIsSignupOpen, setIsLoginOpen }) => {
  const [result, setResult] = useState("");

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/[A-Za-z\d@$!%*#?&]/, 'Password can only contain letters, numbers and symbols.'),  
      cpassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("http://localhost:3000/signup/api", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) printResult(data.error);
          else {
            setIsSignupOpen(false);
            setIsLoginOpen(true)
          }
        });
    },
  });

  const printResult = (text) => {
    setResult(text);
  };

  const toggleSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sign up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder="Enter your First Name"
              {...formik.getFieldProps("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="text-sm text-red-400">
                {formik.errors.firstname}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder="Enter your Last Name"
              {...formik.getFieldProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-sm text-red-400">
                {formik.errors.lastname}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-400">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-400">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cpassword"
              type="password"
              placeholder="Enter your password again"
              {...formik.getFieldProps("cpassword")}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <div className="text-sm text-red-400">
                {formik.errors.cpassword}
              </div>
            ) : null}
          </div>
          <input type="submit" className="hidden" />
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={toggleSignup}
            >
              Cancel
            </button>
          </div>
          <div className="items-center">
            <p className="text-green-300">{result}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;