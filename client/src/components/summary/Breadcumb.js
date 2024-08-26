"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Breadcumb = () => {
  const pathname = usePathname();
  const pathNameList = pathname.split("/");

  useEffect(()=> {
    console.log("pathname:", pathNameList)
  })

  return (
    <div className="breadcumb-list">
      <a href="#">Home</a>
      <a href="/summary">Summary</a>
      {pathNameList[2] ? (<a href={`/summary/${pathNameList[2]}`} className="text-capitalize">/ {pathNameList[2]}</a>) : null}
      {pathNameList[3] ? (<a href={`/summary/${pathNameList[2]}/${pathNameList[3]}`} className="text-capitalize">/ {pathNameList[3]}</a>) : null}
      {pathNameList[4] ? (<a href={`/summary/${pathNameList[2]}/${pathNameList[3]}/${pathNameList[4]}`} className="text-capitalize">/ {pathNameList[4]}</a>) : null}
    </div>
  );
}

export default Breadcumb;