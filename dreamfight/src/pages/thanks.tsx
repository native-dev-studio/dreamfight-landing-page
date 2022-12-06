import * as React from "react";
import { CardVideo } from "../components/CardVideo";
import { Footer } from "../components/Footer";
import { HeadFonts } from "../components/HeadFonts";

import logo from "../images/logo@2x.png";

const Thanks = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center pt-8 px-4">
      <div className="max-w-2xl flex flex-1 flex-col justify-center items-center">
        <div className="max-w-sm">
          <img src={logo} className="px-8" />
        </div>

        <div className="max-w-md mt-8">
          <CardVideo />
        </div>

        <h1 className="title text-8xl text-center">Welcome, DreamFighter!</h1>
        <p className="content text-center mt-8 text-gray-300">
          We're busy building the ultimate fan experience. Stay tuned for
          progress updates and for the chance to become one of our first game
          testers. Fight on!
        </p>
      </div>

      <Footer />
    </main>
  );
};

// Include fonts in the page <head>
export function Head() {
  return <HeadFonts />;
}

export default Thanks;
