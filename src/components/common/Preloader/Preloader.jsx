import React from "react";
// @ts-ignore
import preloader from "./../../../assets/images/preloader.svg";

const Preloader = () => {
  return (
    <div>
      <img
        src={preloader}
        style={{ backgroundColor: "white", width: "50px" }}
      />
    </div>
  );
};

export default Preloader;
