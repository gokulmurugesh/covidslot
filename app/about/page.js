import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-xl font-medium mb-4">About Page</h1>
      <div className="bg-white p-8 rounded shadow">
        <p className="text-lg font-medium mb-2">Corona Slot Booking</p>
        <p className="text-lg font-medium mb-2">Made by Gokul</p>
        <p className="text-lg font-medium mb-2">20BCS032</p>
        <p className="text-lg font-medium">Kumaraguru College of Technology</p>
        <p className="text-lg font-medium">Use it to Explore, you can also signup (Email : sample@gmail.com, Password : sample123)</p>
      </div>
    </div>
  );
}

export default AboutPage;
