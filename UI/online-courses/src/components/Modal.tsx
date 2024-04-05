import { ModalData } from "../interfaces/ModalData.interface";

export const Modal = ({
  title,
  description,
  txtBtnAccept,
  txtBtnCancel,
  showBtnCancel,
  onAccept,
  onCancel,
}: ModalData) => {
  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      <article className="modal">
        <div className="modal-content">
          <label className="modal-content-title">{title}</label>

          <label className="modal-content-description">{description}</label>

          <div className="modal-content-buttons">
            {showBtnCancel && (
              <button className="modal-content-button" onClick={handleCancel}>
                {txtBtnCancel}
              </button>
            )}

            <button className="modal-content-button" onClick={handleAccept}>
              {txtBtnAccept}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
