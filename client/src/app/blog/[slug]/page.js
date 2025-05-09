import Details from "@/components/single-post/Details";
import Social from "@/components/single-post/Social";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import getSingleBlog from "@/lib/getSingleBlog";
import StringToDomComponent from "@/components/common/StringToDomComponent";
import "@/components/common/quillEditorTextStyle.css";
import RelatedPosts from "@/components/single-post/RelatedPosts";
import { notFound } from "next/navigation";


// add meta data for each blog post
export const generateMetadata = async ({params}) => {
  const {slug} = params;

  // get single community data from api
  const res = await getSingleBlog(slug);

  // if the data has not founded, that's mean the route are wrong, so redirect on not found page
  if(slug !==undefined && !res) {
    notFound();
  }

  const {title, desc, metaTitle, metaDesc, img} = res;

  return {
    title: metaTitle || title,
    description: metaDesc || desc,
    openGraph: {
      title: metaTitle || title,
      description: metaDesc || desc,
      images: [
        {
          url: img, // The image you want to display
          alt: metaTitle || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle || title,
      description: metaDesc || desc,
      images: {
        url: img,
        alt: metaTitle || title,
      }, // Twitter-specific image
    },
  }
}




// single blog page
const BlogSingle = async ({params}) => {

  const {slug} = params;

  // get single community data from api
  const res = await getSingleBlog(slug)
  // if the data has not founded, that's mean the route are wrong, so redirect on not found page
  if(slug !==undefined && !res) {
    notFound();
  }


  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Blog Section Area */}
      <section className="our-blog pt50">

        <Details  id={params.id} data={res}/>
       


        <div className="container mt45">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
              <div className="quillEditorTextHandler">
                <StringToDomComponent htmlString={res?.desc} />
              </div>

              <div className="bdrt1 bdrb1 d-block d-sm-flex justify-content-between pt50 pt30-sm pb50 pb30-sm">
                <div className="blog_post_share d-flex align-items-center mb10-sm">
                  <span className="mr30">Share</span>
                  <Social />
                </div>
              </div>
              {/* End share social and tags */}
            </div>
          </div>
        </div>
      </section>
      {/* End Blog Details */}

      {/* Related Blog Post */}
      <RelatedPosts data={res}/>
      {/* end Related Blog Post */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BlogSingle;
