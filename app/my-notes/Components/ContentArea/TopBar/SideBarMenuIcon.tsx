"use client";

import { useGlobalContext } from "@/ContextApi";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function SideBarMenuIcon() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();
  return (
    <>
      {!openSideBar ? (
        <MenuOutlinedIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-slate-500 cursor-pointer hidden max-md:block"
        />
      ) : (
        <CloseOutlinedIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="text-slate-500 cursor-pointer hidden max-md:block"
        />
      )}
    </>
  );
}

export default SideBarMenuIcon;
