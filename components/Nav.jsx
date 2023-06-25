"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const {push} = useRouter()

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

  const handleSignOut = () => {
    signOut()
    push("")
  }

  return (
    <nav className="flex justify-between p-3 ml-10 mr-10">
      <Link href="/" className="p-1">
        Home
      </Link>
      {session?.user ? (
        <div className="flex">
          <button
            type="button"
            onClick={handleSignOut}
            className="outline_btn"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}

      {isLoginOpen && <Login stateChanger={setIsLoginOpen} providers={providers} />}

      {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen} />}
    </nav>
  );
};

export default Nav;
