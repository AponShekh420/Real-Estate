const getWishlist = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/wishlist/get`, {
      credentials: "include"
    });
    const currentData = await res.json();
    return currentData;
  } catch(err) {
    console.log(err.message)
  }
}

export default getWishlist;