import * as React from "react";
import ease, { presets } from "rx-ease";
import { pipe as _ } from "fp-ts/lib/function";
import {
  withLatestFrom,
  of,
  timer,
  concat,
  Observable,
  Subject,
  race,
} from "rxjs";
import {
  filter,
  map,
  takeUntil,
  concatMap,
  windowToggle,
  switchAll,
  scan,
} from "rxjs/operators";
import { Bet } from "../components/Bet";
import {
  BetStatus,
  BetTransitions,
  BetOption,
  ServiceOutcome,
  Fighter,
} from "../types";
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
    { label: "Ace", points: 20, guess: ServiceOutcome.Ace },
    { label: "In", points: 5, guess: ServiceOutcome.ServerWon },
    { label: "Fault", points: 2, guess: ServiceOutcome.DoubleFault }, // do we not have a fault option??
  ],
};

const UI_RESET = of(null);

export function getBets$(
  source: Observable<BetTransitions>,
  betSelection$: Subject<BetOption>
): Observable<React.ReactNode> {
  const betUI$ = _(
    timer(0, 1000),
    map((timerIndex) => {
      const bet = STUB_SERVICE_SHOT;

      return (
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
      );
    })
  );

  const betOpen$ = _(
    source,
    filter((bet) => bet.status == BetStatus.Open)
  );

  const betClose$ = () =>
    race(
      betSelection$,
      _(
        source,
        filter((bet) => bet.status === BetStatus.Closed)
      )
    );

  return _(
    betUI$,
    windowToggle(betOpen$, betClose$),
    map((uiWindow) => concat(uiWindow, UI_RESET)),
    switchAll()
  );
}

export function getBetOutcomes$(
  betSelection$: Observable<BetOption>,
  betTransitions$: Observable<BetTransitions>
): Observable<React.ReactNode> {
  return _(
    betTransitions$,
    filter((transition) => transition.status == BetStatus.Executed),
    withLatestFrom(betSelection$),
    concatMap(([executed, selectedBet]) => {
      const durationTimer$ = timer(2000);

      return executed.outcome === selectedBet.guess
        ? concat(
            _(
              timer(0, 1000),
              ease(presets.gentle[0], presets.gentle[1]),
              map((n) => <TextEffect scale={n} bet={selectedBet} />),
              takeUntil(durationTimer$)
            ),
            UI_RESET
          )
        : UI_RESET;
    })
  );
}

// TODO: -> getGameScore$
export function getFighterScore$(
  betSelection$: Observable<BetOption>,
  betTransitions$: Observable<BetTransitions>
): Observable<number> {
  return _(
    betTransitions$,
    filter((betTransition) => betTransition.status == BetStatus.Executed),
    withLatestFrom(betSelection$),
    scan((total, [executed, selectedBet]) => {
      return (
        total +
        (selectedBet.guess === executed.outcome ? selectedBet.points : 0)
      );
    }, 0)
  );
}

export function showFighterScore$(
  fighterScore$: Observable<number>
): Observable<React.ReactNode> {
  return _(
    fighterScore$,
    map((score) => (
      <h1 style={{ position: "absolute", top: 12, right: 12 }}>{score}</h1>
    ))
  );
}
