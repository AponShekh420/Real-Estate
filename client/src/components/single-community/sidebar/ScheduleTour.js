"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ScheduleTour = ({ data }) => {
  const { title } = data;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [receiveInformation, setReceiveInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMsg("");
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/more-info/send`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            message,
            communityTitle: data?.title,
            communityUrl: data?.slug,
            communityId: data?._id,
            receiveInformation,
            subscribe,
          }),
        }
      );
      const resData = await res.json();
      setLoading(false);
      if (resData?.msg) {
        setSuccessMsg(resData.msg);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTime("");
      } else {
        setErrors(resData.errors);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setMessage(`I’d like additional information about ${title}`);
  }, [title]);

  return (
    <div className="ps-navtab">
      <div className="tab-content" id="pills-tabContent">
        <form
          className="form-style1"
          action={`${process.env.NEXT_PUBLIC_BACKEND_API}/api/email/more-info/send`}
          method="post"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="mb20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <p className="text-danger">{errors?.name?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-lg-12">
              <div className="mb20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    let formattedValue = "";

                    if (value.length > 0)
                      formattedValue += `(${value.substring(0, 3)}`;
                    if (value.length > 3)
                      formattedValue += `) ${value.substring(3, 6)}`;
                    if (value.length > 6)
                      formattedValue += ` ${value.substring(6, 10)}`;
                    e.target.value = formattedValue;
                    setPhone(e.target.value);
                  }}
                  value={phone}
                />
                <p className="text-danger">{errors?.phone?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="mb20">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <p className="text-danger">{errors?.email?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="mb10">
                <textarea
                  cols={30}
                  rows={4}
                  placeholder={`Please share any specific questions or details you're looking for`}
                  defaultValue={`I’d like additional information about ${title}`}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <p className="text-danger">{errors?.message?.msg}</p>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="mb10">
                <div class="form-check mb10">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={subscribe}
                    id="flexCheckDefault"
                    defaultChecked={subscribe}
                    onChange={() => setSubscribe((old) => !old)}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Subscribe me to 55up.com updates and newsletters.
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={receiveInformation}
                    id="flexCheckChecked"
                    onChange={() => setReceiveInformation((old) => !old)}
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    I’d also like to receive information about mortgage and
                    financing options.
                  </label>
                </div>
              </div>
            </div>
            {/* End .col-12 */}

            <div className="col-md-12">
              <div className="d-grid">
                <button
                  type="submit"
                  className={`ud-btn btn-thm d-flex align-items-center justify-content-center ${
                    loading ? "opacity-50" : "opacity-100"
                  }`}
                  disabled={loading}
                >
                  {!loading && "Submit Request"}
                  {loading ? (
                    <BeatLoader color="white" size={22} loading={loading} />
                  ) : (
                    <i className="fal fa-arrow-right-long" />
                  )}
                </button>
              </div>

              <div className="mt25">
                {successMsg && (
                  <div className="alert alert-success text-center" role="alert">
                    {successMsg}
                  </div>
                )}
                {errors?.fail && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errors?.fail?.msg}
                  </div>
                )}
              </div>
              <div>
                <small style={{ color: "gray" }}>
                  By requesting more information, you consent 55up.com, along
                  with its affiliated real estate or mortgage professionals, may
                  call, text, or email you as it relates to this request. You
                  can opt out at any time by emailing{" "}
                  <a style={{ color: "#EE4C34" }} href="mailto:optout@55up.com">
                    optout@55up.com
                  </a>
                  . By submitting this for you also acknowledge 55up.com’s{" "}
                  <Link style={{ color: "#EE4C34" }} href="/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </small>
              </div>
            </div>
            {/* End .col-12 */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTour;
