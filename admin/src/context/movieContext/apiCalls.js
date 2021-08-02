import {
  getMoviesStart,
  getMoviesFailure,
  getMoviesSuccess,
  deleteMovieStart,
  deleteMovieFailure,
  deleteMoviesSuccess,
  createMovieStart,
  createMovieFailure,
  createMoviesSuccess,
  updateMovieStart,
  updateMovieFailure,
  updateMoviesSuccess,
} from "./movieAction";
import axios from "axios";
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("/movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMoviesSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};
//create Movies
export const createMovie = async (dispatch, movie) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//update movie

export const updatedMovie = async (dispatch, updateMovie, id) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`/movies/${id}`, updateMovie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMoviesSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};
