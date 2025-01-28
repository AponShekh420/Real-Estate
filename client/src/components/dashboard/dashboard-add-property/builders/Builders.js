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
  const [allBuilders, setAllBuilders] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { builders } = useSelector((state) => state.community);

  const fetchBuilder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/builder/getall`,
        { credentials: "include" }
      );
      const { data } = await res.json();

      // Sort amenities alphabetically by name
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

      setAllBuilders(sortedData);
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
    if (checked) {
      // Add all unpopular amenities to Redux state
      dispatch(
        addCommunityFieldValue({
          builders: [
            ...builders,
            ...allBuilders.filter(
              (builder) => !builders.some((a) => a._id === builder._id)
            ),
          ],
        })
      );
    } else {
      // Remove all unpopular amenities from Redux state
      dispatch(
        addCommunityFieldValue({
          builders: builders.filter(
            (builder) => !allBuilders.some((a) => a._id === builder._id)
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
    const isAllChecked = allBuilders.every((builder) =>
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

      {/* Popular builder Section */}
      <div
        style={{ display: "flex", justifyContent: "start" }}
        className="gap-sm-3 gap-lg-3 gap-0 d-sm-flex d-block"
      >
        <div className="col-sm-5 col-lg-3 col-xxl-2 col-12">
          <div className="checkbox-style1">
            {allBuilders?.map((builder, builderIndex) => (
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
                    data-tooltip-id={`edit-${builder._id}`}
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
                    id={`delete-${builder._id}`}
                    place="top"
                    content="Delete"
                  />
                  <ReactTooltip
                    id={`edit-${builder._id}`}
                    place="top"
                    content="Edit"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
