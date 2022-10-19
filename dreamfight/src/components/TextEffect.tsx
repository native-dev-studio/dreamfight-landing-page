import React from "react";
import { BetOption } from "../types";

type TextEffectProps = {
  scale: number;
  bet: BetOption;
};

export function TextEffect(props: TextEffectProps) {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 50,
          transform: `scale(${props.scale}, ${props.scale})`,
        }}
      >
        Woooo! {props.bet.points} pts
      </h2>
    </div>
  );
}
