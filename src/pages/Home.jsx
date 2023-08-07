import React, { useState, useEffect, useContext } from "react";
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";
import { Context } from "../store/Context";
import MainBanner from "../components/MainBanner/MainBanner";
import BannerSection from "../components/BannerSection/BannerSection";
/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const context = useContext(Context);

  let email = "";
  if (context && context.user) {
    email = context.user.email;
  }

  return (
    <>
      <p>{context?.user?.email}</p>
      {/* <p>{email}</p> */}
      <MainBanner />
      <CustomCarousel />
      <BannerSection />
    </>
  );
};
