"use client";

import React from "react";
import ProfileUser from "./TopBar/ProfileUser";
import SearchBar from "./TopBar/SearchBar";
import DarkMode from "./TopBar/DarkMode";
import { useGlobalContext } from "@/ContextApi";
import SideBarMenuIcon from "./TopBar/SideBarMenuIcon";
import SwiperSelection from "./NotesArea/SwiperSelection";
import AllNotesSection from "./NotesArea/AllNotesSection";
import ContentNote from "../ContentNote/ContentNote";
import TagsWindow from "../TagsWindow/TagsWindow";

function ContentArea() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`w-full ${darkMode[1].isSelected ? "bg-black" : "bg-slate-100"} p-5 `}
    >
      <TopBar />
      <NotesArea />
    </div>
  );
}

export default ContentArea;

function TopBar() {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-black text-white" : "bg-white"} rounded-lg flex justify-between items-center  p-3`}
    >
      <ProfileUser />
      <SearchBar />
      <div className="flex gap-4   items-center">
        <DarkMode />
        {isMobile && <SideBarMenuIcon />}
      </div>
    </div>
  );
}

function NotesArea() {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div className=" flex gap-2 mt-5">
      <div
        className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"}`}
      >
        <SwiperSelection />
        <AllNotesSection />
      </div>
      <ContentNote />
    </div>
  );
}
