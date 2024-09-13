import MenuItem from "../dashboard/MenuItem";
import Image from "next/image";

const UserAvatar = ({userInfo, mobile}) => {
  const menuItems = [
    {
      href: "/dashboard",
      icon: "flaticon-discovery",
      text: "Dashboard",
      roles: ["admin", "contributor"], // Specify roles that can access this item
    },
    {
      href: "/my-favourites",
      icon: "flaticon-like",
      text: "My Favorites",
      roles: ["viewer", "admin", "contributor"],
    },
    {
      href: "/my-profile",
      icon: "flaticon-user",
      text: "My Profile",
      roles: ["viewer", "admin", "contributor"],
    },
    {
      href: "/login",
      icon: "flaticon-logout",
      text: "Logout",
      roles: ["viewer", "admin", "contributor"],
    },
  ];
  return (
    <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
      <li className=" user_setting">
        <div className="dropdown">
          <a className={`btn ${mobile && "p0"}`} href="#" data-bs-toggle="dropdown">
            <Image
              width={mobile ? "22" : "32"}
              height={mobile ? "22" : "32"}
              style={{objectFit: "cover"}}
              className="rounded-circle"
              src={userInfo?.avatar?.split("/")[2] !== "lh3.googleusercontent.com" ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/users/${userInfo?.avatar}` : userInfo?.avatar || "/images/user_avatar.png"}
              alt={"Profile Pic"}
            />
          </a>
          <div className="dropdown-menu">
            <div className="user_setting_content">
              <div className="col-12 mb10">
                <div className="message_container mt30-md" style={{boxShadow: "none", borderRadius: "none"}}>
                  <div className="user_heading px-0 py-2 pt-0">
                    <div className="wrap">
                      <span className="contact-status online" />
                      <Image
                        width={50}
                        height={50}
                        className="rounded-circle"
                        style={{objectFit: "cover"}}
                        src={userInfo?.avatar?.split("/")[2] !== "lh3.googleusercontent.com" ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/users/${userInfo?.avatar}` : userInfo?.avatar || "/images/user_avatar.png"}
                        alt={userInfo?.firstName + " " + userInfo?.lastName}
                      />
                      <div className="meta d-sm-flex justify-content-sm-between align-items-center">
                        <div className="authors">
                          <h6 className="name mb-0">{userInfo?.firstName} {userInfo?.lastName}</h6>
                          <p className="preview" style={{wordBreak: "break-all", overflowWrap: "break-word", width: "100%"}}>{userInfo?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {menuItems?.map((item, itemIndex) => {
                const isAuthorized = item?.roles.includes(userInfo?.role);

                return isAuthorized ? (
                  <MenuItem key={itemIndex} item={item} headerItem={true} userInfo={userInfo} mobile={mobile}/>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default UserAvatar;