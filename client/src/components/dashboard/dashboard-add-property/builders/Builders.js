"use client";
import { addCommunityFieldValue } from "@/redux/communitySlice";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";

import BuildersHanlder from "./BuildersHanlder";
import DeleteBuilder from "./DeleteBuilder";

const Builders = () => {
  const [builderName, setBuilderName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState("");
  const [allBuilders, setAllBuilders] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { builders } = useSelector((state) => state.community);

  // Utility to split array into chunks
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Transform data into columns
  const transformData = (array) => {
    const chunks = chunkArray(array, 7);
    const result = {};
    chunks.forEach((chunk, index) => {
      result[`column${index + 1}`] = chunk;
    });
    return result;
  };

  const fetchBuilder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/getall`,
        { credentials: "include" }
      );
      const { data } = await res.json();

      // Sort builders alphabetically by name
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

      setAllBuilders(transformData(sortedData));
    } catch (err) {
      console.log(err.message);
    }
  };

  const editHanlder = (builder) => {
    const { name, icon, _id } = builder;
    setBuilderName(name);
    setEdit(_id);
    setEmoji(icon);
  };

  // Handle individual checkbox selection
  const checkHanlder = (e, builder) => {
    if (e.target.checked) {
      dispatch(
        addCommunityFieldValue({
          builders: [...builders, builder],
        })
      );
    } else {
      const newCheckedArray = builders.filter(
        (element) => element?._id !== builder?._id
      );
      dispatch(
        addCommunityFieldValue({
          builders: newCheckedArray,
        })
      );
    }
  };

  // Handle "All" checkbox
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);

    const allBuildersFlat = Object.values(allBuilders).flat();
    if (checked) {
      // Add all builders to Redux state
      dispatch(
        addCommunityFieldValue({
          builders: [
            ...builders,
            ...allBuildersFlat.filter(
              (builder) => !builders.some((a) => a._id === builder._id)
            ),
          ],
        })
      );
    } else {
      // Remove all builders from Redux state
      dispatch(
        addCommunityFieldValue({
          builders: builders.filter(
            (builder) => !allBuildersFlat.some((a) => a._id === builder._id)
          ),
        })
      );
    }
  };

  useEffect(() => {
    if (notify?.msg === "Delete") {
      checkHanlder({ target: { checked: false } }, notify?.builder);
    }
    fetchBuilder();
  }, [notify]);

  useEffect(() => {
    const allBuildersFlat = Object.values(allBuilders).flat();
    const isAllChecked =
      allBuildersFlat.length > 0 &&
      allBuildersFlat.every((builder) =>
        builders.some((a) => a._id === builder._id)
      );
    setAllChecked(isAllChecked);
  }, [builders, allBuilders]);

  return (
    <div className="row">
      <div
        style={{
          margin: "-5px  0 12px 0",
          position: "relative",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllCheck}
          />{" "}
          All
        </label>
      </div>

      {/* Builders Section */}
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="gap-sm-3 gap-lg-3 gap-0 d-sm-flex d-block flex-wrap"
      >
        {Object.keys(allBuilders).map((columnKey, index) => (
          <div
            key={index}
            className="col-sm-5 col-lg-5 col-xl-3 col-xxl-3 col-12"
          >
            <div className="checkbox-style1">
              {allBuilders[columnKey].map((builder, builderIndex) => (
                <div
                  className="d-flex justify-content-between align-items-center mb10"
                  key={builderIndex}
                >
                  <label
                    className="custom_checkbox d-flex align-items-center"
                    style={{ lineHeight: "20px" }}
                  >
                    {builder?.name}
                    <input
                      className="p-0 m-0"
                      type="checkbox"
                      checked={builders.some((a) => a._id === builder._id)}
                      onChange={(e) => checkHanlder(e, builder)}
                    />
                    <span className="checkmark" style={{ top: 3 }} />
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      style={{
                        border: "none",
                        color: "red",
                        padding: "0px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      data-tooltip-id={`edit-${columnKey}-${builderIndex}`}
                    >
                      <FaPencilAlt
                        onClick={() => editHanlder(builder)}
                        size={12}
                        color="green"
                        cursor="pointer"
                      />
                    </a>
                    <DeleteBuilder builder={builder} setNotify={setNotify} />
                    <ReactTooltip
                      id={`delete-${columnKey}-${builderIndex}`}
                      place="top"
                      content="Delete"
                    />
                    <ReactTooltip
                      id={`edit-${columnKey}-${builderIndex}`}
                      place="top"
                      content="Edit"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BuildersHanlder
        setBuilderName={setBuilderName}
        setEmoji={setEmoji}
        setEdit={setEdit}
        builderName={builderName}
        emoji={emoji}
        edit={edit}
        setNotify={setNotify}
      />
    </div>
  );
};

export default Builders;