import { addCommunityFilterValue } from "@/redux/communityFilterSlice";

const { default: store } = require("@/redux/store");

const getCommunities = async () => {
  const {
    titleSearch,
    state,
    area,
    city,
    homeTypes,
    status,
    active,
    currentPage,
    ageRestrictions,
    gated,
    amenities,
    price,
    sorting,
    isNewContraction,
    closestHospital,
    closestAirport,
    closestMilitaryBase,
    builder,
  } = store.getState().communityFilter;
  const { dispatch } = store;

  try {
    dispatch(
      addCommunityFilterValue({
        loading: true,
      })
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/get-by-filter`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleSearch,
          stateId: state._id,
          areaId: area._id,
          cityId: city._id,
          homeTypes,
          status,
          active,
          amenities,
          gated,
          ageRestrictions,
          price,
          limitStart: (currentPage - 1) * 10,
          limitEnd: currentPage * 10,
          sorting,
          isNewContraction,
          closestHospital,
          closestAirport,
          closestMilitaryBase,
          builder,
        }),
      }
    );
    const dataRes = await res.json();

    if (dataRes.msg) {
      dispatch(
        addCommunityFilterValue({
          data: dataRes?.data,
          loading: false,
          totalPages:
            dataRes?.data?.length / 10 <= 1
              ? 1
              : Math.ceil(dataRes?.data?.length / 10),
        })
      );
      return dataRes?.data;
    } else {
      dispatch(
        addCommunityFilterValue({
          loading: false,
        })
      );
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default getCommunities;
