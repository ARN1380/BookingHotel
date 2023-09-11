export default function HotelCard({
  name,
  url,
  picture_url,
  smart_location,
  price,
}) {
  return (
    <div className="locationItem">
      <img src={picture_url.url} alt={name} />
      <div className="locationItemDesc">
        <p className="location">{smart_location}</p>
        <p className="name">{name}</p>
        <p className="price">
          €&nbsp;{price}&nbsp;
          <span>night</span>
        </p>
      </div>
    </div>
  );
}
