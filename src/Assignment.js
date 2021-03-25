import React from "react";
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

import markdown from "./../README.md";
import "./Assignment.scss";

const README = md.render(markdown);

export default function Assignment() {
  return (
    <div
      className="Assignment"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: "24px",
        background: "white",
        boxShadow:
          "0 1px 4px 0 rgba(0,0,0,.5)",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "auto"
      }}
      dangerouslySetInnerHTML={{
        __html: README
      }}
    />
  );
}
