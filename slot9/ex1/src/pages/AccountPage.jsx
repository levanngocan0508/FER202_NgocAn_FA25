import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AccountPage.css";

export default function AccountPage() {
  const steps = ["about", "account", "address"];
  const [activeKey, setActiveKey] = useState("about");
  const stepIndex = steps.indexOf(activeKey);
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex]
  );

  // Form state
  const [about, setAbout] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "18", avatar: null
  });
  const [account, setAccount] = useState({
    username: "", password: "", confirm: ""
  });
  const [address, setAddress] = useState({
    country: "", city: "", line1: "", line2: "", zip: ""
  });

  // Validate RB
  const [validated, setValidated] = useState(false);

  // Summary modal
  const [showSummary, setShowSummary] = useState(false);

  const nextStep = () => {
    const i = steps.indexOf(activeKey);
    if (i < steps.length - 1) setActiveKey(steps[i + 1]);
  };
  const prevStep = () => {
    const i = steps.indexOf(activeKey);
    if (i > 0) setActiveKey(steps[i - 1]);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setValidated(true);

    // quick client validation
    if (!about.firstName || !about.lastName || !about.email) return;
    if (!account.username || !account.password || account.password !== account.confirm) return;

    // lưu localStorage
    const payload = {
      about: { ...about, avatar: about.avatar ? about.avatar.name : "" },
      account: { username: account.username },
      address
    };
    try { localStorage.setItem("profile", JSON.stringify(payload)); } catch {}

    // toast
    try {
      if (typeof window.appToast === "function") {
        window.appToast("Profile saved.", "success");
      } else {
        window.dispatchEvent(new CustomEvent("app:toast", {
          detail: { message: "Profile saved.", variant: "success" }
        }));
      }
    } catch {}

    setShowSummary(true);
  };

  const isLast = stepIndex === steps.length - 1;

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-bounding-box fs-4 me-2"></i>
            <h3 className="mb-0">Build Your Profile</h3>
          </div>
          <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />

          {/* Form wrapper để dùng validated theo chuẩn RB */}
          <Form noValidate validated={validated} onSubmit={handleFinish}>
            <Tabs
              id="profile-tabs"
              activeKey={activeKey}
              onSelect={(k) => k && setActiveKey(k)}
              className="mb-4"
              justify
            >
              <Tab eventKey="about" title={<span><i className="bi bi-person-circle me-2"></i>About</span>}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label><i className="bi bi-person me-2"></i>First Name</Form.Label>
                      <Form.Control
                        required
                        name="firstName"
                        placeholder="First name"
                        value={about.firstName}
                        onChange={(e) => setAbout((s) => ({ ...s, firstName: e.target.value }))}
                      />
                      <Form.Control.Feedback type="invalid">Please enter first name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        name="lastName"
                        placeholder="Last name"
                        value={about.lastName}
                        onChange={(e) => setAbout((s) => ({ ...s, lastName: e.target.value }))}
                      />
                      <Form.Control.Feedback type="invalid">Please enter last name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        placeholder="name@email.com"
                        value={about.email}
                        onChange={(e) => setAbout((s) => ({ ...s, email: e.target.value }))}
                      />
                      <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Optional → không hiện tick khi trống */}
                    <Form.Group controlId="phone" className="no-valid">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        placeholder="09xxxxxxxx"
                        value={about.phone}
                        onChange={(e) => setAbout((s) => ({ ...s, phone: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Optional */}
                    <Form.Group controlId="age" className="no-valid">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        name="age"
                        value={about.age}
                        onChange={(e) => setAbout((s) => ({ ...s, age: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    {/* Optional */}
                    <Form.Group controlId="avatar" className="no-valid">
                      <Form.Label>Avatar</Form.Label>
                      <Form.Control
                        type="file"
                        name="avatar"
                        onChange={(e) => setAbout((s) => ({ ...s, avatar: e.target.files?.[0] || null }))}
                      />
                      <Form.Text muted>
                        {about.avatar ? `Selected: ${about.avatar.name}` : "No file chosen"}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="account" title={<span><i className="bi bi-lock me-2"></i>Account</span>}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        required
                        name="username"
                        placeholder="yourusername"
                        value={account.username}
                        onChange={(e) => setAccount((s) => ({ ...s, username: e.target.value }))}
                      />
                      <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        placeholder="••••••"
                        value={account.password}
                        onChange={(e) => setAccount((s) => ({ ...s, password: e.target.value }))}
                        minLength={6}
                      />
                      <Form.Control.Feedback type="invalid">Min 6 characters.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="confirm">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="confirm"
                        placeholder="repeat password"
                        value={account.confirm}
                        isInvalid={validated && account.confirm !== account.password}
                        onChange={(e) => setAccount((s) => ({ ...s, confirm: e.target.value }))}
                      />
                      <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="address" title={<span><i className="bi bi-geo-alt me-2"></i>Address</span>}>
                <Row className="g-3">
                  <Col md={6}>
                    {/* Optional */}
                    <Form.Group controlId="country" className="no-valid">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        name="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={(e) => setAddress((s) => ({ ...s, country: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Optional */}
                    <Form.Group controlId="city" className="no-valid">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress((s) => ({ ...s, city: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    {/* Optional */}
                    <Form.Group controlId="line1" className="no-valid">
                      <Form.Label>Address line 1</Form.Label>
                      <Form.Control
                        name="line1"
                        placeholder="Street, building..."
                        value={address.line1}
                        onChange={(e) => setAddress((s) => ({ ...s, line1: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    {/* Optional */}
                    <Form.Group controlId="line2" className="no-valid">
                      <Form.Label>Address line 2</Form.Label>
                      <Form.Control
                        name="line2"
                        placeholder="Apartment, floor (optional)"
                        value={address.line2}
                        onChange={(e) => setAddress((s) => ({ ...s, line2: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Optional */}
                    <Form.Group controlId="zip" className="no-valid">
                      <Form.Label>ZIP / Postal</Form.Label>
                      <Form.Control
                        name="zip"
                        placeholder="ZIP"
                        value={address.zip}
                        onChange={(e) => setAddress((s) => ({ ...s, zip: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
            </Tabs>

            {/* Actions */}
            <div className="d-flex justify-content-between">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={stepIndex === 0}
              >
                Previous
              </Button>

              {!isLast ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Finish
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Summary modal */}
      <Modal show={showSummary} onHide={() => setShowSummary(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-2">About</h6>
          <ul className="small">
            <li><strong>Name:</strong> {about.firstName} {about.lastName}</li>
            <li><strong>Email:</strong> {about.email}</li>
            <li><strong>Phone:</strong> {about.phone || "—"}</li>
            <li><strong>Age:</strong> {about.age || "—"}</li>
            <li><strong>Avatar:</strong> {about.avatar ? about.avatar.name : "—"}</li>
          </ul>

          <h6 className="mb-2 mt-3">Account</h6>
          <ul className="small">
            <li><strong>Username:</strong> {account.username}</li>
          </ul>

          <h6 className="mb-2 mt-3">Address</h6>
          <ul className="small mb-0">
            <li><strong>Country:</strong> {address.country || "—"}</li>
            <li><strong>City:</strong> {address.city || "—"}</li>
            <li><strong>Address 1:</strong> {address.line1 || "—"}</li>
            <li><strong>Address 2:</strong> {address.line2 || "—"}</li>
            <li><strong>ZIP:</strong> {address.zip || "—"}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSummary(false)}>Close</Button>
          <Button
            onClick={() => {
              setShowSummary(false);
              try { if (typeof window.appToast === "function") window.appToast("Profile saved.", "success"); } catch {}
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
