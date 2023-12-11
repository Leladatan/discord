import React from 'react';
import {ClipLoader} from "react-spinners";

const Loading = () => {
  return (
    <div className="m-auto flex items-center justify-center w-full h-full">
      <ClipLoader color="#33e5ba" size={38} className="animate-spin" />
    </div>
  );
};

export default Loading;