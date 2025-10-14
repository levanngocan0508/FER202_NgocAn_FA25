// src/pages/AboutPage.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <Container className="py-5">
      {/* Hero */}
      <div className="about-hero p-4 p-md-5 rounded-4 mb-4">
        <h2 className="display-6 fw-semibold mb-2">About CGV</h2>
        <p className="lead mb-0 text-body-secondary">
          CGV giúp bạn khám phá, lọc và lưu những bộ phim yêu thích một cách nhanh chóng –
          từ tìm kiếm tức thời, bộ sưu tập nổi bật đến quản lý <em>Favourites</em> gọn gàng.
        </p>
      </div>

      {/* Features */}
      <h4 className="section-title mb-3">Bạn nhận được gì</h4>
      <Row xs={1} md={2} lg={4} className="g-3 mb-4">
        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-collection-play fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Bộ sưu tập nổi bật</h6>
              </div>
              <Card.Text className="text-muted small">
                Carousel và lưới phim được tuyển chọn, cập nhật liên tục để bạn bắt đầu ngay.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-search fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Tìm kiếm tức thì</h6>
              </div>
              <Card.Text className="text-muted small">
                Quick Search trên navbar + bộ lọc theo tiêu đề, năm và thời lượng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-heart fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Favourites</h6>
              </div>
              <Card.Text className="text-muted small">
                Thêm/Xoá yêu thích realtime, hiển thị thông báo đẹp và badge đếm trên navbar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-shield-check fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Trải nghiệm mượt</h6>
              </div>
              <Card.Text className="text-muted small">
                Giao diện chuẩn React-Bootstrap, responsive 1–2–3 cột, tối ưu khả năng đọc.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Giá trị cốt lõi</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="bi bi-speedometer2 me-2 text-primary"></i>Tốc độ &amp; đơn giản
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-ui-radios-grid me-2 text-primary"></i>Thiết kế trực quan
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-lock me-2 text-primary"></i>Lưu trữ cục bộ – quyền riêng tư
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Công nghệ sử dụng</Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="primary" pill>React</Badge>
                <Badge bg="secondary" pill>React-Bootstrap</Badge>
                <Badge bg="dark" pill>Bootstrap Icons</Badge>
                <Badge bg="info" pill>localStorage</Badge>
              </div>
              <p className="small text-muted mb-0 mt-3">
                Tất cả thành phần giao diện tuân theo tài liệu React-Bootstrap chính thức.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
