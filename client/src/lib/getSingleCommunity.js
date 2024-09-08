const getSingleCommunity = async (slug) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/single-community/${slug}`, {
      cache: 'no-cache',
      credentials: "include",
    })
    const dataRes = await res.json();
    if(dataRes) {
      return dataRes.data
    } else {
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}

export default getSingleCommunity;