import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow"></main>
      <footer className="bg-blue-300 py-8">
        <div className="container mx-auto font-bold text-center text-black">
          <p>
            &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
