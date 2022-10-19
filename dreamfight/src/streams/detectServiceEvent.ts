import { Observable, Subject } from "rxjs";
import { map, exhaustMap, takeUntil, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from './mockUtils';
import serviceEvents from '../data/serviceShot.json';

export enum BetStatus {
  Noop,
  Closed,
  Open,
  Submitted,
  Executed,
  //Settled
}

export enum ServiceOutcome {
  ServerWon,
  ReceiverWon,
  DoubleFault,
  Ace, 
}

export type BetTransitions = { 
  status: BetStatus,
  outcome: ServiceOutcome | null,
};


export function detectServiceEvents$(
  imageSource$: Subject<ImageData>
): Observable<BetTransitions> {
  return _(
    imageSource$,
    map((imdata: ImageData) => {
      const playheadIndex = generatePlayheadIndex(imdata);
      const [status, outcome] = serviceEvents[playheadIndex] as any;

      switch (outcome) {
        case "server_won":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.ServerWon };
        case "receiver_won":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.ReceiverWon };
        case "double_fault":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.DoubleFault };
        case "ace":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.Ace };
        case null:
          return { status: BetStatus.Noop, outcome: null };
        default:
          console.error(`unexpected outcome; got ${outcome}`);
          return { status: BetStatus.Noop, outcome: null };
      }
    })
  )
}
