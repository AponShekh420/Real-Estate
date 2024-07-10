"use client"

import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Image from "next/image";
import classes from './communityModel.module.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


const SingleModel = ({newDataNotify}) => {
  const [modelsData, setModelsData] = useState([]);
  const {communityId} = useSelector(state => state.community);
  const [deletedDataMsg, setDeletedDataMsg] = useState("")

  const getModelsData = async () => {
    try {
      if(communityId == "0") {
        return;
      }
      const res = await fetch(`http://localhost:5000/api/models/get/${communityId}`);
      const currentData = await res.json();
      setModelsData(currentData.data)
    } catch(err) {
      console.log(err.message)
    }
  }


  const deleteModel = async (modelId) => {
    try {
      const res = await fetch("http://localhost:5000/api/models/delete", {
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



  
  useEffect(()=> {
    getModelsData();
  }, [communityId, newDataNotify, deletedDataMsg])


  return (
    <div>
      {modelsData.map((element)=> (
        <div className={`ps-widget ${classes.boxBg} bdrs12 default-box-shadow2 p30 mb30`}>
          <div className="title fz17 mb10 d-flex justify-content-end gap-3 align-items-center">
            <BsFillPencilFill color="green" size={16} cursor="pointer"/>
            <MdDeleteForever color="red" size={20} cursor="pointer" onClick={(e)=> {
                e.preventDefault();
                deleteModel(element._id)
              }}/>
          </div>
          <div className="row">
            <div className="agent-single d-sm-flex align-items-center pb25">
              <div className="single-img mb30-sm">
                <Image
                  width={150}
                  height={150}
                  className="w150"
                  src={`http://localhost:5000/assets/communityModels/${element.img}`}
                  alt="agent"
                />
              </div>
              <div className="single-contant ml30 ml0-xs">
                <h3 className="title mb-1">{element.name}</h3>
                <div className="agent-meta mb10 d-md-flex align-items-center">
                  <p><b>{element.desc}</b></p>
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