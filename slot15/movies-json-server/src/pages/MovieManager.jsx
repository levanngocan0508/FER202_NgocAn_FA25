// src/pages/MovieManager.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider, useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

const MovieManagerContentInner = () => {
  const { genres } = useMovieState();
  const { fetchMovies, fetchMoviesWithParams } = useMovieDispatch();

  const applyFilter = (params) => fetchMoviesWithParams(params);
  const resetFilter = () => fetchMovies();

  return (
    <>
      <FilterBar genres={genres} onApply={applyFilter} onReset={resetFilter} />
      <h2 className="mt-4">Danh sách Phim</h2>
      <MovieTable />
    </>
  );
};

const MovieManagerContent = () => (
  <Container className="mt-5">
    <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>
    <MovieForm />
    <MovieManagerContentInner />
  </Container>
);

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
