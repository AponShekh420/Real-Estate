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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/state/get-by-slug`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[0],
          active: true
        })
      });
      const state = await res.json();

      if(state) {
        store.dispatch(addCommunityFilterValue({
          state: state?.data,
        }));
        return state;
      } else {
        return;
      }

    } else if(slug?.length == 2 && slug !== undefined) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/area/get-by-slug`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[1],
          active: true
        })
      });
      const area = await res.json();

      if(area) {
        store.dispatch(addCommunityFilterValue({
          area: area?.data,
          state: area?.data?.state
        }));
        return area;
      } else {
        return;
      }
    } else if(slug?.length === 3 && slug !== undefined) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/city/get-by-slug`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[2],
          active: true
        })
      });
      const city = await res.json();

      if(city) {
        store.dispatch(addCommunityFilterValue({
          city: city?.data,
          state: city?.data?.state,
          area: city?.data?.area
        }));
        return city;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}


export default getLocationData;