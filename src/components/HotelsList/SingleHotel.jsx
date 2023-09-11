import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

export default function SingleHotel() {
  const hotelId = useParams().id;
  const [isLoading, data, currentHotel, current] = useHotels();
  if (isLoading) {
    return <div>lodaing ...</div>;
  }

  
  const singleHotel = data.find((hotel) => {
    return hotel.id === hotelId;
  });
  useEffect(()=>{
    currentHotel(singleHotel);
  },[])

  return (
    <div className="text-sm">
      <h4 className="font-bold">{singleHotel.name}</h4>
      <div className="flex text-xs mt-1">
        <p>{singleHotel.number_of_reviews} reviews &bull; </p>
        <p className="pl-1">{singleHotel.host_location}</p>
      </div>
      <img
        className="rounded-xl mt-2 w-full"
        src={singleHotel.picture_url.url}
        alt=""
      />
    </div>
  );
}
