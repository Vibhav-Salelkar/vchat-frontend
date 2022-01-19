import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  return (
    <>
        <Navbar/>
    </>
  );
};

export default SideBar;
