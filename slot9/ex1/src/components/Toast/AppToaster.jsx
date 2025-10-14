import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./toaster.css";

export default function AppToaster() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState("success"); // "success" | "secondary"

  useEffect(() => {
    const onToast = (e) => {
      setMsg(e?.detail?.message || "Done.");
      setVariant(e?.detail?.variant || "success");
      setShow(true);
    };
    window.addEventListener("app:toast", onToast);

    // Test nhanh trong Console: window.appToast("Hello","success")
    window.appToast = (message, v = "success") =>
      window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, variant: v } }));

    return () => {
      window.removeEventListener("app:toast", onToast);
      delete window.appToast;
    };
  }, []);

  return createPortal(
    <div className="app-toaster-overlay">
      <ToastContainer className="app-toaster-box p-0" role="status" aria-live="polite" aria-atomic="true">
        <Toast
          bg="light"
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          className="shadow-lg border-0 rounded-4 overflow-hidden"
        >
          <Toast.Header className={`text-white ${variant === "success" ? "bg-success" : "bg-secondary"}`}>
            <i className={`bi ${variant === "success" ? "bi-check-circle-fill" : "bi-heart"} me-2`} />
            <strong className="me-auto">Favourites</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-dark">{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>,
    document.body
  );
}
