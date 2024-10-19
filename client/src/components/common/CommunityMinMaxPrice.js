"use client"
import currency from "currency.js";

const CommunityMinMaxPrice = ({data}) => {
  return (
    <>
      {currency(data?.minPrice, { fromCents: true, precision: 0 }).format()} - {currency(data?.maxPrice, { fromCents: true, precision: 0 }).format()}
    </>
  );
}

export default CommunityMinMaxPrice;