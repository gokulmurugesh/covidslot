"use client";
import React from "react";
import { useState, useEffect } from "react";

const CentreInfo = ({ city }) => {
  const [isButtonClicked, setIsButtonClicked] = useState({});
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      await getCentres();
    };
    fetchOptions();
  }, [city]);

  const updateCentres = async (_id, change) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id, change : change }),
    };

    await fetch(process.env.NEXT_PUBLIC_URL+"/api/client/centres/update/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          getCentres()
        }
      });
  };

  const handleButtonClick = (_id) => {
    if(!isButtonClicked[_id]) updateCentres(_id, -1)
    else updateCentres(_id, 1)
    setIsButtonClicked((prevState) => ({
      ...prevState,
      [_id]: !prevState[_id] || false,
    }));
    // updateCentres(e.target.id, 1);
    // setIsButtonClicked((prevState) => !prevState);
  };

  const getCentres = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city }),
    };

    await fetch(process.env.NEXT_PUBLIC_URL+"/api/client/centres/get/api", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          const result = data.data;
          console.log(result);
          setCentres(result);
        }
      });
  };

  return (
    <>
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
          <div className="">
            <button
              className="outline_btn"
              id={centre._id}
              onClick={(e) => handleButtonClick(centre._id)}
            >
              {isButtonClicked[centre._id] ? "Booked" : "Book"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CentreInfo;
