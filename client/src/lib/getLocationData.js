const getLocationData = async (params) => {
  const {slug} = params
  try {
    console.log("params", params)
    if(slug?.length == 1 && slug !== undefined) {
      console.log("condition", slug[0])
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
      // get city
      return await res.json();
    } else if(slug?.length === 3 && slug !== undefined) {
      // get area
      return await res.json();
    } else {
      // dipatch community and remove all location
      return;
    }
  } catch(err) {
    console.log(err.message)
  }
}


export default getLocationData;