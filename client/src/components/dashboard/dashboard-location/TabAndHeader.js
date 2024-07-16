"use client"
import store from "@/redux/store";
import {Provider} from "react-redux"
import AddPropertyTabContent from ".";

const TabAndHeader = () => {

  return (
    <Provider store={store}>
      <div className="row align-items-center pb40">
        <div className="col-lg-12 d-flex justify-content-between">
          <div className="dashboard_title_area">
            <h2>Location Management</h2>
            <p className="text">We are glad to see you again!</p>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
            <div className="navtab-style1">
              <AddPropertyTabContent />
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </Provider>
  );
}

export default TabAndHeader;