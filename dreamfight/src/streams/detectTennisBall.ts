import { Observable, Subject } from "rxjs";
import { map, exhaustMap, takeUntil, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import { generatePlayheadIndex } from './mockUtils';
import tennisBallPositions from '../data/tennisBall.json';

export type Coordinates = [
  number,
  number,
  number,
  number
];

export type MaybeCoordinates = Coordinates | null;


export function detectTennisBall$(
  imageSource$: Subject<ImageData>
): Observable<MaybeCoordinates> {
  return _(
    imageSource$,
    map((imdata: ImageData) => {
      const playheadIndex = generatePlayheadIndex(imdata);
      const maybeCoords = tennisBallPositions[playheadIndex] as MaybeCoordinates;
      return maybeCoords;
    })
  )
}
