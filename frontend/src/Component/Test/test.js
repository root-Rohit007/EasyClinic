import React, { useEffect } from "react";
import { getTest } from "../../Actions/testActions";
import { useSelector, useDispatch } from "react-redux";

const Test = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispacth req");
    dispatch(getTest());
  }, [dispatch]);

  return <div>Test</div>;
};

export default Test;
