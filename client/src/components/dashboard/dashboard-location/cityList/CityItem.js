import DeleteModal from "@/components/common/DeleteModal";
import { addCityFields } from "@/redux/citySlice";
import { addStateFields } from "@/redux/stateSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const CityItem = ({eachCity, state}) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // redux 
  const {active, cityName, description, abbreviation, edit} = useSelector(state => state.city);
  const dispatch = useDispatch();


  // the state would be "Deactive" though this function
  const deactiveHanlder = async (e) => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/deactive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cityId: eachCity._id
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else if (dataRes?.errors?.locationUpdate) {
        toast.error(`First, Take care the parent of "${eachCity.name}"`, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Please try again "${eachCity.name}" city`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  // the state would be "Active" though this function
  const activeHandler = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cityId: eachCity._id
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else if (dataRes?.errors?.locationUpdate) {
        toast.error(`First, Take care the parent of "${eachCity.name}"`, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Please try again "${eachCity.name}" city`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const deleteHanlder = async (cityId) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cityId: cityId,
        })
      })
      const dataRes = await res.json();
      setDeleteLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        dispatch(addStateFields({
          notify: Math.random(),
        }))
      } else {
        toast.error(`Please try again to delete "${state.name}" city`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const editHandler = () => {
    dispatch(addCityFields({
      stateId: state,
      cityName: eachCity.name,
      description: eachCity.desc,
      abbreviation: eachCity.abbreviation,
      active: eachCity.active,
      edit: true,
      cityId: eachCity._id,
      oldImgUrl: eachCity.img,
      uploadedImageChanged: false,
      uploadedImage: eachCity.img,
    }))
  }



  return (
    <>
      <div className="d-flex justify-content-between align-items-center bdrb1 py-2">
        <p className={`text-capitalize m-0`}>-{eachCity.name} ({eachCity.community.length})</p>
        <div className="d-flex align-items-center gap-3">

            <span
              className="text-capitalize"
              style={{cursor: "pointer", border: "none", color: `${eachCity.active ? "green" : "red"}`, padding: `${loading ? eachCity.active ? "2px 16px" : "2px 22px" : "1px 8px"}`, lineHeight: "1.5", borderRadius: "15px", border: `1px solid ${eachCity.active ? "green" : "red"}`, fontSize: "12px"}}
              data-tooltip-id={`status-${eachCity?.slug}`}
              onClick={eachCity.active ? deactiveHanlder : activeHandler}
            >
              {loading ? (
                <MoonLoader
                color={eachCity.active == true ? "green" : "red"}
                loading={loading}
                cssOverride={override}
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              ): eachCity.active ? "active" : "Deactive"}
              
            </span>

            <button
              className="icon btn"
              style={{ border: "none", color: "green", padding: "0px", fontSize: "15px"}}
              data-tooltip-id={`edit-${eachCity?.slug}`}
              onClick={editHandler}
            > 
              <span className="fas fa-pen fa" />
            </button>

            <a 
            style={{ border: "none", color: "red", padding: "0px", fontSize: "16px", cursor: "pointer"}}
            data-tooltip-id={`delete-${eachCity?.slug}`}
            data-bs-target={`#exampleModalToggle-${eachCity?._id}`}
            data-bs-toggle="modal"
          >
            {deleteLoading ? (
              <MoonLoader
              color={"red"}
              loading={deleteLoading}
              cssOverride={override}
              size={12}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            ): <span className="flaticon-bin" />}
          </a>
            
            <ReactTooltip
              id={`edit-${eachCity?.slug}`}
              place="top"
              content="Edit"
            />
            <ReactTooltip
              id={`delete-${eachCity?.slug}`}
              place="top"
              content="Delete"
            />
            <ReactTooltip
              id={`status-${eachCity?.slug}`}
              place="top"
              content={`${eachCity.active ? "Click Me To Deactive": "Click Me To Active"}`}
            />
            <DeleteModal deleteHanlder={deleteHanlder} item={eachCity} subject={"City"}/>
          </div>
      </div>
    </>
  );
}

export default CityItem;