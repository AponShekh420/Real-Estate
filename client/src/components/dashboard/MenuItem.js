"use client"
import { usePathname } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GiCheckboxTree } from "react-icons/gi";
import { PiNotePencilThin } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {logout as logoutAction} from "@/redux/userSlice"



const MenuItem = ({itemIndex, item, headerItem, userInfo}) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
        credentials: "include",
      });
      await res.json();
      dispatch(logoutAction());
      router.push("/");
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <>
      {headerItem ? (
        item.text == "Logout" ? (
          <Link
            key={itemIndex}
            className={`dropdown-item ${
              pathname == item.href ? "-is-active" : ""
            } `}
            href={"#"}
            onClick={logout}
          >
            <i className={`${item.icon} mr15`} />
            {item.text}
          </Link>
        ) : (
          <Link
            key={itemIndex}
            className={`dropdown-item ${
              pathname == item.href ? "-is-active" : ""
            } `}
            href={((item.text == "My Profile") && (userInfo.role == "admin" || userInfo?.role == "contributor")) ? `/dashboard/${item.href}`: item.href}
          >
            {item.text === "My Blogs" ? (
              <HiOutlineNewspaper size={22} className="mr15"/>
            ) : (
              <i className={`${item.icon} mr15`} />
            )}
            {item.text}
          </Link>
        )
      ): (
        item.text == "Logout" ? (
          <div key={itemIndex} className="sidebar_list_item">
            <Link
              className={`items-center   ${
                pathname == item.href ? "-is-active" : ""
              } `}
              href={"#"}
              onClick={logout}
            >
              <i className={`${item.icon} mr15`} />
              {item.text}
            </Link>
          </div>
        ) : (
          <div key={itemIndex} className="sidebar_list_item">
            <Link
              href={item.href}
              className={`items-center   ${
                pathname == item.href ? "-is-active" : ""
              } `}
            >
              {item.text === "Location" ? (
                <CiLocationOn size={22} className="mr15"/>
              ) : item.text === "Blogs" ? (
                <HiOutlineNewspaper size={22} className="mr15"/>
              ) : item.text === "Catagory" ? (
                <GiCheckboxTree  size={22} className="mr15"/>
              ): item.text === "Add New Blog" ? (
                <PiNotePencilThin size={22} className="mr15"/>
              ): (
                <i className={`${item.icon} mr15`} />
              )}
              {item.text}
            </Link>
          </div>
        )
      )}
    </>
  );
}

export default MenuItem;