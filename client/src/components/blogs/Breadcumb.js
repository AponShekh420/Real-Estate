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
      <Link href="/blogs">Blog</Link>
      {pathNameList[2] ? (<Link href={`/blogs/${pathNameList[2]}`} className="text-capitalize">/ {pathNameList[2]}</Link>) : null}
      {pathNameList[3] ? (<Link href={`/blogs/${pathNameList[2]}/${pathNameList[3]}`} className="text-capitalize">/ {pathNameList[3]}</Link>) : null}
    </div>
  );
}

export default Breadcumb;