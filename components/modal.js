import React, { useState } from "react";
import Button from "./button";

export default function Modal({ text, content }) {
  const [showModal, setShowModal] = useState(false);

  return showModal ? (
    <div className="w-screen h-screen fixed top-0 left-0 z-30 flex items-center justify-center">
      <button
        className="w-screen h-screen z-40 fixed top-0 left-0 bg-blue-950 bg-opacity-50 backdrop-blur-md"
        onClick={() => setShowModal(false)}
      />
      {content}
    </div>
  ) : (
    <Button text={text} onClick={() => setShowModal(true)} />
  );
}
