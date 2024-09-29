import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";

const ProSidebarContent = () => {
  const path = usePathname();

  const menuItem = [
    {path: "/blogs", label: "Blog"},
    {path: "/about", label: "About"},
    {path: "/contact", label: "Contact"},
  ]

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {menuItem?.map((nestedItem, nestedIndex) => (
          <MenuItem
            key={nestedIndex}
            className="bdrb1"
            component={
              <Link
                className={nestedItem.path == path ? "active" : ""}
                href={nestedItem.path}
              />
            }
          >
            {nestedItem.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
