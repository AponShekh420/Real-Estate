"use client";
import { removeCommunityFilterValues } from "@/redux/communityFilterSlice";
import { logout, setCredentials } from "@/redux/userSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const getUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login/success`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.user) {
        dispatch(setCredentials(data?.user));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetAdvanceSearch = () => {
    dispatch(removeCommunityFilterValues());
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("pathname in wrapper");

    if (!pathname.includes("summary")) {
      resetAdvanceSearch();
      console.log("pathname in wrapper inside condition");
    }
  }, [pathname]);

  return <>{children}</>;
};

export default Wrapper;
