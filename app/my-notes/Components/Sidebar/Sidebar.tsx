"use client";

import React from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { SiCplusplus, SiJavascript, SiPython } from "react-icons/si";
import { useGlobalContext } from "@/ContextApi";
import getLanguageIcon from "@/app/utils/languageTextToIcon";
import { useClerk } from "@clerk/nextjs";

export default function Sidebar() {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar, setOpenSideBar },
    tagsAndLogoutMenuObject: { tagsAndLogoutMenu },
  } = useGlobalContext();

  const { signOut } = useClerk();

  return (
    <div
      className={`${openSideBar ? "fixed z-50 shadow-lg" : "max-md:hidden "} pr-10    p-6  flex-col gap-2  min-h-screen      pt-9 ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} `}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );

  function Logo() {
    return (
      <div className="flex gap-2 items-center">
        <div className={`bg-purple-600 p-[6px] rounded-md`}>
          <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
        </div>
        <div className="flex gap-1 text-[19px] ">
          <span className={`font-bold text-purple-600`}>Snippet</span>
          <span className="text-slate-400">Master</span>
        </div>
      </div>
    );
  }

  function QuickLinks() {
    const {
      sideBarMenuObject: { sideBarMenu, setSideBarMenu },
      openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    } = useGlobalContext();

    function clickedMenu(index: number) {
      const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
        if (i === index) {
          return { ...menu, isSelected: true };
        } else {
          return { ...menu, isSelected: false };
        }
      });

      setSideBarMenu(updatedSideBarMenu);
    }

    async function clickedTagsAndLogOutMenu(index: number) {
      if (index === 0) {
        setOpenTagsWindow(true);
      }

      if (index === 1) {
        console.log("clicked log out");

        await signOut();
      }
    }

    return (
      <div className="mt-20 text-sm">
        <div className="font-bold text-slate-400">Quick Links</div>
        <ul className="text-slate-400 mt-4 flex flex-col gap-2">
          {sideBarMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => clickedMenu(index)}
              className={`flex  cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-purple-600 text-white" : "text-slate-400 hover:text-purple-600"}  p-[7px] px-2 rounded-md w-[80%]`}
            >
              {menu.icons}
              <span>{menu.name}</span>
            </li>
          ))}
        </ul>

        <ul className="text-slate-400 mt-6 flex flex-col gap-2">
          {tagsAndLogoutMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => clickedTagsAndLogOutMenu(index)}
              className={`flex cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-purple-600 text-white " : "text-slate-400"}  p-[7px] px-2 rounded-md w-[80%] hover:text-purple-600`}
            >
              {menu.icons}
              <span>{menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Languages() {
  const {
    codeLanguageCounterObject: { codeLanguagesCounter },
  } = useGlobalContext();

  return (
    <div className="mt-12 text-sm">
      {codeLanguagesCounter.length > 0 && (
        <>
          <div className="font-bold text-slate-400">Languages</div>
          <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
            {codeLanguagesCounter.map((language, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2 items-center">
                  {getLanguageIcon(
                    capitalizeFirstOccurrence(language.language)
                  )}
                  <span> {capitalizeFirstOccurrence(language.language)}</span>
                </div>
                <span className="font-bold">{language.count}</span>
              </div>
            ))}

            {/* <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiCplusplus size={15} /> C++
          </div>
          <span className="font-bold">2</span>
        </div> */}
          </div>
        </>
      )}
    </div>
  );
}

function capitalizeFirstOccurrence(str: string) {
  if (!str) return str; // If the string is empty, return it as is.

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str; // If no non-space characters are found, return the string as is.
}
