const TopLayoutBlogs = () => {
  return (
    <div className="container">
      <div className="row" style={{height: "480px"}}>
        <div className="col-md-7 d-flex justify-content-center align-items-center p-1 py-1">
          <div className="w-100 bg-light d-flex justify-content-center align-items-center bg-black" style={{height: "100%"}}>
            Box 1
          </div>
        </div>
        <div className="col-md-5 d-flex flex-wrap px-0">
          <div className="col-12 p-1">
            <div className="bg-light d-flex justify-content-center align-items-center bg-black" style={{height: "100%"}}>
              Box 2
            </div>
          </div>
          <div className="col-12 p-1">
            <div className="bg-light d-flex justify-content-center align-items-center bg-black" style={{height: "100%"}}>
              Box 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopLayoutBlogs;