import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Link from "next/link";

export const metadata = {
  title: "About  || Homez - Real Estate NextJS Template",
};

const PrivacyPolicy = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section2 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Privacy Policy</h2>
                <div className="breadcumb-list">
                  <Link href="/">Home</Link>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Our About content area */}

      {/* No 1 */}
      <section className="our-about">
        <div className="container">
          {/* No 0 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <h2>
                Privacy Policy
              </h2>
              <div className="text mb25">
                <p>
                  55up respects your privacy and we comply with all applicable laws and regulations designed to ensure your privacy. Your relationship with 55up is important and we want to affirm our continuing commitment to the proper use of customer information, which we have or may gather in the normal course of business. We will generally keep this information about you confidential, but may share the information about you with our business partners as described below in order to provide better service to you.
                </p>
              </div>
            </div>
          </div>

          {/* No 1 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Information About You
              </h2>
              <div className="text mb25">
                55up collects, retains and uses information about individual customers only when we believe it would be useful (and allowed by law) in administering our business and to provide products, services, and other opportunities to customers.
                This information is obtained from web form information, transaction information, and consumer report information. This notice discloses the privacy practices of 55up. This notice applies solely to information collected by this website. It will notify you of the following:
                <ul style={{listStyleType: "disc !important", marginTop: "7px"}}>
                  <li style={{listStyleType: "inherit !important"}}>That personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                  <li style={{listStyleType: "inherit !important"}}>What choices are available to you regarding the use of your data.</li>
                  <li style={{listStyleType: "inherit !important"}}>The security procedures in place to protect the misuse of your information</li>
                  <li style={{listStyleType: "inherit !important"}}>How you can correct any inaccuracies in the information.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* no 2 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Information Collection, Use, and Sharing
              </h2>
              <div className="text mb25">
                <p>
                  We are the sole owners of the information collected on this site. We only have access to collect information that you voluntarily give us via email, web form, or other direct contact from you.
                  We will use your information to respond to you regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill our services. Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.
                </p>
                We may collect information from:
                <ul style={{listStyleType: "disc !important", marginTop: "7px"}}>
                  <li style={{listStyleType: "inherit !important"}}>Any forms you fill out and submit, such as your name, address, age, and email address.</li>
                  <li style={{listStyleType: "inherit !important"}}>Your history with us, including services provided through third parties.</li>
                </ul>
                <p className="mt10">
                  If you do not wish to share personal information, do not submit a request with us
                </p>
                <p className="mt10">
                  We will collect information about you that we reasonably believe will be necessary or useful in processing or administering services that you have requested from us. We will also collect information in order to notify you about services and other opportunities we think will be of interest to you.
                </p>
              </div>
            </div>
          </div>

          {/* no 3 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                With Respect to Cookies
              </h2>
              <div className="text mb25">
                <p>
                  We use cookies to record user-specific information on what pages users access or visit or to customize the website content based on visitor’s browser type or other information that the visitor sends.
                </p>
              </div>
            </div>
          </div>
          

          {/* no 4 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Your Access to and Control Over Information
              </h2>
              <div className="text mb25">
                You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via our email address or phone number given on our website:
                <ul style={{listStyleType: "disc !important", marginTop: "7px"}}>
                  <li style={{listStyleType: "inherit !important"}}>See what data we have about you, if any.</li>
                  <li style={{listStyleType: "inherit !important"}}>Change or correct any data we have about you.</li>
                  <li style={{listStyleType: "inherit !important"}}>Have us delete any data we have about you.</li>
                </ul>
                <p className="mt10">
                 If you wish to direct 55up to stop sharing certain nonpublic personal information or cease marketing activities directed to you, you may send your instructions to the address or email address provided below. When you send your instructions to us, please e-mail your request along with your full name to <Link className="text-info" href={"mailto:info@55up.com"}>info@55up.com.</Link>
                </p>
              </div>
            </div>
          </div>


          {/* no 5 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Opt-Out Options
              </h2>
              <div className="text mb25">
                At any time, you may choose to tell us not to:
                <ul style={{listStyleType: "disc !important", marginTop: "7px"}}>
                  <li style={{listStyleType: "inherit !important"}}>
                    Disclose information about you outside our company, except we may disclose information as required or permitted by law. Also, we permit the sharing of information when vendors or contractors are assisting us in maintaining your account information in our system.
                  </li>
                  <li style={{listStyleType: "inherit !important"}}>
                    Solicit you through mail, phone, or email for products and services that you have not originally requested or applied for and that are outside of our normal ongoing communications regarding the servicing or management of your existing accounts. For information about your rights, please contact us at the address or email address below. Express any concern you have about our use of your data.
                  </li>
                </ul>
                <p className="mt10">
                  55up, LLC<br/>
                  123 Maple Street<br/>
                  Marietta, GA 30067<br/>
                  Toll-Free: 1-888-555-5555<br/>
                  <Link className="text-info" href={"mailto:info@55up.com"}>info@55up.com.</Link>
                </p>
              </div>
            </div>
          </div>

          {/* no 6 */}
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Safeguarding Information About You
              </h2>
              <div className="text mb25">
                <p>
                  Information that we have about you is available to our employees and agents on a “need to know” basis. We prohibit our employees and agents from giving information about you to anyone in any manner that would violate any applicable law or our privacy policy. We do not provide information about you to anyone without first verifying who they are and whether they may have legal or legitimate access to the information. We train our employees to protect information we have about you. We take all reasonable steps, including encryption, to ensure that your personal data is disclosed only to those deemed necessary. However, the Internet is an open system and we cannot and do not guarantee that the personal data you have provided to us will not be intercepted or decrypted by others.
                </p>
              </div>
            </div>
          </div>

           {/* no 7 */}
           <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-12">
              <h2>
                Information Sharing & Non-Agent Non-Affiliated Third Parties
              </h2>
              <div className="text mb25">
                <p>
                  55up will use a customer’s personal identifying information in our normal course of business.
                </p>
                <p className="mt10">
                  If you feel that we are not abiding by this privacy policy or have questions and/or concerns regarding this statement, you should contact us immediately via e-mail at <Link className="text-info" href={"mailto:info@55up.com"}>info@55up.com.</Link>
                </p>
                <p>
                  Additionally we may share your name and personal information with carefully selected business partners that may be able to offer you products and services that you’ve indicated may be of interest to you. We may also disclose nonpublic personal information about you as permitted by law. At any time you can inform us of your decision to opt-out. Please see OPT-OUT OPTIONS above.
                  In order to efficiently and cost-effectively market our own services, we contract with companies providing marketing and solicitation services, such as printers, marketing fulfillment firms, and other companies. As part of these activities, we may provide limited information about our customers to such parties.
                </p>
                <p>
                  We may need to disclose personal information when required by law wherein we have a good faith belief that such action is necessary to comply with a current judicial proceeding, a court order or legal process served on our website. 55up may disclose personal information if required to do so by law or in the good faith belief that such action is necessary to (a) conform to the edicts of the law or comply with legal process served on 55up or the website; (b) protect and defend the rights or property of 55up and our website; or (c) act in urgent circumstances to protect the personal safety of 55up employees or agents, users of 55up products or services, or members of the public.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default PrivacyPolicy;
