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
                Get in the g<span className="gradient-text">ame</span>
              </h1>

              <p className="content" style={{ maxWidth: 500 }}>
                We're building a revolutionary experience that incorporates fan
                favorite elements of fantasy, speculation, and competitive
                gaming into a thrilling game augmented over live broadcast.
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
              <h2 className="subtitle">Get your fight pass</h2>
              <p className="content">
                Sign up to mint your early access NFT and play the first ever
                DreamFight game! We’ll be hosting fight nights and inviting our
                ticket holders to test our upcoming alpha.
              </p>

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

      <script
        src="https://www.googletagmanager.com/gtag/js?id=G-MD22TX6MFD"
        async
      />

      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MD22TX6MFD');
        `}
      </script>
    </>
  );
}
