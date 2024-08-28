"use client"
import { logout, setCredentials } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login/success`, {
        credentials: "include",
      });
      const data = await res.json();
      if(data?.user) {
        dispatch(setCredentials(data?.user))
      } else {
        dispatch(logout())
      }
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(()=> {
    getUser();
  }, [])

  return <>{children}</>;
};

export default Wrapper;
