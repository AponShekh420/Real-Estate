"use client"

import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Image from "next/image";
import classes from './communityModel.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addModelFields } from "@/redux/modelSlice";


const SingleModel = () => {
  const [modelsData, setModelsData] = useState([]);
  const [deletedDataMsg, setDeletedDataMsg] = useState("");

  // redux
  const {communityId} = useSelector(state => state.community);
  const {newDataNotify} = useSelector(state => state.model);
  const dispatch = useDispatch();

  const getModelsData = async () => {
    try {
      if(communityId == "0") {
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/get/${communityId}`);
      const currentData = await res.json();
      setModelsData(currentData.data)
    } catch(err) {
      console.log(err.message)
    }
  }


  const deleteModel = async (modelId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          CMTId: modelId
        })
      });
      const currentData = await res.json();
      if(currentData) {
        setDeletedDataMsg(currentData);
        toast.success(currentData.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.error("The model has not deleted, please try again!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  const editHandler = (modelValue) => {
    console.log(modelValue);
    dispatch(addModelFields({
      CMTName: modelValue.name,
      desc: modelValue.desc,
      CMTId: modelValue._id,
      edit: true,
      oldImgUrl: modelValue.img,
      uploadedImageChanged: false,
      uploadedImage: modelValue.img,
    }))
  }


  
  useEffect(()=> {
    getModelsData();
  }, [communityId, newDataNotify, deletedDataMsg])


  return (
    <div className="row mb30 p10 gap-3">
      {modelsData.map((element, index)=> (
        <div className={`ps-widget ${classes.boxBg} ${classes.modelGridBox} bdrs12 default-box-shadow2 p10`} key={index}>
          <div className="title fz17 mb10 d-flex justify-content-end gap-3 align-items-center">
            <BsFillPencilFill color="green" size={16} cursor="pointer" onClick={(e) => editHandler(element)}/>
            <MdDeleteForever color="red" size={20} cursor="pointer" onClick={(e)=> {
                e.preventDefault();
                deleteModel(element._id)
              }}/>
          </div>
          <div className="row">
            <div className="agent-single d-sm-flex pb0">
              <div className="single-img mb30-sm">
                <Image
                  width={70}
                  height={70}
                  className="w70"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/communityModels/${element.img}`}
                  alt="agent"
                />
              </div>
              <div className="single-contant ml30 ml0-xs">
                <h6 className="title mb-1">{element.name}</h6>
                <div className="agent-meta mb10 d-md-flex align-items-center">
                  <p>{element.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer containerId="containerB"/>
    </div>
  );
}

export default SingleModel;