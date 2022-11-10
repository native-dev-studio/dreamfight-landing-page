import * as React from "react";

import logo from "../images/logo@2x.png";
import fightpassVideoSrc from "../images/fightpass.mp4";
import badgeSrc from "../images/badge.png";
import bgSrc from "../images/bg.webp";
import tennisStarSrc from "../images/tennis-star.webp";
import { EmailForm } from "../components/EmailForm";

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
    <main
      style={{
        background: `url(${bgSrc}) no-repeat center`,
        backgroundSize: "contain",
        backgroundPositionY: -90,
        width: "100%",
      }}
    >
      <div className="container">
        <section
          style={{
            width: "50%",
            padding: "0 36px",
          }}
        >
          <img src={logo} width="500px" className="logo" />

          <div style={{}}>
            <h1 className="title">
              Get in the g<span className="gradient-text">ame</span>
            </h1>

            <p className="content">
              We're building a revolutionary experience that incorporates fan
              favorite elements of fantasy, speculation, and competitive gaming
              into a thrilling game augmented over live broadcast.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 160,
            padding: "0 36px",
            alignItems: "top",
            justifyContent: "center",
          }}
        >
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

          <div style={{ width: "50%" }}>
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
          <p className="content">© 2022 DreamFight Inc. All rights reserved.</p>
        </footer>
      </div>
    </main>
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
