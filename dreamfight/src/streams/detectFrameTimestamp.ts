import { Observable, Subject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from '../lib/mock';

export function detectFrameTimestamp$(
  imageSource$: Subject<ImageData>
): Observable<number> {
  return _(
    imageSource$,
    map((imdata: ImageData) => {
      const playheadIndex = generatePlayheadIndex(imdata);
      return playheadIndex;
    }),
    distinctUntilChanged((prev, curr) => prev === curr),
  )
}
