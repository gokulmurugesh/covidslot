"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  return (
    <nav className="flex justify-between p-3 ml-10 mr-10">
      <Link href="/" className="p-1">
        Home
      </Link>
      {session?.user ? (
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="outline_btn"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <div className="flex">
                <button
                  type="button"
                  onClick={toggleLogin}
                  className="outline_btn mr-2"
                >
                  Log In
                </button>

                <button
                  type="button"
                  onClick={toggleSignup}
                  className="outline_btn"
                >
                  Sign Up
                </button>
              </div>
            ))}
        </>
      )}

      {isLoginOpen && <Login stateChanger={setIsLoginOpen} providers={providers} />}

      {isSignupOpen && <Signup stateChanger={setIsSignupOpen} />}
    </nav>
  );
};

export default Nav;
