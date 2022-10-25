import { pipe as _ } from "fp-ts/lib/function";
import { of, EMPTY, Observable, from } from "rxjs";
import { map, mergeMap, switchMap, tap, timestamp } from "rxjs/operators";
import { Database, get, ref, set } from "firebase/database";
import { object, list, QueryChange } from "rxfire/database";
import { Fighter } from "../types";
import { log } from "../lib/utils";
import { Option, none, some } from "fp-ts/lib/Option";

export function getCurrentFighterId$(): Observable<string | null> {
  return of(localStorage.getItem("playerId"));
}

export function getGameFighters$(
  db: Database // TODO: Move into IO block
): Observable<Array<Fighter>> {
  return _(
    list(ref(db, "games/main/players")),
    map<QueryChange[], Fighter[]>((s) =>
      s.map((v) => ({ id: v.snapshot.key, ...v.snapshot.val() }))
    )
  );
}

export function getCurrentFighter$(
  db: Database // TODO: Move into IO block
): Observable<Option<Fighter>> {
  return _(
    getCurrentFighterId$(),
    tap(log("id")),
    switchMap((id) => object(ref(db, `games/main/players/${id}`))),
    map((p) =>
      p.snapshot.exists()
        ? some({
            id: p.snapshot.key,
            ...p.snapshot.val(),
          })
        : none
    )
  );
}

export function createNewFighter$(db: Database): Observable<Fighter | null> {
  try {
    const newPlayerId = crypto.randomUUID();
    const playerRef = ref(db, `games/main/players/${newPlayerId}`);

    localStorage.setItem("playerId", newPlayerId);

    return _(
      from(
        set(playerRef, {
          msg: "Welcome!",
          joinedOn: timestamp(),
        })
      ),
      // Get the player we just created. Eventually this can be a subscription based on ID$
      mergeMap(() => from(get(playerRef))),
      map((snapshot): Fighter => snapshot.val())
    );
  } catch (e) {
    console.error(e);
    return EMPTY;
  }
}
