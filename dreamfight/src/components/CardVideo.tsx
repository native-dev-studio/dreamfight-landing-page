import React from "react";
import fightpassVideoSrc from "../images/fightpass.mp4";

export function CardVideo() {
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
    <video
      ref={videoRef}
      controls={false}
      autoPlay
      loop={false}
      muted
      // @note Disable right clicking on the video and showing controls
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <source src={fightpassVideoSrc} type="video/mp4" />
    </video>
  );
}
