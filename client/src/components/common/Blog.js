"use client"
import Image from "next/image";
import Link from "next/link";
import TimeManager from "../single-community/common/TimeManager";

const Blog = ({data}) => {
  return (
    <>
      {data?.map((blog) => (
        <div className="col-sm-6 col-lg-4" key={blog?._id}>
          <Link href={`/blog/${blog?.slug}`}>
            <div className="blog-style1">
              <div className="blog-img">
                <Image
                  width={386}
                  height={271}
                  className="w-100 h-100 cover"
                  src={blog?.img}
                  alt={blog?.title}
                />
              </div>
              <div className="blog-content">
                <div className="date">
                <span className="body-light-color text-dark">
                  <TimeManager data={blog}/>
                </span>
                </div>
                <h6 className="title mt-1">
                  <span>{blog?.title}</span>
                </h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blog;
