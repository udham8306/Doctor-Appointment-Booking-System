import React from "react"; // Import React library
import { assets } from "../assets/assets"; // Import assets (images, icons, etc.)

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* ..............left................*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        {/* Main heading text with responsive size */}
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointments <br /> With Trusted Doctors
        </p>

        {/* Description section with an image and text */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src={assets.group_profiles} className="w-28" alt="" /> {/* Image of group profiles */}
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> {/* Break line on small screens */}
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* Call-to-action button for booking appointments */}
        <a
          href="#speciality" // Link to the specialties section
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto hover:scale-105 transition-all duration-300"
        >
          Book Appointment{" "} {/* Button text */}
          <img className="w-3" src={assets.arrow_icon} alt="" /> {/* Arrow icon */}
        </a>
      </div>

      {/*..............Right side.........*/}
      <div className="md:w-1/2 relative ">
        {/* Header image, positioned absolutely on medium screens and larger */}
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="" 
        />
      </div>
    </div>
  );
};

export default Header; // Export the Header component for use in other parts of the application
