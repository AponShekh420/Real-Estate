import { addBlogFilterValue } from "@/redux/blogFilterSlice";

const { default: store } = require("@/redux/store");

const getBlogs = async () => {

  const { titleSearch, catagory, subcatagory, active, currentPage } = store.getState().blogFilter;
  const {dispatch} = store;


  try {
    dispatch(addBlogFilterValue({
      loading: true
    }))
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/get-by-filter`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titleSearch,
        catagoryId: catagory._id,
        subcatagoryId: subcatagory._id,
        active,
        limitStart: (currentPage - 1 ) * 10,
        limitEnd: currentPage * 10,
      })
    })
    const dataRes = await res.json();
    if(dataRes.msg) {
      dispatch(addBlogFilterValue({
        data: dataRes?.data,
        loading: false,
        totalPages: dataRes?.data?.length / 10 <= 1 ? 1 : Math.ceil(dataRes?.data?.length / 10),
      }))
      return dataRes?.data
    } else {
      dispatch(addBlogFilterValue({
        loading: false,
      }));
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}

export default getBlogs;