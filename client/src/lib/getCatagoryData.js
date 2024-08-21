import { addBlogFilterValue } from "@/redux/blogFilterSlice";
import store from "@/redux/store"

const getCatagoryData = async (params) => {
  const {slug} = params
  store.dispatch(addBlogFilterValue({
    catagory: "",
    subcatagory: "",
  }));
  try {
    console.log(slug)
    if(slug?.length == 1 && slug !== undefined) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/catagory/get-by-slug`, {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[0],
        })
      });
      const catagory = await res.json();
      console.log(catagory)
      if(catagory) {
        store.dispatch(addBlogFilterValue({
          catagory: catagory?.data,
        }));
        return catagory;
      } else {
        return;
      }

    } else if(slug?.length == 2 && slug !== undefined) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/subcatagory/get-by-slug`, {
        method: "POST",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: slug[1],
        })
      });
      const subcatagory = await res.json();

      if(subcatagory) {
        store.dispatch(addBlogFilterValue({
          subcatagory: subcatagory?.data,
        }));
        return subcatagory;
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


export default getCatagoryData;