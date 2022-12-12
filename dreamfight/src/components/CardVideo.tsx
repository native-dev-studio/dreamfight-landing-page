import React from "react";
import fightpassVideoSrc from "../images/fightpass.mp4";

export function CardVideo() {
  return (
    <video
      controls={false}
      autoPlay
      loop
      /// Allows video to play automatically on iOS mobile browser
      playsInline
      muted
      /// Disable right clicking on the video and showing controls
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <source src={fightpassVideoSrc} type="video/mp4" />
    </video>
  );
}
