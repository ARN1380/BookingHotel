import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";

const bookmarkContext = createContext();

export default function BookmarksProvider({ children }) {
  const [isLoading, data] = useFetch("http://localhost:5000/bookmarks");
  if(isLoading) return <div>Loading...</div>
  
  function addBookmark(id) {}

  return (
    <bookmarkContext.Provider value={[data.data, addBookmark]}>
      {children}
    </bookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(bookmarkContext);
}
