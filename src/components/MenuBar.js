import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { isMobile } from "react-device-detect";

const MenuBar = () => {
  const [open, setOpen] = useState(isMobile ? false : true);

  const onChange = value => {
    setOpen(value);
  };

  return (
    <div>
      <Header onChange={onChange} />
      <SideBar open={open} onChange={onChange} />
    </div>
  );
};

export default MenuBar;
