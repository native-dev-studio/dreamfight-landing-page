import React from "react";
import fightpassVideoSrc from "../images/fightpass.mp4";

export function CardVideo() {
  return (
    <video
      controls={false}
      autoPlay
      loop
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
