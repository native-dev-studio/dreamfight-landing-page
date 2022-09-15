import * as React from "react"

import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Hls from 'hls.js';
import * as Pixi from "pixi.js";

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
    const src = 'https://63050ee307b58b8f.mediapackage.us-east-1.amazonaws.com/out/v1/337bba2ce017459383a6a1781491c443/index.m3u8';
    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(videoTag);
    } else if (videoTag.canPlayType('application/vnd.apple.mpegurl')) {
      videoTag.src = src;
    }
    const url = 'wss://3ds4aci6dc.execute-api.us-east-1.amazonaws.com/test'
    const ws =  new WebSocket(url)
    ws.onopen = () => {
      console.log('[WebSocket.onopen]');
    }
    ws.onmessage = (evt) => {
      console.log('[WebSocket.onmessage]', evt);
    }
    ws.onerror = (err) => {
      console.log('[WebSocket.onerror]', err);
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
