import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const bookmarkContext = createContext();

export default function BookmarksProvider({ children }) {
  let [isLoading, data] = useFetch("http://localhost:5000/bookmarks");
  if (isLoading) return <div>Loading...</div>;

  function addBookmark(newBookmark) {
    axios
      .post("http://localhost:5000/bookmarks", newBookmark)
      .then((response) => {})
      .catch((error) => {
        toast.error("couldn't save your bookmark!");
        console.log(error.response.data);
      });
    
  }

  function getBookmark(id) {
    const bookmark = data.data.find(
      (bookmark) => bookmark.id.toString() === id
    );

    return bookmark;
  }
  return (
    <bookmarkContext.Provider value={[data.data, addBookmark, getBookmark]}>
      {children}
    </bookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(bookmarkContext);
}

function useForceUpdate() {
  const [, setToggle] = useState(false);
  return () => setToggle((toggle) => !toggle);
}
