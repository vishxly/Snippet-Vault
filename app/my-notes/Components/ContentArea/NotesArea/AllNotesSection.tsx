import React, { useEffect, useLayoutEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Checkbox, IconButton } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SiJavascript, SiPython, SiCplusplus } from "react-icons/si";
import {
  materialDark,
  materialLight,
  atomDark,
  oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useGlobalContext } from "@/ContextApi";
import { SingleNoteType, SingleTagType } from "@/app/Types";
import getLanguageIcon from "@/app/utils/languageTextToIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import ReplayIcon from "@mui/icons-material/Replay";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import EmptyPlaceHolder from "@/app/EmptyPlaceHolder";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Masonry from "react-masonry-css";
function AllNotesSection() {
  const {
    allNotesObject: { allNotes },
    isMobileObject: { isMobile },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sideBarMenuObject: { sideBarMenu },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    searchQueryObject: { searchQuery, setSearchQuery },
    isLoadingObject: { isLoading },
    showPlaceHolderObject: { showPlaceHolder },
    selectedNoteObject: { selectedNote, setSelectedNote },
  } = useGlobalContext();

  const filterIsTrashedNotes = allNotes.filter(
    (note) => note.isTrash === false
  );

  const [filteredNotes, setFilteredNotes] = useState(
    allNotes.filter((note) => note.isTrash === false)
  );

  const [isSearching, setIsSearching] = useState(false);

  const [showSkeleton, setShowSkeleton] = useState(true);

  //Update the filteredNotes based on the searchQuery
  useEffect(() => {
    setIsSearching(searchQuery !== "");

    if (sideBarMenu[0].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }

    if (sideBarMenu[1].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash && note.isFavorite)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearching === false) {
      if (sideBarMenu[0].isSelected) {
        setFilteredNotes(filterIsTrashedNotes);

        setTagsClicked(["All"]);
      }

      if (sideBarMenu[1].isSelected) {
        setFilteredNotes(
          allNotes.filter((note) => !note.isTrash && note.isFavorite)
        );
      }
    }
  }, [isSearching]);

  //This useEffect will trigger this code, whenever we make a change in the all Notes
  useEffect(() => {
    //If all Snippets is selected, show all the snippets that are not trashed
    if (sideBarMenu[0].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        setFilteredNotes(allNotes.filter((note) => !note.isTrash));
        return;
      }
      //Filter out based on the tagsClickedArray
      if (tagsClicked.length > 0) {
        const updateNotes = allNotes
          .filter((note) => {
            return tagsClicked.every((selectedTag) =>
              note.tags.some((noteTag) => noteTag.name === selectedTag)
            );
          })
          .filter((note) => !note.isTrash);

        setFilteredNotes(updateNotes);
      }
      // setFilteredNotes(allNotes.filter((note) => !note.isTrash));
    }

    //If favorite is selected, and we make a note as favorite and not trashed
    if (sideBarMenu[1].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter(
          (note) => !note.isTrash && note.isFavorite
        );
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag)
          );
        })
        .filter((note) => !note.isTrash && note.isFavorite);

      setFilteredNotes(updateNotes);
    }

    if (sideBarMenu[2].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter((note) => note.isTrash);
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag)
          );
        })
        .filter((note) => note.isTrash);

      setFilteredNotes(updateNotes);
    }
  }, [allNotes, tagsClicked]);

  useLayoutEffect(() => {
    if (openContentNote) {
      setOpenContentNote(false);
    }
    //If all Snippets is selected
    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(filterIsTrashedNotes);
    }
    //If favorite is selected, filter favorite notes
    if (sideBarMenu[1].isSelected) {
      const filteredFavoriteNotes = allNotes.filter(
        (note) => !note.isTrash && note.isFavorite
      );
      setFilteredNotes(filteredFavoriteNotes);
    }

    //If trashed is selected
    if (sideBarMenu[2].isSelected) {
      const filteredTrashedNotes = allNotes.filter((note) => note.isTrash);
      setFilteredNotes(filteredTrashedNotes);
    }
  }, [sideBarMenu]);

  function ShimmerNoteEffect() {
    return (
      <div className="h-[380px] w-[300px] bg-white rounded-md flex flex-col  ">
        {/* Header */}
        <div className="flex justify-between px-5 pt-5">
          <div className="w-1/2 h-7 bg-slate-100 rounded-sm"></div>
          <div className="w-7 h-7 bg-slate-100 rounded-sm"></div>
        </div>

        {/* code */}

        <div className="h-[230px] mt-12 w-full bg-slate-200  "></div>
      </div>
    );
  }

  const [displayNotes, setDisplayNotes] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setDisplayNotes(true);
    } else {
      setDisplayNotes(false);
    }
  }, [isLoading]);

  return (
    <div
      className={`mt-5 ${isMobile || openContentNote ? "grid grid-cols-1" : "flex flex-wrap"}  gap-6  `}
    >
      {sideBarMenu[0].isSelected && (
        <>
          {isLoading ? (
            // Show loading shimmer effects when loading
            <>
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
            </>
          ) : (
            <>
              {filteredNotes.filter((note) => !note.isTrash).length === 0 &&
              !isLoading ? (
                isSearching ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <SearchOutlinedIcon
                        className="text-slate-400"
                        sx={{ fontSize: 110 }}
                      />
                    }
                    text={
                      <span className="text-slate-400 text-md text-center">
                        Snippets not found
                      </span>
                    }
                  />
                ) : tagsClicked.filter((tag) => tag !== "All").length > 0 ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <StyleOutlinedIcon
                        className="text-slate-400"
                        sx={{ fontSize: 110 }}
                      />
                    }
                    text={
                      <span className="text-slate-400 text-md text-center">
                        It looks like there are no <br /> snippets with these
                        tags.
                      </span>
                    }
                  />
                ) : (
                  <>
                    <EmptyPlaceHolder
                      muiIcon={
                        <TextSnippetOutlinedIcon
                          className="text-slate-400"
                          sx={{ fontSize: 110 }}
                        />
                      }
                      text={
                        <span className="text-slate-400 text-md text-center">
                          It looks like there are no <br /> snippets right now.
                        </span>
                      }
                      isNew={true}
                    />
                  </>
                )
              ) : (
                displayNotes &&
                filteredNotes.map((note, noteIndex) => (
                  <div key={noteIndex}>
                    <SingleNote note={note} />
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}

      {sideBarMenu[1].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : isSearching ? (
            <EmptyPlaceHolder
              muiIcon={
                <SearchOutlinedIcon
                  className="text-slate-400"
                  sx={{ fontSize: 110 }}
                />
              }
              text={
                <span className="text-slate-400 text-md text-center">
                  Snippets not found
                </span>
              }
            />
          ) : (
            <EmptyPlaceHolder
              muiIcon={
                <FavoriteBorderOutlinedIcon
                  className="text-slate-400 text-md"
                  sx={{ fontSize: 110 }}
                />
              }
              text={
                <span className="text-slate-400 text-md text-center text-md ">
                  Currently, there are no snippets <br /> marked as favorites.
                </span>
              }
            />
          )}
        </>
      )}

      {sideBarMenu[2].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <>
              <EmptyPlaceHolder
                muiIcon={
                  <DeleteOutlineOutlined
                    className="text-slate-400"
                    sx={{ fontSize: 110 }}
                  />
                }
                text={
                  <span className="text-slate-400 text-md text-center ">
                    No snippets have been trashed.
                  </span>
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNoteType }) {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { openContentNote },
    selectedNoteObject: { selectedNote },
    allNotesObject: { allNotes },
  } = useGlobalContext();

  const {
    _id,
    title,
    creationDate,
    tags,
    description,
    code,
    isFavorite,
    isTrash,
    language,
  } = note;

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} ${openContentNote ? "w-full" : "w-[390px]"} 
      max-sm:w-full rounded-md py-4   hover:translate-y-[-1px] ${selectedNote?._id === _id && !selectedNote.isTrash ? "border border-purple-600" : ""} `}
    >
      <NoteHeader
        id={_id}
        title={title}
        isFavorite={isFavorite}
        isTrashed={isTrash}
      />
      <NoteDate creationDate={creationDate} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NoteFooter language={language} note={note} />
    </div>
  );
}

function NoteHeader({
  id,
  title,
  isFavorite,
  isTrashed,
}: {
  id: string;
  title: string;
  isFavorite: boolean;
  isTrashed: boolean;
}) {
  const {
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote, selectedNote },
    isNewNoteObject: { setIsNewNote },
    searchQueryObject: { setSearchQuery },
  } = useGlobalContext();

  function clickedNoteTitle() {
    // Getting the note based on the id
    const findTheNote = allNotes.find((note) => note._id === id);

    if (findTheNote) {
      setSelectedNote(findTheNote);
    }
    // Opening up the content note component only if the note is not trashed
    if (!isTrashed) {
      setOpenContentNote(true);
    }

    setIsNewNote(false);

    // Scroll the window to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchQuery("");
  }

  async function handleClickedCheckbox() {
    const currentFavorite = isFavorite;
    const newFavorite = !currentFavorite;

    try {
      const response = await fetch(`/api/snippets?snippetId=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: newFavorite }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, isFavorite: newFavorite } : note
        )
      );

      setSearchQuery("");
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Optionally, revert the UI change if the API call fails
      // setIsFavorite(currentFavorite);
    }
  }

  return (
    <div className="flex  justify-between   items-center     mx-4 ">
      <span
        onClick={() => clickedNoteTitle()}
        className={`font-bold text-lg  w-[90%]     cursor-pointer hover:text-purple-600 `}
      >
        {truncateString(title, 60)}
      </span>

      {!isTrashed && (
        <Checkbox
          icon={
            <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
          }
          checkedIcon={
            <FavoriteIcon className="text-purple-600 cursor-pointer" />
          }
          checked={isFavorite}
          onClick={handleClickedCheckbox}
        />
      )}
    </div>
  );
}

function NoteTags({ tags }: { tags: SingleTagType[] }) {
  return (
    <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex    gap-1 mt-4 ">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-purple-100 text-purple-600 p-1 rounded-md px-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}

function NoteDate({ creationDate }: { creationDate: string }) {
  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span className="">{getDateOnly(creationDate)}</span>
    </div>
  );

  function getDateOnly(dateTimeString: string) {
    // Split the date-time string and return only the date part
    const [date, time] = dateTimeString.split(", ");
    return date; // Keep the month, day, and year part
  }
}

function NoteDescription({ description }: { description: string }) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`${darkMode[1].isSelected ? "text-white" : ""} text-slate-600 text-[13px] mt-4 mx-4`}
    >
      <span className="pre-wrap">{truncateString(description, 200)}</span>
    </div>
  );
}

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="rounded-md overflow-hidden text-sm ">
      <SyntaxHighlighter
        language={"javascript"}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {truncateString(code, 300)}
      </SyntaxHighlighter>
    </div>
  );
};

function NoteFooter({
  language,
  note,
}: {
  language: string;
  note: SingleNoteType;
}) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
    openConfirmationWindowObject: {
      setOpenConfirmationWindow,
      openConfirmationWindow,
    },
    selectedNoteObject: { setSelectedNote },
    showPlaceHolderObject: { setShowPlaceHolder },
    openContentNoteObject: { openContentNote, setOpenContentNote },
  } = useGlobalContext();

  async function trashNoteFunction() {
    if (note.isTrash) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);

      return;
    }

    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? { ...n, isTrash: true } : n))
      );

      setShowPlaceHolder(true);

      toast((t) => (
        <div className={`flex gap-2 items-center`}>
          <span className="text-sm">Note has been moved to trash</span>
          <button
            className="bg-purple-600 p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center"
            onClick={() => {
              toast.dismiss(t.id);
              resetNoteFunction(note._id);
            }}
          >
            <ReplayIcon sx={{ fontSize: 17 }} />
            <span>Undo</span>
          </button>
        </div>
      ));
    } catch (error) {
      console.error("Error moving note to trash:", error);
      // Optionally, show an error toast to the user
    }
  }

  async function resetNoteFunction(noteId: string) {
    try {
      const response = await fetch(`/api/snippets?snippetId=${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: false }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === noteId ? { ...n, isTrash: false } : n))
      );

      setShowPlaceHolder(false);

      toast.success("Note restored from trash");
    } catch (error) {
      console.error("Error restoring note from trash:", error);
      // Optionally, show an error toast to the user
    }
  }

  return (
    <div className=" flex justify-between   text-[13px] text-slate-400 mx-4 mt-3">
      <div className="flex gap-1 items-center">
        {getLanguageIcon(language)}
        <span>{language}</span>
      </div>
      <div className="flex gap-2 items-center">
        {note.isTrash && (
          <RestoreFromTrashOutlinedIcon
            onClick={() => resetNoteFunction(note._id)}
            sx={{ fontSize: 17 }}
            className="cursor-pointer"
          />
        )}

        <DeleteRoundedIcon
          onClick={trashNoteFunction}
          sx={{ fontSize: 17 }}
          className={`cursor-pointer ${note.isTrash && "text-purple-600"} ${openContentNote ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
}

function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
