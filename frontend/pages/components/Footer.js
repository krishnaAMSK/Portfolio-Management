import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <footer className="bg-blue-300 fixed top-mx bottom-0 left-0 right-0 py-2 ">
        <div className="container mx-auto ont-bold text-center text-black">
          <p>
            &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;