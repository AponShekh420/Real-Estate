import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AmenitiesHanlder from "./AmenitiesHanlder";


const Amenities = () => {
  const [amenitiesData, setAmenitiesData] = useState({});


  const [popular, setPopular] = useState(false);
  const [amenityName, setAmenityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState("");



  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const transformData = (array) => {
    const chunks = chunkArray(array, 7);
    const result = {};
    chunks.forEach((chunk, index) => {
      result[`column${index + 1}`] = chunk;
    });
    return result;
  };

  const fetchAmenities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/amenity/getall`);
      const amenities = await res.json();
      console.log("amenity:", amenities?.data)
      if(amenities?.data) {
        const {data} = amenities;
        const transformedData = transformData(data);
        setAmenitiesData(transformedData);
      }
      console.log("amentiyesData", amenitiesData);
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHanlder = (amenity) => {
    const {name, icon, _id, popular} = amenity;
    setPopular(popular);
    setAmenityName(name);
    setEdit(_id);
    setEmoji(icon);
  }

  useEffect(()=> {
    fetchAmenities()
  }, [notify])

  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <div className="d-flex justify-content-between" key={amenityIndex}>
                <label className="custom_checkbox">
                  {amenity.icon}{amenity.name}
                  <input
                  className="p-0 m-0"
                    type="checkbox"
                    defaultChecked={amenity.name}
                  />
                  <span className="checkmark" />
                </label>
                <div className="d-flex align-items-center gap-2">
                  <FaPencilAlt 
                    onClick={() => editHanlder(amenity)}
                    size={12} 
                    color="green" 
                    cursor="pointer" 
                    data-tooltip-id={`edit-${columnKey}`}
                  />
                  <MdDeleteForever 
                    size={16} 
                    color="red" 
                    cursor="pointer"
                    data-tooltip-id={`delete-${columnKey}`}
                  />
                  <ReactTooltip
                    id={`delete-${columnKey}`}
                    place="top"
                    content="Delete"
                  />
                  <ReactTooltip
                    id={`edit-${columnKey}`}
                    place="top"
                    content="Edit"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <AmenitiesHanlder setPopular={setPopular} setAmenityName={setAmenityName} setEmoji={setEmoji} setEdit={setEdit} popular={popular} amenityName={amenityName} emoji={emoji} edit={edit} setNotify={setNotify}/>
    </div>
  );
};

export default Amenities;
