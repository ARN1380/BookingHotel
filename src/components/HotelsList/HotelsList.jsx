import { useEffect } from "react";
import HotelCard from "./HotelCard";
import useFetch from "../../hooks/useFetch";

export default function HotelsList({ query }) {
  const [isLoading, data] = useFetch("http://localhost:5000/hotels", query);
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {!isLoading &&
          data.data.map((hotel) => {
            return (
              <HotelCard
                key={hotel.id}
                name={hotel.name}
                url={hotel.listing_url}
                price={hotel.price}
                smart_location={hotel.smart_location}
                picture_url={hotel.picture_url}
              />
            );
          })}
      </div>
    </div>
  );
}
