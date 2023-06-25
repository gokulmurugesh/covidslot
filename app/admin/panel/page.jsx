"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      await getCentres();
    };
    fetchOptions();
  }, []);

  const getCentres = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    await fetch(process.env.NEXT_PUBLIC_URL+"/api/admin/get/api", options, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          const result = data.data;
          setCentres(result);
        }
      });
  };

  const removeCentres = async (_id) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id }),
    };

    await fetch(process.env.NEXT_PUBLIC_URL+"/api/admin/remove/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          getCentres();
        }
      });
  };
  
  const handleButtonClick = (e) => {
    removeCentres(e.target.id);
  };

  const formik = useFormik({
    initialValues: {
      centrename: "",
      city: "",
      state: "",
    },
    onSubmit: async (values) => {
      addCentres(values.centrename, values.city, values.state);
    },
  });

  const addCentres = async (name, city, state) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        centre: name,
        slotsAvailable: 10,
        city: city,
        state: state,
      }),
    };

    await fetch(process.env.NEXT_PUBLIC_URL+"/api/admin/add/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          getCentres();
        }
      });
  };

  return (
    <>
      {session?.user ? (
        <>
          <div className="pr-10 pl-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="centrename"
                  type="text"
                  placeholder="Enter Centre Name"
                  {...formik.getFieldProps("centrename")}
                />
                {formik.errors.centrename ? (
                  <div className="text-sm text-red-400">
                    {formik.errors.centrename}
                  </div>
                ) : null}

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  placeholder="Enter City"
                  {...formik.getFieldProps("city")}
                />
                {formik.errors.city ? (
                  <div className="text-sm text-red-400">
                    {formik.errors.city}
                  </div>
                ) : null}

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  type="text"
                  placeholder="Enter State"
                  {...formik.getFieldProps("state")}
                />
                {formik.errors.state ? (
                  <div className="text-sm text-red-400">
                    {formik.errors.state}
                  </div>
                ) : null}
              </div>
              <button type="submit" className="outline_btn">
                Add
              </button>
            </form>
          </div>
          <div>
            {centres.map((centre) => (
              <div className="flex justify-evenly text-center mt-5 ml-16 mr-16 p-5 rounded items-center outline">
                <div>
                  <p>Centre Name</p>
                  <p>{centre.centre}</p>
                </div>
                <div>
                  <p>Slots Available</p>
                  <p>{centre.slotsAvailable}</p>
                </div>
                <div>
                  <p>City</p>
                  <p>{centre.city}</p>
                </div>
                <div>
                  <p>State</p>
                  <p>{centre.state}</p>
                </div>
                <div className="">
                  <button
                    className="outline_btn"
                    id={centre._id}
                    onClick={(e) => handleButtonClick(e)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex p-10 place-content-center">
          <p>Please Login to Continue</p>
        </div>
      )}
    </>
  );
};

export default page;
