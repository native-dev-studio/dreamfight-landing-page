import * as React from "react";
import { intervalToDuration } from "date-fns";
import { pipe as _ } from "fp-ts/lib/function";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

export function getGameCountdown$(): Observable<React.ReactNode> {
  return _(
    timer(0, 1000),
    map(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: new Date("2022-10-27T00:00:00Z"),
      });

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            userSelect: "none",
          }}
        >
          {[
            {
              label: "Days",
              labelSingular: "Day",
              value: duration.days,
            },
            {
              label: "Hours",
              labelSingular: "Hour",
              value: duration.hours,
            },
            {
              label: "Minutes",
              labelSingular: "Minute",
              value: duration.minutes,
            },
            {
              label: "Seconds",
              labelSingular: "Second",
              value: duration.seconds,
            },
          ].map(({ label, labelSingular, value }) => (
            <div
              style={{
                background: "#79359A",
                width: 96,
                textAlign: "center",
                borderRadius: 6,
                marginRight: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 50,
                  flex: 1,
                  paddingTop: 12,
                }}
              >
                {value}
              </span>

              <span
                style={{
                  fontSize: 10,
                  display: "block",
                  marginBottom: 12,
                  marginTop: 16,
                }}
              >
                {value === 1 ? labelSingular : label}
              </span>
            </div>
          ))}
        </div>
      );
    })
  );
}
