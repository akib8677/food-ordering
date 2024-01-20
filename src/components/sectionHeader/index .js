import React from "react";

const SectionHeader = ({subHeader, mainHeader}) => {
  return (
    <div className="text-center">
      <h3 className="font-semibold text-gray-500 leading-4">{subHeader}</h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </div>
  );
};

export default SectionHeader;
