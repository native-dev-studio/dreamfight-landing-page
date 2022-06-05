import * as React from "react"

import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as Pixi from "pixi.js";
import Hls from 'hls.js';

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hls = new Hls();
  // TODO: Size me properly
  const app = new Pixi.Application({
    width: 1280,
    height: 720,
  });

  React.useEffect(() => {
    /// Load video stream by transmuxing to mp4 fragments
    const videoTag = videoRef.current as HTMLVideoElement;
    const src = 'https://547f72e6652371c3.mediapackage.us-east-1.amazonaws.com/out/v1/28c261ccdfc94e1ca1925a4401ea4e48/index.m3u8';
    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(videoTag);
    } else if (videoTag.canPlayType('application/vnd.apple.mpegurl')) {
      videoTag.src = src;
    }

    /// Play video stream from PixiJs
    const node = document.getElementById('broadcast');
    node?.appendChild(app.view);
    const texture = Pixi.Texture.from(videoTag);
    const sprite = Pixi.Sprite.from(texture);
    app.stage.addChild(sprite);

    const circle = new Pixi.Graphics()
      .beginFill(0xDC2626)
      .drawCircle(10, 10, 10)
      .endFill()
    app.stage.addChild(circle);

    return () => {
      node?.removeChild(app.view);
      texture.baseTexture.destroy();
    }
  });

  return (
    <div id='broadcast'>
      <video ref={videoRef} autoPlay controls muted style={{ display: 'none' }} />
    </div>
  );
}

export default PongPage;
