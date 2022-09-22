import React, { memo } from "react";
import Hero from "./Hero";

const Heroes = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3">
      {data.map((item, i) => (
        <Hero
          img={item.icon_url}
          key={i}
          name={item.name}
          supply={item.max_supply}
          symbol={item.symbol}
        />
      ))}
    </div>
  );
};

export default memo(Heroes);
