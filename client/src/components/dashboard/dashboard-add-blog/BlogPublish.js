"use client"
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addBlogFieldValue, removeAllBlogFieldValue } from "@/redux/blogSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BlogPublish = () => {
  const [loading, setLoading] = useState(false);

  // url data 
  const pathname = usePathname();
  const {slug} = useParams();
  const router = useRouter();

  // redux
  const blog = useSelector((state)=> state.blog)
  const dispatch = useDispatch();


  const editPageValidation = pathname.split("/")[2] === "edit-blog" ? true : false;


  const addBlog = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...blog,
          catagoryId: blog?.catagoryId?._id,
          subcatagoryId: blog?.subcatagoryId?._id,
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        dispatch(removeAllBlogFieldValue());
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push(`/dashboard/edit-blog/${dataRes.data.slug}`)
        }, 1500)
      } else {
        dispatch(addBlogFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  const updateBlog = async () => {
    try {
      setLoading(true);
      console.log("title:", blog.title)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...blog,
          catagoryId: blog?.catagoryId?._id,
          subcatagoryId: blog?.subcatagoryId?._id,
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        toast.success(dataRes.msg, {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(()=> {
          router.push('/dashboard/blogs')
        }, 1500)
      } else if(dataRes.errors.img) {
        toast.error(dataRes.errors.img.msg, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        dispatch(addBlogFieldValue({errors: dataRes?.errors}))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const getExistingDataToUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/single-blog/${slug}`);
      const existingBlogData = await res.json();
      console.log(existingBlogData)
      if(existingBlogData?.errors?.notFound) {
        router.push('/dashboard/blogs');
      } else {
        const {title, active, img, subcatagory, catagory, _id, desc} = existingBlogData.data
        dispatch(addBlogFieldValue({
          blogId: _id,
          title,
          desc,
          active, 
          img,
          subcatagoryId: subcatagory,
          catagoryId: catagory,
          loading: false
        }));
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=> {
    if(editPageValidation) {
      dispatch(addBlogFieldValue({loading: true}));
      getExistingDataToUpdate();
    } else {
      dispatch(removeAllBlogFieldValue());
      dispatch(addBlogFieldValue({loading: false}));
    }
  }, [])


  return (
    <div className="dashboard_title_area">
      <button onClick={editPageValidation ? updateBlog : addBlog} className={`bdr1 bg-black text-white rounded-3 shadow mb-5 py-2 px-3 d-flex gap-2 justify-content-center align-items-center fs-6 ${loading? "opacity-50" : "opacity-100"}`} disabled={loading}>
        {editPageValidation ? "Blog Update" : "Add Blog"}
        {!loading ? <ImUpload /> : <HashLoader
        color="#ffffff"
        loading={loading}
        cssOverride={override}
        size={17}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      }
      </button>
      <ToastContainer/>
    </div>
  );
}

export default BlogPublish;