import Image from 'next/image';
import TimeManager from '../single-community/common/TimeManager';

export default function Details({id, data}) {
  return (
    <>
     <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <h2 className="blog-title">
                {data.title}
              </h2>
              <div className="blog-single-meta">
                <div className="post-author d-sm-flex align-items-center">
                  <Image
                    width={40}
                    height={40}
                    style={{objectFit: "cover"}}
                    className="rounded-circle mr10"
                    src={data?.auther?.avatar?.split("/")[2] !== "lh3.googleusercontent.com" ? data?.auther?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_API}/assets/users/${data?.auther?.avatar}` : "/images/user_avatar.png" : data?.auther?.avatar}
                    alt={data?.auther?.firstName + " " + data?.auther?.lastName}
                  />
                  <a className="pr15 bdrr1" href="#">
                    {data?.auther?.firstName} {data?.auther?.lastName}
                  </a>
                  <a className="ml15 pr15 bdrr1" href="#">
                    {data?.catagory?.name}
                  </a>
                  <a className="ml15" href="#">
                    <i className="far fa-clock pe-2" />
                    <TimeManager data={data}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End .container */}

        <div
          className="mx-auto maxw1600 mt60"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="large-thumb h580">
                <Image
                  width={1200}
                  height={100}
                  priority
                  className="w-100 h-100 cover"
                  // style={{maxHeight:'600px',objectFit:'cover'}}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API}/assets/blogs/${data.img}`}
                  alt={data?.title}
                />
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
