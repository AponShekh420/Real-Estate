import Image from 'next/image';
import TimeManager from '../single-community/common/TimeManager';
import Link from 'next/link';

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
                    src={data?.auther?.avatar}
                    alt={data?.auther?.firstName + " " + data?.auther?.lastName}
                  />
                  <span className="pr15 bdrr1" style={{cursor: "default"}}>
                    {data?.auther?.firstName} {data?.auther?.lastName}
                  </span>
                  <div className="ml15 pr15 bdrr1">
                    {data?.catagory.map((item, index) => (data.catagory.length > (index + 1)) ? (
                      <Link href={`/blogs/${item?.slug}`}>
                        {" " + item.name},
                      </Link>
                    ): (
                      <Link href={`/blogs/${item?.slug}`}>
                        {" " + item.name}
                      </Link>
                    ))}
                  </div>
                  <span className="ml15">
                    <i className="far fa-clock pe-2" />
                    <TimeManager data={data}/>
                  </span>
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
                  src={data?.img}
                  alt={data?.title}
                />
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
