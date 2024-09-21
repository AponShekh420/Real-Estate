"use client"
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addCommunityFieldValue, removeAllCommunityFieldValue } from "@/redux/communitySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CommunityPublish = () => {
  const [loading, setLoading] = useState(false);

  // url data 
  const pathname = usePathname();
  const {slug} = useParams();
  const router = useRouter();

  // redux
  const community = useSelector((state)=> state.community)
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-community" ? true : false;


  const addCommunity = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...community,
          stateId: community?.stateId?._id,
          areaId: community?.areaId?._id,
          cityId: community?.cityId?._id,
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes?.msg) {
        dispatch(removeAllCommunityFieldValue());
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push(`/dashboard/edit-community/${dataRes?.data?.slug}`)
        }, 1500)
      } else {
        dispatch(addCommunityFieldValue({errors: dataRes?.errors}))
      }
      console.log(dataRes)
    } catch(err) {
      console.log(err.message)
    }
  }

  const updateCommunity = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...community,
          stateId: community?.stateId?._id,
          areaId: community?.areaId?._id,
          cityId: community?.cityId?._id,
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes?.msg) {
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push('/dashboard/my-communities')
        }, 1500)
      } else if(dataRes?.errors?.locationUpdate) {
        toast.error(dataRes?.errors?.locationUpdate.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        dispatch(addCommunityFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const getExistingDataToUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/single-community/${slug}`, {credentials: "include"});
      const existingCommunityData = await res.json();
      console.log(existingCommunityData)
      if(existingCommunityData?.errors?.notFound) {
        router.push('/dashboard/my-communities');
      } else {
        const {title, website, phone, address, lat, long, sqft, active, status, garages, bathrooms, bedrooms, imgs, builtEnd, builtStart, gated, ageRestrictions, communitySize, homeTypes, maxPrice, minPrice, zip, area, city, state, _id, description, amenities, thumbnail } = existingCommunityData.data
        dispatch(addCommunityFieldValue({
          communityId: _id,
          title,
          description,
          website, 
          phone, 
          address, 
          lat, 
          long, 
          sqft, 
          active, 
          status, 
          garages, 
          bathrooms, 
          bedrooms, 
          imgs, 
          builtEnd, 
          builtStart, 
          gated, 
          ageRestrictions, 
          communitySize, 
          homeTypes, 
          maxPrice, 
          minPrice, 
          zip, 
          areaId: area, 
          cityId: city,
          stateId: state,
          loading: false,
          amenities,
          thumbnail
        }));
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    if(editPageValidation) {
      dispatch(addCommunityFieldValue({loading: true, errors: {}}));
      getExistingDataToUpdate();
    } else {
      dispatch(removeAllCommunityFieldValue());
      dispatch(addCommunityFieldValue({loading: false}));
    }
  }, [])


  return (
    <div className="dashboard_title_area">
      <button onClick={editPageValidation ? updateCommunity : addCommunity} className={`bdr1 bg-black text-white rounded-3 shadow mb-5 py-2 px-3 d-flex gap-2 justify-content-center align-items-center fs-6 ${loading? "opacity-50" : "opacity-100"}`} disabled={loading}>
        {editPageValidation ? "Update Community" : "Add Community"}
        {!loading ? <ImUpload /> : <HashLoader
        color="#ffffff"
        loading={loading}
        cssOverride={override}
        size={17}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      }
      </button>
      <ToastContainer/>
    </div>
  );
}

export default CommunityPublish;