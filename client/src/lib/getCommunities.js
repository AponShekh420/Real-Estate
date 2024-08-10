import { addCommunityFilterValue } from "@/redux/communityFilterSlice";

const { default: store } = require("@/redux/store");

const getCommunities = async () => {

  const { titleSearch, state, area, city, homeTypes, status, active } = store.getState().communityFilter;
  const {dispatch} = store;


  try {
    dispatch(addCommunityFilterValue({
      loading: true
    }))
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/get-by-filter`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titleSearch,
        stateId: state._id,
        areaId: area._id,
        cityId: city._id,
        homeTypes,
        status,
        active,
      })
    })
    const dataRes = await res.json();
    if(dataRes.msg) {
      dispatch(addCommunityFilterValue({
        data: dataRes?.data,
        loading: false,
      }))
      return dataRes?.data
    } else {
      dispatch(addCommunityFilterValue({
        loading: false,
      }));
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}

export default getCommunities;