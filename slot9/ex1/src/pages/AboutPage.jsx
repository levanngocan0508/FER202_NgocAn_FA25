// src/pages/AboutPage.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <Container className="py-5">
      {/* Hero */}
      <div className="about-hero p-4 p-md-5 rounded-4 mb-4">
        <h2 className="display-6 fw-semibold mb-2">About CGV</h2>
        <p className="lead mb-0 text-body-secondary">
          CGV là điểm đến của những bộ phim mới nhất. Tại đây bạn có thể duyệt nhanh phim đang chiếu,
          sắp chiếu, xem thông tin tóm tắt và lưu vào <em>Danh sách yêu thích</em> để chọn phim dễ dàng
          mỗi khi tới rạp.
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
                <h6 className="mb-0">Phim nổi bật</h6>
              </div>
              <Card.Text className="text-muted small">
                Bộ sưu tập phim đang được yêu thích với hình ảnh và mô tả ngắn gọn để bạn chọn nhanh.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-search fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Tìm phim tức thì</h6>
              </div>
              <Card.Text className="text-muted small">
                Gõ tên phim để tìm nhanh; có bộ lọc theo năm và thời lượng để thu hẹp kết quả.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-heart fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Danh sách yêu thích</h6>
              </div>
              <Card.Text className="text-muted small">
                Lưu những phim bạn quan tâm; thêm/xoá dễ dàng và theo dõi số lượng ngay trên thanh menu.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="feature-card h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-star fs-4 me-2 text-primary"></i>
                <h6 className="mb-0">Trải nghiệm xem phim tốt</h6>
              </div>
              <Card.Text className="text-muted small">
                Thông tin phim rõ ràng, bố cục dễ đọc, phù hợp khi bạn xem nhanh trước khi vào rạp.
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
                <i className="bi bi-speedometer2 me-2 text-primary"></i>Nhanh &amp; thuận tiện
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-ui-radios-grid me-2 text-primary"></i>Thông tin phim minh bạch
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-heart-fill me-2 text-primary"></i>Lấy người xem làm trung tâm
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Dịch vụ &amp; tiện ích tại rạp</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="bi bi-ticket-perforated me-2 text-primary"></i>Đa dạng suất chiếu &amp; thể loại
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-cup-straw me-2 text-primary"></i>Combo bắp nước phong phú
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-gift me-2 text-primary"></i>Ưu đãi thành viên &amp; chương trình khuyến mại
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-film me-2 text-primary"></i>Không gian rạp hiện đại, âm thanh hình ảnh sống động
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
