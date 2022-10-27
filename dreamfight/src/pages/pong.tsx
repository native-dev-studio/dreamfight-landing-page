import * as React from "react";

import * as Pixi from "pixi.js";
import * as Rx from "rxjs";
// import * as cocoSSD from "@tensorflow-models/coco-ssd";
import { pipe as _ } from "fp-ts/lib/function";
import "@tensorflow/tfjs";

import { RenderStream } from "../components/RenderStream";
import { IDS } from "../constants";
import { VideoSubject } from "../streams/videoFeed";
import { detectTennisBall$ } from "../streams/detectTennisBall";
import { detectServiceEvents$ } from "../streams/detectServiceEvent";
import { getBetOutcomes$, getBets$, updateFighterScore$, showFighterScore as showFighterScore$ } from "../streams/bets";
import { BetStatus, BetTransitions, Coordinates, BetOption } from "../types";
import { doPlayState$ } from "../streams/playState";
import {between} from "fp-ts/lib/Ord";

// Stub video object (to be replaced with some introspected data)
const VIDEO = {
  src: "https://ccf3786b925ee51c.mediapackage.us-east-1.amazonaws.com/out/v1/9c3ec1386b9e4f86ac657233229f5cba/index.m3u8",
  width: 1280,
  height: 720,
  fps: 15,
};

let videoFeed$ = new Rx.Subject<ImageData>();
const videoPlayPauseIntents$ = new Rx.Subject();
const betSelection$ = new Rx.Subject<BetOption>();
const fighterScore$ = new Rx.BehaviorSubject(0);
let bettingWindows$: Rx.Observable<BetTransitions> = Rx.NEVER;

const PongPage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [state, setState] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    const app = new Pixi.Application(VIDEO);
    videoFeed$ = VideoSubject(VIDEO);
    bettingWindows$ = _(
      videoFeed$,
      detectServiceEvents$,
      Rx.tap(console.log),
    );
    const getBetsUI = getBets$(bettingWindows$, betSelection$);
    const getBetsUISub = getBetsUI.subscribe(setState);
    const getBetsOutcomeUI = getBetOutcomes$(betSelection$);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = VIDEO.width;
    canvas.height = VIDEO.height;
    const texture = Pixi.Texture.from(canvas);
    const sprite = Pixi.Sprite.from(texture);

    const node = document.getElementById("broadcast");
    node?.appendChild(app.view);

    const tennis = new Pixi.Graphics()
      .beginFill(0xff0000)
      .drawCircle(16, 16, 16)
      .endFill();

    app.stage.addChild(sprite);

    app.stage.addChild(tennis);

    const TICKER_INTERVAL = 1_000 / VIDEO.fps;

    videoFeed$.subscribe((imdata) => {
      ctx!.putImageData(imdata, 0, 0);
      texture.baseTexture.update();
    });

    _(
      videoFeed$,
      detectTennisBall$,
    ).subscribe((maybeCoords: Coordinates | null) => {
      if (maybeCoords === null) {
        return;
      }

      const [x, y, w, h] = maybeCoords;

      tennis.position.x = x * VIDEO.width;
      tennis.position.y = y * VIDEO.height;
      tennis.width      = w * VIDEO.width;
      tennis.height     = h * VIDEO.height;
    });

    /// Takes stream of bet selections and transitions, updates score
    updateFighterScore$(fighterScore$, betSelection$, bettingWindows$).subscribe(console.log);

    doPlayState$(videoPlayPauseIntents$).subscribe(console.log);

    return () => {
      app.stage.removeChildren();
      getBetsUISub.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: VIDEO.width,
          height: VIDEO.height,
          position: "relative",
        }}
      >
        <div
          id="broadcast"
          style={{
            width: VIDEO.width,
            height: VIDEO.height,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            controls
            muted
            style={{
              display: "none",
              position: "absolute",
            }}
          />
        </div>

        {state}
        <RenderStream with={() => showFighterScore$(fighterScore$)} />

        {/* <button id={IDS.betButton}>Bet</button> */}

        {/* <div
        id={IDS.videoOverlay}
        style={{
          display: "none",
          background: "rgba(0, 0, 0, 0.3)",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: "absolute",
        }}
      >
        <button
          id={IDS.playPauseButton}
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
            videoPlayPauseIntents$.next(void 0);
          }}
        >
          <img src={playIcon} alt="" />
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default PongPage;
