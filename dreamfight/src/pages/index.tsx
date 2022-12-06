import * as React from "react";

import { EmailForm } from "../components/EmailForm";

import logo from "../images/logo@2x.png";
import fightpassVideoSrc from "../images/fightpass.mp4";
import badgeSrc from "../images/badge.png";
import bgSrc from "../images/bg.webp";
import tennisStarSrc from "../images/tennis-star.webp";
import floatingButtonsSrc from "../images/floating-buttons.png";
import lifeBarSrc from "../images/life-bar.png";

const IndexPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 10_000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
              <h1 className="title">
                A new era in g<span className="gradient-text">aming</span>
              </h1>

              <p className="content" style={{ maxWidth: 500 }}>
                DreamFight is a radically new strategy game played over live sports broadcast. Summon your team of champions to fight for the ultimate victory and earn your share of the prize!
              </p>
            </div>
          </section>

          <section className="signup-section">
            <video
              ref={videoRef}
              controls={false}
              autoPlay
              loop={false}
              muted
              className="fightpass-video"
              // @note Disable right clicking on the video and showing controls
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <source src={fightpassVideoSrc} type="video/mp4" />
            </video>

            <div className="signup-section-content">
              <h2 className="subtitle">Get your Fight Pass</h2>
              <p className="content">
                <span className='font-bold'>Early access planned for 2023.</span> Join our Beta to get a headstart over new gameplay mechanics on the world's first live stream competitive game</p>

              <EmailForm />
            </div>
          </section>

          <footer className="footer">
            <img src={badgeSrc} alt="DF badge" className="footer-badge" />
            <p className="content">
              © 2022 DreamFight Inc. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default IndexPage;

// Include fonts in the page <head>
export function Head() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Manrope:wght@400;800&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
