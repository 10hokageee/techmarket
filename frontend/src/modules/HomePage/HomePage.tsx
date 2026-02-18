import React from "react";
import { Brands } from "../../components/Brands/Brands";
import { Slider } from "../../components/Slider/Slider";
import { ZipBlock } from "../../components/ZipBlock/ZipBlock";

export const HomePage = () => {
  return (
    <React.Fragment>
      <Slider />
      <ZipBlock />
      <Brands />
    </React.Fragment>
  );
};