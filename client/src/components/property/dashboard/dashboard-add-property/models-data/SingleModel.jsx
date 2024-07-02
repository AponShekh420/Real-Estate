import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Image from "next/image";
import classes from './communityModel.module.css'


const SingleModel = () => {
  const modelData = {
    id: 1,
    name: "Arlene McCoy",
  };

  return (
    <div>
      <div className={`ps-widget ${classes.boxBg} bdrs12 default-box-shadow2 p30 mb30`}>
        <div className="title fz17 mb10 d-flex justify-content-end gap-3 align-items-center">
          <BsFillPencilFill color="green" size={16} cursor="pointer"/>
          <MdDeleteForever color="red" size={20} cursor="pointer"/>
        </div>
        <div className="row">
          <div className="agent-single d-sm-flex align-items-center pb25">
            <div className="single-img mb30-sm">
              <Image
                width={150}
                height={150}
                className="w150"
                src="/images/team/agent-3.png"
                alt="agent"
              />
            </div>
            <div className="single-contant ml30 ml0-xs">
              <h6 className="title mb-1">{modelData.name}</h6>
              <div className="agent-meta mb10 d-md-flex align-items-center">
                <p>short desction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleModel;