"use client";
import CentreInfo from "@components/CentreInfo";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const page = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCentreInfoOpen, setIsCentreInfoOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOptions = async () => {
      await getStates();
    };
    fetchOptions();
  }, []);

  const getStates = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("http://localhost:3000/api/client/states/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          const result = data.data.map((value) => ({
            value: value.toLowerCase().replace(/\s+/g, ""),
            label: value,
          }));
          setStates(result);
        }
      });
  };

  const getCities = async (e) => {
    setIsCityOpen(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: e.label }),
    };

    await fetch("http://localhost:3000/api/client/cities/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          const result = data.data.map((value) => ({
            value: value.toLowerCase().replace(/\s+/g, ""),
            label: value,
          }));
          setCities(result);
        }
      });
  };

  const handleCityChange = (e) => {
    setCity(e.label);
    setIsCentreInfoOpen(true);
  };

  return (
    <>
      {session?.user ? (
        <main>
          <div className="ml-16 mr-16 mt-5">
            <Select
              options={states}
              defaultValue="Select"
              onChange={(e) => getCities(e)}
            />
          </div>
          <div className="ml-16 mr-16 mt-5">
            {isCityOpen && (
              <Select
                options={cities}
                defaultValue="Select"
                onChange={(e) => handleCityChange(e)}
              />
            )}
          </div>
          {isCentreInfoOpen && <CentreInfo city={city} />}
        </main>
      ) : (
        <div className="flex p-10 place-content-center">
          <p>Please Login to Continue</p>
        </div>
      )}
      ;
    </>
  );
};

export default page;
