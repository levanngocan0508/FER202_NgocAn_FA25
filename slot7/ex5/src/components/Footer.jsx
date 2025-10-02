export default function Footer() {
  return (
    <footer className="footer mt-auto text-white">
      <div className="container py-4">
        <div className="row gy-3">
          <div className="col-md-6">
            <h6 className="mb-2 fw-bold">Our Address</h6>
            <div className="small lh-sm">
              Khu đô thị FPT Đà Nẵng<br/>
              ☎ 8401231111<br/>
              ✆ 852 675 4321<br/>
              ✉ fptu@fpt.edu.vn
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-md-end">
            <div className="socials mb-2">
              <a href="#"><i className="bi bi-google me-3"></i></a>
              <a href="#"><i className="bi bi-facebook me-3"></i></a>
              <a href="#"><i className="bi bi-linkedin me-3"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
              <a href="#"><i className="bi bi-envelope-fill"></i></a>
              

            </div>
            <div className="small">© Copyright 2023</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
