import MenuItem from "@/components/dashboard/MenuItem";

const SidebarDashboard = ({user}) => {
  // const { userInfo: user } = useSelector((state) => state.user);

  const sidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard",
          icon: "flaticon-discovery",
          text: "Dashboard",
          roles: ["admin"], // Specify roles that can access this item
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/dashboard/users",
          icon: "FaLocationDot",
          text: "Users",
          roles: ["admin"],
        },
        {
          href: "/dashboard/subscribers",
          icon: "FaLocationDot",
          text: "Subscribers",
          roles: ["admin"],
        },
        {
          href: "/dashboard/catagory",
          icon: "FaLocationDot",
          text: "Catagory",
          roles: ["admin", "contributor"],
        },
        {
          href: "/dashboard/add-blog",
          icon: "FaLocationDot",
          text: "Add New Blog",
          roles: ["admin", "contributor"],
        },
        {
          href: "/dashboard/blogs",
          icon: "FaLocationDot",
          text: "Blogs",
          roles: ["admin", "contributor"],
        },
        {
          href: "/dashboard/location",
          icon: "FaLocationDot",
          text: "Location",
          roles: ["admin"],
        },
        {
          href: "/dashboard/add-community",
          icon: "flaticon-new-tab",
          text: "Add New Community",
          roles: ["admin"],
        },
        {
          href: "/dashboard/my-communities",
          icon: "flaticon-home",
          text: "My Communities",
          roles: ["admin"],
        },
        {
          href: "/dashboard/reviews",
          icon: "flaticon-review",
          text: "Reviews",
          roles: ["admin"],
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard/my-profile",
          icon: "flaticon-user",
          text: "My Profile",
          roles: ["user", "admin", "contributor"],
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
          roles: ["user", "admin", "contributor"],
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => {
          // Check if any item in the section is visible to the user
          const isSectionVisible = section.items.some(item => item.roles.includes(user?.role));

          // If the section is not visible, skip rendering it
          if (!isSectionVisible) return null;

          return (
            <div key={sectionIndex}>
              {/* Render the section title only if it is visible */}
              <p
                className={`fz15 fw400 ff-heading ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
              >
                {section.title}
              </p>
              {section.items.map((item, itemIndex) => {
                // Check if the user's role is included in the item's allowed roles
                const isAuthorized = item.roles.includes(user?.role);

                return isAuthorized ? (
                  <MenuItem key={itemIndex} item={item} />
                ) : null;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarDashboard;
