import CommunityMinMaxPrice from "@/components/common/CommunityMinMaxPrice";
import Link from "next/link";
import Wishlist from "./Wishlist";

const PropertyHeader = ({ data }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 pr10 text-capitalize">
              {data?.city ? (
                <Link
                  href={`/summary/${data?.state?.slug}/${data?.area?.slug}/${data?.city?.slug}`}
                >
                  {data?.city?.name} City,{" "}
                </Link>
              ) : (
                <Link
                  href={`/summary/${data?.state?.slug}/${data?.area?.slug}`}
                >
                  {data?.area ? data?.area?.name + "," : ""}{" "}
                </Link>
              )}
              <Link href={`/summary/${data?.state?.slug}`}>
                {data?.state?.abbreviation}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <Wishlist data={data} />
            </div>
            <h3 className="price mb-0">
              <CommunityMinMaxPrice data={data} />
            </h3>
            <p className="text space fz15"></p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
