import React from "react";
import img from "./chatbot-kiu.gif";

const Img = () => {
  return (
    <>
      <img
        className="mt-5"
        src={img}
        alt="imagen-chatbot"
        width="auto"
        height="200px"
      />
    </>
  );
};

export default Img;
