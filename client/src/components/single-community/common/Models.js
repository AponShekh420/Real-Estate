import Image from "next/image";

const Models = ({modelsData}) => {

  return (
    <div className="row mb30 p10 gap-3">
      {modelsData.map((element, index)=> (
        <div className={`ps-widget default-box-shadow2 p10`} style={{background: "#f1f1f1", borderRadius: "7px", }} key={index}>
          <div className="row">
            <div className="agent-single d-sm-flex pb0">
              <div className="single-img mb30-sm">
                <Image
                  width={140}
                  height={140}
                  className="w70"
                  src={`${process.env.SERVER_IMG_PATH}/assets/communityModels/${element.img}`}
                  alt="agent"
                />
              </div>
              <div className="single-contant ml30 ml0-xs">
                <h5 className="title mb-1">{element.name}</h5>
                <div className="agent-meta d-md-flex align-items-center">
                  <p>{element.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Models;