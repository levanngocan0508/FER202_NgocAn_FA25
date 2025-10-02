const students = [
  { id: "DE160182", name: "Nguyễn Hữu Quốc Khánh", campus: "DaNang", img: "/images/s1.jpg" },
  { id: "DE160377", name: "Choy Vĩnh Thiên",       campus: "QuangNam", img: "/images/s2.jpg" },
  { id: "DE160547", name: "Đỗ Nguyên Phúc",        campus: "QuangNam", img: "/images/s3.jpg" },
  { id: "DE170049", name: "Lê Hoàng Minh",         campus: "DaNang", img: "/images/s4.jpg" },
];

export default function Main() {
  return (
    <main className="flex-grow-1">
      {/* banner */}
      <div className="banner-wrap">
        <img src="/images/banner.jpg" alt="Students banner" className="w-100 banner-img" />
      </div>

      {/* breadcrumb */}
      <div className="bg-light border-top">
        <div className="container">
          <nav aria-label="breadcrumb" className="py-2">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item"><a href="#home">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Students</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* title */}
      <div className="container py-4">
        <h3 className="text-center mb-4 fw-semibold">Students Detail</h3>

        <div className="row g-4">
          {students.map((s) => (
            <div className="col-md-6" key={s.id}>
              <div className="card h-100 shadow-sm">
                <img src={s.img} alt={s.name} className="card-img-top student-photo"/>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{s.id}</small>
                    <small className="text-muted">{s.campus}</small>
                  </div>
                  <h5 className="mt-2 mb-3">{s.name}</h5>

                  <div className="d-flex align-items-center gap-4">
                    <label className="form-check-label">
                      <input className="form-check-input me-1" type="radio" name={`att-${s.id}`} /> Absent
                    </label>
                    <label className="form-check-label">
                      <input className="form-check-input me-1" type="radio" name={`att-${s.id}`} /> Present
                    </label>
                  </div>

                  <button className="btn btn-warning btn-sm mt-3">Submit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
