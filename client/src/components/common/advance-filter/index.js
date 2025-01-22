"use client";
import {
  addCommunityFilterValue,
  removeCommunityFilterValues,
} from "@/redux/communityFilterSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Amenities from "./Amenities";
import PriceRange from "./PriceRange";
import PropertyType from "./PropertyType";
import SelectMultiField from "./SelectMulitField";

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};

const AdvanceFilterModal = () => {
  // redux
  const {
    city: currentCity,
    price: currentPrice,
    area: currentArea,
    state: currentState,
    titleSearch: currentTitleSearch,
    gated: currentGated,
    ageRestrictions: currentAgeRestrictions,
    amenities: currentAmenities,
    isNewContraction: currentIsNewContraction,
    closestHospital: currentClosestHospital,
    closestAirport: currentClosestAirport,
    closestMilitaryBase: currentClosestMilitaryBase,
    builder: currentBuilder,
    homeTypes,
  } = useSelector((state) => state.communityFilter);
  const community = useSelector((state) => state.communityFilter);
  const dispatch = useDispatch();

  // react state
  const [amenities, setAmenities] = useState([...currentAmenities]);
  const [titleSearch, setTitleSearch] = useState(currentTitleSearch || "");
  const [city, setCity] = useState(currentCity || "");
  const [area, setArea] = useState(currentArea || "");
  const [state, setState] = useState(currentState || "");
  const [gated, setGated] = useState(currentGated || "Any");
  const [ageRestrictions, setAgeRestrictions] = useState(
    currentAgeRestrictions || "Any"
  );
  const [price, setPrice] = useState(currentPrice || [0, 1000000000]);

  //added by shipon
  const [currentHomeTypes, setCurrentHomeTypes] = useState([...homeTypes]);
  const [isNewContraction, setIsNewContraction] = useState(
    currentIsNewContraction || "No"
  );
  const [closestHospital, setClosestHospital] = useState(
    currentClosestHospital || null
  );
  const [closestAirport, setClosestAirport] = useState(
    currentClosestAirport || null
  );
  const [closestMilitaryBase, setClosestMilitaryBase] = useState(
    currentClosestMilitaryBase || null
  );
  const [builder, setBuilder] = useState(currentBuilder || "");

  // redirect route
  const router = useRouter();

  const submitHanlder = () => {
    dispatch(
      addCommunityFilterValue({
        titleSearch,
        gated,
        state,
        city,
        area,
        ageRestrictions,
        amenities,
        price,
        homeTypes: currentHomeTypes,
        isNewContraction,
        closestHospital,
        closestAirport,
        closestMilitaryBase,
        builder,
      })
    );
    router.push(
      `/summary${state ? `/${state?.slug}` : ""}${
        area ? `/${area?.slug}` : ""
      }${city ? `/${city?.slug}` : ""}`
    );
  };

  const resetAdvanceSearch = () => {
    setTitleSearch("");
    setCity("");
    setArea("");
    setState("");
    setGated("Any");
    setAgeRestrictions("Any");
    setPrice([0, 1000000000]);
    setAmenities([]);
    //added by shipon
    setCurrentHomeTypes([]);
    setIsNewContraction("No");
    setClosestHospital(null);
    setClosestAirport(null);
    setClosestMilitaryBase(null);
    setBuilder("");
    dispatch(removeCommunityFilterValues());
  };

  useEffect(() => {
    setState(currentState);
    setCity(currentCity);
  }, [currentState, currentCity]);

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            Advanced Community Search
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange
                    setPrice={setPrice}
                    price={price}
                    currentPrice={currentPrice}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="col-12">
            <div className="widget-wrapper">
              <h6 className="list-title">Title</h6>
              <div className="form-style2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your community name"
                  onChange={(e) => setTitleSearch(e.target.value)}
                  value={titleSearch}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="row">
            <SelectMultiField
              state={state}
              setState={setState}
              setArea={setArea}
              area={area}
              setCity={setCity}
              city={city}
              gated={gated}
              setGated={setGated}
              ageRestrictions={ageRestrictions}
              setAgeRestrictions={setAgeRestrictions}
              isNewContraction={isNewContraction}
              setIsNewContraction={setIsNewContraction}
              closestHospital={closestHospital}
              setClosestHospital={setClosestHospital}
              closestAirport={closestAirport}
              setClosestAirport={setClosestAirport}
              closestMilitaryBase={closestMilitaryBase}
              setClosestMilitaryBase={setClosestMilitaryBase}
              builder={builder}
              setBuilder={setBuilder}
            />
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}
          {/* added by shipon */}
          <PropertyType
            currentHomeTypes={currentHomeTypes}
            setCurrentHomeTypes={setCurrentHomeTypes}
          />
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities amenities={amenities} setAmenities={setAmenities} />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={resetAdvanceSearch}>
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              data-bs-dismiss="modal"
              type="submit"
              className="ud-btn btn-thm"
              onClick={submitHanlder}
            >
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
