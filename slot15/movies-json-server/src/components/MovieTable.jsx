// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const { movies, genres, loading, movieToDelete, showDeleteModal } = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();

  const genreMap = React.useMemo(() => {
    const m = {};
    genres.forEach(g => { m[g.id] = g.name; });
    return m;
  }, [genres]);

  const handleEditClick = (movie) => dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  const handleDeleteClick = (movie) => dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });

  const getCategoryBadgeVariant = (name) => {
    const map = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return map[name] || 'secondary';
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" className="me-2" />
          Đang tải dữ liệu...
        </div>
      ) : movies.length === 0 ? (
        <Alert variant="warning" className="mt-3">Chưa có phim nào.</Alert>
      ) : (
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Tên phim</th>
              <th>Mô tả</th>
              <th>Thể loại</th>
              <th>Năm</th>
              <th>Quốc gia</th>
              <th>Thời lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId];
              const img = movie.avatar || movie.poster || '';
              return (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>
                    {img
                      ? <Image src={img} alt={movie.title} thumbnail style={{ maxWidth: '80px', maxHeight: '60px', objectFit: 'cover' }} />
                      : <span>—</span>}
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.description?.length > 80 ? `${movie.description.slice(0, 80)}…` : movie.description}</td>
                  <td><Badge bg={getCategoryBadgeVariant(genreName)}>{genreName || '—'}</Badge></td>
                  <td>{movie.year}</td>
                  <td>{movie.country}</td>
                  <td>{movie.duration} phút</td>
                  
                  <td>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditClick(movie)}>Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa “{movieToDelete?.title}” (ID: {movieToDelete?.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy</Button>
          <Button
            variant="danger"
            onClick={() => movieToDelete && confirmDelete(movieToDelete.id)}
          >
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
