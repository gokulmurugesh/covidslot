"use client";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = ({ stateChanger, providers }) => {
  const { push } = useRouter();
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("No password provided."),
    }),
    onSubmit: async (values) => {
      setIsLoginButtonDisabled(true);
      //alert(JSON.stringify(values, null, 2));
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      if (status.error) {
        alert(status.error);
        setIsLoginButtonDisabled(false);
      } else stateChanger(false);
    },
  });

  const toggleLogin = () => {
    stateChanger(false);
  };

  const handleAdminLogin = () => {
    stateChanger(false);
    push("/admin/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
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
          <input type="submit" className="hidden" />
          <div className="flex items-center justify-between mb-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${isLoginButtonDisabled ? 'opacity-30' : ''}`}
              type="submit"
              disabled={isLoginButtonDisabled}
            >
              Log In
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={toggleLogin}
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center">
            {providers &&
              Object.values(providers).map(
                (provider) =>
                  provider.name == "Google" && (
                    <>
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        className="outline_btn mb-2"
                      >
                        Sign in with Google
                      </button>
                    </>
                  )
              )}
          </div>
          <div className="text-right mt-4">
            <button
              className="text-sm text-blue-800 underline"
              onClick={handleAdminLogin}
            >
              Admin? Click here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
