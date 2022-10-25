import * as React from "react";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";

export function showFrameTimestamp$(
  source: Observable<number>
): Observable<React.ReactNode> {
  return _(
    source,
    map((ts) => (
      <span
        style={{
          fontSize: 12,
          fontFamily: "'SF Mono', monospace",
        }}
      >
        {ts}
      </span>
    ))
  );
}
