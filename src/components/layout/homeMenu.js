import React from "react";
import SectionHeader from "../sectionHeader/index ";
import MenuItem from "../menu/MenuItem";

const HomeMenu = () => {
  return (
    <>
      <div>
        <SectionHeader subHeader="CHECK OUT" mainHeader="Our Best Seller"/>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </>
  );
};

export default HomeMenu;
