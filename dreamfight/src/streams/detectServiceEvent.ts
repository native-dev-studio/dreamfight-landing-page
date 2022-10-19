import { Observable, Subject } from "rxjs";
import { distinctUntilChanged, map, exhaustMap, takeUntil, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from './mockUtils';
import serviceEvents from '../data/serviceShot.json';

export enum BetStatus {
  Noop      = 'noop',
  Closed    = 'closed',
  Open      = 'open',
  Submitted = 'submitted',
  Executed  = 'executed',
  //Settled
}

export enum ServiceOutcome {
  ServerWon   = "server_won",
  ReceiverWon = "receiver_won",
  DoubleFault = "double_fault",
  Ace         = "ace",
}

export type BetTransitions = { 
  status: BetStatus,
  outcome?: ServiceOutcome,
};


export function detectServiceEvents$(
  imageSource$: Subject<ImageData>
): Observable<BetTransitions> {
  return _(
    imageSource$,
    map((imdata: ImageData) => {
      const playheadIndex = generatePlayheadIndex(imdata);
      const [status, outcome] = serviceEvents[playheadIndex];

      switch (outcome) {
        case "server_won":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.ServerWon };
        case "receiver_won":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.ReceiverWon };
        case "double_fault":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.DoubleFault };
        case "ace":
          return { status: BetStatus.Executed, outcome: ServiceOutcome.Ace };
      }

      switch (status) {
        case "bet activated":
          return  { status: BetStatus.Open }
        case "bet locked":  // eg timeout
          return { status: BetStatus.Closed }
      }

      return { status: BetStatus.Noop };
    }),
    distinctUntilChanged((prev, curr) => {
      return prev.status == curr.status || curr.status == BetStatus.Noop;
    }),
  )
}
