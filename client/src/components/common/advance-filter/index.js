"use client";
import Select from "react-select";
import Amenities from "./Amenities";
import { useRouter } from "next/navigation";
import SelectMultiField from "./SelectMulitField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCommunityFilterValue, removeCommunityFilterValues } from "@/redux/communityFilterSlice";

const AdvanceFilterModal = () => {  
  const router = useRouter();

  const {state, city, titleSearch} = useSelector(state => state.communityFilter);
  const dispatch = useDispatch();
  

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
  useEffect(()=> {
    dispatch(removeCommunityFilterValues())
  }, [])
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
          <div className="col-12">
            <div className="widget-wrapper">
              <h6 className="list-title">Title</h6>
              <div className="form-style2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your community name"
                  onChange={(e)=> dispatch(addCommunityFilterValue({
                    titleSearch: e.target.value
                  }))}
                  value={titleSearch}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="row">
            <SelectMultiField/>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={()=> dispatch(removeCommunityFilterValues())}>
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button data-bs-dismiss="modal" type="submit" className="ud-btn btn-thm" onClick={() => router.push(`/summary${state ? `/${state?.slug}` : ""}${city ? `/${city?.slug}` : ""}`)} >
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
