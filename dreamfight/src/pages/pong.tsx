import * as React from "react"

import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Pixi from "pixi.js";
import Hls from 'hls.js';

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hls = new Hls();

  React.useEffect(() => {
    const videoTag = videoRef.current as HTMLVideoElement;
    const src = 'https://547f72e6652371c3.mediapackage.us-east-1.amazonaws.com/out/v1/28c261ccdfc94e1ca1925a4401ea4e48/index.m3u8';
    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(videoTag);
    } else if (videoTag.canPlayType('application/vnd.apple.mpegurl')) {
      videoTag.src = src;
    }
  });

  return (
    <video ref={videoRef} autoPlay />
  );
}

export default PongPage;
