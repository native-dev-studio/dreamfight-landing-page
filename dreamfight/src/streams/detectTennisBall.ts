import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from "../lib/mock";
import { Coordinates } from "../types";
import tennisBallPositions from "../data/tennisBall.json";

export function detectTennisBall$(
  imageSource$: Observable<ImageData>
): Observable<Coordinates | null> {
  return _(
    imageSource$,
    map((imdata: ImageData) => {
      const playheadIndex = generatePlayheadIndex(imdata);
      const maybeCoords = tennisBallPositions[
        playheadIndex
      ] as Coordinates | null;
      return maybeCoords;
    })
  );
}
