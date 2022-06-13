import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert ,list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert(); // i give it default parameters with false
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
