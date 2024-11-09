const getSpecificBlogs = async (limitStart, limitEnd, active, catagory, titleSearch, notCatagory=null, relatedCatagory=null, skipedPost=null) => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/get-by-filter`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titleSearch,
        catagoryId: catagory?._id,
        active,
        limitStart: limitStart,
        limitEnd: limitEnd,
        notCatagoryId: notCatagory?._id || null,
        relatedCatagory,
        skipedPost,
      })
    })
    const dataRes = await res.json();
    if(dataRes.msg) {
      return dataRes?.data
    } else {
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}

export default getSpecificBlogs;