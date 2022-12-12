import * as React from "react";

import { CardVideo } from "../components/CardVideo";
import { EmailForm } from "../components/EmailForm";
import { HeadFonts } from "../components/HeadFonts";
import { Footer } from "../components/Footer";

import logo from "../images/logo@2x.png";
import bgSrc from "../images/bg.webp";
import tennisStarSrc from "../images/tennis-star.webp";
import floatingButtonsSrc from "../images/floating-buttons.png";
import lifeBarSrc from "../images/life-bar.png";

const IndexPage = () => {
  return (
    <>
      <div
        className="background"
        style={{
          backgroundImage: `url(${bgSrc})`,
        }}
      >
        <div className="background-container">
          <img
            src={tennisStarSrc}
            alt="Tennis player"
            className="background-tennis-player"
          />

          <img
            src={lifeBarSrc}
            alt="Life bar"
            className="background-life-bar"
          />

          <img
            src={floatingButtonsSrc}
            alt="Game buttons"
            className="background-floating-buttons"
          />
        </div>
      </div>

      <main className="main">
        <div className="container">
          <section className="intro-section">
            <img src={logo} className="logo" />

            <div style={{}}>
              <h1 className="title whitespace-nowrap">
                A new era in g<span className="gradient-text">aming</span>
              </h1>

              <p className="content" style={{ maxWidth: 500 }}>
                DreamFight is a radically new strategy game played over live sports broadcast. Summon your team of champions to fight for the ultimate victory and earn your share of the prize!
              </p>
            </div>
          </section>

          <section className="signup-section">
            <div className="w-4/4 md:w-2/4 sm:mr-24 m-auto">
              <CardVideo />
            </div>

            <div className="signup-section-content">
              <h2 className="subtitle">Get your Fight Pass</h2>
              <p className="content">
                <span className='font-bold'>Early access planned for 2023.</span> Join our Beta to get a headstart over new gameplay mechanics on the world's first live stream competitive game</p>

              <EmailForm />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default IndexPage;

// Include fonts in the page <head>
export function Head() {
  return <HeadFonts />;
}
