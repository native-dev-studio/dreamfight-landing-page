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

  React.useEffect(() => {
    const hls = new Hls();
    const app = new Pixi.Application(VIDEO);

    const videoFeed = (url: string, hls: Hls) => {
      return new Observable.Observable((sub: Observable.Subscriber<ImageData>) => {
        const video = document.createElement('video');
        video.muted = true;

        if (Hls.isSupported()) {
          hls.loadSource(url);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = url;
        }

        /// Ensures that the video is animating; not sure why we need this
        Pixi.Texture.from(video);

        const canvas = new OffscreenCanvas(VIDEO.width, VIDEO.height);
        const ctx  = canvas.getContext('2d');

        const handler = (timer: number) => {
          ctx!.drawImage(video, 0, 0);
          const imdata = ctx!.getImageData(0, 0, canvas.width, canvas.height);
          sub.next(imdata);
          // @ts-ignore
          video.requestVideoFrameCallback(handler);
        } 
        // @ts-ignore
        video.requestVideoFrameCallback(handler);
      });
    }

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

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = VIDEO.width;
    canvas.height = VIDEO.height;
    const texture = Pixi.Texture.from(canvas);
    const sprite = Pixi.Sprite.from(texture);

    const src = "https://63050ee307b58b8f.mediapackage.us-east-1.amazonaws.com/out/v1/337bba2ce017459383a6a1781491c443/index.m3u8";
    videoFeed(src, hls).subscribe((imdata: ImageData) => {
      ctx!.putImageData(imdata, 0, 0);
      texture.baseTexture.update();
    });

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

    app.stage.addChild(sprite);

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

    /* const videoPlayState$ = Observable.fromEvent(videoTag, "play"); */
    /* const videoPauseState$ = Observable.fromEvent(videoTag, "pause"); */

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
      /* Observable.windowToggle(videoPlayState$, () => videoPauseState$), */
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
    <div id="broadcast" />
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
