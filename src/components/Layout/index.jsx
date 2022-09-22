import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import Heroes from "../Heroes";

const Layout = ({ children }) => {
  const data = useSelector((state) => state.app.allData);
  return (
    <div>
      <Header />
      <main className="p-3 pt-5">
        <Heroes data={data.slice(0, 3)} />
        <div className="h-20"></div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
