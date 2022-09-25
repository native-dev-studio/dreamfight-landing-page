import * as React from "react"

import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Hls from 'hls.js';
import * as Pixi from "pixi.js";
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import chunks from '../data/data.json';

const emit = (coords: any) => {
  if (coords.length === 0) {
    return;
  }
  setTimeout(() => {
    console.log(coords.shift());
    emit(coords);
  }, 66.6666666667);
}

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hls = new Hls();
  // TODO: Size me properly
  const app = new Pixi.Application({
    width: 1280,
    height: 720,
  });

  React.useEffect(() => {
    const videoTag = videoRef.current as HTMLVideoElement;

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

      hls.on(Hls.Events.FRAG_CHANGED, (evt, data) => {
        const sn = data.frag.sn;
        const secondsPerChunk = 6;
        const videoLengthInMinutes = 10;
        const secondsInMinutes = 60;
        const totalChunks = videoLengthInMinutes * secondsInMinutes / secondsPerChunk;
        const chunkId = sn as number % totalChunks;
        const tennisBallCoordinates = chunks[chunkId];

        console.log('[Hls.FRAG_CHANGED]', chunkId);
        emit(tennisBallCoordinates);
      });

      /// Process video onto canvas
      const node = document.getElementById('broadcast');
      node?.appendChild(app.view);
      const videoTexture = Pixi.Texture.from(videoTag);
      const videoSprite = Pixi.Sprite.from(videoTexture)
      app.stage.addChild(videoSprite);

      // TODO: Create rect off-screen or hidden
      const rect: Pixi.Graphics = new Pixi.Graphics()
      .beginFill(0xDC2626)
      .drawRect(10, 10, 10, 10)
      .endFill();
      app.stage.addChild(rect);

      /// Augmentation stream, turn it into object tracking loop
      /// TODO: Replace with custom render loop to keep predictions and video in sync
      app.ticker.add(delta => {
        model.detect(videoTag).then(preds => {
          if (preds.length === 0) {
            return;
          }

          const { bbox, klass, score } = preds[0];
          const [ x, y, w, h ] = bbox;

          rect.position.x = x;
          rect.position.y = y;

          app.renderer.render(app.stage);
        })
      });
    });
  }, []);

  return (
    <div id='broadcast'>
      <video ref={videoRef} autoPlay controls muted style={{ display: 'none' }} />
    </div>
  );
}

export default PongPage;
