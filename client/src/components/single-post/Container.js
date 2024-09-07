"use client"
import { useState } from "react";
import AllComment from "./comment";
import CommentBoxForm from "./CommentBoxForm";

const Container = ({data}) => {
  const [notify, setNotify] = useState(0)
  return (
    <>
      <AllComment data={data} notify={notify}/>
      {/* End  allComments */}

      <div className="bsp_reveiw_wrt">
        <h6 className="fz17">Leave A Comment</h6>
        <CommentBoxForm data={data} setNotify={setNotify}/>
      </div>
    </>
  );
}

export default Container;