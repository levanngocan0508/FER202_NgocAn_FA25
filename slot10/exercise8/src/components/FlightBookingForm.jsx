import './FlightBookingForm.css';

import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FloatingLabel,
  Badge,
} from "react-bootstrap";

const AIRPORTS = [
  { code: "HAN", city: "Hà Nội", name: "Nội Bài" },
  { code: "SGN", city: "TP.HCM", name: "Tân Sơn Nhất" },
  { code: "DAD", city: "Đà Nẵng", name: "Đà Nẵng" },
  { code: "HUI", city: "Huế", name: "Phú Bài" },
  { code: "CXR", city: "Nha Trang", name: "Cam Ranh" },
  { code: "PQC", city: "Phú Quốc", name: "Phú Quốc" },
];

const todayStr = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

export default function FlightBookingForm() {
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [form, setForm] = useState({
    tripType: "round",
    fullName: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    cabinClass: "economy",
    adults: 1,
    children: 0,
    infants: 0,
    promo: "",
    notes: "",
    agree: false,
  });

  const errors = useMemo(() => {
    const sameRoute = form.origin && form.destination && form.origin === form.destination;
    const paxValid = Number(form.adults) >= 1 && (Number(form.adults) + Number(form.children) + Number(form.infants)) > 0;
    const datesValid =
      !!form.departDate &&
      (form.tripType === "one-way" ||
        (!!form.returnDate && new Date(form.returnDate) >= new Date(form.departDate)));
    return { sameRoute, paxValid, datesValid };
  }, [form]);

  const totalPax = Number(form.adults) + Number(form.children) + Number(form.infants);
  const returnDisabled = form.tripType === "one-way";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubmitted(null);
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "tripType" && value === "one-way" ? { returnDate: "" } : null),
    }));
  };

  const inc = (field) =>
    setForm((f) => ({ ...f, [field]: Math.max(0, Number(f[field]) + 1) }));
  const dec = (field) =>
    setForm((f) => ({ ...f, [field]: Math.max(0, Number(f[field]) - 1) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    const formEl = e.currentTarget;
    const browserOK = formEl.checkValidity();
    if (browserOK && !errors.sameRoute && errors.paxValid && errors.datesValid && form.agree) {
      setSubmitted({
        ...form,
        totalPax,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleReset = () => {
    setForm({
      tripType: "round",
      fullName: "",
      email: "",
      phone: "",
      origin: "",
      destination: "",
      departDate: "",
      returnDate: "",
      cabinClass: "economy",
      adults: 1,
      children: 0,
      infants: 0,
      promo: "",
      notes: "",
      agree: false,
    });
    setValidated(false);
    setSubmitted(null);
  };

  return (
    <Container className="screen-center form-shell form-shell--tiny form-only rb-compact ultra">
      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">
              Đặt vé máy bay
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Loại hành trình */}
                <Row className="mb-3">
                  <Form.Label className="mb-2">Loại hành trình</Form.Label>
                  <Col sm="auto">
                    <Form.Check
                      inline
                      type="radio"
                      id="trip-round"
                      label="Khứ hồi"
                      name="tripType"
                      value="round"
                      checked={form.tripType === "round"}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="auto">
                    <Form.Check
                      inline
                      type="radio"
                      id="trip-oneway"
                      label="Một chiều"
                      name="tripType"
                      value="one-way"
                      checked={form.tripType === "one-way"}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                {/* Thông tin liên hệ */}
                <Row className="g-3">
                  <Col md={6}>
                    <FloatingLabel controlId="fullName" label="Họ và tên *">
                      <Form.Control
                        required
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập họ tên.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="email" label="Email *">
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ban@vidu.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        Email không hợp lệ.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="phone" label="Số điện thoại *">
                      <Form.Control
                        required
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="^[0-9\-\+\s]{8,15}$"
                        placeholder="090..."
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập số điện thoại hợp lệ.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>

                <hr className="my-4" />

                {/* Chặng bay */}
                <Row className="g-3">
                  <Col md={6}>
                    <FloatingLabel controlId="origin" label="Điểm đi *">
                      <Form.Select
                        required
                        name="origin"
                        value={form.origin}
                        onChange={handleChange}
                        isInvalid={errors.sameRoute}
                      >
                        <option value="">-- Chọn sân bay --</option>
                        {AIRPORTS.map((a) => (
                          <option key={a.code} value={a.code}>
                            {a.city} ({a.code}) — {a.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {!errors.sameRoute
                          ? "Vui lòng chọn điểm đi."
                          : "Điểm đi trùng điểm đến."}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="destination" label="Điểm đến *">
                      <Form.Select
                        required
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        isInvalid={errors.sameRoute}
                      >
                        <option value="">-- Chọn sân bay --</option>
                        {AIRPORTS.map((a) => (
                          <option key={a.code} value={a.code}>
                            {a.city} ({a.code}) — {a.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {!errors.sameRoute
                          ? "Vui lòng chọn điểm đến."
                          : "Điểm đến trùng điểm đi."}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="departDate" label="Ngày đi *">
                      <Form.Control
                        required
                        type="date"
                        name="departDate"
                        value={form.departDate}
                        onChange={handleChange}
                        min={todayStr()}
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng chọn ngày đi.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="returnDate" label="Ngày về">
                      <Form.Control
                        type="date"
                        name="returnDate"
                        value={form.returnDate}
                        onChange={handleChange}
                        min={form.departDate || todayStr()}
                        disabled={returnDisabled}
                        isInvalid={!errors.datesValid && !returnDisabled && validated}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ngày về phải sau hoặc bằng ngày đi.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="cabinClass" label="Hạng ghế">
                      <Form.Select
                        name="cabinClass"
                        value={form.cabinClass}
                        onChange={handleChange}
                      >
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>

                {/* Hành khách */}
                <Row className="g-3 mt-1">
                  <Col md={4}>
                    <Form.Label>Người lớn (≥12)</Form.Label>
                    <InputGroup>
                      <Button variant="outline-secondary" onClick={() => dec("adults")}>−</Button>
                      <Form.Control
                        type="number"
                        min={1}
                        required
                        name="adults"
                        value={form.adults}
                        onChange={handleChange}
                        isInvalid={!errors.paxValid && validated}
                      />
                      <Button variant="outline-secondary" onClick={() => inc("adults")}>+</Button>
                      <Form.Control.Feedback type="invalid">
                        Cần ít nhất 1 người lớn.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Trẻ em (2–11)</Form.Label>
                    <InputGroup>
                      <Button variant="outline-secondary" onClick={() => dec("children")}>−</Button>
                      <Form.Control
                        type="number"
                        min={0}
                        name="children"
                        value={form.children}
                        onChange={handleChange}
                      />
                      <Button variant="outline-secondary" onClick={() => inc("children")}>+</Button>
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Em bé (&lt;2)</Form.Label>
                    <InputGroup>
                      <Button variant="outline-secondary" onClick={() => dec("infants")}>−</Button>
                      <Form.Control
                        type="number"
                        min={0}
                        name="infants"
                        value={form.infants}
                        onChange={handleChange}
                      />
                      <Button variant="outline-secondary" onClick={() => inc("infants")}>+</Button>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col>
                    <Form.Text className={errors.paxValid ? "text-muted" : "text-danger"}>
                      Tổng hành khách: {totalPax}
                      {!errors.paxValid && " — cần ≥ 1 người lớn."}
                    </Form.Text>
                  </Col>
                </Row>

                <hr className="my-4" />

                {/* Khác */}
                <Row className="g-3">
                  <Col md={6}>
                    <FloatingLabel controlId="promo" label="Mã khuyến mãi (tuỳ chọn)">
                      <Form.Control
                        name="promo"
                        value={form.promo}
                        onChange={handleChange}
                        placeholder="PROMO2025"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel controlId="notes" label="Ghi chú (tuỳ chọn)">
                      <Form.Control
                        as="textarea"
                        style={{ height: 90 }}
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Yêu cầu đặc biệt..."
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Form.Check
                  className="mt-3"
                  required
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  label="Tôi xác nhận thông tin là chính xác và đồng ý với điều khoản."
                  feedback="Bạn cần chấp nhận điều khoản."
                  feedbackType="invalid"
                />

                <div className="d-flex gap-2 mt-4">
                  <Button type="submit" variant="primary">
                    Tìm chuyến bay
                  </Button>
                  <Button type="button" variant="outline-secondary" onClick={handleReset}>
                    Xoá & nhập lại
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Bên phải: Tóm tắt */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Tóm tắt tìm kiếm</Card.Header>
            <Card.Body>
              {submitted ? (
                <>
                  <div className="mb-2">
                    <strong>Hành trình:</strong>{" "}
                    {submitted.origin} → {submitted.destination}{" "}
                    {submitted.tripType === "round" && ` (khứ hồi)`}
                  </div>
                  <div className="mb-2">
                    <strong>Ngày đi:</strong> {submitted.departDate}
                    {submitted.tripType === "round" && (
                      <>
                        {" • "}
                        <strong>Ngày về:</strong> {submitted.returnDate || "—"}
                      </>
                    )}
                  </div>
                  <div className="mb-2">
                    <strong>Hạng ghế:</strong> {submitted.cabinClass}
                  </div>
                  <div className="mb-2">
                    <strong>Hành khách:</strong> {submitted.adults} NL • {submitted.children} TE • {submitted.infants} EB
                  </div>
                  {submitted.promo && (
                    <div className="mb-2">
                      <strong>Mã KM:</strong> {submitted.promo}
                    </div>
                  )}
                  <div className="small text-muted">
                    Gửi lúc: {new Date(submitted.createdAt).toLocaleString()}
                  </div>
                </>
              ) : (
                <div className="text-muted">
                  Nhập thông tin ở bên trái và nhấn <em>Tìm chuyến bay</em> để xem tóm tắt.
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
