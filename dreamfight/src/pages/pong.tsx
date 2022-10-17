import * as React from "react";

import * as Pixi from "pixi.js";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import * as Observable from "rxjs";
import ease from 'rx-ease';
import videoFeed$ from '../streams/videoFeed';
import tennisBallPositions from '../data/data.json';
import playIcon from "../images/play.svg";

// Stub video object (to be replaced with some introspected data)
const VIDEO = {
  width: 1280,
  height: 720,
  fps: 15,
};

const generatePlayheadIndex = (arr: any) => {
  let bits = '';
  let i = 0;
  const n = arr.length;

  while (i < n) {
    let value = arr[i]

    if (value > 200) {
      bits = bits.concat('1');
    } else {
      bits = bits.concat('0');
    }

    i += 4;
  }

  return parseInt(bits, 2);
}

const PADDLE_HEIGHT = 100;


const PongPage = () => {

  React.useEffect(() => {
    const app = new Pixi.Application(VIDEO);

    const mlModel$ = Observable.from(cocoSSD.load());

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = VIDEO.width;
    canvas.height = VIDEO.height;
    const texture = Pixi.Texture.from(canvas);
    const sprite = Pixi.Sprite.from(texture);

    const src = "https://ccf3786b925ee51c.mediapackage.us-east-1.amazonaws.com/out/v1/9c3ec1386b9e4f86ac657233229f5cba/index.m3u8";

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
    /* app.stage.addChild(paddleLeft); */
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

    const TICKER_INTERVAL = 1000 / 15; // FPS

    videoFeed$(src)
      .subscribe((imdata) => {
        ctx!.putImageData(imdata, 0, 0);
        texture.baseTexture.update();

        /// Extract and compute playhead index to get stabbed data
        /// TODO: Abstract me into a model-like object with preds as results
        const numPixels = 14;
        const n = (numPixels * 3) + (numPixels - 1);
        const pixels = imdata.data.slice(0, n);
        const playheadIndex = generatePlayheadIndex(pixels);
        const coords = tennisBallPositions[playheadIndex];

        if (coords) {
          tennis.position.x = coords[0] * VIDEO.width;
          tennis.position.y = coords[1] * VIDEO.height;
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


    // Start a loop
    /* Observable.interval(TICKER_INTERVAL).pipe( */
    /*   // Aggregate the ML model and fragment changes and wait until they've all loaded */
    /*   /1* Observable.withLatestFrom(mlModel$, fragChanged$), *1/ */

    /*   // Accept events when the video is playing, and filter them out when it's paused */
    /*   /1* Observable.windowToggle(videoPlayState$, () => videoPauseState$), *1/ */
    /*   Observable.mergeAll(), */

    /*   // And only allow up to the FPS interval events/sec (e.g. 16.67ms for 60fps) */
    /*   Observable.sampleTime(TICKER_INTERVAL), */
    /*   Observable.observeOn(Observable.animationFrameScheduler) */
    /* ); */
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
