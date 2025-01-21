import Link from "next/link";

let searchTime;

const FilterHeader = ({
  setSearch,
  search,
  setSortValue,
  sortValue,
  setCurrentPage,
}) => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Search"
            required
            onChange={(e) => {
              clearTimeout(searchTime);
              searchTime = setTimeout(() => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }, 700);
            }}
            // value={search}
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            Sort by:
          </span>
          <select
            onChange={(e) => setSortValue(e.target.value)}
            defaultValue={"date_added_desc"}
            className="form-select show-tick"
          >
            <option value={"community_name_asc"}>Community Name ASC</option>
            <option value={"date_added_asc"}>Date Added ASC</option>
            <option value={"date_added_desc"}>Date Added DESC</option>
            <option value={"date_edited_asc"}>Date Edited ASC</option>
            <option value={"date_edited_desc"}>Date Edited DESC</option>
          </select>
        </div>
      </div>
      <Link href="/dashboard/add-community" className="ud-btn btn-thm">
        Add New Community
        <i className="fal fa-arrow-right-long" />
      </Link>
    </div>
  );
};

export default FilterHeader;
