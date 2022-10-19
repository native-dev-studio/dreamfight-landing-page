import * as React from "react";
import ease, { presets } from "rx-ease";
import { of, fromEvent, timer, concat, Observable, Subject } from "rxjs";
import { filter, map, exhaustMap, takeUntil, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { Bet } from "../components/Bet";
import { BetStatus, BetTransitions, BetOption } from "../types";
import { IDS } from "../constants";
import { TextEffect } from "../components/TextEffect";

type ServiceShot = {
  type: "serviceShot";
  durationMS: number;
  options: Array<BetOption>;
};

const STUB_SERVICE_SHOT: ServiceShot = {
  type: "serviceShot",
  durationMS: 4_000,
  options: [
    { label: "Ace", points: 20 },
    { label: "In", points: 5 },
    { label: "Fault", points: 2 },
  ],
};

export function getBets$(
  source: Observable<BetTransitions>,
  betSelection$: Subject<BetOption>,
): Observable<React.ReactNode> {
  return _(
    _(
      source,
      filter(betTransition => betTransition.status == BetStatus.Open),
      map(() => STUB_SERVICE_SHOT)
    ),
    exhaustMap((bet) => {
      const durationTimer$ = timer(bet.durationMS);

      return concat(
        _(
          timer(0, 1000),
          map((timerIndex) => (
            <div style={{ position: "absolute", top: 48, left: 48 }}>
              <Bet
                index={timerIndex}
                duration={bet.durationMS - timerIndex * 1000}
                options={bet.options}
                onSelect={(x) => {
                  betSelection$.next(x);
                }}
              />
            </div>
          )),
          takeUntil(betSelection$),
          takeUntil(durationTimer$),
        ),
        of(null) // Reset UI
      );
    })
  );
}

export function getBetOutcomes$(
  betSelection$: Subject<BetOption>
): Observable<React.ReactNode> {
  return _(
    betSelection$,
    concatMap((bet) => {
      const durationTimer$ = timer(2000);

      return concat(
        _(
          timer(0, 1000),
          ease(presets.gentle[0], presets.gentle[1]),
          map((n) => <TextEffect scale={n} bet={bet} />),
          takeUntil(durationTimer$)
        ),
        of(null) // Reset UI
      );
    })
  );
}
