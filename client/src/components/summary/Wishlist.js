import getWishlist from "@/lib/getWishlist";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginSignupModal from "../common/login-signup-modal";

const Wishlist = ({listing}) => {
  const [wishlist, setWislist] = useState([]);
  const [notify, setNotify] = useState(0);


  // redux 
  const {userInfo} = useSelector(state => state.user)



  const getAllReview = async () => {
    try {
      const res = await getWishlist();
      if(res?.data) {
        setWislist(res?.data?.communities?.map(community => community._id))
      }
    } catch(err) {
      console.log(err.message)
    }
  }


  const wishlistHanlder = async (communityId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/wishlist/toggle`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          communityId,
        })
      });
      const resData = await res.json();
      if(resData?.msg) {
        setNotify(Math.random() * 100)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    userInfo && getAllReview();
  }, [notify])

  return (
    <>
      {wishlist.includes(listing._id) ? (
        <Link href="#" className="d-flex align-items-center justify-content-center" onClick={() => userInfo && wishlistHanlder(listing._id)}>
          <i class="fa-solid fa-heart" style={{color: "red"}}></i>
        </Link>
      ) : (
        <Link 
          href="#" 
          onClick={() => userInfo && wishlistHanlder(listing._id)}
          data-bs-toggle={`${userInfo ? null : "modal"}`}
          data-bs-target="#loginSignupModal"
          role={userInfo ? null : "button"}
        >
          <span className="flaticon-like" />
        </Link>
      )}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}
    </>
  );
}

export default Wishlist;