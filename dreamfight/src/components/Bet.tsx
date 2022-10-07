import React from "react";
import { BetOption } from "../types";

type BetProps = {
  duration: number;
  index: number;
  options: Array<BetOption>;
  onSelect: (option: BetOption) => void;
};

export function Bet(props: BetProps) {
  return (
    <div style={{ position: "absolute", padding: 30 }}>
      <span style={{ fontSize: 24 }}>Service Shot ({props.duration}s)</span>
      <span>index: {props.index}</span>

      {props.options.map((s) => (
        <button
          // id={IDS.buttonA}
          id={`button-${s.label}`}
          key={s.label}
          // key={
          onClick={() => {
            props.onSelect(s);
          }}
          style={{
            borderRadius: 6,
            paddingLeft: 12,
            paddingRight: 12,
            height: 64,
            width: 160,
            marginBottom: 16,
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            background:
              "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.05))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: "bold" }}>{s.label}</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {s.points}
            <span style={{ fontWeight: "normal" }}>pts</span>
          </span>
        </button>
      ))}
    </div>
  );
}
