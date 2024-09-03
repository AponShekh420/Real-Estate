import { ToastContainer } from "react-toastify";
import ChangePasswordForm from "./ChangePasswordForm";
import PersonalInfo from "./PersonalInfo";
import SocialField from "./SocialField";
import "react-toastify/dist/ReactToastify.css";


const MyProfile = ({user}) => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <div className="col-lg-12">
            <PersonalInfo />
          </div>
          {/* End PersonalInfo */}
        </div>
        {/* End .ps-widget */}

        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Social Media</h4>
          <SocialField />
        </div>
        {/* End .ps-widget */}

        {user?.provider !== "local" ? null : (
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Change password</h4>
            <ChangePasswordForm />
          </div>
        )}
        {/* End .ps-widget */}
        <ToastContainer/>
      </div>
    </div>
  );
}

export default MyProfile;