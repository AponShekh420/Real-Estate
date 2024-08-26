import TimeManager from "@/components/single-community/common/TimeManager";
import getSpecificBlogs from "@/lib/getSpecificBlogs";
import Image from "next/image";
import Link from "next/link";

const LatestPost = async () => {
  const data = await getSpecificBlogs(0, 3, true, null, null, null);
  console.log(data)
  return (
    <div className="sidebar-widget mb30">
      <h6 className="widget-title">Latest Posts</h6>
      {data?.map((post, index) => (
        <div
          className="list-news-style d-flex align-items-center mt20 mb20"
          key={index}
        >
          <div className="news-img flex-shrink-0">
            <Image 
              width={90} 
              height={80} 
              alt="blog" 
              src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/blogs/${post?.img}`}
            />
          </div>
          <div className="news-content flex-shrink-1 ms-3">
            <p className="new-text mb0 fz14">
              <Link href={`/blog/${post?.slug}`}>{post?.title}</Link>
            </p>
            <a className="body-light-color" href="#">
              <TimeManager data={post}/>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPost;
