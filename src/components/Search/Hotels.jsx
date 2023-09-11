import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";


export default function Hotels() {
  const [isLoading, data, currentHotel,current] = useHotels();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((hotel) => {
        return (
          <Link
            key={hotel.id}
            to={`hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
          >
            
            <div className={`searchItem ${ hotel.id === current.id ? "bg-green-200 rounded-3xl" : ""}`}>
              <img src={hotel.picture_url.url} alt="" />
              <div className="searchItemDesc">
                <p className="location">{hotel.smart_location}</p>
                <p className="name">{hotel.name}</p>
                <p className="price">
                  €&nbsp;{hotel.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
