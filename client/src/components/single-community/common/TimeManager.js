"use client"
import Moment from "react-moment";

const TimeManager = ({data}) => {
  return (
    <Moment format="D MMM YYYY">
      {data?.createdAt}
    </Moment>
  );
}

export default TimeManager;