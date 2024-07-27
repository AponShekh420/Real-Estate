const DeleteModal = ({deleteHanlder, item, subject}) => {
  return (
    <>
      <div class="modal fade" id={`exampleModalToggle-${item?._id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Confirmation To Delete</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete the <b>"{item.name || item.title}"</b> {subject}?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-danger text-light" data-bs-dismiss="modal" onClick={() => deleteHanlder(item?._id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;