"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CentreInfo = ({ city }) => {
  const [isButtonClicked, setIsButtonClicked] = useState({});
  const [centres, setCentres] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchOptions = async () => {
      await getCentres();
      await getUserBookings(session?.user.email);
    };
    fetchOptions();
  }, [city]);

  const updateCentres = async (_id, change) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id, change: change }),
    };

    await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/client/centres/update/api",
      options
    )
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

  const updateBooking = async (email, slotid) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, slotid: slotid }),
    };

    await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/client/booking/update",
      options
    )
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

  const handleButtonClick = (slotid) => {
    //console.log(session?.user?.email);
    if (!isButtonClicked[slotid]) {
      updateCentres(slotid, -1);
      updateBooking(session?.user?.email, slotid);
    } else {
      updateCentres(slotid, 1);
      updateBooking(session?.user?.email, "");
    }

    console.log(slotid);
    setIsButtonClicked((prevState) => ({
      ...prevState,
      [slotid]: !prevState[slotid] || false,
    }));
  };

  const getUserBookings = async (email) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };

    await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/client/booking/get",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return null;
        } else {
          const result = data.data;
          //console.log(isButtonClicked);
          if (result != null) {
            setIsButtonClicked((prevData) => ({
              ...prevData,
              [result.slotid]: true,
            }));
          }
        }
      });
  };

  const getCentres = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city }),
    };

    await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/client/centres/get/api",
      options,
      { next: { revalidate: 0 } }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const result = data.data;
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
