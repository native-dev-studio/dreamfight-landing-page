import * as React from "react"

import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Hls from 'hls.js';
import * as Pixi from "pixi.js";
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hls = new Hls();

  React.useEffect(() => {
    /// Load video stream by transmuxing to mp4 fragments
    const videoTag = videoRef.current as HTMLVideoElement;

   // TODO: Size me properly
   const app = new Pixi.Application({
     width: 1280,
     height: 720,
   });

   cocoSSD.load().then(model => {
     console.log('[cocoSSD.load]');

     /// Video stream
     const src = 'https://63050ee307b58b8f.mediapackage.us-east-1.amazonaws.com/out/v1/337bba2ce017459383a6a1781491c443/index.m3u8';
     if (Hls.isSupported()) {
       hls.loadSource(src);
       hls.attachMedia(videoTag);
     } else if (videoTag.canPlayType('application/vnd.apple.mpegurl')) {
       videoTag.src = src;
     }

     /// Process video onto canvas
     const node = document.getElementById('broadcast');
     node?.appendChild(app.view);
     const videoTexture = Pixi.Texture.from(videoTag);
     const videoSprite = Pixi.Sprite.from(videoTexture);
     app.stage.addChild(videoSprite);

     /// Augmentation stream, turn it into object tracking loop
     /// TODO: Replace with custom render loop to keep predictions and video in sync
     app.ticker.add(delta => {
       // Remove previous image
       model.detect(videoTag).then((preds: any) => {
         // Set new image
         console.log(preds);
       })
     });
   });
  }, []);

  return (
    <div id='broadcast'>
      <video ref={videoRef} autoPlay controls muted style={{ display: 'none' }}/>
    </div>
  );
}

export default PongPage;
