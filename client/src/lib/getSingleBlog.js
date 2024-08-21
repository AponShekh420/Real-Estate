const getSingleBlog = async (slug) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/blog/single-blog/${slug}`, {
      cache: 'no-cache'
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

export default getSingleBlog;