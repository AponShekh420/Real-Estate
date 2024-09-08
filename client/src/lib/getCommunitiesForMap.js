const getCommunitiesForMap = async () => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/community/get-for-map`, {
      credentials: "include"
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

export default getCommunitiesForMap;