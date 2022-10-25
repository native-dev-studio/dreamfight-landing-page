import * as React from "react";

import * as Pixi from "pixi.js";
import * as Rx from "rxjs";
import { pipe as _ } from "fp-ts/lib/function";
import { getOrElse, map as mapOption } from "fp-ts/lib/Option";
import { from, Observable, of } from "rxjs";
import { tap, map, withLatestFrom, switchMap } from "rxjs/operators";
import { initializeApp } from "firebase/app";
import { getDatabase, increment, ref, update } from "firebase/database";
import { object } from "rxfire/database";
import "@tensorflow/tfjs";

import { log } from "../lib/utils";
import { RenderStream } from "../components/RenderStream";
import { getVideoFeed$ } from "../streams/videoFeed";
import { detectTennisBall$ } from "../streams/detectTennisBall";
import { detectServiceEvents$ } from "../streams/detectServiceEvent";
import { detectFrameTimestamp$ } from "../streams/detectFrameTimestamp";
import { showFrameTimestamp$ } from "../streams/showFrameTimestamp";
import {
  createNewFighter$,
  getCurrentFighter$,
  getGameFighters$,
} from "../streams/fighter";
import { BetTransitions, Coordinates, BetOption, Fighter } from "../types";
import {
  getBetOutcomes$,
  getBets$,
  getFighterScore$,
  showFighterScore$,
} from "../streams/bets";

import bg from "../images/bg.png";

// Stub video object (to be replaced with some introspected data)
const VIDEO = {
  src: "https://ccf3786b925ee51c.mediapackage.us-east-1.amazonaws.com/out/v1/9c3ec1386b9e4f86ac657233229f5cba/index.m3u8",
  width: 1280,
  height: 720,
  fps: 15,
};

const firebaseConfig = {
  apiKey: "AIzaSyDuGVx8hSHx7bmQ00VtEl_krSNhByLORLI",
  authDomain: "df-pong.firebaseapp.com",
  projectId: "df-pong",
  storageBucket: "df-pong.appspot.com",
  messagingSenderId: "780943074085",
  appId: "1:780943074085:web:b95ba5d73ed573f064b0cc",
  // Realtime DB
  databaseURL: "https://df-pong-default-rtdb.firebaseio.com",
};

const PongPage = () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const videoFeed$: Observable<ImageData> = getVideoFeed$(VIDEO);
  const bettingWindows$: Observable<BetTransitions> = _(
    videoFeed$,
    detectServiceEvents$
  );

  const frameTimestamps$ = detectFrameTimestamp$(videoFeed$);

  const betSelection$ = new Rx.Subject<BetOption>();

  const getOrCreateFighter$ = (): Observable<Fighter> =>
    _(
      getCurrentFighter$(db),
      switchMap((fighter) =>
        _(
          fighter,
          mapOption((f) => of({ fighter: f, isNewFighter: false })),
          getOrElse(() =>
            _(
              createNewFighter$(db),
              map((f) => ({ fighter: f, isNewFighter: true }))
            )
          )
        )
      ),
      tap(log("currentFighter"))
    );

  const currentFighter$ = getOrCreateFighter$();

  // Takes stream of bet selections and transitions and produces a score
  const gameScore$ = _(
    getFighterScore$(betSelection$, bettingWindows$),
    tap(log("score"))
  );

  // List all fighters
  const gameFighters$ = getGameFighters$(db);

  const doUpdateFighterScore$ = _(
    gameScore$,
    withLatestFrom(currentFighter$),
    switchMap(([score, fighter]) => {
      if (fighter.id) {
        return from(
          update(ref(db, `games/main/players/${fighter.id}`), {
            score: increment(score),
          })
        );
      } else {
        return Rx.EMPTY;
      }
    })
  ).subscribe();

  React.useEffect(() => {
    const app = new Pixi.Application(VIDEO);

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

    _(gameFighters$, tap(console.log)).subscribe();

    // Video Feed & Betting
    videoFeed$.subscribe((imgData) => {
      ctx!.putImageData(imgData, 0, 0);
      texture.baseTexture.update();
    });

    _(videoFeed$, detectTennisBall$).subscribe(
      (maybeCoords: Coordinates | null) => {
        if (maybeCoords) {
          const [x, y, w, h] = maybeCoords;

          tennis.position.x = x * VIDEO.width;
          tennis.position.y = y * VIDEO.height;
          tennis.width = w * VIDEO.width;
          tennis.height = h * VIDEO.height;
        }
      }
    );

    return () => {
      app.stage.removeChildren();
    };
  }, []);

  return (
    <>
      <RenderStream with={() => showFighterScore$(gameScore$)} />

      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `url(${bg}) no-repeat center bottom`,
          backgroundSize: "contain",
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
          />

          <RenderStream with={() => getBets$(bettingWindows$, betSelection$)} />
          <RenderStream
            with={() =>
              getBetOutcomes$(
                betSelection$,
                _(bettingWindows$, tap(log("serviceEvent")))
              )
            }
          />
          <RenderStream with={() => showFrameTimestamp$(frameTimestamps$)} />
        </div>
      </div>
    </>
  );
};

export default PongPage;
