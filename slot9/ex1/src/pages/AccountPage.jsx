import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab, ProgressBar, Button } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(0);         // 0: About, 1: Account, 2: Address
  const [showValidation, setShowValidation] = useState(false);

  const keys = ["about", "account", "address"];
  const activeKey = keys[step];
  const percent = [33, 67, 100][step];

  const goPrev = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => { setShowValidation(true); setStep((s) => Math.min(2, s + 1)); };
  const finish = () => { setShowValidation(true); alert("Finished! (UI demo)"); };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h4 className="d-flex align-items-center gap-2">
            <i className="bi bi-person-circle"></i> Build Your Profile
          </h4>
          <ProgressBar now={percent} label={`${percent}%`} className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs activeKey={activeKey} onSelect={() => {}} className="mb-3" fill>
            <Tab eventKey="about" title={<span><i className="bi bi-person-circle me-1"></i>About</span>}>
              <AboutForm showValidation={showValidation} />
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" disabled>Previous</Button>
                <Button onClick={goNext}>Next</Button>
              </div>
            </Tab>

            <Tab eventKey="account" title={<span><i className="bi bi-lock me-1"></i>Account</span>}>
              <AccountForm showValidation={showValidation} />
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={goPrev}>Previous</Button>
                <Button onClick={goNext}>Next</Button>
              </div>
            </Tab>

            <Tab eventKey="address" title={<span><i className="bi bi-geo-alt me-1"></i>Address</span>}>
              <AddressForm showValidation={showValidation} onPrev={goPrev} onFinish={finish} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

