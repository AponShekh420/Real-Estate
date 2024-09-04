import { ToastContainer } from "react-toastify";
import PersonalInfo from "./PersonalInfo";
import "react-toastify/dist/ReactToastify.css";


const UserProfile = () => {
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
        <ToastContainer/>
      </div>
    </div>
  );
}

export default UserProfile;