"use client"
import { usePathname } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { GiCheckboxTree } from "react-icons/gi";
import { PiNotePencilThin } from "react-icons/pi";
import Link from "next/link";



const MenuItem = ({itemIndex, item, headerItem}) => {

  const pathname = usePathname();


  return (
    <>
      {headerItem ? (
        <Link
          key={itemIndex}
          className={`dropdown-item ${
            pathname == item.href ? "-is-active" : ""
          } `}
          href={item.href}
        >
          {item.text === "My Blogs" ? (
            <HiOutlineNewspaper size={22} className="mr15"/>
          ) : (
            <i className={`${item.icon} mr15`} />
          )}
          {item.text}
        </Link>
      ): (
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
      )}
    </>
  );
}

export default MenuItem;