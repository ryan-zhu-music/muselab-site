import ReactJson from "react-json-view";
import React from "react";

export default function JsonPreview({ json }) {
  return (
    <div className="w-full overflow-y-scroll">
      <ReactJson src={json} theme="harmonic" style={{ width: "100%" }} />
    </div>
  );
}
