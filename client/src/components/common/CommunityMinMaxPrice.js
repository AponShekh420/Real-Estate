"use client"
import CurrencyFormat from 'react-currency-format';

const CommunityMinMaxPrice = ({data}) => {
  return (
    <>
      <CurrencyFormat value={data?.minPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value} - </span>} />
      <CurrencyFormat value={data?.maxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} />
    </>
  );
}

export default CommunityMinMaxPrice;