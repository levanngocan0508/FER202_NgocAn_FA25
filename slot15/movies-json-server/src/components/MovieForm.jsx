// src/components/MovieForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieFields = ({
  currentMovie,
  handleInputChange,
  handleFileChange,
  imagePreview,
  genres,
  errors = {},
  validated = false,
}) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="avatar"
            value={currentMovie.avatar || currentMovie.poster || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
            isInvalid={validated && !!errors.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
          </Form.Control.Feedback>

          {imagePreview ? (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                thumbnail
                style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
              />
            </div>
          ) : null}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>
            Tên Phim <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            placeholder="Tên phim"
            required
            isInvalid={validated && !!errors.title}
            isValid={validated && !errors.title && currentMovie.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>
            Mô tả <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            placeholder="Mô tả phim"
            required
            isInvalid={validated && !!errors.description}
            isValid={validated && !errors.description && currentMovie.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formGenre">
          <Form.Label>
            Thể loại <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && !!errors.genreId}
            isValid={validated && !errors.genreId && currentMovie.genreId}
          >
            <option value="">Chọn thể loại</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.genreId}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>
            Thời lượng (phút) <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            placeholder="Phút"
            required
            min="1"
            max="600"
            isInvalid={validated && !!errors.duration}
            isValid={validated && !errors.duration && currentMovie.duration}
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={2}>
        <Form.Group controlId="formYear">
          <Form.Label>
            Năm <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            placeholder="Năm"
            required
            min="1900"
            max="2030"
            isInvalid={validated && !!errors.year}
            isValid={validated && !errors.year && currentMovie.year}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={2}>
        <Form.Group controlId="formCountry">
          <Form.Label>
            Quốc gia <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={currentMovie.country || ''}
            onChange={handleInputChange}
            placeholder="Quốc gia"
            required
            isInvalid={validated && !!errors.country}
            isValid={validated && !errors.country && currentMovie.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const { currentMovie, isEditing, showEditModal, genres } = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();

  const [imagePreview, setImagePreview] = useState(currentMovie.avatar || currentMovie.poster || '');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Đồng bộ avatar/poster nếu user nhập URL
    if (name === 'avatar' || name === 'poster') {
      setImagePreview(value);
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value } });
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'poster', value } });
    } else {
      dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      // Lưu cả avatar và poster để khớp db.json
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: base64 } });
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'poster', value: base64 } });
    };
    reader.readAsDataURL(file);
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
    setValidated(false);
    setErrors({});
  };

  const validateForm = () => {
    const v = currentMovie || {};
    const newErrors = {};

    if (!v.title?.trim()) newErrors.title = 'Tên phim không được để trống';
    else if (v.title.trim().length < 2) newErrors.title = 'Tên phim tối thiểu 2 ký tự';

    if (!v.description?.trim()) newErrors.description = 'Mô tả không được để trống';
    else if (v.description.trim().length < 10) newErrors.description = 'Mô tả tối thiểu 10 ký tự';

    if (!v.genreId) newErrors.genreId = 'Vui lòng chọn thể loại';

    const d = Number(v.duration);
    if (!d) newErrors.duration = 'Thời lượng không được để trống';
    else if (d < 1 || d > 600) newErrors.duration = 'Thời lượng phải 1–600 phút';

    const y = Number(v.year);
    if (!y) newErrors.year = 'Năm không được để trống';
    else if (y < 1900 || y > 2030) newErrors.year = 'Năm phải 1900–2030';

    if (!v.country?.trim()) newErrors.country = 'Quốc gia không được để trống';

    if (!(v.avatar?.trim() || v.poster?.trim())) newErrors.avatar = 'Vui lòng chọn ảnh hoặc nhập URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    if (!validateForm()) return;

    const dataToSend = {
      // đồng bộ 2 trường ảnh để tương thích mọi nguồn dữ liệu
      avatar: currentMovie.avatar || currentMovie.poster || '',
      poster: currentMovie.poster || currentMovie.avatar || '',
      title: currentMovie.title,
      description: currentMovie.description,
      genreId: Number(currentMovie.genreId),
      duration: Number(currentMovie.duration),
      year: Number(currentMovie.year),
      country: currentMovie.country,
    };

    const ok = await handleCreateOrUpdate(dataToSend, !!isEditing, isEditing);
    if (ok) {
      setImagePreview('');
      setValidated(false);
      setErrors({});
    }
  };

  return (
    <>
      {/* FORM THÊM MỚI */}
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <MovieFields
            currentMovie={currentMovie}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            genres={genres}
            errors={errors}
            validated={validated}
          />
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">➕ Thêm Phim</Button>
          </div>
        </Form>
      </Container>

      {/* MODAL CHỈNH SỬA */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={currentMovie.avatar || currentMovie.poster || imagePreview}
              genres={genres}
              errors={errors}
              validated={validated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
            <Button variant="warning" type="submit">Lưu Thay Đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
