const getModels = async (data) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/models/get/${data?._id}`);
    const currentData = await res.json();
    if(currentData.data) {
      return currentData.data
    } else {
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}

export default getModels;