import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarksProvider";
import { Link } from "react-router-dom";


export default function BookmarkList() {
  const [bookmarks, addBookmark] = useBookmarks();

  
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((bookmark) => {
          return (
            <Link key={bookmark.id} to={`${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`} >
              <div className="bookmarkItem justify-start">
                <ReactCountryFlag svg countryCode={bookmark.countryCode} />
                &nbsp; <strong>{bookmark.cityName}</strong> &nbsp;{" "}
                <span>{bookmark.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
