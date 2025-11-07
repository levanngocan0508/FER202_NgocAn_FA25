// AppModal.jsx
import React, { forwardRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AppModal = forwardRef(function AppModal(
  {
    show,
    onClose,
    title = 'Information',
    children,
    // Footer mặc định (OK/Close có thể bật/tắt nhanh)
    footer,
    showOk = false,
    showCancel = true,
    okText = 'OK',
    cancelText = 'Close',
    onOk,
    onCancel,
    // Tuỳ chọn hành vi/hiển thị
    size = 'md',
    centered = true,
    backdrop = true,   // true | false | 'static'
    keyboard = true,   // ESC
    scrollable = false,
    fullscreen = false,
    ...rest
  },
  ref
) {
  const handleCancel = onCancel || onClose;

  return (
    <Modal
      show={show}
      onHide={onClose}
      size={size}
      centered={centered}
      backdrop={backdrop}
      keyboard={keyboard}
      scrollable={scrollable}
      fullscreen={fullscreen}
      aria-labelledby="app-modal-title"
      ref={ref}
      {...rest}
    >
      {title !== null && (
        <Modal.Header closeButton>
          <Modal.Title id="app-modal-title">{title}</Modal.Title>
        </Modal.Header>
      )}

      {children !== undefined && <Modal.Body>{children}</Modal.Body>}

      {(footer !== undefined || showOk || showCancel) && (
        <Modal.Footer>
          {footer ?? (
            <>
              {showCancel && (
                <Button variant="secondary" onClick={handleCancel}>
                  {cancelText}
                </Button>
              )}
              {showOk && (
                <Button variant="primary" onClick={onOk}>
                  {okText}
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
});

export default AppModal;
