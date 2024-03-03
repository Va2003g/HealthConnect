import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import userIcon from "../../../../Assets/UserIcon.png";
import hospitalIcon from "../../../../Assets/Hospital_Icon.png";
import { SpinningCircles } from "react-loading-icons";

function HospitalNearMe() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [nearby, setNearby] = useState([]);
  const mapRef = useRef(null); // Create a ref for MapContainer
  const [loading,setLoading] = useState(true);

  const fetchNearbyHospitals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getNearbyHospital?latitude=${location.latitude}&longitude=${location.longitude}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching hospitals: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.Data && data.Data.nearbyHospitals) {
        console.log(data.Data.nearbyHospitals);
        setNearby(data.Data.nearbyHospitals);
        setLoading(false);
      } else {
        console.error("Error: nearbyHospitals not found in response data");
      }
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    fetchNearbyHospitals();
  }, [location]);

  const extractCoordinates = (coordinatesString) => {
    const coordinates = coordinatesString.split(",");
    const latitude = parseFloat(coordinates[0]);
    const longitude = parseFloat(coordinates[1]);
    return { latitude, longitude };
  };

  const userMarkerIcon = L.icon({
    iconUrl: userIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const hospitalMarkerIcon = L.icon({
    iconUrl: hospitalIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 13);
    }
  }, [location]);

  return (
    <div className="flex gap-5 h-[80vh] m-[2rem]">
      <div className="w-[25vw] h-[100%] overflow-y-scroll bg-gray-100 p-4 rounded-md shadow-md relative">
        <p className="text-2xl font-bold mb-4 text-blue-700 text-center sticky top-0 bg-gray-100">
          Nearby Hospitals
        </p>
        <ul className="mt-12">
          {loading ? (
            <div className=" w-100 h-[60vh] flex justify-center items-center">
                <SpinningCircles color="#4299e1" fill="#4299e1"/>
            </div>
          )
            : nearby.map((hospital) => (
            <li key={hospital._id} className="mb-4 flex items-center">
              <img
                src={hospitalIcon}
                alt="Hospital Icon"
                className="w-8 h-8 mr-2"
              />
              <span className="text-lg text-gray-800">
                {hospital.Hospital_Name}
              </span>
              <a
                href={`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${hospital.Location_Coordinates}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-blue-500 hover:underline"
              >
                Get Directions
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className=" w-[70vw] h-[100%]">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Set the mapRef when the map is created
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {location.latitude !== 0 && location.longitude !== 0 && (
            <Marker
              position={[location.latitude, location.longitude]}
              icon={userMarkerIcon}
            >
              <Tooltip>Current Location</Tooltip>
            </Marker>
          )}
          {nearby.map((hospital) => {
            const { latitude, longitude } = extractCoordinates(
              hospital.Location_Coordinates
            );
            return (
              <Marker
                key={hospital._id}
                position={[latitude, longitude]}
                icon={hospitalMarkerIcon}
              >
                <Tooltip>
                  <div>{hospital.Hospital_Name}</div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default HospitalNearMe;
