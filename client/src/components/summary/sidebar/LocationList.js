import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentLoaderWrapper from "./ContentLoaderWrapper";
import ListItem from "./ListItem";

const LocationList = () => {
  const path = usePathname();
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, area, city, data } = useSelector(
    (state) => state.communityFilter
  );

  // fetch all state, city and area to show these on summery page sidebar as list
  const getExistingDataToUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/active`,
        { credentials: "include" }
      );
      const currentLocationData = await res.json();

      setLoading(false);
      if (currentLocationData?.message) {
        setLocationData(currentLocationData?.data);
      } else {
        // do something
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getExistingDataToUpdate();
    console.log(path.split("/")[4]);
  }, []);

  return (
    <div className="w-100">
      {path.split("/").length <= 2 ? (
        loading ? (
          <ContentLoaderWrapper />
        ) : (
          <ul className="w-100 list-unstyled">
            {locationData.map((state, stateIndex) => (
              <li
                className={`${
                  path.split("/")[2] === state.slug ? "text-danger" : ""
                }`}
                key={stateIndex}
              >
                <Link href={`/summary/${state.slug}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p
                      className={`text-capitalize m-0 ${
                        path.split("/")[2] === state.slug ? "text-danger" : ""
                      }`}
                    >
                      <b>
                        {state.name} ({state.community.length})
                      </b>
                    </p>
                    {path.split("/")[2] !== state.slug ? (
                      <IoIosArrowDown className="p-0" />
                    ) : (
                      <IoIosArrowUp className="p-0 text-danger" />
                    )}
                  </div>
                </Link>
                {/* fist chiled */}
                <ul
                  className="w-90 list-unstyled ml10"
                  style={{
                    marginTop: "2px",
                    height: path.split("/")[2] === state.slug ? "100%" : "0",
                    overflow:
                      path.split("/")[2] === state.slug ? "visible" : "hidden",
                  }}
                >
                  {" "}
                  {/**height: 0, overflow: "hidden" */}
                  {state.area.map((eachArea, cityIndex) => {
                    if (eachArea?.active) {
                      return (
                        <li
                          className={`${
                            path.split("/")[3] === eachArea.slug
                              ? "text-danger"
                              : ""
                          }`}
                          key={cityIndex}
                        >
                          <Link
                            href={`/summary/${state.slug}/${eachArea.slug}`}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p
                                className={`text-capitalize m-0 ${
                                  path.split("/")[3] === eachArea.slug
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {eachArea.name} ({eachArea.community.length})
                              </p>
                              {path.split("/")[3] !== eachArea.slug ? (
                                <IoIosArrowDown className="p-0" />
                              ) : (
                                <IoIosArrowUp className="p-0 text-danger" />
                              )}
                            </div>
                          </Link>
                          {/* second child */}
                          <ul
                            className="w-90 list-unstyled ml10"
                            style={{
                              marginTop: "2px",
                              height:
                                path.split("/")[3] === eachArea.slug
                                  ? "100%"
                                  : "0",
                              overflow:
                                path.split("/")[3] === eachArea.slug
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            {" "}
                            {/**height: 0, overflow: "hidden" */}
                            {eachArea.city.map((eachCity, areaIndex) => {
                              if (eachCity.active) {
                                return (
                                  <li
                                    className={`${
                                      path.split("/")[4] === eachCity.slug
                                        ? "text-danger"
                                        : ""
                                    }`}
                                    key={areaIndex}
                                  >
                                    <Link
                                      href={`/summary/${state.slug}/${eachArea.slug}/${eachCity.slug}`}
                                    >
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p
                                          className={`text-capitalize m-0 ${
                                            path.split("/")[4] === eachCity.slug
                                              ? "text-danger"
                                              : ""
                                          }`}
                                        >
                                          {eachCity.name} (
                                          {eachCity?.community?.length})
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              } else {
                                return;
                              }
                            })}
                          </ul>
                        </li>
                      );
                    } else {
                      return;
                    }
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )
      ) : !state ? (
        <ContentLoaderWrapper />
      ) : city ? (
        <ListItem
          parent={city?.area}
          subElement={city?.area?.city || []}
          parentPathNumber={3}
          childrenPathNumber={4}
        />
      ) : area ? (
        <ListItem
          parent={area}
          subElement={area?.city || []}
          parentPathNumber={3}
          childrenPathNumber={4}
        />
      ) : (
        <ListItem
          parent={state}
          subElement={state?.area || []}
          parentPathNumber={2}
          childrenPathNumber={3}
        />
      )}
    </div>
  );
};

export default LocationList;
