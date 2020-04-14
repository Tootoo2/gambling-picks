import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return <div style={{ minHeight: "100%" }}>home{user.username}</div>;
};

export default Home;
