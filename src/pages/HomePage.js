import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HomeFeature from "../module/home/HomeFeature";
import HomeBanner from "../module/home/HomeBanner";
import HomeAll from "../module/home/HomeAll";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <div>
      <Layout></Layout>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeAll></HomeAll>
    </div>
  );
};

export default HomePage;
