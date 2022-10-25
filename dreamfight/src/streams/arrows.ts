import { merge, fromEvent, Observable, combineLatest } from "rxjs";
import { map, tap, filter, startWith, scan } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";

type Point = [number, number];

export function getArrowPositions$(factor: number = 1): Observable<Point> {
  const x$ = _(
    merge(
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        filter((e) => e.code === "ArrowLeft"),
        tap((event) => event.preventDefault()),
        map(() => -1)
      ),
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        filter((e) => e.code === "ArrowRight"),
        tap((event) => event.preventDefault()),
        map(() => 1)
      )
    ),
    startWith(0),
    scan((a, b) => Math.max(0, a + b))
  );

  const y$ = _(
    merge(
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        filter((e) => e.code === "ArrowUp"),
        tap((event) => event.preventDefault()),
        map(() => -1)
      ),
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        filter((e) => e.code === "ArrowDown"),
        tap((event) => event.preventDefault()),
        map(() => 1)
      )
    ),
    startWith(0),
    scan((a, b) => Math.max(0, a + b))
  );

  return _(
    combineLatest([x$, y$]),
    map(([x, y]) => [x * factor, y * factor])
  );
}
