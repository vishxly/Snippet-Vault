"use client";

import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { useGlobalContext } from "@/ContextApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SingleNoteType, SingleTagType } from "@/app/Types";
import toast from "react-hot-toast";
import EmptyPlaceHolder from "@/app/EmptyPlaceHolder";

function TagsWindow() {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");

  interface Tag {
    name: string;
  }

  interface TagCount {
    [key: string]: number;
  }

  const countTags = (
    notes: any[],
    allTags: Tag[]
  ): { name: string; count: number }[] => {
    // Initialize tagCount with all tags set to 0
    const tagCount: TagCount = allTags.reduce((acc: TagCount, tag) => {
      acc[tag.name] = 0;
      return acc;
    }, {});

    // Count occurrences of tags in notes
    notes.forEach((note) => {
      note.tags.forEach((tag: Tag) => {
        tagCount[tag.name]++;
      });
    });

    // Convert to array of objects and update "All" count
    return allTags
      .map((tag) => {
        if (tag.name === "All") {
          return { name: "All", count: allNotes.length }; // Set count to 7 for "All"
        }
        return { name: tag.name, count: tagCount[tag.name] };
      })
      .sort((a, b) => b.count - a.count);
  };

  const sortAllTags = (
    notes: SingleNoteType[],
    allTags: SingleTagType[]
  ): SingleTagType[] => {
    // First, get the count of tags
    const tagCounts = countTags(notes, allTags);

    // Create a map for quick lookup of counts
    const countMap = new Map(tagCounts.map((item) => [item.name, item.count]));

    // Sort the allTags array
    return [...allTags].sort((a, b) => {
      // Always keep "All" at the top
      if (a.name === "All") return -1;
      if (b.name === "All") return 1;

      // Sort by count (descending), then alphabetically if counts are equal
      const countDiff =
        (countMap.get(b.name) || 0) - (countMap.get(a.name) || 0);
      return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name);
    });
  };

  // Usage
  const sortedTags: SingleTagType[] = sortAllTags(allNotes, allTags);

  //This useEffect will clear the search query if something changes in the allTags Array
  useEffect(() => {
    setSearchQuery("");
  }, [allTags]);

  useEffect(() => {
    setAllTags(sortedTags);
  }, [allNotes]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "45px",
      }}
      className={`${openTagsWindow ? "fixed" : "hidden"} ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}    h-[600px] max-sm:w-[430px] w-[60%] z-40 p-9   shadow-md rounded-md`}
    >
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TagsList searchQuery={searchQuery} />
    </div>
  );
}

export default TagsWindow;

function Header() {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center  ">
      <div className="flex items-center gap-2">
        <StyleOutlinedIcon />
        <span className="text-lg font-bold  ">Tags</span>
      </div>
      <div onClick={() => setOpenTagsWindow(false)}>
        <CloseIcon
          sx={{ fontSize: 16 }}
          className="text-slate-400 cursor-pointer "
        />
      </div>
    </div>
  );
}

function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);

  return (
    <div className="flex  gap-5 items-center justify-between mt-11 relative ">
      <div
        className={`h-[42px] flex items-center text-sm  rounded-md  pl-3 gap-1 w-[85%] ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"}  `}
      >
        <SearchRoundedIcon className="text-slate-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          placeholder="Search a tag..."
          className="bg-transparent outline-none w-full font-light"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className="bg-purple-600 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-[25%]"
      >
        <AddOutlinedIcon sx={{ fontSize: 17 }} />
        <span className="max-md:hidden">Add Tag</span>
      </button>
    </div>
  );
}

function TagsList({ searchQuery }: { searchQuery: string }) {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
  } = useGlobalContext();

  const filterAllItemFromAllTags = allTags.filter((tag) => tag.name !== "All");
  const filterAllTagsBasedOnSearchQuery = filterAllItemFromAllTags.filter(
    (tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`rounded-md select-none p-3   ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"} h-[380px] overflow-auto mt-9 flex flex-col gap-4`}
    >
      {filterAllItemFromAllTags.length === 0 && (
        <EmptyPlaceHolder
          muiIcon={
            <StyleOutlinedIcon
              sx={{ fontSize: 66 }}
              className="text-slate-400"
            />
          }
          text={
            <span className="text-slate-400 font-light">
              No tags has been created yet...
            </span>
          }
        />
      )}
      {/*  */}
      {filterAllTagsBasedOnSearchQuery.length === 0 &&
        filterAllItemFromAllTags.length !== 0 && (
          <EmptyPlaceHolder
            muiIcon={
              <SearchRoundedIcon
                sx={{ fontSize: 66 }}
                className="text-slate-400"
              />
            }
            text={<span className="text-slate-400">No Tags Found</span>}
          />
        )}
      {filterAllTagsBasedOnSearchQuery.map((tag, index) => (
        <div key={index}>
          <SingleTag tag={tag} />
        </div>
      ))}
    </div>
  );
}

function SingleTag({ tag }: { tag: SingleTagType }) {
  const {
    darkModeObject: { darkMode },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { tagsClicked, setTagsClicked },
  } = useGlobalContext();

  function openTagWindow(tag: SingleTagType) {
    setOpenNewTagsWindow(true);
    setSelectedTagToEdit(tag);
  }

  //This function count how many this tag found in all notes
  function countTagInAllNotes(tag: SingleTagType) {
    let count = 0;
    allNotes.forEach((note) => {
      if (note.tags.some((t) => t.name === tag.name)) {
        count++;
      }
    });
    return count;
  }

  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} p-2 rounded-lg flex gap-3 items-center justify-between px-4 `}
    >
      <div className="flex gap-3 items-center">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold">{tag.name}</span>
          <span className="text-slate-400 text-[12px]">
            {countTagInAllNotes(tag)} Snippets
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
          <EditRoundedIcon
            onClick={() => openTagWindow(tag)}
            className=" text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>

        <div
          onClick={() =>
            deleteTag(
              tag,
              allTags,
              setAllTags,
              allNotes,
              setAllNotes,
              tagsClicked,
              setTagsClicked
            )
          }
          className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <DeleteRoundedIcon
            className=" text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>
      </div>
    </div>
  );
}

async function updateNote(note: SingleNoteType, tagToRemove: string) {
  const updatedTags = note.tags.filter(
    (t) => t.name.toLowerCase() !== tagToRemove.toLowerCase()
  );
  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    }
  );

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote.note;
}

async function deleteTag(
  tag: SingleTagType,
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  tagsClicked: string[],
  setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    // Step 1: Delete tag from database
    const deleteTagResponse = await fetch(`/api/tags?tagId=${tag._id}`, {
      method: "DELETE",
    });

    if (!deleteTagResponse.ok) {
      const errorData = await deleteTagResponse.json();
      throw new Error(errorData.message || "Failed to delete tag");
    }

    // Step 2: Update all notes that contain this tag
    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, tag.name)
    );

    const updatedNotes = await Promise.all(updatePromises);

    // Step 3: Update local state
    const updatedAllTags = allTags.filter(
      (t) => t.name.toLowerCase() !== tag.name.toLowerCase()
    );
    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.filter(
          (t) => t.name.toLowerCase() !== tag.name.toLowerCase()
        ),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setTagsClicked(
      tagsClicked.filter((t) => t.toLowerCase() !== tag.name.toLowerCase())
    );

    toast.success("Tag has been deleted successfully");
  } catch (error) {
    console.error("Error deleting tag:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to delete tag or update notes"
    );
  }
}
