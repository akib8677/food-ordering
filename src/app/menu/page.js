"use client";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeader from "@/components/sectionHeader/index ";
import React from "react";

const MenuPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [menuItems, setMenuItems] = React.useState([]);

  React.useEffect(() => {
    getCategories();
    getMenuItems();
  }, []);

  const getCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((data) => {
        setCategories(data);
      });
    });
  };

  const getMenuItems = () => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((data) => {
        setMenuItems(data);
      });
    });
  };
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c, i) => (
          <div key={i}>
            <div className="text-center">
              <SectionHeader mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item, j) => {
                  return <MenuItem item={item} key={j} />;
                })}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
