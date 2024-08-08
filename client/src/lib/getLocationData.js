import { addCommunityFilterValue } from "@/redux/communityFilterSlice"
import store from "@/redux/store"

const getLocationData = async (params) => {
  const {slug} = params
  store.dispatch(addCommunityFilterValue({
    state: "",
    city: "",
    area: "",
  }));
  try {
    if(slug?.length == 1 && slug !== undefined) {
      const res = await fetch("http://localhost:5000/api/state/get-by-slug", {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[0],
          active: true
        })
      });
      return await res.json();
    } else if(slug?.length == 2 && slug !== undefined) {
      const res = await fetch("http://localhost:5000/api/city/get-by-slug", {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[1],
          active: true
        })
      });
      return await res.json();
    } else if(slug?.length === 3 && slug !== undefined) {
      const res = await fetch("http://localhost:5000/api/area/get-by-slug", {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[2],
          active: true
        })
      });
      return await res.json();
    } else {
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}


export default getLocationData;