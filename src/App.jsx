import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import HotelsList from "./components/HotelsList/HotelsList";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/Pages/ErrorPage";
import SearchLayout from "./components/Layouts/SearchLayout";
import Hotels from "./components/Search/Hotels";

import Provider from "./components/Provider/Provider";
import SingleHotel from "./components/HotelsList/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkList from "./components/Bookmark/BookmarkList";

function App() {
  return (
    <div>
      <Provider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<HotelsList />} />
          <Route path="/search" element={<SearchLayout />}>
            <Route index element={<Hotels />} />
            <Route path="Hotels/:id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<BookmarkList />} />
            <Route path="add" element={<div>bookmark ADD</div>} />
          </Route>
          {/* <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
