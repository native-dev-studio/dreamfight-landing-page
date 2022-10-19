import { merge, fromEvent } from "rxjs";
import { scan, map, tap, filter, startWith } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { clamp } from "../pages/utils";

export function getArrows$() {
  return _(
    merge(
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        tap((event) => event.preventDefault()),
        filter((e) => e.code === "ArrowUp"),
        map(() => -1)
      ),
      _(
        fromEvent<KeyboardEvent>(document, "keydown"),
        tap((event) => event.preventDefault()),
        filter((e) => e.code === "ArrowDown"),
        map(() => 1)
      )
    ),
    startWith(0),
    scan((a, b) => clamp(a + b, 0, 4))
  );
}
