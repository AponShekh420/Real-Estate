import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      {/* about us */}
      <li className="visible_list dropitem">
        <Link
          className={`${handleActive("/about")} list-item`}
          href='/about'
        >
           about
        </Link>
      </li>

      {/* contact us */}
      <li className="visible_list dropitem">
        <Link
          className={`${handleActive("/contact")} list-item`}
          href='/contact'
        >
           Contact
        </Link>
      </li>

      {/* End property Items */}

      {/* contact us */}
      <li className="visible_list dropitem">
        <Link
          className={`${handleActive("/blogs")} list-item`}
          href='/blogs'
        >
           blog
        </Link>
      </li>
      {/* End blog */}
    </ul>
  );
};

export default MainMenu;
