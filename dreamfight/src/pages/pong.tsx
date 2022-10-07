import * as React from "react";

import Hls, { FragChangedData } from "hls.js";
import * as Pixi from "pixi.js";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import chunks from "../data/data.json";
import * as Observable from "rxjs";
import ease, { presets } from "rx-ease";
import playIcon from "../images/play.svg";

// Stub video object (to be replaced with some introspected data)
const VIDEO = {
  width: 1280,
  height: 720,
  fps: 15,
};

const PADDLE_HEIGHT = 100;


const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const hls = new Hls();
    const app = new Pixi.Application(VIDEO);
    /// Load video stream by transmuxing to mp4 fragments
    const videoTag = videoRef.current as HTMLVideoElement;

    const mlModel$ = Observable.from(cocoSSD.load());
    const fragChanged$ = Observable.fromEventPattern<FragChangedData>(
      (handler) => {
        hls.on(Hls.Events.FRAG_CHANGED, (evt, data) => {
          handler(data);
        });
      },
      (handler) => {
        hls.off(Hls.Events.FRAG_CHANGED, handler);
      }
    );

    /* We use an offscreen canvas to manage video seeking */
    const offscreen = new OffscreenCanvas(VIDEO.width, VIDEO.height);
    const tmp = offscreen.getContext('2d');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width  = VIDEO.width;
    canvas.height = VIDEO.height;

    const canvasTexture = Pixi.Texture.from(canvas);
    const canvasSprite  = Pixi.Sprite.from(canvasTexture);

    const queue: Array<ImageData> = [];

    const throttleQueue = (timer: number) => {
      /* Extract image data per-frame */
      tmp!.drawImage(videoTag, 0, 0);
      const imdata = tmp!.getImageData(0, 0, offscreen.width, offscreen.height);

      queue.push(imdata);

      if (timer > 10_000) {
        const found = queue.shift();
        if (found) {
          ctx!.putImageData(found, 0, 0);
          canvasTexture.baseTexture.update();
        }
      }

      // @ts-ignore
      /* videoTag.requestVideoFrameCallback(throttleQueue); */
      requestAnimationFrame(throttleQueue);
    } 
    // @ts-ignore
    /* videoTag.requestVideoFrameCallback(throttleQueue); */
    requestAnimationFrame(throttleQueue);


    // Video stream
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

    const tennis = new Pixi.Graphics()
      .beginFill(0xff0000)
      .drawCircle(16, 16, 16)
      .endFill();

    const paddleLeft = new Pixi.Graphics()
      .beginFill(0xffffff)
      .drawRect(0, 0, 50, 200)
      .endFill();

    const paddleRight = new Pixi.Graphics()
      .beginFill(0xffffff)
      .drawRect(VIDEO.width - 50, 0, 50, 200)
      .endFill();

    app.stage.addChild(canvasSprite);
    Pixi.Texture.from(videoTag);

    app.stage.addChild(tennis);
    app.stage.addChild(paddleLeft);
    app.stage.addChild(paddleRight);

    // const progress$ = Observable.interval(250).pipe(
    //   Observable.startWith(0),
    //   Observable.map((i) =>
    //     i % 3 === 0
    //       ? { x: 400, y: 400 }
    //       : i % 2 === 0
    //       ? { x: 800, y: 200 }
    //       : { x: 0, y: 0 }
    //   ),
    //   ease({
    //     x: [120, 18],
    //     y: [120, 18],
    //   })
    // ).subscribe(({ x, y }) => {
    //   tennis.position.x = x;
    //   tennis.position.y = y;
    // });

    const mouse$ = Observable.fromEvent<PointerEvent>(
      document,
      "pointermove"
    ).pipe(
      Observable.map((e) => {
        /* console.log("!", e.clientY / VIDEO.height); */
        return clamp((e.clientY - PADDLE_HEIGHT) / VIDEO.height, 0, 1);
      })
    );

    const arrows$ = Observable.merge(
      Observable.fromEvent<KeyboardEvent>(document, "keydown").pipe(
        Observable.filter((e) => e.code === "ArrowUp"),
        Observable.map(() => -0.1) // 10% of the screen
      ),
      Observable.fromEvent<KeyboardEvent>(document, "keydown").pipe(
        Observable.filter((e) => e.code === "ArrowDown"),
        Observable.map(() => 0.1)
      )
    ).pipe(
      Observable.scan((a, b) => clamp(a + b, 0, 1)),
      ease(500, 100)
    );

    Observable.merge(arrows$, mouse$).subscribe((v) => {
      const y = (VIDEO.height - paddleLeft.height) * v; /* / 100 */

      /* console.log("up", v, y); */
      paddleLeft.position.y = y;
    });

    fragChanged$
      .pipe(
        Observable.mergeMap((frag) => {
          /* console.log("fragChanged", frag); */
          const sn = frag.frag.sn;
          const secondsPerChunk = 6;
          const videoLengthInMinutes = 10;
          const secondsInMinutes = 60;
          const totalChunks =
            (videoLengthInMinutes * secondsInMinutes) / secondsPerChunk;
          const chunkId = (sn as number) % totalChunks;

          return Observable.from(chunks[chunkId]).pipe(
            Observable.concatMap((chunk) => {
              return chunk
                ? Observable.of({ 
                  chunkId: chunkId,
                  frame: chunkId * secondsPerChunk * VIDEO.fps,
                  x: chunk[0],
                  y: chunk[1]
                }).pipe(
                    Observable.delay(1000 / 15)
                  )
                : Observable.EMPTY;
            }),
            ease({
              x: [120, 18],
              y: [120, 18],
            })
          );
        })
      )
      .subscribe((positions) => {
        if (positions) {

          /* console.log({ */
          /*   chunkId: positions.chunkId, */
          /*   frame: positions.frame, */
          /*   x: positions.x, */
          /*   y: positions.y, */
          /* }); */

          tennis.position.x = positions.x * VIDEO.width;
          tennis.position.y = positions.y * VIDEO.height;
        }

      });

    // const mlEvents$ = new Stream.Subject();

    const videoPlayState$ = Observable.fromEvent(videoTag, "play");
    const videoPauseState$ = Observable.fromEvent(videoTag, "pause");

    // videoPlayState$.subscribe({
    //   next: (s) => console.log("videoPlayState$", s),
    // });

    // videoPauseState$.subscribe({
    //   next: (s) => console.log("videoPauseState$", s),
    // });

    const TICKER_INTERVAL = 1000 / 15; // FPS

    // Start a loop
    Observable.interval(TICKER_INTERVAL).pipe(
      // Aggregate the ML model and fragment changes and wait until they've all loaded
      Observable.withLatestFrom(mlModel$, fragChanged$),

      // Accept events when the video is playing, and filter them out when it's paused
      Observable.windowToggle(videoPlayState$, () => videoPauseState$),
      Observable.mergeAll(),

      // And only allow up to the FPS interval events/sec (e.g. 16.67ms for 60fps)
      Observable.sampleTime(TICKER_INTERVAL),
      Observable.observeOn(Observable.animationFrameScheduler)
    );
    // .subscribe(function update([_t, coco, frag /* playerEvents */]) {
    //   console.log("update here!!!", { _t, coco, frag /* playerEvents */ });

    //   coco.detect(videoTag).then((preds) => {
    //     const { bbox, score } = preds[0];
    //     const [x, y, w, h] = bbox;

    //     // const rectGroup = new Pixi.UniformGroup();
    //     const rect: Pixi.Graphics = new Pixi.Graphics()
    //       .beginFill(0x0000ff)
    //       .drawRect(10, 10, 10, 10)
    //       .endFill();

    //     rect.position.x = x;
    //     rect.position.y = y;
    //     app.stage.addChild(rect);
    //     // app.renderer.render(app.stage);

    //     // mlEvents$.next({
    //     //   // give augmented video buffer of 5-10 sec to be behind live video,
    //     //   type: "rect",
    //     //   params: { width: 200, height: 200 },
    //     //   x: 100,
    //     //   y: 100,
    //     // });
    //   });
    // });

    return () => {
      app.stage.removeChildren();
    };
  }, []);

  return (
    <div
      id="broadcast"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          position: "absolute",
          background: "#FFF",
          borderRadius: 80,
          width: 80,
          height: 80,
          top: "50%",
          marginTop: -40,
          left: "50%",
          marginLeft: -40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        }}
      >
        <img src={playIcon} alt="" />
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

function clamp(
  val: number,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
) {
  return Math.max(min, Math.min(max, val));
}
