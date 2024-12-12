import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-2xl pt-10 text-gray-500 mb-20">
        <p>
          CONTACT <span className="text-gray-800 font-semibold">US</span>
        </p>
      </div>

      <div className="flex flex-col justify-center sm:flex-row ">
        <img className="sm:w-[35%] sm:h-[50%]  " src={assets.contact_image} alt="" />
        <div className="flex flex-col gap-10 p-10">
          <p className="text-medium  text-gray-950">Our OFFICE</p>
          <p className="text-sm text-gray-600">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p className="text-sm text-gray-600">
            {" "}
            Tel: (415) 555‑0132 <br />
            Email: prescripto@gmail.com
          </p>
          <p className="text-medium text-gray-900">Careers at PRESCRIPTO</p>
          <p className=" text-sm text-gray-600">
            Learn more about our teams and job openings.
          </p>
          <button className="w-28 h-10 border border-gray-400 ">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
