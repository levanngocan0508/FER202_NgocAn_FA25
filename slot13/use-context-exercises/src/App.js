// src/App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col md={10} lg={8} xl={7}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <CounterComponent />
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <LightSwitch />
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <LoginForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}
