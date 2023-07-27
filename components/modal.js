import React, { useState } from "react";
import Button from "./button";

export default function Modal({
  preview,
  content,
  showModal,
  setShowModal,
  name,
}) {
  return showModal === name ? (
    <div className="w-screen h-screen fixed top-0 left-0 z-40 flex items-center justify-center">
      <button
        className="w-screen h-screen z-40 fixed top-0 left-0 bg-blue-950 bg-opacity-50 backdrop-blur-md"
        onClick={() => setShowModal("")}
      />
      {content}
    </div>
  ) : (
    <div onClick={() => setShowModal(name)}>{preview}</div>
  );
}
