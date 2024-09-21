"use client";
import Select from "react-select";
import Amenities from "./Amenities";
import { useRouter } from "next/navigation";
import SelectMultiField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addCommunityFilterValue, removeCommunityFilterValues } from "@/redux/communityFilterSlice";
import PriceRange from "./PriceRange";

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
  const {city: currentCity, price: currentPrice, area: currentArea, state: currentState, titleSearch: currentTitleSearch, gated: currentGated, ageRestrictions: currentAgeRestrictions, amenities: currentAmenities} = useSelector(state => state.communityFilter);
  const dispatch = useDispatch();

  // react state
  const [amenities, setAmenities] = useState([...currentAmenities]);
  const [titleSearch, setTitleSearch] = useState(currentTitleSearch || "");
  const [city, setCity] = useState(currentCity || "");
  const [area, setArea] = useState(currentArea || "");
  const [state, setState] = useState(currentState || "");
  const [gated, setGated] = useState(currentGated || "Any");
  const [ageRestrictions, setAgeRestrictions] = useState(currentAgeRestrictions || "Any");
  const [price, setPrice] = useState(currentPrice || [0, 1000000000]);

  // redirect route
  const router = useRouter();

  const submitHanlder = () => {
    dispatch(addCommunityFilterValue({
      titleSearch,
      gated,
      state,
      city,
      area,
      ageRestrictions,
      amenities,
      price
    }));
    router.push(`/summary${state ? `/${state?.slug}` : ""}${area ? `/${area?.slug}` : ""}${city ? `/${city?.slug}` : ""}`)
  }

  const resetAdvanceSearch = () => {
    setTitleSearch("");
    setCity("");
    setArea("");
    setState("");
    setGated("Any");
    setAgeRestrictions("Any");
    setPrice([0, 1000000000]);
    setAmenities([])
    dispatch(removeCommunityFilterValues())
  }


  useEffect(()=> {
    setState(currentState);
    setCity(currentCity);
  }, [currentState, currentCity])

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter 1
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
                  <PriceRange setPrice={setPrice} price={price} currentPrice={currentPrice}/>
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
                  onChange={(e)=> setTitleSearch(e.target.value)}
                  value={titleSearch}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="row">
            <SelectMultiField state={state} setState={setState} setArea={setArea} area={area} setCity={setCity} city={city} gated={gated} setGated={setGated} ageRestrictions={ageRestrictions} setAgeRestrictions={setAgeRestrictions}/>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities amenities={amenities} setAmenities={setAmenities}/>
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={resetAdvanceSearch}>
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button data-bs-dismiss="modal" type="submit" className="ud-btn btn-thm" onClick={submitHanlder} >
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
