import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return <div>home{user.username}</div>;
};

export default Home;
