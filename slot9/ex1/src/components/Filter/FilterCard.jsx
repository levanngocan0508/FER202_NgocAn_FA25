import React from "react";
import { Card, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function FilterCard({
  search = "",
  yearRange = "all",
  sortBy = "year-asc",
  onSearchChange = () => {},
  onYearRangeChange = () => {},
  onSortChange = () => {},
}) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">Filter Movies</Card.Title>

        <Row className="g-3">
          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="filterSearch">
              <Form.Label>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-search" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Title or description..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="filterYear">
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select
                value={yearRange}
                onChange={(e) => onYearRangeChange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="lte-2000">≤ 2000</option>
                <option value="2001-2015">2001 – 2015</option>
                <option value="gt-2015">&gt; 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} lg={4}>
            <Form.Group controlId="filterSort">
              <Form.Label>Sorting</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
