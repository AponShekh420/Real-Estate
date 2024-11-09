import getSpecificBlogs from "@/lib/getSpecificBlogs";
import Blog from "../common/Blog";

const RelatedPosts = async ({data}) => {
  console.log(data)
  const relatedPostsData = await getSpecificBlogs(0, 3, true, null, null, null, data?.catagory?.map(eachCategory => eachCategory?._id), data?._id);

  return (
    <section className="pb90 pb20-md pt-0">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 m-auto"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="main-title text-start text-md-center">
              <h2 className="title">Related Posts</h2>
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <Blog data={relatedPostsData}/>
        </div>
      </div>
    </section>
  );
}

export default RelatedPosts;