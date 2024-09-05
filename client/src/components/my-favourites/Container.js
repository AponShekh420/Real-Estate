'use client'
import ListingsFavourites from "./ListingsFavourites";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import getWishlist from "@/lib/getWishlist";


const Container = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(0);

  const getAllReview = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      setLoading(false);
      if(res?.data) {
        setData(res?.data)
        const {data} = res;
        
        if(data?.communities?.length > 0) {
          setTotalPages(
            Math.ceil(data.communities?.length / 10) <= 1 
              ? 1 
              : Math.ceil(data.communities?.length / 10)
          );
        }
      } else {
        setTotalPages(1)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    getAllReview()
  }, [notify])


  return (
    <div className="breadcumb-style1">
      <div className="row">
        <div className="col-xl-12">
          <ListingsFavourites data={data} currentPage={currentPage} loading={loading} setNotify={setNotify}/>
          <div className="mt30">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;