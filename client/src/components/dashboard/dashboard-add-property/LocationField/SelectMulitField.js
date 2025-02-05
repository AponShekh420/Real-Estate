"use client";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

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
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "red",
  }),
};

const SelectMultiField = () => {
  const { errors, stateId, cityId, areaId } = useSelector(
    (state) => state.community
  );
  const dispatch = useDispatch();

  // options
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const pathname = usePathname();
  const editPageValidation =
    pathname.split("/")[2] === "edit-community" ? true : false;

  const areaHanlder = (currentState) => {
    dispatch(
      addCommunityFieldValue({
        cityId: null,
        areaId: null,
      })
    );
    const areaOptionValues =
      currentState.value.area.map((item) => item.active && item).length > 0
        ? currentState.value.area.map((item) => item.active && item)
        : [];
    setCityOptions([]);
    setAreaOptions(areaOptionValues[0] ? areaOptionValues : []);
  };

  const cityHandler = (currentArea) => {
    dispatch(
      addCommunityFieldValue({
        cityId: null,
      })
    );
    const cityOptionValues =
      currentArea.value.city.map((item) => item.active && item).length > 0
        ? currentArea.value.city.map((item) => item.active && item)
        : [];
    setCityOptions(cityOptionValues[0] ? cityOptionValues : []);
  };

  const fetchStateData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/getall/active`
      );
      const stateData = await res.json();
      setStateOptions(stateData.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchStateData();
  }, []);

  //show area and city field when selected state just for edit page
  useEffect(() => {
    if (stateId) {
      const areaOptionValues =
        stateId.area.map((item) => item.active && item).length > 0
          ? stateId.area.map((item) => item.active && item)
          : [];
      setAreaOptions(areaOptionValues[0] ? areaOptionValues : []);
    }
    if (areaId) {
      const cityOptionValues =
        areaId.city.map((item) => item.active && item).length > 0
          ? areaId.city.map((item) => item.active && item)
          : [];
      setCityOptions(cityOptionValues[0] ? cityOptionValues : []);
    }
  }, [stateId, areaId]);
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">State</label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              placeholder="select"
              classNamePrefix="select"
              required
              // isMulti
              options={[
                { value: null, label: "Select" },
                ...stateOptions?.map((item) => ({
                  value: item,
                  label: `${item.name} (${
                    item.active ? "Active" : "Deactive"
                  })`,
                })),
              ]}
              onChange={(e) => {
                if (e.value === null) {
                  setAreaOptions([]);
                  setCityOptions([]);
                  dispatch(
                    addCommunityFieldValue({
                      stateId: e.value,
                      areaId: e.value,
                      cityId: e.value,
                    })
                  );
                } else {
                  areaHanlder(e);
                  dispatch(addCommunityFieldValue({ stateId: e.value }));
                }
              }}
              value={{
                value: stateId?.name,
                label: stateId?.name ? stateId?.name : "Select",
              }}
            />
            <p className="text-danger">{errors?.stateId?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Area</label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={[
                { value: null, label: "Select" },
                ...areaOptions?.map((item) => ({
                  value: item,
                  label: `${item.name} (${
                    item.active ? "Active" : "Deactive"
                  })`,
                })),
              ]}
              onChange={(e) => {
                if (e.value === null) {
                  setCityOptions([]);
                  dispatch(
                    addCommunityFieldValue({ areaId: e.value, cityId: e.value })
                  );
                } else {
                  cityHandler(e);
                  dispatch(addCommunityFieldValue({ areaId: e.value }));
                }
              }}
              placeholder="please select"
              value={{
                value: areaId?.name,
                label: areaId?.name ? areaId?.name : "Select",
              }}
            />
            <p className="text-danger">{errors?.areaId?.msg}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            City Association
          </label>
          <div className="location-area">
            <Select
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              // isMulti
              options={[
                { value: null, label: "Select" },
                ...cityOptions?.map((item) => ({
                  value: item,
                  label: `${item.name} (${
                    item.active ? "Active" : "Deactive"
                  })`,
                })),
              ]}
              onChange={(e) =>
                dispatch(addCommunityFieldValue({ cityId: e.value }))
              }
              value={{
                value: cityId?.name,
                label: cityId?.name ? cityId?.name : "Select",
              }}
            />
            <p className="text-danger">{errors?.cityId?.msg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
