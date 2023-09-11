import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function Map({ locations }) {
  const [mapCenter, setMapCenter] = useState(["50", "4"]);

  const [searchParams, setSearchParams] = useSearchParams();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  useEffect(() => {
    if (latitude && longitude) setMapCenter([latitude, longitude]);
  }, [longitude, latitude]);

  const {
    position: userPosition,
    isLoading: positionIsLoading,
    getUserLocation,
  } = useGeoLocation();

  useEffect(() => {
    if (userPosition?.lat && userPosition?.lng) {
      setMapCenter([userPosition.lat, userPosition.lng]);
    }
  }, [userPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getUserLocation}>
          {positionIsLoading ? "Loading ..." : "my Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <AddBookmarkOnMap />

        <ChangeCenter position={mapCenter} />
        {locations.map((hotel) => {
          return (
            <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
              <Popup>
                <div className="flex flex-col items-center justify-center">
                  {" "}
                  <p className="font-bold">{hotel.host_location}</p>{" "}
                  <p className="text-xs">
                    {hotel.latitude?.slice(0, 6)},{" "}
                    {hotel.longitude?.slice(0, 6)}
                  </p>{" "}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function AddBookmarkOnMap() {
  const navigate = useNavigate();
  const [latlng, setLatlng] = useState({});
  useMapEvent({
    click: (e) => {
      setLatlng(e.latlng);
      navigate(`/bookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  
  function name(params) {
    navigate(`add?lat=${latlng.lat}&lng=${latlng.lng}`);
  }
  return (
    <>
      {latlng.lat && (
        <Marker position={[latlng.lat, latlng.lng]}>
          <Popup>
            <div className="flex flex-col items-center justify-center">
              <button className="rounded-md px-2 py-1 bg-purple-600 text-white font-bold" onClick={name}>add bookmark</button>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}
