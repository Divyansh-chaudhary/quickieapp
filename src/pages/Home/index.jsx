import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Layout from "../../components/Layout";
import List from "../../components/List";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const clear = setTimeout(() => setSearchText(search), 500);

    return () => clearTimeout(clear);
  }, [search]);

  return (
    <Layout>
      <div className="p-3 flex gap-10 items-center">
        <p>Stock Details Table</p>
        <div className="flex items-center bg-slate-400 rounded-md w-72 h-9 pl-2">
          <FiSearch color="white" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-0 outline-none flex-1 text-white px-2 placeholder:text-yellow-100"
            type="search"
            placeholder="search by crypto symbol"
          />
        </div>
      </div>
      <List searchText={searchText} />
    </Layout>
  );
};

export default Home;
