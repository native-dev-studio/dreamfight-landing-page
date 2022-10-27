import * as React from "react";
import { of, fromEvent, timer, concat, Observable, Subject } from "rxjs";
import { filter, map, exhaustMap, takeUntil, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";

export function showFrameTimestamp$(
  source: Observable<number>,
): Observable<React.ReactNode> {
  return _(
    source,
    map(ts => {
      return (
        <aside style={{ position: 'absolute', top: 15, left: 0 }} className='text-lg'>
          Frame timestamp: {ts}
        </aside>
      )
    })
  );
}
