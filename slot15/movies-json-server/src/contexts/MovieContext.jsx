// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducer';
import movieApi from '../api/movieAPI';

// Contexts
export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// Provider
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // READ all
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data } = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  // READ with filters/sort (cho FilterBar)
  const fetchMoviesWithParams = useCallback(async (params = {}) => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data } = await movieApi.get('/movies', { params });
      dispatch({ type: 'SET_MOVIES', payload: data });
    } catch (e) {
      console.error('Lỗi khi lọc/sắp xếp phim:', e);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  // READ genres
  const fetchGenres = useCallback(async () => {
    try {
      const { data } = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách thể loại:', error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  // DELETE
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
      fetchMovies();
    }
  }, [fetchMovies]);

  // CREATE/UPDATE
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (error) {
      console.error('Lỗi thao tác CREATE/UPDATE:', error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchMoviesWithParams,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
