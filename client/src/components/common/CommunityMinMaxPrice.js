"use client";
import currency from "currency.js";

const CommunityMinMaxPrice = ({ data }) => {
  console.log(data.minPrice, data.maxPrice);
  if (data.minPrice && data.maxPrice) {
    return (
      <>
        {currency(data?.minPrice, { fromCents: true, precision: 0 }).format()} -
        {currency(data?.maxPrice, { fromCents: true, precision: 0 }).format()}
      </>
    );
  }
  if (data.minPrice && !data.maxPrice) {
    return (
      <>
        {currency(data?.minPrice, { fromCents: true, precision: 0 }).format()}+
      </>
    );
  }
  if (!data.minPrice && data.maxPrice) {
    return (
      <>
        {currency(data?.minPrice, { fromCents: true, precision: 0 }).format()}{" "}
        and under
      </>
    );
  }
  return null;
};

export default CommunityMinMaxPrice;
