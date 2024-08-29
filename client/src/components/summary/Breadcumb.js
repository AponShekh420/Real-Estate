"use client"
import Link from "next/link";
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
      <Link href="/">Home</Link>
      <Link href="/summary">Summary</Link>
      {pathNameList[2] ? (<Link href={`/summary/${pathNameList[2]}`} className="text-capitalize">/ {pathNameList[2]}</Link>) : null}
      {pathNameList[3] ? (<Link href={`/summary/${pathNameList[2]}/${pathNameList[3]}`} className="text-capitalize">/ {pathNameList[3]}</Link>) : null}
      {pathNameList[4] ? (<Link href={`/summary/${pathNameList[2]}/${pathNameList[3]}/${pathNameList[4]}`} className="text-capitalize">/ {pathNameList[4]}</Link>) : null}
    </div>
  );
}

export default Breadcumb;