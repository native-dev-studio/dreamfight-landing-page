import * as React from "react";
import badgeSrc from "../images/badge.png";

export function Footer() {
  return (
    <footer className="footer">
      <img src={badgeSrc} alt="DF badge" className="footer-badge" />
      <p className="content">© 2022 DreamFight Inc. All rights reserved.</p>
    </footer>
  );
}
