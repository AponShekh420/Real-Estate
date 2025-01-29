"use client";
import getDataByFilter from "@/data/community/getDataByFilter";
import {
  addCommunityFieldValue,
  removeAllCommunityFieldValue,
} from "@/redux/communitySlice";
import debounce from "lodash.debounce";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { cssTransition, toast } from "react-toastify";
import LocationField from "./LocationField";
import Amenities from "./amenities/Amenities";
import Builders from "./builders/Builders";
import Contact from "./contact";
import DetailsFiled from "./details-field";
import MetaData from "./meta-data";
import ModelMangement from "./models-data/ModelMangement";
import "./nav.css";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
// Custom fade transition
const Fade = cssTransition({
  enter: "fadeIn",
  exit: "fadeOut",
  duration: [500, 300],
});
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const descriptionFields = ["title", "homeTypes", "maxPrice", "minPrice"];
const mediaFields = ["imgs"];
const detailFields = ["phone", "builtStart"];
const locationFields = [
  "address",
  "airport",
  "hospital",
  "militaryBase",
  "zip",
  "map",
  "stateId",
  "AreaId",
];
const contactFields = ["email", "telephone"];

const AddPropertyTabContent = ({
  submitBtn,
  deleteDraftCommunity,
  showbtn,
}) => {
  // url data
  const pathname = usePathname();
  const { slug } = useParams();
  const router = useRouter();
  const formRef = useRef(null);
  const [isDraft, setIsDraft] = useState(false);
  const [fieldsErrors, setFieldsErrors] = useState([]);

  // redux
  const community = useSelector((state) => state.community);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const editPageValidation =
    pathname.split("/")[2] === "edit-community" ? true : false;

  // add community
  const addCommunity = async (e) => {
    e.preventDefault();
    const formData = getDataByFilter(
      { ...community, createdby: userInfo?._id },
      e
    );
    try {
      setIsDraft(false);
      dispatch(addCommunityFieldValue({ loading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/add`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const dataRes = await res.json();
      dispatch(addCommunityFieldValue({ loading: false }));
      if (dataRes?.msg) {
        // remove draft community form database and localstorage
        const removeImg = false;
        await deleteDraftCommunity(removeImg);
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(() => {
          router.push(`/dashboard/edit-community/${dataRes?.data?.slug}`);
        }, 1500);
      } else {
        dispatch(addCommunityFieldValue({ errors: dataRes?.errors }));
        setFieldsErrors(Object.keys(dataRes?.errors));
        toast.error("Required Fields Missing", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // update community
  const updateCommunity = async (e) => {
    e.preventDefault();
    const formData = getDataByFilter(
      { ...community, updatedby: userInfo?._id },
      e
    );
    try {
      dispatch(addCommunityFieldValue({ loading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/update`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
      const dataRes = await res.json();
      dispatch(addCommunityFieldValue({ loading: false }));
      if (dataRes?.msg) {
        toast.success(dataRes?.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(() => {
          router.push("/dashboard/my-communities");
        }, 1500);
      } else if (dataRes?.errors?.locationUpdate) {
        toast.error(dataRes?.errors?.locationUpdate.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        setFieldsErrors(Object.keys(dataRes?.errors));
        dispatch(addCommunityFieldValue({ errors: dataRes?.errors }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getExistingDataToUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/single-community/${slug}`,
        { credentials: "include" }
      );
      const existingCommunityData = await res.json();

      if (existingCommunityData?.errors?.notFound) {
        router.push("/dashboard/my-communities");
      } else {
        const {
          title,
          website,
          phone,
          address,
          map,
          active,
          status,
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
          area,
          city,
          state,
          _id,
          description,
          amenities,
          thumbnail,
          metaTitle,
          metaDesc,
          slug,
        } = existingCommunityData.data;
        dispatch(
          addCommunityFieldValue({
            communityId: _id,
            title,
            description,
            website,
            phone,
            address,
            active,
            status,
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
            thumbnail,
            existingImages: imgs,
            metaTitle,
            metaDesc,
            metaSlug: slug,
            map,
            ...existingCommunityData.data,
          })
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  // get community draft data
  const getDraft = async (draftCommunityId) => {
    if (editPageValidation) {
      return null;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/draft/${draftCommunityId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const { data } = await res.json();

    if (data) {
      dispatch(
        addCommunityFieldValue({
          ...data,
          existingImages: data?.imgs,
          cityId: data.city,
          areaId: data.area,
          stateId: data.state,
          metaSlug: data.slug,
        })
      );
    }
  };

  // save daft community with reload and realtime
  const saveDraft = async (draftCommunityId) => {
    if (
      !community.title &&
      !community.metaTitle &&
      !community.metaDesc &&
      !community.metaSlug &&
      !community.website &&
      !community.phone &&
      !community.address &&
      !community.map &&
      !community.builtEnd &&
      !community.builtStart &&
      !community.zip &&
      !community.description &&
      !community.thumbnail
    ) {
      return null;
    }
    if (editPageValidation) {
      return null;
    }

    const formData = getDataByFilter({
      ...community,
      draftCommunityId,
      createdby: userInfo?._id,
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/draft/create`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await res.json();
      //save draft_id in localstorage
      localStorage.setItem("draftCommunityId", data?.data?._id);
      if (res.ok) {
        if (isDraft) {
          toast.success("Community added in draft", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Fade,
          });
        }
        showbtn(true);
        setIsDraft(true);
      } else {
        console.error("Error saving draft:", data.errors);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  //auto save draft optimization function
  const debouncedSaveDraft = useCallback(
    debounce((draftCommunityId) => saveDraft(draftCommunityId), 2000),
    [community]
  );
  useEffect(() => {
    const draftCommunityId = localStorage.getItem("draftCommunityId");
    debouncedSaveDraft(draftCommunityId);
    // Cleanup debounce on unmount
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [community, debouncedSaveDraft]);

  //get draft data
  useEffect(() => {
    const draftCommunityId = localStorage.getItem("draftCommunityId");
    getDraft(draftCommunityId);
  }, []);

  useEffect(() => {
    if (editPageValidation) {
      dispatch(addCommunityFieldValue({ loading: true, errors: {} }));
      getExistingDataToUpdate();
    } else {
      dispatch(removeAllCommunityFieldValue());
      dispatch(addCommunityFieldValue({ loading: false }));
    }
  }, []);

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className={`nav-link active fw600 ms-3 ${
              fieldsErrors?.some((builder) =>
                descriptionFields.includes(builder)
              ) && "error-nav"
            }`}
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Description
          </button>
          <button
            className={`nav-link fw600  ${
              fieldsErrors?.some((builder) =>
                contactFields.includes(builder)
              ) && "error-nav"
            }`}
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            2. Contact
          </button>
          <button
            className={`nav-link fw600 ${
              fieldsErrors?.some((builder) => mediaFields.includes(builder)) &&
              "error-nav"
            }`}
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            3. Media
          </button>
          <button
            className={`nav-link fw600 ${
              fieldsErrors?.some((builder) =>
                locationFields.includes(builder)
              ) && "error-nav"
            }`}
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Location
          </button>
          <button
            className={`nav-link fw600 ${
              fieldsErrors?.some((builder) => detailFields.includes(builder)) &&
              "error-nav"
            }`}
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Details
          </button>
          <button
            className="nav-link fw600"
            id="nav-item6-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item6"
            type="button"
            role="tab"
            aria-controls="nav-item6"
            aria-selected="false"
          >
            6. Builders
          </button>
          <button
            className="nav-link fw600"
            id="nav-item7-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item7"
            type="button"
            role="tab"
            aria-controls="nav-item7"
            aria-selected="false"
          >
            7. Amenities
          </button>
          <button
            className="nav-link fw600"
            id="nav-item8-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item8"
            type="button"
            role="tab"
            aria-controls="nav-item8"
            aria-selected="false"
          >
            8. Onpage-SEO
          </button>

          {editPageValidation ? (
            <button
              className="nav-link fw600"
              id="nav-item9-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-item9"
              type="button"
              role="tab"
              aria-controls="nav-item9"
              aria-selected="false"
            >
              9. Models
            </button>
          ) : (
            ""
          )}
        </div>
      </nav>
      {/* End nav tabs */}

      <form
        className="tab-content"
        id="nav-tabContent"
        ref={formRef}
        onSubmit={editPageValidation ? updateCommunity : addCommunity}
        action={
          editPageValidation
            ? `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/update`
            : `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/add`
        }
        method={editPageValidation ? "put" : "post"}
        encType="multipart/form-data"
      >
        <button type="submit" ref={submitBtn} hidden>
          submit
        </button>
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Community Description</h4>
            <PropertyDescription />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Add your contact</h4>
            <Contact />
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <UploadMedia />
        </div>
        {/* End tab for Upload photos of your property */}

        <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Location</h4>
            <LocationField />
          </div>
        </div>
        {/* End tab for Listing Location */}

        <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item5-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Details</h4>
            <DetailsFiled />
          </div>
        </div>
        {/* End tab for Listing Details */}
        <div
          className="tab-pane fade"
          id="nav-item6"
          role="tabpanel"
          aria-labelledby="nav-item6-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Select builder</h4>
            <div className="row">
              <Builders />
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}
        <div
          className="tab-pane fade"
          id="nav-item7"
          role="tabpanel"
          aria-labelledby="nav-item7-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Select Amenities</h4>
            <div className="row">
              <Amenities />
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}

        <div
          className="tab-pane fade"
          id="nav-item8"
          role="tabpanel"
          aria-labelledby="nav-item8-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Meta Data for SEO</h4>
            <div className="row">
              <MetaData />
            </div>
          </div>
        </div>
        {/* End tab for SEO */}

        {editPageValidation ? (
          <div
            className="tab-pane fade"
            id="nav-item9"
            role="tabpanel"
            aria-labelledby="nav-item9-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Add Models</h4>
              <div className="row">
                <ModelMangement />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
      {/* tab loading div */}
      {community?.loading ? (
        <div
          className="w-100 position-absolute h-100 z-10 top-0 d-flex justify-content-center align-items-center text-white"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <MoonLoader
            color="black"
            loading={community?.loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddPropertyTabContent;
