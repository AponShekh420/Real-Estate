"use client"
import { addResultsFilterValue } from "@/redux/resultFilterSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const options = [
  { value: "Communities", label: "Communities" },
  { value: "State", label: "State" },
  { value: "Area", label: "Area" },
  { value: "City", label: "City" },
  { value: "Blog", label: "Blog" },
];

// const labels = ['Blog', 'Communities', 'City', 'Area', 'State']


export default function FilterMenu({
  // currentHomeTypes,
  // setCurrentHomeTypes,
}) {
  // const [currentHomeTypes, setCurrentHomeTypes] = useState([])
  const dispatch = useDispatch();
  const {currentFilterType} = useSelector(state => state.resultsFilter);

  //property filter
  const handlepropertyTypes = (elm) => {
    dispatch(
      addResultsFilterValue({
        currentFilterType: currentFilterType.includes(elm)
        ? [...currentFilterType.filter((el) => el != elm)]
        : [...currentFilterType, elm]
      })
    );
  };

  return (
    <div className="row">
      <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
        {/* <h6 className="list-title">Property Type</h6> */}
        <div className="checkbox-style1">
          {options.map((option, index) => (
            <label className="custom_checkbox" key={index}>
              {option.label}
              <input
                type="checkbox"
                checked={currentFilterType?.includes(option.label)}
                onChange={(e) => {
                  handlepropertyTypes(option.label);
                }}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
