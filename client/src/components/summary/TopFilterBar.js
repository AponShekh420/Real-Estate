"use client";

import { addCommunityFilterValue } from "@/redux/communityFilterSlice";
import { useDispatch, useSelector } from "react-redux";

const TopFilterBar = () => {
  const {
    currentPage,
    totalPages,
    data: communitiesData,
    sorting,
  } = useSelector((state) => state.communityFilter);
  const dispatch = useDispatch();

  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {currentPage}-{totalPages} of {communitiesData?.length}+
            results
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center bdr1 px10">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              value={sorting}
              className="form-select"
              onChange={(e) =>
                dispatch(
                  addCommunityFilterValue({
                    sorting: e.target.value,
                  })
                )
              }
            >
              <option>Lowest Price</option>
              <option>Highest Price</option>
              <option># of Homes Low to High</option>
              <option># of Homes High to Low</option>
            </select>
          </div>
          {/* <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${!colstyle? 'menuActive':'#' } `}  onClick={()=>setColstyle(false)}>
            Grid
          </div>
          <div className={`pl15 d-none d-md-block cursor  ${colstyle? 'menuActive':'#' }`}   onClick={()=>setColstyle(true)}>
            List
          </div> */}
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
