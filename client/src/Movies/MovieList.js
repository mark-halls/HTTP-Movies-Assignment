import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  removeMovie = movieId => {
    this.setState({
      ...this.state,
      movies: this.state.movies.filter(movie => movie.id !== movieId)
    });
  };
  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails
            key={movie.id}
            movie={movie}
            removeMovie={this.removeMovie}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

function MovieDetails(props) {
  const { movie } = props;
  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <MovieCard movie={movie} />
      </Link>
      <button onClick={() => props.history.push(`/update-movie/${movie.id}`)}>
        Edit
      </button>
      <button
        onClick={() =>
          axios
            .delete(`http://localhost:5000/api/movies/${movie.id}`)
            .then(res => {
              props.removeMovie(res.data);
              props.history.push("/");
            })
            .catch(err => console.error(err))
        }
      >
        Delete
      </button>
    </>
  );
}
