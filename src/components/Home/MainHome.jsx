import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsideRight from "./AsideRight";
import Aside from "./Aside";
import { HomeCenter } from "./HomeCenter";
import UserPost from "../UserPost/UserPost";
import MapsView from "../maps/MapsView";


const MainHome = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const asyncFn = async () => {
      if (!localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    asyncFn();
  }, []);
  return (
    <>
      <section className="flex w-[100%] justify-center h-[100%] my-20 ">
        <Aside />
        <HomeCenter />
        <AsideRight />
      </section>
    </>
  );
};

export default MainHome;
