import * as React from "react";

import Hls, { FragChangedData } from "hls.js";
import * as Pixi from "pixi.js";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import chunks from "../data/data.json";
import * as Stream from "rxjs";

const emit = (coords: any) => {
  if (coords.length === 0) {
    return;
  }
  setTimeout(() => {
    const coord = coords.shift();
    const event = {
      TennisBall: coord,
    };
    console.log(event);
    emit(coords);
  }, 66.6666666667);
};

// Stub video object (to be replaced with some introspected data)
const VIDEO = {
  width: 1280,
  height: 720,
  fps: 60,
};

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hls = new Hls();

  // TODO: Size me properly
  const app = new Pixi.Application({
    width: VIDEO.width,
    height: VIDEO.height,
  });

  React.useEffect(() => {
    const videoTag = videoRef.current as HTMLVideoElement;

    const mlModel$ = Stream.from(cocoSSD.load());
    const fragChanged$ = Stream.fromEventPattern<FragChangedData>(
      (handler) => {
        hls.on(Hls.Events.FRAG_CHANGED, (evt, data) => {
          handler(data);
        });
      },
      (handler) => {
        hls.off(Hls.Events.FRAG_CHANGED, handler);
      }
    );

    /*
      EVENTS
        - Tennis ball
          - x, y, w, h
            - 7 digit precision for fractions (0.8104252)

        - Service Shot (no params; represents hit shot in the game)
          - (flash red circle)
          - Auto returns a shot
          - status (open|settled)
            ask
    */

    /// Video stream
    const src =
      "https://63050ee307b58b8f.mediapackage.us-east-1.amazonaws.com/out/v1/337bba2ce017459383a6a1781491c443/index.m3u8";
    if (Hls.isSupported()) {
      hls.loadSource(src);
      hls.attachMedia(videoTag);
    } else if (videoTag.canPlayType("application/vnd.apple.mpegurl")) {
      videoTag.src = src;
    }

    const node = document.getElementById("broadcast");
    node?.appendChild(app.view);

    const videoTexture = Pixi.Texture.from(videoTag);
    const videoSprite = Pixi.Sprite.from(videoTexture);
    app.stage.addChild(videoSprite);

    const PADDLE_KEYS = { left: 37, right: 39 };
    // const playerEvents$ = Stream.fromEvent(document, "keydown", (event) => {
    //   switch (event.keyCode) {
    //     case PADDLE_KEYS.left:
    //       return -1;
    //     case PADDLE_KEYS.right:
    //       return 1;
    //     default:
    //       return 0;
    //   }
    // });

    hls.on(Hls.Events.FRAG_CHANGED, (evt, data) => {
      const sn = data.frag.sn;
      const secondsPerChunk = 6;
      const videoLengthInMinutes = 10;
      const secondsInMinutes = 60;
      const totalChunks =
        (videoLengthInMinutes * secondsInMinutes) / secondsPerChunk;
      const chunkId = (sn as number) % totalChunks;
      const tennisBallCoordinates = chunks[chunkId];

      console.log("[Hls.FRAG_CHANGED]", chunkId);
      emit(tennisBallCoordinates);
    });

    const mlEvents$ = new Stream.Subject();

    const videoPlayState$ = Stream.fromEvent(videoTag, "play");
    videoPlayState$.subscribe({
      next: (s) => console.log("videoPlayState$", s),
    });

    const videoPauseState$ = Stream.fromEvent(videoTag, "pause");
    videoPauseState$.subscribe({
      next: (s) => console.log("videoPauseState$", s),
    });

    const TICKER_INTERVAL = 1000 / 15; // FPS

    // Start a loop
    Stream.interval(TICKER_INTERVAL)
      .pipe(
        // Aggregate the ML model and fragment changes and wait until they've all loaded
        Stream.withLatestFrom(
          mlModel$,
          fragChanged$
          // playerEvents$ /* serverSideEvents$ */
        ),

        // Accept events when the video is playing, and filter them out when it's paused
        Stream.windowToggle(videoPlayState$, () => videoPauseState$),
        Stream.mergeAll(),

        // And only allow up to the FPS interval events/sec (e.g. 16.67ms for 60fps)
        Stream.sampleTime(TICKER_INTERVAL)
      )
      .subscribe(function update([_t, coco, frag /* playerEvents */]) {
        console.log("update here!!!", { _t, coco, frag /* playerEvents */ });

        coco.detect(videoTag).then((preds) => {
          const { bbox, score } = preds[0];
          const [x, y, w, h] = bbox;

          // const rectGroup = new Pixi.UniformGroup();
          const rect: Pixi.Graphics = new Pixi.Graphics()
            .beginFill(0x0000ff)
            .drawRect(10, 10, 10, 10)
            .endFill();

          rect.position.x = x;
          rect.position.y = y;
          app.stage.addChild(rect);
          app.renderer.render(app.stage);

          mlEvents$.next({
            // give augmented video buffer of 5-10 sec to be behind live video,
          });
        });
      });
  }, []);

  return (
    <div id="broadcast">
      <button
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        }}
      >
        Play/Pause
      </button>

      <video
        ref={videoRef}
        autoPlay
        controls
        muted
        style={{
          display: "none",
        }}
      />
    </div>
  );
};

export default PongPage;
