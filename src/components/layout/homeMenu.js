"use client";
import React from "react";
import SectionHeader from "../sectionHeader/index ";
import MenuItem from "../menu/MenuItem";

const HomeMenu = () => {
  const [menuItems, setMenuItems] = React.useState([]);
  React.useEffect(() => {
    getMenuItems();
  }, []);

  const getMenuItems = () => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((data) => {
        setMenuItems(data);
      });
    });
  };
  return (
    <>
      <div>
        <SectionHeader subHeader="CHECK OUT" mainHeader="Our Best Seller" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {menuItems.length > 0 &&
          menuItems.slice(2, 5).map((item, index) => {
            return (
              <div key={index}>
                <MenuItem item={item} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeMenu;
