"use client";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

// import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import getCommunitiesForMap from "@/lib/getCommunitiesForMap";
import Wishlist from "./Wishlist";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
  scrollwheel: true,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};
export default function ListingMap() {
  const [getLocation, setLocation] = useState(null);
  const [listings, setListings] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAz77U5XQuEME6TpftaMdX0bBelQxXRlM",
  });
  const center = useMemo(
    () => ({ lat: 36.8097343, lng: -98.5556199 }),
    []
  );

  // add long & lat
  const locationHandler = (location) => {
    setLocation(location);
  };

  // close handler
  const closeCardHandler = () => {
    setLocation(null);
  };


  const getAllCommunities = async () => {
    try {
      const data = await getCommunitiesForMap();
      setListings(data)
    } catch(err) {
      console.log(err.message)
    }
  }


  useEffect(()=> {
    getAllCommunities();
  }, [])



  return (
    <>
      {!isLoaded ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column">
          <h3>Loading...</h3>
          <p className="text-center">Discover communities easily with our upcoming beautiful map!</p>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4.4}
          options={option}
        >
          <MarkerClusterer>
            {(clusterer) =>
              listings?.map((marker) => (
                <Marker
                  key={marker.id}
                  position={{
                    lat: marker.lat,
                    lng: marker.long,
                  }}
                  clusterer={clusterer}
                  onClick={() => locationHandler(marker)}
                ></Marker>
              ))
            }
          </MarkerClusterer>
          {getLocation !== null && (
            <InfoWindow
              position={{
                lat: getLocation?.lat,
                lng: getLocation?.long,
              }}
              onCloseClick={closeCardHandler}
            >
              <div>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      style={{height:'230px'}}
                      className="w-100 h-100  cover"
                      src={getLocation?.thumbnail ? `${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${getLocation?.thumbnail}` : `${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityImgs/${getLocation?.imgs[getLocation?.imgs?.length -1]}`}
                      alt="listings"
                    />
                    <div className="sale-sticker-wrap">
                      {!getLocation?.status == "rent" && (
                        <div className="list-tag fz12">
                          <span className="flaticon-electricity me-2" />
                          FEATURED
                        </div>
                      )}
                    </div>

                    <div className="list-price">
                      ${getLocation?.minPrice} <span>-</span> ${getLocation?.maxPrice}
                    </div>
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                    <Link  href={`/community/${getLocation?.slug}`}>{getLocation?.title}</Link>
                    </h6>
                    <p className="list-text">{getLocation?.location}</p>
                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-bed" /> {getLocation?.bed} bed
                      </a>
                      <a href="#">
                        <span className="flaticon-shower" /> {getLocation?.bath}{" "}
                        bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {getLocation?.sqft}{" "}
                        sqft
                      </a>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="list-meta2 d-flex justify-content-between align-items-center">
                      <span className="for-what">For {getLocation?.status?.map((item, index) => (getLocation?.status?.length > (index + 1)) ? `${item}/`: item)}</span>
                      <div className="icons d-flex align-items-center">
                        <Link href={`/community/${getLocation?.slug}`}>
                          <span className="flaticon-fullscreen" />
                        </Link>
                        <Wishlist listing={getLocation}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}
