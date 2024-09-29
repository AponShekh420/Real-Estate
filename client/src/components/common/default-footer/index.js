import Image from "next/image";
import Link from "next/link";
import Subscribe from "./Subscribe";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="footer-logo" href="/">
                <Image
                  width={138}
                  height={70}
                  className="mb40"
                  src="/images/footer/logo-footer.png"
                  alt=""
                />
              </Link>
              <Subscribe />
            </div>
          </div>
          {/* End .col-lg-5 */}

          <div className="col-lg-6">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="row justify-content-between">
                <MenuWidget />
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      {/* <Copyright /> */}
      {/* End copyright */}
    </>
  );
};

export default Footer;
