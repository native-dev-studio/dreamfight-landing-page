import { Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from "../lib/mock";

export function detectFrameTimestamp$(
  imageSource$: Observable<ImageData>
): Observable<number> {
  return _(imageSource$, map(generatePlayheadIndex), distinctUntilChanged());
}
