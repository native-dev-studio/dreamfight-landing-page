import { Observable, fromEvent, merge, from, of } from "rxjs";
import { scan, map, concatMap } from "rxjs/operators";
import { pipe as _ } from "fp-ts/lib/function";
import type { VideoPlayState } from "../types";

export function getPlayState$(
  videoEl: HTMLVideoElement
): Observable<VideoPlayState> {
  const videoPlayState$ = fromEvent(videoEl, "play");
  const videoPauseState$ = fromEvent(videoEl, "pause");

  // prettier-ignore
  return _(
    merge(
      _(videoPlayState$, map(() => true)),
      _(videoPauseState$, map(() => false))
    ),
    scan<boolean, VideoPlayState>(
      (_state, isPlaying) => (isPlaying ? "playing" : "paused"),
      "playing"
    )
  );
}

export function doPlayState$(
  videoPlayPauseIntents$: Observable<any>,
  videoEl?: HTMLVideoElement
) {
  return _(
    videoPlayPauseIntents$,
    concatMap(() => {
      if (videoEl?.paused) {
        return _(
          from(videoEl.play()),
          map(() => "played")
        );
      } else {
        videoEl?.pause();
        return of("paused");
      }
    })
  );
}
