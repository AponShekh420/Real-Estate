const DeleteModal = ({deleteHanlder, item, subject}) => {
  return (
    <>
      <div className="modal fade" id={`exampleModalToggle-${item?._id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Confirmation To Delete</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the <b>"{item.name || item.title}"</b> {subject}?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={() => deleteHanlder(item?._id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;