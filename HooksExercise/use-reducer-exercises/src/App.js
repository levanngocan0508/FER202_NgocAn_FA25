import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import QuestionBankFull from "./components/QuestionBankFull";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import QuestionBank from "./components/QuestionBank";

export default function App() {
  return (
    <Container className="py-4">
      <Row className="g-4 justify-content-center">

        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 1 — Bộ Đếm Đa Năng
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner narrow">
                <CounterComponent />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 2 — Công Tắc Đèn
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner narrow">
                <LightSwitch />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 3 — Login Form 
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner narrow">
                <LoginForm />
              </div>
            </Card.Body>
          </Card>
        </Col>



        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 4 — Register Form 
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner narrow">
                <RegisterForm />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 5 — Question Bank
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner wide">
                <QuestionBank />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm exercise-card">
            <Card.Header className="text-center fw-bold">
              Bài 6 — Question Bank Full
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              <div className="exercise-inner wide">
                <QuestionBankFull />
              </div>
            </Card.Body>
          </Card>
        </Col>



      </Row>
    </Container>
  );
}
