import React, { memo } from "react";

const Hero = ({ img, name, supply, symbol }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt={symbol} className="w-44" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            {supply} {symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
