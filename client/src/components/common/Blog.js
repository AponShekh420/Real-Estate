
import Image from "next/image";
import Link from "next/link";
import TimeManager from "../single-community/common/TimeManager";

const Blog = ({data}) => {
  return (
    <>
      {data?.map((blog) => (
        <div className="col-sm-6 col-lg-4" key={blog?._id}>
          <div className="blog-style1">
            <div className="blog-img">
              <Image
                width={386}
                height={271}
                className="w-100 h-100 cover"
                src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/assets/blogs/${blog?.img}`}
                alt="blog"
              />
            </div>
            <div className="blog-content">
              <div className="date">
              <a className="body-light-color" href="#">
                <TimeManager data={blog}/>
              </a>
              </div>
              <h6 className="title mt-1">
                <Link href={`/blog/${blog?.slug}`}>{blog?.title}</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
